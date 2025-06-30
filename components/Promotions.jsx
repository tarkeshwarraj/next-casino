import React from 'react';

const Promotions = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1c] to-[#121d34] py-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-3xl font-extrabold text-center mb-12 text-white drop-shadow">
          🎉 Current <span className="text-yellow-400 drop-shadow">Promotions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-6 rounded-2xl text-black shadow-xl hover:scale-105 transition duration-300">
            <h4 className="font-bold text-lg">🎰 Weekend Spins</h4>
            <p className="text-sm mt-2">Get 50 free spins every weekend on selected slots!</p>
            <button className="mt-4 bg-black text-yellow-300 px-5 py-2 rounded-full font-semibold hover:bg-yellow-700/20 transition">Claim Now</button>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-pink-400 to-fuchsia-600 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition duration-300">
            <h4 className="font-bold text-lg">💸 Cashback Monday</h4>
            <p className="text-sm mt-2">Get 20% cashback on all losses every Monday!</p>
            <button className="mt-4 bg-white text-pink-600 px-5 py-2 rounded-full font-bold hover:scale-105 transition">Learn More</button>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition duration-300">
            <h4 className="font-bold text-lg">🏆 VIP Tournament</h4>
            <p className="text-sm mt-2">Compete for $100,000 prize pool in our monthly tournament</p>
            <button className="mt-4 bg-white text-emerald-600 px-5 py-2 rounded-full font-bold hover:scale-105 transition">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
