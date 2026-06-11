export type Role = 'admin' | 'member';
export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'announcement';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface UserProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  profilePhoto?: string;
  role?: Role;
  createdAt: number;
}

export interface Family {
  familyId: string;
  familyName: string;
  familyPhoto?: string;
  inviteCode: string;
  createdBy: string;
  createdAt: number;
  memberCount: number;
}

export interface FamilyMember {
  userId: string;
  familyId: string;
  role: Role;
  joinedAt: number;
  displayName: string;
  photoURL?: string;
}

export interface Chat {
  chatId: string;
  familyId: string;
  type: 'direct' | 'family';
  participantIds: string[];
  title?: string;
  photoURL?: string;
  lastMessage?: Pick<Message, 'messageId' | 'text' | 'type' | 'senderId' | 'createdAt'>;
  pinnedMessageId?: string;
  updatedAt: number;
}

export interface Message {
  messageId: string;
  chatId: string;
  familyId: string;
  senderId: string;
  type: MessageType;
  text?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  voiceDurationMs?: number;
  reactions?: Record<string, string>;
  readBy: Record<string, number>;
  deliveredTo: Record<string, number>;
  status: MessageStatus;
  createdAt: number;
}

export interface FamilyEvent {
  eventId: string;
  familyId: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'event' | 'birthday' | 'reminder';
  createdBy: string;
  createdAt: number;
  reminderAt?: number;
}

export interface Expense {
  expenseId: string;
  familyId: string;
  title: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
  createdAt: number;
}

export interface LiveLocation {
  familyId: string;
  userId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  updatedAt: number;
  sharingEnabled: boolean;
}
