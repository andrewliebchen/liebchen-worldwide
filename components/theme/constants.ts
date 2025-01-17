export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '30px',
} as const;

export const typography = {
  fontFamily: {
    primary: "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
  },
  lineHeight: {
    normal: 1.4,
    relaxed: 1.5,
  },
} as const;

export const layout = {
  borderRadius: '4px',
  headerHeight: '40px',
  avatarSize: '24px',
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