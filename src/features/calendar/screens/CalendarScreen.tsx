import React from 'react';
import { Button, List, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useUpcomingEvents } from '@/features/calendar/hooks/useEvents';

export function CalendarScreen() {
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const events = useUpcomingEvents(familyId);
  return <Screen><Text variant="headlineMedium">Calendar</Text><Button mode="contained-tonal">Create event</Button>{events.data?.map((event) => <List.Item key={event.eventId} title={event.title} description={`${event.date} ${event.time ?? ''}`} />)}</Screen>;
}
