"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { title } from "process";

export default function LoadGamePage() {
  const { gamingAccounts, loadingGamingAccounts, fetchGamingAccounts } = useUser();
  const [amounts, setAmounts] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");   

  useEffect(() => {
    fetchGamingAccounts();
  }, [fetchGamingAccounts]);

  const accountObj = gamingAccounts?.[0]?.accounts?.[0];

  //Map gameKeys with user's account info
  const mergedGames = gameKeys.map((game) => ({
  ...game,
  title: accountObj?.[game.key]?.title || "N/A",
  gameId: accountObj?.[game.key]?.gameId || "N/A",
  username: accountObj?.[game.key].username || "N/A",
}));

  //Handle input amount
  const handleAmountChange = (value) => {
    setAmounts(value);
  }

  //Load Coins button handler
  const handleLoadCoins = async (game) => {
    const amount = amounts;

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }
    
    const payload = {
      username: game.username,
      gameId: game.gameId,
      amount,
      title: game.title,
    };

    console.log(payload);

    try{

      setLoadingKey(game.key);
      setStatusMessage("");

      const res = await fetch("/api/recharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      let result = await res.json(); // ✅ use a different name

      if(res.ok){
        alert("Coins loaded successfully!");
        setLoadingKey(null);
      }else {
        alert('Error: ${result.message}');
      }

    }catch(err){
      console.error("Recharge error:", err);
      alert(" Server error while loading coins.");
    }
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">
          <span className="text-white">ELITE </span>
          <span className="text-orange-400">GAMING COLLECTION</span>
        </h1>
        <p className="mt-4 text-slate-300">
          Choose from our curated selection of premium sweepstakes experiences
        </p>
      </section>

      {/* Game Cards */}
      <section className="px-6 pb-10">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Select Your Game
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto">
          {mergedGames.map((game, idx) => (
            <div
              key={idx}
              className="bg-slate-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div
                className={`rounded-lg h-36 mb-4 flex justify-center items-center text-3xl ${game.bg}`}
              >
                {game.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{game.title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
              <div className="text-xs font-medium">
                Username:{" "}
                <span className="text-sm text-yellow-400 font-medium">
                  {game.username}
                </span>
              </div>
              <div className="text-xs text-green-400 mb-3">{game.label}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Enter amount ($)"
                  value= {amounts}
                  onChange={(e) => setAmounts(e.target.value)}
                  className="flex-1 bg-slate-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-white text-sm px-3 py-2 rounded-md placeholder-slate-400"
                />
                <button
                onClick= {() =>handleLoadCoins(game)}
                disabled={loadingKey === game.key}
                  className={`w-full sm:w-auto whitespace-nowrap text-white text-sm px-4 py-2 rounded-md font-medium hover:opacity-90 ${game.btnColor} ${loadingKey === game.key ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loadingKey === game.key ? "⏳ Processing..." :"💰 Load Coins"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-6 text-sm text-slate-400">
          <span className="text-green-400">✔ Instant Delivery</span>
          <span className="text-orange-300">🔒 Secure Payment</span>
          <span className="text-red-400">📞 24/7 Support</span>
        </div>
      </section>
    </div>
  );
}

const gameKeys = [
  // { key: 'firekirin', label: '🔥 Fire Kirin', icon: '🔥', bg: 'bg-orange-500', btnColor: 'bg-orange-600' },
  { key: 'orionStar', label: '⭐ Orion Star', icon: '⭐', bg: 'bg-purple-500', btnColor: 'bg-purple-600' },
  { key: 'vegasSweep', label: '🎰 Vegas Sweep', icon: '🎰', bg: 'bg-red-500', btnColor: 'bg-red-600' },
  { key: 'gameVault', label: '🏆 Game Vault', icon: '🏆', bg: 'bg-yellow-500', btnColor: 'bg-yellow-600' },
  { key: 'pandaMaster', label: '🐼 Panda Master', icon: '🐼', bg: 'bg-green-500', btnColor: 'bg-green-600' },
  { key: 'milkyway', label: '🛸 Milky Way', icon: '🛸', bg: 'bg-pink-500', btnColor: 'bg-pink-600' },
  { key: 'juwa', label: '🎮 Juwa', icon: '🎮', bg: 'bg-blue-500', btnColor: 'bg-blue-600' },
];