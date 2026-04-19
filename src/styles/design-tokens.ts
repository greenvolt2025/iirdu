/**
 * Design Tokens for RD4U Platform
 * Centralized design system values for consistency across components
 */

export const designTokens = {
  // Spacing scale (rem)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },

  // Border radius
  borderRadius: {
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px - buttons, inputs
    lg: '1rem',       // 16px - cards
    xl: '1.5rem',     // 24px - large cards
    '2xl': '2rem',    // 32px
    full: '9999px',   // pills
  },

  // Typography scale
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },

  // Line heights
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Transitions
  transition: {
    fast: '150ms ease',
    base: '300ms ease',
    slow: '500ms ease',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(10, 31, 68, 0.05)',
    md: '0 4px 6px -1px rgba(10, 31, 68, 0.1)',
    lg: '0 10px 15px -3px rgba(10, 31, 68, 0.1)',
    xl: '0 20px 25px -5px rgba(10, 31, 68, 0.1)',
    '2xl': '0 25px 50px -12px rgba(10, 31, 68, 0.25)',
    gold: '0 10px 25px -5px rgba(212, 175, 55, 0.3)',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },

  // Breakpoints (matches Tailwind defaults)
  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Icon sizes
  iconSize: {
    xs: '0.875rem',  // 14px
    sm: '1rem',      // 16px
    md: '1.25rem',   // 20px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },

  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
} as const;

/**
 * Accessibility-focused color tokens
 * These colors meet WCAG 2.1 AA standards for contrast
 */
export const accessibleColors = {
  // Text on white background
  textOnWhite: {
    primary: '#0A1F44',      // navy-900 - AAA
    secondary: '#475569',    // slate-600 - AA
    tertiary: '#64748b',     // slate-500 - AA (large text)
    goldAccent: '#B8860B',   // gold-600 - AA
  },

  // Text on dark background
  textOnDark: {
    primary: '#ffffff',      // white - AAA
    secondary: '#cbd5e1',    // slate-300 - AA
    tertiary: '#94a3b8',     // slate-400 - AA (large text)
    goldAccent: '#E5C158',   // gold-400 - AA
  },
} as const;

/**
 * Component-specific tokens
 */
export const componentTokens = {
  button: {
    height: {
      sm: '2rem',      // 32px
      md: '2.5rem',    // 40px
      lg: '3rem',      // 48px
      xl: '3.5rem',    // 56px
    },
    padding: {
      sm: '0.75rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
      xl: '1.25rem 2.5rem',
    },
  },

  input: {
    height: {
      sm: '2rem',
      md: '2.75rem',   // 44px - better for mobile touch
      lg: '3rem',
    },
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
  },
} as const;
