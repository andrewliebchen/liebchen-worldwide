export const maxWidth = '1000px';

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '30px',
} as const;

export const size = [
  0,
  '2px',
  '4px',
  '8px',
  '12px',
  '16px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px',
  '44px',
  '48px',
] as const;


export const typography = {
  fontFamily: {
    primary: "'Space Mono', monospace",
  },
  fontSize: [
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
  ] as const,
  lineHeight: {
    normal: 1.4,
    relaxed: 1.5,
  },
} as const;

export const layout = {
  borderRadius: '4px',
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    ease: 'ease',
    linear: 'linear',
  },
} as const; 