import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';
import { FamilyEvent } from '@/domain/entities/models';

export class CalendarRepository {
  async createEvent(event: Omit<FamilyEvent, 'eventId' | 'createdAt'>) {
    const ref = await addDoc(collection(db, 'events'), { ...event, createdAt: Date.now(), createdAtServer: serverTimestamp() });
    return { ...event, eventId: ref.id, createdAt: Date.now() };
  }

  async upcoming(familyId: string) {
    const snapshot = await getDocs(query(collection(db, 'events'), where('familyId', '==', familyId), orderBy('date'), limit(30)));
    return snapshot.docs.map((item) => ({ eventId: item.id, ...item.data() }) as FamilyEvent);
  }
}

export const calendarRepository = new CalendarRepository();
