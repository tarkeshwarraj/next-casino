import React from 'react'

const WelcomeBonus = () => {
  return (
     <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-center py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="inline-block p-6 rounded-xl bg-[#0b122f] border border-purple-400 shadow-lg">
          <h3 className="text-yellow-400 text-xl font-bold mb-2">🎁 Welcome Bonus</h3>
          <p className="text-4xl font-bold text-white">$5,000</p>
          <p className="text-sm text-gray-300 mt-1">+ 200 Free Spins on your first deposit!</p>
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            <button className="bg-yellow-500 px-4 py-1 rounded text-black font-semibold">No Wagering</button>
            <button className="bg-indigo-500 px-4 py-1 rounded text-white font-semibold">Instant Withdraw</button>
            <button className="bg-blue-600 px-4 py-1 rounded text-white font-semibold">24/7 Support</button>
          </div>
        </div>
      </div>
      </section>
  )
}

export default WelcomeBonus