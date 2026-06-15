import { useEffect, useState } from 'react';
import { locationRepository } from '@/data/repositories/locationRepository';
import { LiveLocation } from '@/domain/entities/models';

export function useLiveLocations(familyId?: string) {
  const [locations, setLocations] = useState<LiveLocation[]>([]);
  useEffect(() => {
    if (!familyId) return undefined;
    return locationRepository.listenActive(familyId, setLocations);
  }, [familyId]);
  return locations;
}
