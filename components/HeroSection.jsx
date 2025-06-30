'use client';
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1a103d] via-[#2d0c54] to-[#0f0d2e]">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <span
          className="absolute top-10 left-10 text-3xl opacity-20"
          style={{ animation: 'float 6s ease-in-out infinite', display: 'inline-block' }}
        >
          🎰
        </span>
        <span
          className="absolute top-20 right-12 text-2xl opacity-20"
          style={{ animation: 'float2 8s ease-in-out infinite', display: 'inline-block' }}
        >
          🃏
        </span>
        <span
          className="absolute bottom-16 left-20 text-2xl opacity-20"
          style={{ animation: 'float 5s ease-in-out infinite', display: 'inline-block' }}
        >
          🎲
        </span>
        <span
          className="absolute bottom-10 right-16 text-4xl opacity-20"
          style={{ animation: 'float2 7s ease-in-out infinite', display: 'inline-block' }}
        >
          💰
        </span>
      </div>

      {/* Main Hero Content */}
      <section className="relative z-10 text-center py-20 text-white">
        <h2 className="text-4xl font-extrabold drop-shadow-md">
          Welcome to the Ultimate <span className="text-[#f7c948]">Gaming Experience</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Join thousands of players in the most exciting online casino. Win big with our premium games and exclusive bonuses!
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-[#f7c948] text-black font-bold px-6 py-2 rounded-full hover:brightness-110 transition-all shadow-lg">
            Play Now
          </button>
          <button className="border border-[#f7c948] text-[#f7c948] font-bold px-6 py-2 rounded-full hover:bg-[#f7c948] hover:text-black transition-all shadow-md">
            Claim Bonus
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
