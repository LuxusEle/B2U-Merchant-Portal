export type PinLoginPayload = { identifier: string; pin: string };
export type PinLoginResponse = { ok: true; uid: string } | { ok: false; message: string };

const sanitizedQrBaseUrl = import.meta.env.VITE_QR_APP_BASE_URL?.replace(/\/$/, '');

if (!sanitizedQrBaseUrl) {
  throw new Error('Missing VITE_QR_APP_BASE_URL. Set it to your Next app origin (e.g. https://qr.b2u.app).');
}

export const qrBaseUrl = sanitizedQrBaseUrl;

const pinEndpoint = import.meta.env.VITE_PIN_ENDPOINT || `${qrBaseUrl}/api/auth/signin-pin`;
const sessionEndpoint = import.meta.env.VITE_SESSION_ENDPOINT || `${qrBaseUrl}/api/session/create`;

export async function loginWithPin(payload: PinLoginPayload): Promise<PinLoginResponse> {
  const pinRes = await fetch(pinEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const pinData = await pinRes.json().catch(() => ({}));
  if (!pinRes.ok || !pinData?.customToken) {
    return { ok: false, message: pinData?.message || 'Sign-in failed' };
  }

  const sessionRes = await fetch(sessionEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken: pinData.customToken }),
  });
  const sessionData = await sessionRes.json().catch(() => ({}));
  if (!sessionRes.ok) {
    return { ok: false, message: sessionData?.message || 'Failed to create session' };
  }

  return { ok: true, uid: pinData.uid };
}