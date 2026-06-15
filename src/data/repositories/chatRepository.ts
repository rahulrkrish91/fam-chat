import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter, updateDoc, where, writeBatch, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';
import { Chat, Message } from '@/domain/entities/models';
import { readCachedMessages, writeCachedMessages } from '@/data/storage/localMessageCache';

const PAGE_SIZE = 20;

export class ChatRepository {
  listenToChatList(familyId: string, onChange: (chats: Chat[]) => void) {
    return onSnapshot(
      query(collection(db, 'chats'), where('familyId', '==', familyId), orderBy('updatedAt', 'desc'), limit(50)),
      (snapshot) => onChange(snapshot.docs.map((item) => item.data() as Chat)),
    );
  }

  listenToLatestMessages(chatId: string, onChange: (messages: Message[]) => void) {
    return onSnapshot(
      query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'), limit(PAGE_SIZE)),
      async (snapshot) => {
        const messages = snapshot.docs.map((item) => item.data() as Message).reverse();
        await writeCachedMessages(chatId, messages);
        onChange(messages);
      },
    );
  }

  async getCachedMessages(chatId: string) {
    return readCachedMessages(chatId);
  }

  async getOlderMessages(chatId: string, cursor?: QueryDocumentSnapshot<DocumentData>) {
    const constraints = cursor
      ? [orderBy('createdAt', 'desc'), startAfter(cursor), limit(PAGE_SIZE)]
      : [orderBy('createdAt', 'desc'), limit(PAGE_SIZE)];
    const snapshot = await getDocs(query(collection(db, 'chats', chatId, 'messages'), ...constraints));
    return { messages: snapshot.docs.map((item) => item.data() as Message).reverse(), cursor: snapshot.docs.at(-1) };
  }

  async sendMessage(input: Omit<Message, 'messageId' | 'createdAt' | 'status' | 'readBy' | 'deliveredTo'>) {
    const messageRef = doc(collection(db, 'chats', input.chatId, 'messages'));
    const message: Message = { ...input, messageId: messageRef.id, createdAt: Date.now(), status: 'sent', readBy: { [input.senderId]: Date.now() }, deliveredTo: {} };
    const batch = writeBatch(db);
    batch.set(messageRef, { ...message, createdAtServer: serverTimestamp() });
    batch.update(doc(db, 'chats', input.chatId), {
      lastMessage: { messageId: message.messageId, text: message.text ?? '', type: message.type, senderId: message.senderId, createdAt: message.createdAt },
      updatedAt: message.createdAt,
    });
    await batch.commit();
    return message;
  }

  markRead(chatId: string, messageId: string, userId: string) {
    return updateDoc(doc(db, 'chats', chatId, 'messages', messageId), { [`readBy.${userId}`]: Date.now(), status: 'read' });
  }

  setTyping(chatId: string, userId: string, isTyping: boolean) {
    return updateDoc(doc(db, 'chats', chatId), { [`typing.${userId}`]: isTyping ? Date.now() : null });
  }
}

export const chatRepository = new ChatRepository();
