import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '@/data/firebase/firebase';
import { Expense } from '@/domain/entities/models';

export class ExpenseRepository {
  async createExpense(expense: Omit<Expense, 'expenseId' | 'createdAt'>) {
    const ref = await addDoc(collection(db, 'expenses'), { ...expense, createdAt: Date.now(), createdAtServer: serverTimestamp() });
    return { ...expense, expenseId: ref.id, createdAt: Date.now() };
  }

  async listFamilyExpenses(familyId: string) {
    const snapshot = await getDocs(query(collection(db, 'expenses'), where('familyId', '==', familyId), orderBy('date', 'desc'), limit(100)));
    return snapshot.docs.map((item) => ({ expenseId: item.id, ...item.data() }) as Expense);
  }
}

export const expenseRepository = new ExpenseRepository();
