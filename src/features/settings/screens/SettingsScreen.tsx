import React from 'react';
import { Button, List, Switch, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { authRepository } from '@/data/repositories/authRepository';
import { useThemeStore } from '@/features/settings/hooks/useThemeStore';

export function SettingsScreen() {
  const { colorScheme, toggleTheme } = useThemeStore();
  return <Screen><Text variant="headlineMedium">Settings</Text><List.Item title="Dark mode" right={() => <Switch value={colorScheme === 'dark'} onValueChange={toggleTheme} />} /><List.Item title="Notification preferences" description="Only important family updates" /><List.Item title="Privacy settings" description="Family-only data access" /><Button mode="contained-tonal" onPress={() => authRepository.logout()}>Logout</Button></Screen>;
}
