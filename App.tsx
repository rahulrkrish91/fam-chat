import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from '@/app/navigation/AppNavigator';
import { queryClient } from '@/core/config/queryClient';
import { useThemeStore } from '@/features/settings/hooks/useThemeStore';
import { buildTheme } from '@/presentation/theme/theme';

export default function App() {
  const colorScheme = useThemeStore((state) => state.colorScheme);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <PaperProvider theme={buildTheme(colorScheme)}>
            <AppNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
