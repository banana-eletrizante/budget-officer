import EntryForm from "../EntryForm/EntryForm";
import EntryList from "../EntryList/EntryList";
import type { BudgetEntry } from "@/types/budget";
import styles from "./IncomeSection.module.css";

interface IncomeSectionProps {
  entries: BudgetEntry[];
  onAdd: (entry: { description: string; amount: number }) => void;
  onRemove: (id: string) => void;
}

export default function IncomeSection({ entries, onAdd, onRemove }: IncomeSectionProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Receitas</h2>
      <EntryForm onAdd={onAdd} buttonLabel="Adicionar receita" />
      <div className={styles.listWrapper}>
        <EntryList
          entries={entries}
          onRemove={onRemove}
          emptyMessage="Nenhuma receita cadastrada ainda."
        />
      </div>
    </section>
  );
}
