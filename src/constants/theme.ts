import { BorderRadius, ColorPalette, Shadows, Spacing, Typography } from '@/theme/types';

export const BORDER_RADIUS: BorderRadius = {
  xs: 8,
  s: 10,
  m: 12,
  l: 16,
  xl: 24,
  full: 9999,
};

export const SPACING: Spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const SHADOWS: Shadows = {
  xs: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
};

// Swap in custom brand fonts by installing an @expo-google-fonts/* package (or
// local font files) and loading them with useFonts() in app/_layout.tsx, then
// point these entries at the loaded family names. Left undefined here so the
// template renders with the OS default font out of the box.
export const FONT_FAMILY = {
  regular: undefined as string | undefined,
  medium: undefined as string | undefined,
  bold: undefined as string | undefined,
};

export const TYPOGRAPHY: Typography = {
  h1: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  h2: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
  },
  label: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
};

// Brand-neutral placeholder palette — swap every value here for your own
// brand colors. Structure (which tokens exist) is the reusable part.
export const LIGHT_PALETTE: ColorPalette = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F2F4F7',
  border: 'rgba(0, 0, 0, 0.08)',
  borderStrong: '#D0D5DD',
  overlay: 'rgba(0, 0, 0, 0.5)',

  textPrimary: '#101828',
  textSecondary: '#667085',
  textTertiary: '#475467',
  textInverse: '#FFFFFF',
  textDisabled: '#D0D5DD',

  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF4FF',

  accent: '#7C3AED',
  accentLight: '#F4F0FE',

  success: '#12B76A',
  successLight: '#ECFDF3',

  error: '#F04438',
  errorLight: '#FEF3F2',

  info: '#0EA5E9',
  infoLight: '#F0F9FF',

  warning: '#B54708',
  warningLight: '#FFFAEB',
  warningBorder: '#FEDF89',

  white: '#FFFFFF',
  black: '#000000',
};

export const DARK_PALETTE: ColorPalette | null = null;
