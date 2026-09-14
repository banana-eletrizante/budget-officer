"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, ensureAnonymousUser, isFirebaseConfigured } from "./firebase";
import type { BudgetData, BudgetEntry, EntryType } from "@/types/budget";

const LOCAL_STORAGE_KEY = "orcamento-domestico:dados";
const SAVE_DEBOUNCE_MS = 800;

const emptyData: BudgetData = { income: [], expenses: [] };

function createId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadFromLocalStorage(): BudgetData {
  if (typeof window === "undefined") return emptyData;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return emptyData;
    const parsed = JSON.parse(raw) as BudgetData;
    return {
      income: Array.isArray(parsed.income) ? parsed.income : [],
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
    };
  } catch {
    return emptyData;
  }
}

export function useBudget() {
  const [data, setData] = useState<BudgetData>(emptyData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "local" | "connecting" | "synced" | "error"
  >("local");

  const userIdRef = useRef<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carrega dados locais imediatamente, depois tenta sincronizar com o Firebase.
  useEffect(() => {
    const local = loadFromLocalStorage();
    setData(local);
    setIsLoaded(true);

    if (!isFirebaseConfigured || !db) {
      setSyncStatus("local");
      return;
    }

    setSyncStatus("connecting");
    const unsubscribe = ensureAnonymousUser(async (user) => {
      if (!user) {
        setSyncStatus("error");
        return;
      }
      userIdRef.current = user.uid;
      try {
        const ref = doc(db!, "orcamentos", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const remote = snap.data() as BudgetData;
          setData({
            income: remote.income ?? [],
            expenses: remote.expenses ?? [],
          });
        }
        setSyncStatus("synced");
      } catch {
        setSyncStatus("error");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva (local sempre, Firebase quando disponível) com debounce.
  useEffect(() => {
    if (!isLoaded) return;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    if (!isFirebaseConfigured || !db || !userIdRef.current) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const ref = doc(db!, "orcamentos", userIdRef.current!);
        await setDoc(ref, { ...data, updatedAt: Date.now() });
        setSyncStatus("synced");
      } catch {
        setSyncStatus("error");
      }
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [data, isLoaded]);

  const addEntry = useCallback(
    (type: EntryType, entry: Omit<BudgetEntry, "id">) => {
      const newEntry: BudgetEntry = { ...entry, id: createId() };
      setData((prev) => ({
        ...prev,
        [type === "income" ? "income" : "expenses"]: [
          ...prev[type === "income" ? "income" : "expenses"],
          newEntry,
        ],
      }));
    },
    []
  );

  const removeEntry = useCallback((type: EntryType, id: string) => {
    setData((prev) => ({
      ...prev,
      [type === "income" ? "income" : "expenses"]: prev[
        type === "income" ? "income" : "expenses"
      ].filter((entry) => entry.id !== id),
    }));
  }, []);

  const clearAll = useCallback(() => {
    setData(emptyData);
  }, []);

  const totalIncome = data.income.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return {
    data,
    isLoaded,
    syncStatus,
    totalIncome,
    totalExpenses,
    balance,
    addEntry,
    removeEntry,
    clearAll,
  };
}
