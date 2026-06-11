import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { List, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useChatList } from '@/features/chat/hooks/useChat';
import { RootStackParamList } from '@/app/navigation/types';

export function ChatListScreen() {
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const chats = useChatList(familyId);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Screen>
      <Text variant="headlineMedium">Chats</Text>
      {chats.map((chat) => (
        <List.Item key={chat.chatId} title={chat.title ?? 'Family chat'} description={chat.lastMessage?.text ?? 'No messages yet'} onPress={() => navigation.navigate('ChatScreen', { chatId: chat.chatId, title: chat.title ?? 'Chat' })} />
      ))}
    </Screen>
  );
}
