'use client'
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <span
          className="absolute top-10 left-10 text-3xl opacity-30"
          style={{ animation: 'float 6s ease-in-out infinite', display: 'inline-block' }}
        >
          🎰
        </span>
        <span
          className="absolute top-20 right-12 text-2xl opacity-30"
          style={{ animation: 'float2 8s ease-in-out infinite', display: 'inline-block' }}
        >
          🃏
        </span>
        <span
          className="absolute bottom-16 left-20 text-2xl opacity-30"
          style={{ animation: 'float 5s ease-in-out infinite', display: 'inline-block' }}
        >
          🎲
        </span>
        <span
          className="absolute bottom-10 right-16 text-4xl opacity-30"
          style={{ animation: 'float2 7s ease-in-out infinite', display: 'inline-block' }}
        >
          💰
        </span>
      </div>

      {/* Main Hero Content */}
      <section className="relative z-10 text-center py-20">
        <h2 className="text-4xl font-bold">
          Welcome to the Ultimate <span className="text-yellow-400">Gaming Experience</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Join thousands of players in the most exciting online casino. Win big with our premium games and exclusive bonuses!
        </p>
        <div className="mt-6 space-x-4">
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded">Play Now</button>
          <button className="border border-yellow-400 text-yellow-400 font-bold px-6 py-2 rounded">Claim Bonus</button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
