import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '@/domain/entities/models';

const key = (chatId: string) => `kinly:messages:${chatId}`;

export async function readCachedMessages(chatId: string): Promise<Message[]> {
  const raw = await AsyncStorage.getItem(key(chatId));
  return raw ? (JSON.parse(raw) as Message[]) : [];
}

export async function writeCachedMessages(chatId: string, messages: Message[]) {
  await AsyncStorage.setItem(key(chatId), JSON.stringify(messages.slice(0, 50)));
}
