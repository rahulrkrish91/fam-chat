import React, { useState } from 'react';
import { List, Searchbar, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  return <Screen><Text variant="headlineMedium">Search</Text><Searchbar placeholder="Members, messages, events" value={query} onChangeText={setQuery} /><List.Item title="Search is scoped to your active family" description="Use Firestore indexed queries or server-side Algolia when message volume grows." /></Screen>;
}
