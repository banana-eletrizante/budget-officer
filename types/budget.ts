export type EntryType = "income" | "expense";

export interface BudgetEntry {
  id: string;
  description: string;
  amount: number;
  category?: string;
}

export interface BudgetData {
  income: BudgetEntry[];
  expenses: BudgetEntry[];
  updatedAt?: number;
}
