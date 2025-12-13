// authClient.ts (Vite app) — role-aware redirect + session-landing support
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, type UserCredential } from 'firebase/auth';

// Initialize Firebase (use your existing config/init if present)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // add other keys as needed
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export type PinLoginPayload = { identifier: string; pin: string };
export type PinLoginResponse =
  | { ok: true; uid: string; redirectTo?: string; role?: string; meta?: Record<string, any> }
  | { ok: false; message: string };

const sanitizedQrBaseUrl = import.meta.env.VITE_QR_APP_BASE_URL?.replace(/\/$/, '');
if (!sanitizedQrBaseUrl) {
  throw new Error('Missing VITE_QR_APP_BASE_URL. Set it to your Next app origin (e.g. https://qr.b2u.app).');
}
export const qrBaseUrl = sanitizedQrBaseUrl;

const pinEndpoint = import.meta.env.VITE_PIN_ENDPOINT || `${qrBaseUrl}/api/auth/signin-pin`;
const sessionEndpoint = import.meta.env.VITE_SESSION_ENDPOINT || `${qrBaseUrl}/api/session/create`;
const sessionLandingEndpoint = `${qrBaseUrl}/api/session/landing`;

/** Build a role-aware redirect URL using metadata returned from signin-pin */
function buildRedirectUrl(metadata: Record<string, any> | undefined): string {
  if (!metadata) return `${qrBaseUrl}/qr-registration`;
  const role: string | undefined = metadata.role || metadata.accountType || undefined;
  const companySlug: string | undefined = metadata.companySlug || undefined;
  const branchSlug: string | undefined = metadata.branchSlug || undefined;
  const cashierSlug: string | undefined = metadata.cashierSlug || undefined;

  switch ((role || '').toString()) {
    case 'cashier':
      if (companySlug && branchSlug && cashierSlug) {
        return `${qrBaseUrl}/${companySlug}/${branchSlug}/${cashierSlug}`;
      }
      return `${qrBaseUrl}/qr-registration`;

    case 'branch-manager':
    case 'branch':
    case 'manager':
      if (companySlug && branchSlug) {
        return `${qrBaseUrl}/${companySlug}/${branchSlug}`;
      }
      return `${qrBaseUrl}/qr-registration`;

    case 'company-owner':
    case 'company':
      if (companySlug) {
        return `${qrBaseUrl}/${companySlug}`;
      }
      return `${qrBaseUrl}/qr-registration`;

    case 'individual':
    default:
      return `${qrBaseUrl}/qr-registration`;
  }
}

/** Submit a top-level form POST to the session landing endpoint (works across origins) */
function postToSessionLanding(customToken: string, redirectTo: string) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = sessionLandingEndpoint;
  form.style.display = 'none';

  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'customToken';
  tokenInput.value = customToken;
  form.appendChild(tokenInput);

  const redirectInput = document.createElement('input');
  redirectInput.type = 'hidden';
  redirectInput.name = 'redirectTo';
  redirectInput.value = redirectTo;
  form.appendChild(redirectInput);

  document.body.appendChild(form);
  form.submit();
}

/**
 * Login with PIN:
 * 1) POST to /api/auth/signin-pin -> returns { customToken, uid, role, companySlug, branchSlug, cashierSlug, ... }
 * 2) If same-origin: signInWithCustomToken + exchange idToken via fetch(/api/session/create)
 * 3) If cross-origin: POST form to /api/session/landing (browser navigates, landing route sets cookie, redirects)
 */
export async function loginWithPin(payload: PinLoginPayload): Promise<PinLoginResponse> {
  // 1) verify PIN and get custom token + metadata
  const pinRes = await fetch(pinEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  let pinData: any = {};
  try { pinData = await pinRes.json(); } catch { pinData = {}; }

  if (!pinRes.ok) {
    return { ok: false, message: pinData?.message || 'Sign-in failed' };
  }

  const customToken = pinData?.customToken || pinData?.custom_token || pinData?.token;
  const metadata = {
    role: pinData?.role ?? pinData?.accountType ?? null,
    companySlug: pinData?.companySlug ?? null,
    branchSlug: pinData?.branchSlug ?? null,
    cashierSlug: pinData?.cashierSlug ?? null,
    uid: pinData?.uid ?? null,
    raw: pinData,
  };

  const redirectTo = buildRedirectUrl(metadata);

  // If server returned an idToken instead of a customToken, handle as fallback
  if (!customToken) {
    const idTokenFallback = pinData?.idToken || pinData?.id_token;
    if (!idTokenFallback) {
      return { ok: false, message: 'No custom token returned from server' };
    }

    // If same-origin, POST via fetch; otherwise use landing form to ensure cookie acceptance
    const sameOrigin = (() => {
      try {
        return new URL(qrBaseUrl).origin === window.location.origin;
      } catch {
        return false;
      }
    })();

    if (sameOrigin) {
      const sessionFallbackRes = await fetch(sessionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken: idTokenFallback }),
      });
      const sessionFallbackData = await sessionFallbackRes.json().catch(() => ({}));
      if (!sessionFallbackRes.ok) {
        return { ok: false, message: sessionFallbackData?.message || 'Failed to create session' };
      }
      return { ok: true, uid: metadata.uid, redirectTo, role: metadata.role, meta: metadata.raw };
    } else {
      // submit form with idToken as fallback (landing supports form-encoded bodies)
      postToSessionLanding(idTokenFallback, redirectTo);
      return { ok: true, uid: metadata.uid, redirectTo, role: metadata.role, meta: metadata.raw };
    }
  }

  // we have a custom token
  try {
    const sameOrigin = (() => {
      try {
        return new URL(qrBaseUrl).origin === window.location.origin;
      } catch {
        return false;
      }
    })();

    if (sameOrigin) {
      // same-origin: sign in client then exchange idToken via fetch
      const userCred: UserCredential = await signInWithCustomToken(auth, customToken);
      const idToken = await userCred.user.getIdToken(true);
      const sessionRes = await fetch(sessionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });
      const sessionData = await sessionRes.json().catch(() => ({}));
      if (!sessionRes.ok) {
        try { await auth.signOut(); } catch {}
        return { ok: false, message: sessionData?.message || 'Failed to create server session' };
      }
      return { ok: true, uid: metadata.uid, redirectTo, role: metadata.role, meta: metadata.raw };
    } else {
      // cross-origin: do a quick client sign-in attempt (optional) then post to landing for cookie set + redirect
      try {
        // optional: hydrate client SDK (not strictly necessary if landing + RequireAuth hydrate on QR app)
        await signInWithCustomToken(auth, customToken);
      } catch (e) {
        // ignore client sign-in errors here; landing will still create server session
      }
      postToSessionLanding(customToken, redirectTo);
      return { ok: true, uid: metadata.uid, redirectTo, role: metadata.role, meta: metadata.raw };
    }
  } catch (err: any) {
    try { await auth.signOut(); } catch {}
    return { ok: false, message: err?.message || 'Client sign-in failed' };
  }
}