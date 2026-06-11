import React from 'react';
import { Button, List, Text } from 'react-native-paper';
import { Screen } from '@/presentation/components/Screen';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';

export function ExpensesScreen() {
  const familyId = useAuthStore((state) => state.activeFamilyId);
  const { data, total, balances } = useExpenses(familyId);
  return <Screen><Text variant="headlineMedium">Expenses</Text><Text>Total spent: ${total.toFixed(2)}</Text><Button mode="contained-tonal">Add expense</Button>{data?.map((expense) => <List.Item key={expense.expenseId} title={expense.title} description={`$${expense.amount.toFixed(2)}`} />)}{balances.map((line) => <Text key={`${line.from}-${line.to}`}>{line.from} owes {line.to} ${line.amount}</Text>)}</Screen>;
}
