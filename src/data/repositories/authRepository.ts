import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, User, signInWithCredential, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '@/data/firebase/firebase';
import { UserProfile } from '@/domain/entities/models';

export { FirebaseRecaptchaVerifierModal, firebaseConfig };

export class AuthRepository {
  async sendOtp(phoneNumber: string, recaptchaVerifier: FirebaseRecaptchaVerifierModal) {
    return new PhoneAuthProvider(auth).verifyPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  async confirmOtp(verificationId: string, otp: string) {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    return signInWithCredential(auth, credential);
  }

  async ensureProfile(user: User, fullName?: string) {
    const profileRef = doc(db, 'users', user.uid);
    const existing = await getDoc(profileRef);
    if (!existing.exists()) {
      const profile: UserProfile = {
        id: user.uid,
        fullName: fullName ?? user.displayName ?? 'Kinly Member',
        phoneNumber: user.phoneNumber ?? '',
        createdAt: Date.now(),
      };
      if (user.photoURL) profile.profilePhoto = user.photoURL;
      await setDoc(profileRef, { ...profile, createdAtServer: serverTimestamp() });
      return profile;
    }
    return existing.data() as UserProfile;
  }

  logout() {
    return signOut(auth);
  }
}

export const authRepository = new AuthRepository();
