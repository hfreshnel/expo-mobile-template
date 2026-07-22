import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import light from '@/theme/light';
import type { Mode, Theme } from '@/theme/types';

// Dark mode intentionally deferred: DARK_PALETTE is null in constants/theme.ts
// until you've filled it in. Add a `dark.ts` mirroring `light.ts` and swap it
// in below once it exists — treat it as its own feature, not a day-one
// requirement.
const THEMES: Record<Mode, Theme> = {
  light,
  dark: light,
};

type ThemeState = {
  mode: Mode;
  theme: Theme;
  setMode: (mode: Mode) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      theme: THEMES.light,
      setMode: (mode) => set({ mode, theme: THEMES[mode] }),
    }),
    {
      name: 'app_theme', // AsyncStorage key — rename to your app's slug if you like
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        state?.setMode(state.mode);
      },
    },
  ),
);
