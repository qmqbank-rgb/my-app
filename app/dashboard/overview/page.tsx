"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type TransactionData = {
  date: string;
  amount: number;
};

type RecentTransaction = {
  id: number;
  date: string;
  type: string;
  amount: number;
  status: "Completed" | "Pending";
};

const transactionData: TransactionData[] = [
  { date: "Aug 25", amount: 500 },
  { date: "Aug 26", amount: 700 },
  { date: "Aug 27", amount: 300 },
  { date: "Aug 28", amount: 900 },
  { date: "Aug 29", amount: 400 },
];

const recentTransactions: RecentTransaction[] = [
  { id: 1, date: "2025-09-01", type: "Deposit", amount: 500, status: "Completed" },
  { id: 2, date: "2025-08-30", type: "Withdrawal", amount: -200, status: "Pending" },
  { id: 3, date: "2025-08-28", type: "Transfer", amount: -100, status: "Completed" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold">📊 Dashboard Overview</h2>
      <p className="text-gray-600">Welcome to your QmqBank dashboard. Here's your account summary.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400">Balance</h3>
          <p className="text-2xl font-bold">$1,200</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400">Pending Transactions</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400">Recent Activity</h3>
          <p className="text-2xl font-bold">5 items</p>
        </div>
      </div>

      {/* Transactions Chart */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Transaction Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#34D399" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions Table */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <td className="p-2">{txn.date}</td>
                <td className="p-2">{txn.type}</td>
                <td className="p-2">{txn.amount < 0 ? `-$${Math.abs(txn.amount)}` : `$${txn.amount}`}</td>
                <td
                  className={`p-2 font-semibold ${
                    txn.status === "Completed" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
