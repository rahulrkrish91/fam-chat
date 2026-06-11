import { onAuthStateChanged } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '@/data/firebase/firebase';
import { UserProfile } from '@/domain/entities/models';

interface AuthState {
  uid?: string;
  profile?: UserProfile;
  hydrated: boolean;
  activeFamilyId?: string;
  setProfile: (profile?: UserProfile) => void;
  setActiveFamilyId: (familyId?: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hydrated: false,
  setProfile: (profile) => set({ profile, uid: profile?.id }),
  setActiveFamilyId: (activeFamilyId) => set({ activeFamilyId }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ uid: user?.uid, hydrated: true });
});
