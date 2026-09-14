import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Calculadora de Orçamento Doméstico</h1>
      <p className={styles.subtitle}>
        Organize suas receitas e despesas e veja seu saldo em tempo real.
      </p>
    </header>
  );
}
