import { useQuery } from '@tanstack/react-query';
import { calendarRepository } from '@/data/repositories/calendarRepository';

export const useUpcomingEvents = (familyId?: string) => useQuery({
  queryKey: ['events', familyId],
  queryFn: () => calendarRepository.upcoming(familyId!),
  enabled: Boolean(familyId),
});
