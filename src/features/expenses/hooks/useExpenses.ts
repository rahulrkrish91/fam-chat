import { useQuery } from '@tanstack/react-query';
import { expenseRepository } from '@/data/repositories/expenseRepository';
import { calculateBalances } from '@/core/utils/expenseMath';

export function useExpenses(familyId?: string) {
  const query = useQuery({ queryKey: ['expenses', familyId], queryFn: () => expenseRepository.listFamilyExpenses(familyId!), enabled: Boolean(familyId) });
  return { ...query, total: query.data?.reduce((sum, item) => sum + item.amount, 0) ?? 0, balances: calculateBalances(query.data ?? []) };
}
