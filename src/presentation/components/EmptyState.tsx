import React from 'react';
import { Text } from 'react-native-paper';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return <Text variant="bodyLarge">{title}\n{body}</Text>;
}
