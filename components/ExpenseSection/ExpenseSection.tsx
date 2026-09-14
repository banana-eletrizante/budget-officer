import EntryForm from "../EntryForm/EntryForm";
import EntryList from "../EntryList/EntryList";
import type { BudgetEntry } from "@/types/budget";
import styles from "./ExpenseSection.module.css";

interface ExpenseSectionProps {
  entries: BudgetEntry[];
  onAdd: (entry: { description: string; amount: number; category?: string }) => void;
  onRemove: (id: string) => void;
}

export default function ExpenseSection({ entries, onAdd, onRemove }: ExpenseSectionProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Despesas</h2>
      <EntryForm onAdd={onAdd} showCategory buttonLabel="Adicionar despesa" />
      <div className={styles.listWrapper}>
        <EntryList
          entries={entries}
          onRemove={onRemove}
          emptyMessage="Nenhuma despesa cadastrada ainda."
        />
      </div>
    </section>
  );
}
