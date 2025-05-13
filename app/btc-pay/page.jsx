"use client";

import React, { useState } from "react";
import axios from "axios";

const BtcPayPage = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const createInvoice = async () => {
    const numericAmount = parseFloat(amount);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (isNaN(numericAmount) || numericAmount < 5.3) {
      setError("Minimum payment amount is $5.3");
      return;
    }

    try {
      setError(null);

      const response = await axios.post("/api/pay-btc", {
        name,
        amount: numericAmount.toFixed(2),
      });

      const { checkoutLink } = response.data;
      window.location.href = checkoutLink;
    } catch (err) {
      setError("Failed to create invoice. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen pt-48 flex items-start justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 pb-8">

      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-purple-300 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
  💳 Pay Securely with Cash App
</h2>

        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Enter Your Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
            placeholder="Your Name"
          />
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
            Enter Amount (Minimum $5.3):
          </label>
          <input
            type="number"
            step="0.01"
            min="5.3"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none dark:text-black"
            placeholder="Enter USD amount"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={createInvoice}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          💸 Pay Now
        </button>
      </div>
    </div>
  );
};

export default BtcPayPage;
