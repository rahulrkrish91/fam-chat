import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export function Screen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const theme = useTheme();
  const content = <View style={styles.content}>{children}</View>;
  if (!scroll) return <View style={[styles.container, { backgroundColor: theme.colors.background }]}>{content}</View>;
  return <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>{content}</ScrollView>;
}

const styles = StyleSheet.create({ container: { flex: 1 }, content: { gap: 16, padding: 20 } });
