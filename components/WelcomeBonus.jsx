import React from 'react';

const WelcomeBonus = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#1a103d] via-[#2d0c54] to-[#0f0d2e] text-center py-24 px-6 min-h-[500px] overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:rounded-2xl before:bg-yellow-300/10 before:blur-3xl before:opacity-20 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="inline-block p-12 rounded-3xl bg-[#0b122f] shadow-2xl border border-[#7e5bef] ring-2 ring-purple-500/20 animate-glow">
          <h3 className="text-[#f7c948] text-3xl font-bold mb-5 drop-shadow-lg">🎁 Welcome Bonus</h3>
          <p className="text-6xl font-extrabold text-white drop-shadow-md">$5,000</p>
          <p className="text-lg text-gray-300 mt-3">+ 200 Free Spins on your first deposit!</p>
          <div className="flex justify-center mt-8 gap-4 flex-wrap">
            <button className="bg-gradient-to-r from-[#f7c948] to-[#ffcc00] px-6 py-3 rounded-full text-black font-bold hover:scale-105 transition-transform shadow-xl shadow-yellow-300/40">
              No Wagering
            </button>
            <button className="bg-gradient-to-r from-[#7e5bef] to-[#5a3fc0] px-6 py-3 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-400/30">
              Instant Withdraw
            </button>
            <button className="bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] px-6 py-3 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-xl shadow-blue-500/30">
              24/7 Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBonus;
