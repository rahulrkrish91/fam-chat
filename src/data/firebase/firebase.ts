import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyBQYfiEFKkd-9PtwGBiN9WKZri_hYsCYrA',
  authDomain: 'dental-apps-77834.firebaseapp.com',
  projectId: 'dental-apps-77834',
  storageBucket: 'dental-apps-77834.firebasestorage.app',
  messagingSenderId: '1023648881577',
  appId: '1:1023648881577:web:cf357e7d25ff46b55242b8',
  measurementId: 'G-E2N5BL05JL',
};

export const firebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    return getAuth(firebaseApp);
  }
})();

export const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const storage = getStorage(firebaseApp);
