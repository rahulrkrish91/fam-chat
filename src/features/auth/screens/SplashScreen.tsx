import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { RootStackParamList } from '@/app/navigation/types';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { hydrated, uid } = useAuthStore();
  useEffect(() => {
    if (!hydrated) return;
    navigation.replace(uid ? 'MainTabs' : 'Login');
  }, [hydrated, navigation, uid]);
  return <Screen><Text variant="displaySmall">Kinly</Text><Text>Private family connection.</Text><ActivityIndicator /></Screen>;
}
