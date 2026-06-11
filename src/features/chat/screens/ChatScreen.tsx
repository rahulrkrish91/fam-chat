import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '@/app/navigation/types';
import { chatRepository } from '@/data/repositories/chatRepository';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useMessages } from '@/features/chat/hooks/useChat';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

export function ChatScreen({ route }: Props) {
  const [text, setText] = useState('');
  const uid = useAuthStore((state) => state.uid);
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const messages = useMessages(route.params.chatId);
  const send = async () => {
    if (!uid || !familyId || !text.trim()) return;
    await chatRepository.sendMessage({ chatId: route.params.chatId, familyId, senderId: uid, type: 'text', text: text.trim() });
    setText('');
  };
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={({ item }) => <Text style={{ alignSelf: item.senderId === uid ? 'flex-end' : 'flex-start', margin: 8 }}>{item.text ?? item.type}</Text>}
      />
      <TextInput label="Message" value={text} onChangeText={setText} onFocus={() => uid && chatRepository.setTyping(route.params.chatId, uid, true)} onBlur={() => uid && chatRepository.setTyping(route.params.chatId, uid, false)} />
      <Button mode="contained" onPress={send}>Send</Button>
    </View>
  );
}
