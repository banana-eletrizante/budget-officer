import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  onClearAll: () => void;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function SummaryCard({
  totalIncome,
  totalExpenses,
  balance,
  onClearAll,
}: SummaryCardProps) {
  const isPositive = balance >= 0;

  return (
    <section className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>Total de receitas</span>
        <span className={`${styles.value} ${styles.income}`}>
          {formatCurrency(totalIncome)}
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Total de despesas</span>
        <span className={`${styles.value} ${styles.expense}`}>
          {formatCurrency(totalExpenses)}
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <span className={styles.balanceLabel}>Saldo</span>
        <span
          className={`${styles.balanceValue} ${
            isPositive ? styles.positive : styles.negative
          }`}
        >
          {formatCurrency(balance)}
        </span>
      </div>

      <p className={styles.hint}>
        {isPositive
          ? "Suas receitas estão cobrindo suas despesas."
          : "Suas despesas ultrapassaram suas receitas neste período."}
      </p>

      <button type="button" className={styles.clearButton} onClick={onClearAll}>
        Limpar tudo
      </button>
    </section>
  );
}
