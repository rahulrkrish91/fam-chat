import { Expense } from '@/domain/entities/models';

export interface BalanceLine { from: string; to: string; amount: number }

export function calculateBalances(expenses: Expense[]): BalanceLine[] {
  const net = new Map<string, number>();
  expenses.forEach((expense) => {
    const share = expense.amount / Math.max(expense.participants.length, 1);
    net.set(expense.paidBy, (net.get(expense.paidBy) ?? 0) + expense.amount - share);
    expense.participants.filter((id) => id !== expense.paidBy).forEach((id) => net.set(id, (net.get(id) ?? 0) - share));
  });
  const creditors = [...net.entries()].filter(([, value]) => value > 0.01);
  const debtors = [...net.entries()].filter(([, value]) => value < -0.01).map(([id, value]) => [id, -value] as [string, number]);
  const result: BalanceLine[] = [];
  for (const [debtor, debt] of debtors) {
    let remaining = debt;
    for (const creditor of creditors) {
      if (remaining <= 0.01 || creditor[1] <= 0.01) continue;
      const amount = Math.min(remaining, creditor[1]);
      result.push({ from: debtor, to: creditor[0], amount: Number(amount.toFixed(2)) });
      remaining -= amount;
      creditor[1] -= amount;
    }
  }
  return result;
}
