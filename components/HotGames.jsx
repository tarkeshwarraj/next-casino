import React from 'react';

const HotGames = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1a103d] to-[#0f0d2e]">
      <div className="max-w-7xl mx-auto">
        {/* Floating Icons */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {['💎', '🧨', '🎯', '🏆'].map((icon, idx) => (
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

        {/* Hot Games Section */}
        <section className="py-20 relative z-10">
          <h3 className="text-3xl font-extrabold text-center text-[#f7c948] drop-shadow-lg mb-12">🔥 Hot Games</h3>
          <div className="flex flex-wrap justify-center gap-6 px-6">
            {[
              { name: 'Mega Fortune', reward: '$2.4M Jackpot', image: '/images/hotgames/1000.gif' },
              { name: 'Royal Blackjack', reward: '96.12% RTP', image: '/images/hotgames/casi.gif' },
              { name: 'Lucky Dice', reward: 'x1000', image: '/images/hotgames/giphy.gif' },
              { name: 'Diamond Rush', reward: 'Free Spins', image: '/images/hotgames/jackpot.gif' },
              { name: 'Circus Madness', reward: '+50 Wilds', image: '/images/hotgames/megawin.gif' },
            ].map((game, i) => (
              <div key={i} className="w-72 sm:w-56 bg-gradient-to-br from-[#242c58] to-[#1b2140] p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="h-40 w-full rounded-xl mb-3 overflow-hidden shadow-inner">
                  {game.image && (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{game.name}</h4>
                <p className="text-sm text-green-400">{game.reward}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotGames;
