export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export type AuthMode = 'signin' | 'signup';