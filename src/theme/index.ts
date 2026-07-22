import { useThemeStore } from '@/theme/theme-store';
import type { Theme } from '@/theme/types';

export function useTheme(): Theme {
  return useThemeStore((state) => state.theme);
}

export { useThemeStore } from '@/theme/theme-store';
export type { Theme, ColorPalette, Mode } from '@/theme/types';
