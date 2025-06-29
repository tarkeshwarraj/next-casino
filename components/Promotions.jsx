import React from 'react'

const Promotions = () => {
  return (
    <div className="max-w-7xl mx-auto">

      <section className="py-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-white">🎉 Current <span className="text-yellow-400">Promotions</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-yellow-400 p-6 rounded-xl text-black">
            <h4 className="font-bold text-lg">Weekend Spins</h4>
            <p className="text-sm mt-2">Get 50 free spins every weekend on selected slots!</p>
            <button className="mt-4 bg-black text-white px-4 py-1 rounded">Claim Now</button>
          </div>
          <div className="bg-pink-500 p-6 rounded-xl text-white">
            <h4 className="font-bold text-lg">Cashback Monday</h4>
            <p className="text-sm mt-2">Get 20% cashback on all losses every Monday!</p>
            <button className="mt-4 bg-white text-pink-600 px-4 py-1 rounded">Learn More</button>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-400 p-6 rounded-xl text-white">
            <h4 className="font-bold text-lg">VIP Tournament</h4>
            <p className="text-sm mt-2">Compete for $100,000 prize pool in our monthly tournament</p>
            <button className="mt-4 bg-white text-green-600 px-4 py-1 rounded">Join Now</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Promotions