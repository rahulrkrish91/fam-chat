import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';
import { LiveLocation } from '@/domain/entities/models';

export class LocationRepository {
  updateLatest(location: LiveLocation) {
    return setDoc(doc(db, 'locations', `${location.familyId}_${location.userId}`), location, { merge: true });
  }

  listenActive(familyId: string, onChange: (locations: LiveLocation[]) => void) {
    return onSnapshot(query(collection(db, 'locations'), where('familyId', '==', familyId), where('sharingEnabled', '==', true)), (snapshot) => {
      onChange(snapshot.docs.map((item) => item.data() as LiveLocation));
    });
  }
}

export const locationRepository = new LocationRepository();
