"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AdSlot from "@/components/AdSlot/AdSlot";
import IncomeSection from "@/components/IncomeSection/IncomeSection";
import ExpenseSection from "@/components/ExpenseSection/ExpenseSection";
import SummaryCard from "@/components/SummaryCard/SummaryCard";
import { useBudget } from "@/lib/useBudget";
import styles from "./page.module.css";

export default function Home() {
  const {
    data,
    totalIncome,
    totalExpenses,
    balance,
    addEntry,
    removeEntry,
    clearAll,
  } = useBudget();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <AdSlot label="Topo" orientation="horizontal" />

        <div className={styles.layout}>
          <div className={styles.columns}>
            <IncomeSection
              entries={data.income}
              onAdd={(entry) => addEntry("income", entry)}
              onRemove={(id) => removeEntry("income", id)}
            />
            <ExpenseSection
              entries={data.expenses}
              onAdd={(entry) => addEntry("expense", entry)}
              onRemove={(id) => removeEntry("expense", id)}
            />
          </div>

          <aside className={styles.sidebar}>
            <SummaryCard
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              onClearAll={clearAll}
            />
            <AdSlot label="Lateral" orientation="vertical" />
          </aside>
        </div>

        <AdSlot label="Rodapé" orientation="horizontal" />

        <Footer />
      </div>
    </main>
  );
}
