import { collection, doc, getDocs, limit, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';
import { Family, FamilyMember, Role } from '@/domain/entities/models';
import { createInviteCode } from '@/core/utils/inviteCode';

export class FamilyRepository {
  async createFamily(userId: string, familyName: string, familyPhoto?: string) {
    const familyRef = doc(collection(db, 'families'));
    const family: Family = { familyId: familyRef.id, familyName, inviteCode: createInviteCode(), createdBy: userId, createdAt: Date.now(), memberCount: 1 };
    if (familyPhoto) family.familyPhoto = familyPhoto;
    const member: FamilyMember = { userId, familyId: familyRef.id, role: 'admin', joinedAt: Date.now(), displayName: 'Admin' };
    const batch = writeBatch(db);
    batch.set(familyRef, { ...family, createdAtServer: serverTimestamp() });
    batch.set(doc(db, 'families', familyRef.id, 'familyMembers', userId), member);
    batch.set(doc(db, 'users', userId, 'families', familyRef.id), { familyId: familyRef.id, role: 'admin', joinedAt: Date.now() });
    await batch.commit();
    return family;
  }

  async joinFamily(userId: string, inviteCode: string, displayName: string) {
    const matches = await getDocs(query(collection(db, 'families'), where('inviteCode', '==', inviteCode.trim().toUpperCase()), limit(1)));
    if (matches.empty) throw new Error('Invalid invite code');
    const family = matches.docs[0]!;
    const member: FamilyMember = { userId, familyId: family.id, role: 'member', joinedAt: Date.now(), displayName };
    const batch = writeBatch(db);
    batch.set(doc(db, 'families', family.id, 'familyMembers', userId), member);
    batch.set(doc(db, 'users', userId, 'families', family.id), { familyId: family.id, role: 'member', joinedAt: Date.now() });
    batch.update(family.ref, { memberCount: (family.data().memberCount ?? 0) + 1 });
    await batch.commit();
    return family.data() as Family;
  }

  listMyFamilies(userId: string) {
    return getDocs(collection(db, 'users', userId, 'families'));
  }

  updateMemberRole(familyId: string, userId: string, role: Role) {
    return updateDoc(doc(db, 'families', familyId, 'familyMembers', userId), { role });
  }

  removeMember(familyId: string, userId: string) {
    return setDoc(doc(db, 'families', familyId, 'familyMembers', userId), { removedAt: Date.now() }, { merge: true });
  }
}

export const familyRepository = new FamilyRepository();
