import { create } from 'zustand';

type ColorScheme = 'light' | 'dark';

interface ThemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'light',
  setColorScheme: (colorScheme) => set({ colorScheme }),
  toggleTheme: () => set((state) => ({ colorScheme: state.colorScheme === 'dark' ? 'light' : 'dark' })),
}));
