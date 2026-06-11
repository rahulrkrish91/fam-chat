import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { familyRepository } from '@/data/repositories/familyRepository';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';

export function CreateFamilyScreen() {
  const [name, setName] = useState('');
  const uid = useAuthStore((state) => state.uid);
  const setActiveFamilyId = useAuthStore((state) => state.setActiveFamilyId);
  const create = async () => {
    if (!uid || !name.trim()) return;
    const family = await familyRepository.createFamily(uid, name.trim());
    setActiveFamilyId(family.familyId);
  };
  return <Screen><Text variant="headlineMedium">Create your family</Text><TextInput label="Family name" value={name} onChangeText={setName} /><Button mode="contained" onPress={create}>Create Family</Button></Screen>;
}
