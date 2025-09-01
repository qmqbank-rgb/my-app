"use client";

import { useState, useEffect } from "react";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  if (loading) return <p className="p-4">Loading transactions...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="grid gap-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <span className="font-medium">{t.description}</span>
              <span
                className={`font-bold ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.amount > 0 ? `+${t.amount}` : t.amount} ৳
              </span>
            </div>
            <div className="text-sm text-gray-500">{t.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
