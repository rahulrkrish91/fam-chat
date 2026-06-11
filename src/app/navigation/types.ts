export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  CreateFamily: undefined;
  JoinFamily: { code?: string } | undefined;
  MainTabs: undefined;
  ChatScreen: { chatId: string; title: string };
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chats: undefined;
  Calendar: undefined;
  Expenses: undefined;
  Location: undefined;
  Settings: undefined;
};
