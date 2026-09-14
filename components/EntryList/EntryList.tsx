import type { BudgetEntry } from "@/types/budget";
import styles from "./EntryList.module.css";

interface EntryListProps {
  entries: BudgetEntry[];
  onRemove: (id: string) => void;
  emptyMessage: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function EntryList({ entries, onRemove, emptyMessage }: EntryListProps) {
  if (entries.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.id} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.description}>{entry.description}</span>
            {entry.category && (
              <span className={styles.category}>{entry.category}</span>
            )}
          </div>
          <div className={styles.right}>
            <span className={styles.amount}>{formatCurrency(entry.amount)}</span>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemove(entry.id)}
              aria-label={`Remover ${entry.description}`}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
