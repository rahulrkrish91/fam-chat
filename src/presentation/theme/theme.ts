import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const buildTheme = (scheme: 'light' | 'dark') => ({
  ...(scheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
  roundness: 18,
  colors: {
    ...(scheme === 'dark' ? MD3DarkTheme.colors : MD3LightTheme.colors),
    primary: '#6C63FF',
    secondary: '#FFB4A2',
    tertiary: '#63C7B2',
  },
});
