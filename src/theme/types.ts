import { TextStyle } from 'react-native';

export type BorderRadius = {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  full: number;
};

export type ColorPalette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderStrong: string;
  overlay: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textDisabled: string;

  primary: string;
  primaryDark: string;
  primaryLight: string;

  accent: string;
  accentLight: string;

  success: string;
  successLight: string;

  error: string;
  errorLight: string;

  info: string;
  infoLight: string;

  warning: string;
  warningLight: string;
  warningBorder: string;

  white: string;
  black: string;
};

export type Mode = 'light' | 'dark';

export type Shadows = {
  xs: object;
  sm: object;
  md: object;
  lg: object;
};

export type Spacing = {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type Typography = {
  h1: TextStyle;
  h2: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  label: TextStyle;
};

export type Theme = {
  mode: Mode;
  colors: ColorPalette;
  spacing: Spacing;
  borderRadius: BorderRadius;
  typography: Typography;
  shadows: Shadows;
};
