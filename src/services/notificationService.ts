import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: true }),
});

export async function registerForPushNotifications(userId: string) {
  if (!Device.isDevice) return undefined;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  const finalStatus = existingStatus === 'granted' ? existingStatus : (await Notifications.requestPermissionsAsync()).status;
  if (finalStatus !== 'granted') return undefined;
  await messaging().registerDeviceForRemoteMessages();
  const fcmToken = await messaging().getToken();
  await setDoc(doc(db, 'users', userId, 'devices', fcmToken), { fcmToken, updatedAt: Date.now() }, { merge: true });
  return fcmToken;
}

export function onForegroundNotification(handler: (message: unknown) => void) {
  return messaging().onMessage(handler);
}
