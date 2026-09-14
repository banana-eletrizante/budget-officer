"use client";

import { useState, type FormEvent } from "react";
import styles from "./EntryForm.module.css";

interface EntryFormProps {
  onAdd: (entry: { description: string; amount: number; category?: string }) => void;
  showCategory?: boolean;
  buttonLabel: string;
}

const CATEGORIES = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Outros",
];

export default function EntryForm({
  onAdd,
  showCategory = false,
  buttonLabel,
}: EntryFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedAmount = Number(amount.replace(",", "."));

    if (!description.trim()) {
      setError("Informe uma descrição.");
      return;
    }
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor válido maior que zero.");
      return;
    }

    onAdd({
      description: description.trim(),
      amount: parsedAmount,
      category: showCategory ? category : undefined,
    });

    setDescription("");
    setAmount("");
    setError("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`descricao-${buttonLabel}`}>
            Descrição
          </label>
          <input
            id={`descricao-${buttonLabel}`}
            className={styles.input}
            type="text"
            placeholder="Ex: Salário, Aluguel..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`valor-${buttonLabel}`}>
            Valor (R$)
          </label>
          <input
            id={`valor-${buttonLabel}`}
            className={styles.input}
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {showCategory && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`categoria-${buttonLabel}`}>
              Categoria
            </label>
            <select
              id={`categoria-${buttonLabel}`}
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>
        {buttonLabel}
      </button>
    </form>
  );
}
