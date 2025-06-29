import React from 'react'

const HotGames = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <span
          className="absolute top-10 left-10 text-3xl opacity-30"
          style={{ animation: 'float 6s ease-in-out infinite', display: 'inline-block' }}
        >
          💎
        </span>
        <span
          className="absolute top-20 right-12 text-2xl opacity-30"
          style={{ animation: 'float2 8s ease-in-out infinite', display: 'inline-block' }}
        >
          🧨
        </span>
        <span
          className="absolute bottom-16 left-20 text-2xl opacity-30"
          style={{ animation: 'float 5s ease-in-out infinite', display: 'inline-block' }}
        >
          🎯
        </span>
        <span
          className="absolute bottom-10 right-16 text-4xl opacity-30"
          style={{ animation: 'float2 7s ease-in-out infinite', display: 'inline-block' }}
        >
          🏆
        </span>
      </div>

      {/* Hot Games Section */}
      <section className="py-16 relative z-10">
        <h3 className="text-2xl font-bold text-center text-orange-400 mb-8">🔥 Hot Games</h3>
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {[
            {
              name: 'Mega Fortune',
              reward: '$2.4M Jackpot',
              image: '/images/hotgames/1000.gif'
            },
            {
              name: 'Royal Blackjack',
              reward: '96.12% RTP',
              image: '/images/hotgames/casi.gif',
            },
            {
              name: 'Lucky Dice',
              reward: 'x1000',
              image: '/images/hotgames/giphy.gif',
            },
            {
              name: 'Diamond Rush',
              reward: 'Free Spins',
              image: '/images/hotgames/jackpot.gif',
            },
            {
              name: 'Circus Madness',
              reward: '+50 Wilds',
              image: '/images/hotgames/megawin.gif',
            },
          ].map((game, i) => (
            <div key={i} className="w-72 sm:w-56 bg-[#10194b] p-4 rounded-xl shadow-md">
              <div className="h-40 w-full rounded mb-2 overflow-hidden">
                {game.image && (
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <h4 className="text-md font-bold text-white mb-1">{game.name}</h4>
              <p className="text-xs text-green-400">{game.reward}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default HotGames;
