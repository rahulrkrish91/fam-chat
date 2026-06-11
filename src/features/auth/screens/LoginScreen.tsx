import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Button, Text, TextInput } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { authRepository, firebaseConfig } from '@/data/repositories/authRepository';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';

export function LoginScreen() {
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<string>();
  const setProfile = useAuthStore((state) => state.setProfile);

  const sendOtp = async () => setVerificationId(await authRepository.sendOtp(phone, recaptchaVerifier.current!));
  const verify = async () => {
    if (!verificationId) return;
    const credential = await authRepository.confirmOtp(verificationId, otp);
    setProfile(await authRepository.ensureProfile(credential.user));
  };

  return (
    <Screen>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text variant="headlineMedium">Welcome to Kinly</Text>
      <Text>Sign in securely with your phone number and one-time passcode.</Text>
      <TextInput label="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+15551234567" />
      {verificationId ? <TextInput label="OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" /> : null}
      <Button mode="contained" onPress={verificationId ? verify : sendOtp}>{verificationId ? 'Verify OTP' : 'Send OTP'}</Button>
    </Screen>
  );
}
