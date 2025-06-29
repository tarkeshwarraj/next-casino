import React from 'react'

const GameCategories = () => {
  return (
    <div className="relative overflow-hidden">

       <div className="absolute inset-0 z-0 pointer-events-none">
  <span
    className="absolute top-10 left-10 text-3xl opacity-30"
    style={{ animation: 'float 6s ease-in-out infinite', display: 'inline-block' }}
  >
    🎮
  </span>
  <span
    className="absolute top-20 right-12 text-2xl opacity-30"
    style={{ animation: 'float2 8s ease-in-out infinite', display: 'inline-block' }}
  >
    🤑
  </span>
  <span
    className="absolute bottom-16 left-20 text-2xl opacity-30"
    style={{ animation: 'float 5s ease-in-out infinite', display: 'inline-block' }}
  >
    🧧
  </span>
  <span
    className="absolute bottom-10 right-16 text-4xl opacity-30"
    style={{ animation: 'float2 7s ease-in-out infinite', display: 'inline-block' }}
  >
    🎯
  </span>
</div>


     <section className="text-center py-16 bg-[#13182e]">
          <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-8">Choose Your <span className="text-yellow-400">Game</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { title: 'Slots', color: 'bg-red-500', desc: '500+ Premium Slot Games' },
            { title: 'Table Games', color: 'bg-green-500', desc: 'Blackjack, Poker, Baccarat' },
            { title: 'Live Casino', color: 'bg-purple-600', desc: 'Real Dealers, Real Time' },
            { title: 'Sports', color: 'bg-blue-500', desc: 'Live Sports Betting' },
          ].map(({ title, color, desc }) => (
            <div key={title} className={`p-6 rounded-xl text-white ${color} shadow-md`}>
              <h4 className="text-lg font-bold mb-1">{title}</h4>
              <p className="text-sm mb-2">{desc}</p>
              <button className="bg-white text-black px-4 py-1 rounded font-semibold">
                {title === 'Sports' ? 'Bet Now' : 'Play Now'}
              </button>
            </div>
          ))}
          </div>
        </div>
      </section>
          </div>
  )
}

export default GameCategories