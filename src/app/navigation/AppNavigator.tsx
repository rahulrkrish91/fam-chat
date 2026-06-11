import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { RootStackParamList, MainTabParamList } from '@/app/navigation/types';
import { SplashScreen } from '@/features/auth/screens/SplashScreen';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { CreateFamilyScreen } from '@/features/family/screens/CreateFamilyScreen';
import { JoinFamilyScreen } from '@/features/family/screens/JoinFamilyScreen';
import { HomeDashboardScreen } from '@/features/home/screens/HomeDashboardScreen';
import { ChatListScreen } from '@/features/chat/screens/ChatListScreen';
import { ChatScreen } from '@/features/chat/screens/ChatScreen';
import { CalendarScreen } from '@/features/calendar/screens/CalendarScreen';
import { ExpensesScreen } from '@/features/expenses/screens/ExpensesScreen';
import { LocationScreen } from '@/features/location/screens/LocationScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'kinly://'],
  config: { screens: { JoinFamily: 'join/:code', ChatScreen: 'chat/:chatId', MainTabs: '' } },
};

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="Home" component={HomeDashboardScreen} />
      <Tabs.Screen name="Chats" component={ChatListScreen} />
      <Tabs.Screen name="Calendar" component={CalendarScreen} />
      <Tabs.Screen name="Expenses" component={ExpensesScreen} />
      <Tabs.Screen name="Location" component={LocationScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateFamily" component={CreateFamilyScreen} />
        <Stack.Screen name="JoinFamily" component={JoinFamilyScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
