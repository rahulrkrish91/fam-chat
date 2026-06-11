import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { Screen } from '@/presentation/components/Screen';
import { db } from '@/data/firebase/firebase';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';

export function ProfileScreen() {
  const profile = useAuthStore((state) => state.profile);
  const uid = useAuthStore((state) => state.uid);
  const [fullName, setFullName] = useState(profile?.fullName ?? '');
  const save = async () => { if (uid) await updateDoc(doc(db, 'users', uid), { fullName }); };
  return <Screen><Text variant="headlineMedium">Profile</Text><TextInput label="Full name" value={fullName} onChangeText={setFullName} /><Text>{profile?.phoneNumber}</Text><Button mode="contained" onPress={save}>Save</Button></Screen>;
}
