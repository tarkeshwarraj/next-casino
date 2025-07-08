import React from 'react';

export default function LoadGamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">

      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">
          <span className="text-white">ELITE </span>
          <span className="text-orange-400">GAMING COLLECTION</span>
        </h1>
        <p className="mt-4 text-slate-300">Choose from our curated selection of premium sweepstakes experiences</p>
        
      </section>

      {/* Game Cards */}
      <section className="px-6 pb-10">
        <h2 className="text-center text-2xl font-semibold mb-6">Select Your Game</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-6xl mx-auto">
          {games.map((game, idx) => (
            <div key={idx} className="bg-slate-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow">
              <div className={`rounded-lg h-36 mb-4 flex justify-center items-center text-3xl ${game.bg}`}>{game.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{game.title}</h3>
              <p className="text-slate-400 text-sm mb-1">{game.desc}</p>
              <div className="text-sm text-yellow-400 font-medium">Min: ${game.min}</div>
              <div className="text-xs text-green-400 mb-3">{game.label}</div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Enter amount ($)"
                  className="flex-1 bg-slate-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-white text-sm px-3 py-2 rounded-md placeholder-slate-400"
                />
                <button
                  className={`w-full sm:w-auto whitespace-nowrap text-white text-sm px-4 py-2 rounded-md font-medium hover:opacity-90 ${game.btnColor}`}
                >
                  💰 Load Coins
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

const games = [
  { title: 'Vegas Sweeps', desc: 'Classic Vegas-style slots and table games', min: 10, label: '🔥 Popular', icon: '🎰', bg: 'bg-gradient-to-r from-red-500 to-red-700', btnColor: 'bg-red-600' },
  { title: 'Orion Star', desc: 'Space-themed adventure slots', min: 15, label: '🚀 Trending', icon: '⭐', bg: 'bg-gradient-to-r from-purple-500 to-purple-700', btnColor: 'bg-purple-600' },
  { title: 'Sirius', desc: 'Premium gaming experience', min: 20, label: '💎 Premium', icon: '🧩', bg: 'bg-gradient-to-r from-blue-500 to-teal-500', btnColor: 'bg-blue-600' },
  { title: 'Panda Master', desc: 'Asian-themed slot adventures', min: 10, label: '🍃 Classic', icon: '🐼', bg: 'bg-gradient-to-r from-green-500 to-green-700', btnColor: 'bg-green-600' },
  { title: 'Milky Way', desc: 'Cosmic gaming adventure', min: 25, label: '🌌 Exclusive', icon: '🛸', bg: 'bg-gradient-to-r from-pink-500 to-purple-600', btnColor: 'bg-pink-600' },
  { title: 'Fire Kirin', desc: 'High-energy fishing games', min: 15, label: '🔥 Action', icon: '🔥', bg: 'bg-gradient-to-r from-orange-500 to-red-500', btnColor: 'bg-orange-600' },
];
