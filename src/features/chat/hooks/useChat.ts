import { useEffect, useState } from 'react';
import { chatRepository } from '@/data/repositories/chatRepository';
import { Chat, Message } from '@/domain/entities/models';

export function useChatList(familyId?: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    if (!familyId) return undefined;
    return chatRepository.listenToChatList(familyId, setChats);
  }, [familyId]);
  return chats;
}

export function useMessages(chatId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!chatId) return undefined;
    let unsubscribe: undefined | (() => void);
    chatRepository.getCachedMessages(chatId).then(setMessages);
    unsubscribe = chatRepository.listenToLatestMessages(chatId, setMessages);
    return () => unsubscribe?.();
  }, [chatId]);
  return messages;
}
