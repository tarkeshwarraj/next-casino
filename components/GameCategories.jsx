import React from 'react';

const GameCategories = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {['🎮', '🤑', '🧧', '🎯'].map((icon, idx) => (
          <span
            key={idx}
            className={`absolute text-${idx % 2 === 0 ? '3xl' : '2xl'} opacity-20`}
            style={{
              animation: `float${idx % 2 ? '2' : ''} ${(6 + idx)}s ease-in-out infinite`,
              top: idx < 2 ? `${10 + idx * 10}px` : 'auto',
              bottom: idx >= 2 ? `${10 + (idx - 2) * 10}px` : 'auto',
              left: idx % 2 === 0 ? `${10 + idx * 10}px` : 'auto',
              right: idx % 2 !== 0 ? `${10 + idx * 10}px` : 'auto',
              display: 'inline-block'
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      <section className="text-center py-20 bg-gradient-to-r from-[#1a103d] to-[#0f0d2e] relative z-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-white">
            Choose Your <span className="text-[#f7c948]">Game</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {[
              { title: 'Slots', bg: 'from-[#e11d48] to-[#be123c]', desc: '500+ Premium Slot Games', icon: '🎰' },
              { title: 'Table Games', bg: 'from-[#10b981] to-[#065f46]', desc: 'Blackjack, Poker, Baccarat', icon: '🃏' },
              { title: 'Live Casino', bg: 'from-[#8b5cf6] to-[#6b21a8]', desc: 'Real Dealers, Real Time', icon: '🎲' },
              { title: 'Sports', bg: 'from-[#3b82f6] to-[#1e3a8a]', desc: 'Live Sports Betting', icon: '⚽️' },
            ].map(({ title, bg, desc, icon }) => (
              <div key={title} className={`p-6 rounded-xl text-white bg-gradient-to-br ${bg} shadow-lg`}>
                <p className="text-4xl mb-2">{icon}</p>
                <h4 className="text-lg font-bold mb-1">{title}</h4>
                <p className="text-sm text-white/90 mb-2">{desc}</p>
                <button className="bg-[#f7c948] hover:brightness-110 text-black px-4 py-2 rounded-full font-bold transition duration-300 shadow">
                  {title === 'Sports' ? 'Bet Now' : 'Play Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameCategories;
