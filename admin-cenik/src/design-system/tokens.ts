/**
 * Design System – token constants for use in JS/TS
 */

export const colors = {
  primary: '#C91617',
  primaryHover: '#A91214',
  accent: '#1B3C98',
  accentSoft: 'rgba(27, 60, 152, 0.1)',
  success: '#09924C',
  successSoft: 'rgba(9, 146, 76, 0.2)',
  danger: '#C91617',
  text: '#000000',
  textStrong: '#0F172A',
  textMuted: '#65758b',
  textDisabled: '#9CA3AF',
  bgBody: '#f8f9fa',
  bgSurface: '#ffffff',
  bgSurfaceSoft: '#F9FAFD',
  bgChip: '#eef0f8',
  bgChipHover: '#e2e5f0',
  borderDivider: '#E1E7EF',
  borderStrong: '#E2E6F0',
} as const

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 40,
  8: 48,
  10: 72,
  12: 96,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 32,
  full: 9999,
} as const

export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  max: 2147483647,
} as const

export const typography = {
  fontPrimary: '"Open Sans", system-ui, -apple-system, sans-serif',
  fontSecondary: 'Inter, system-ui, -apple-system, sans-serif',
  h1: { size: 36, weight: 600, lineHeight: 1.3 },
  h2: { size: 28, weight: 600, lineHeight: 1.3 },
  h3: { size: 20, weight: 600, lineHeight: 1.3 },
  title: { size: 18, weight: 600, lineHeight: 1.3 },
  body: { size: 16, weight: 400, lineHeight: 24 },
  bodySm: { size: 14, weight: 400, lineHeight: 24 },
  label: { size: 12, weight: 400, lineHeight: 16 },
  badge: { size: 10, weight: 900 },
  badgeSm: { size: 12, weight: 900 },
} as const
