import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { familyRepository } from '@/data/repositories/familyRepository';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';

export function JoinFamilyScreen() {
  const [code, setCode] = useState('');
  const uid = useAuthStore((state) => state.uid);
  const profile = useAuthStore((state) => state.profile);
  const setActiveFamilyId = useAuthStore((state) => state.setActiveFamilyId);
  const join = async () => {
    if (!uid) return;
    const family = await familyRepository.joinFamily(uid, code, profile?.fullName ?? 'Kinly Member');
    setActiveFamilyId(family.familyId);
  };
  return <Screen><Text variant="headlineMedium">Join a family</Text><TextInput label="Invite code" value={code} onChangeText={setCode} autoCapitalize="characters" /><Button mode="contained" onPress={join}>Join Family</Button></Screen>;
}
