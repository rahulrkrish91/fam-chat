import { Chat, Expense, Family, FamilyEvent, LiveLocation, Message, Role } from '@/domain/entities/models';

export interface IFamilyRepository {
  createFamily(userId: string, familyName: string, familyPhoto?: string): Promise<Family>;
  joinFamily(userId: string, inviteCode: string, displayName: string): Promise<Family>;
  updateMemberRole(familyId: string, userId: string, role: Role): Promise<void>;
}

export interface IChatRepository {
  listenToChatList(familyId: string, onChange: (chats: Chat[]) => void): () => void;
  listenToLatestMessages(chatId: string, onChange: (messages: Message[]) => void): () => void;
  sendMessage(input: Omit<Message, 'messageId' | 'createdAt' | 'status' | 'readBy' | 'deliveredTo'>): Promise<Message>;
}

export interface ICalendarRepository {
  createEvent(event: Omit<FamilyEvent, 'eventId' | 'createdAt'>): Promise<FamilyEvent>;
  upcoming(familyId: string): Promise<FamilyEvent[]>;
}

export interface IExpenseRepository {
  createExpense(expense: Omit<Expense, 'expenseId' | 'createdAt'>): Promise<Expense>;
  listFamilyExpenses(familyId: string): Promise<Expense[]>;
}

export interface ILocationRepository {
  updateLatest(location: LiveLocation): Promise<void>;
  listenActive(familyId: string, onChange: (locations: LiveLocation[]) => void): () => void;
}
