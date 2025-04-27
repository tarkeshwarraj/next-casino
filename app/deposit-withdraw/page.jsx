"use client";

import { useState } from "react";

export default function DepositWithdraw() {
  const [balance, setBalance] = useState(500); // Example starting balance
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleDeposit = () => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    setBalance(prev => prev + parseFloat(amount));
    setHistory(prev => [{ type: "Deposit", amount: parseFloat(amount) }, ...prev]);
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!amount || isNaN(amount) || amount <= 0 || amount > balance) return;
    setBalance(prev => prev - parseFloat(amount));
    setHistory(prev => [{ type: "Withdraw", amount: parseFloat(amount) }, ...prev]);
    setAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
        Deposit / Withdraw
      </h1>

      {/* Current Balance */}
      <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold">Current Balance</h2>
        <p className="text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
      </div>

      {/* Deposit and Withdraw Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2">
          <button
            onClick={handleDeposit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
          Transaction History
        </h2>
        <div className="space-y-4">
          {history.length === 0 && (
            <p className="text-gray-500">No transactions yet.</p>
          )}
          {history.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border border-gray-300 rounded-lg"
            >
              <span
                className={`font-semibold ${
                  item.type === "Deposit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.type}
              </span>
              <span style={{ color: "var(--foreground)" }}>
                ${item.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
