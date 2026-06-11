import React, { useState } from 'react';
import * as Location from 'expo-location';
import { Button, List, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { locationRepository } from '@/data/repositories/locationRepository';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useLiveLocations } from '@/features/location/hooks/useLiveLocations';

export function LocationScreen() {
  const [sharing, setSharing] = useState(false);
  const uid = useAuthStore((state) => state.uid);
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const locations = useLiveLocations(familyId);
  const toggle = async () => {
    if (!uid || !familyId) return;
    if (!sharing) {
      await Location.requestForegroundPermissionsAsync();
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const latest = { familyId, userId: uid, latitude: current.coords.latitude, longitude: current.coords.longitude, updatedAt: Date.now(), sharingEnabled: true };
      await locationRepository.updateLatest(current.coords.accuracy ? { ...latest, accuracy: current.coords.accuracy } : latest);
      setSharing(true);
    } else {
      await locationRepository.updateLatest({ familyId, userId: uid, latitude: 0, longitude: 0, updatedAt: Date.now(), sharingEnabled: false });
      setSharing(false);
    }
  };
  return <Screen><Text variant="headlineMedium">Location</Text><Button mode="contained" onPress={toggle}>{sharing ? 'Disable sharing' : 'Enable live location'}</Button><Button mode="contained-tonal">Reached Home</Button>{locations.map((item) => <List.Item key={item.userId} title={item.userId} description={`${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`} />)}</Screen>;
}
