import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useChatList } from '@/features/chat/hooks/useChat';
import { useUpcomingEvents } from '@/features/calendar/hooks/useEvents';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';
import { useLiveLocations } from '@/features/location/hooks/useLiveLocations';

export function HomeDashboardScreen() {
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const chats = useChatList(familyId);
  const events = useUpcomingEvents(familyId);
  const expenses = useExpenses(familyId);
  const locations = useLiveLocations(familyId);
  return (
    <Screen>
      <Text variant="headlineMedium">Home</Text>
      <Card><Card.Title title="Recent chats" subtitle={`${chats.length} active conversations`} /></Card>
      <Card><Card.Title title="Upcoming events" subtitle={`${events.data?.length ?? 0} reminders and birthdays`} /></Card>
      <Card><Card.Title title="Shared expenses" subtitle={`$${expenses.total.toFixed(2)} total tracked`} /></Card>
      <Card><Card.Title title="Active locations" subtitle={`${locations.length} family members sharing`} /></Card>
    </Screen>
  );
}
