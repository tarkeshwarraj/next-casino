'use client'
import React, { useEffect, useRef, useState } from 'react';

export default function RewardsHubPage() {
  const todayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const visibleRewards = rewardDays.slice(startIndex, startIndex + 8);

  useEffect(() => {
    if (todayRef.current && scrollContainerRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [startIndex]);

  useEffect(() => {
  if (typeof window !== "undefined") {
    setIsDesktop(window.innerWidth >= 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
}, []);

  const scrollLeft = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const scrollRight = () => {
    if (startIndex + 8 < rewardDays.length) setStartIndex(startIndex + 1);
  };
  return (
    <div className="bg-[#130c33] md:py-10 text-white min-h-screen">

      <section className="max-w-7xl mx-auto mt-10 bg-[#1a103b] rounded-xl p-6 shadow-lg text-center relative">
        <h2 className="text-2xl font-bold mb-2 text-white animate-bounce">🎯 DAILY LOGIN REWARDS</h2>
        <p className="text-purple-200">Collect coins every day! Longer streaks = Bigger rewards!</p>
        <div className="mt-6 text-4xl font-bold text-[#FACC15] animate-bounce">💰 150 COINS</div>
        <p className="text-sm text-[#F97316] mt-1">+50 Streak Bonus</p>

        {/* Scroll Arrows for Desktop Only */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full z-10 hover:bg-white/20"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full z-10 hover:bg-white/20"
        >
          →
        </button>

        <div className="mt-6 overflow-x-auto scrollbar-hide md:overflow-hidden" ref={scrollContainerRef}>
          <div className="flex gap-3 w-max md:w-full md:justify-center">
            {(isDesktop ? visibleRewards : rewardDays).map((day, idx) => (
              <div
                key={startIndex + idx}
                ref={day.status === 'today' ? todayRef : null}
                className={`min-w-[150px] md:min-w-0 flex-none snap-center rounded-2xl p-4 text-center ${
                  day.status === 'collected'
                    ? 'bg-gradient-to-br from-[#10b981] to-[#059669] shadow-emerald-400/40'
                    : day.status === 'today'
                    ? 'bg-[#FACC15] text-black font-semibold'
                    : 'bg-[#4c4c8a]'
                }`}
              >
                <div className="text-2xl mb-2">{day.status === 'collected' ? '✅' : day.status === 'today' ? '🎁' : '🔒'}</div>
                <div className="text-white font-bold">DAY {day.day}</div>
                <div className="text-yellow-400 text-sm">{day.label}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {day.status === 'collected' ? 'Collected' : day.status === 'today' ? 'Available Today' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6 text-sm text-center">
          <div className="bg-[#241b4f] rounded-xl p-4">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-white font-bold">Current Streak</div>
            <div className="text-2xl text-yellow-400 font-bold">3 Days</div>
          </div>
          <div className="bg-[#241b4f] rounded-xl p-4">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-white font-bold">Best Streak</div>
            <div className="text-2xl text-green-400 font-bold">12 Days</div>
          </div>
          <div className="bg-[#241b4f] rounded-xl p-4">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-white font-bold">Total Earned</div>
            <div className="text-2xl text-blue-400 font-bold">2,450 Coins</div>
          </div>
        </div>

        <button className="mt-6 bg-gradient-to-r from-[#FACC15] to-[#fb923c] px-6 py-2 text-black font-bold rounded shadow-lg">⬆ COLLECT TODAY'S REWARD</button>
        <p className="text-xs text-purple-300 mt-2">🔄 Resets in 15 hours 23 minutes</p>
      </section>

      {/* Mega Jackpot Pool */}
      <section className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-center rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2 animate-bounce">💎 MEGA JACKPOT POOL</h2>
        <p className="text-4xl font-extrabold text-[#FACC15] animate-bounce">$909,008</p>
        <p className="text-xs mt-1 text-white">🔥 Growing every second! Next winner could be YOU!</p>
        <p className="text-xs text-white">🎉 Last Winner: Sarah K. - $12,500 • 2 minutes ago</p>
      </section>

      {/* Live Player Activity */}
      <section className="max-w-3xl mx-auto mt-10 bg-[#1a103b] rounded-xl p-4">
        <h3 className="text-lg font-bold mb-4">📢 LIVE PLAYER ACTIVITY</h3>
        <div className="space-y-2">
          {activities.map((log, idx) => (
            <div key={idx} className="flex justify-between bg-gradient-to-r from-[#32275f] to-[#42265f] px-3 py-2 rounded">
              <span className="text-sm text-white">{log.user}</span>
              <span className="text-sm font-bold text-[#34d399]">{log.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Explosive Bonuses */}
      <section className="max-w-6xl mx-auto my-10 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 animate-bounce">🚀 EXPLOSIVE BONUSES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonuses.map((bonus, idx) => (
            <div key={idx} className={`rounded-xl p-5 text-center shadow-xl text-white ${getBonusCardColor(idx)}`}>
              <h3 className="text-lg font-bold mb-2">{bonus.cta.split(' ')[0]} {bonus.title}</h3>
              <p className="text-2xl font-bold mb-1">{bonus.reward}</p>
              <p className="text-xs text-purple-200 mb-3">{bonus.description}</p>
              <button className="bg-gradient-to-r from-[#FACC15] to-[#fb923c] text-black px-4 py-2 font-semibold rounded shadow hover:scale-105 transition-transform">
                {bonus.cta}
              </button>
              {bonus.note && <p className="text-xs text-[#fb923c] mt-2">{bonus.note}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


const getBonusCardColor = (idx) => {
  const colors = [
    'bg-gradient-to-br from-[#1d2b64] to-[#f8cdda]', // welcome bonus
    'bg-gradient-to-br from-[#42275a] to-[#734b6d]', // mega spin
    'bg-gradient-to-br from-[#134e5e] to-[#71b280]', // vip cashback
    'bg-gradient-to-br from-[#ff512f] to-[#dd2476]', // flash sale
    'bg-gradient-to-br from-[#654ea3] to-[#eaafc8]', // treasure hunt
    'bg-gradient-to-br from-[#1f4037] to-[#99f2c8]'  // team challenge
  ];
  return colors[idx % colors.length];
};

const rewardDays = [
  { day: 1, label: '50 Coins', status: 'collected' },
  { day: 2, label: '75 Coins', status: 'collected' },
  { day: 3, label: '100 Coins', status: 'collected' },
  { day: 4, label: '150 Coins', status: 'today' },
  { day: 5, label: '200 Coins', status: 'upcoming' },
  { day: 6, label: '500 Coins', status: 'upcoming' },
  { day: 7, label: '500 Coins', status: 'upcoming' },
  { day: 8, label: '750 Coins', status: 'upcoming' },
  { day: 9, label: '1000 Coins', status: 'upcoming' },
  { day: 10, label: '1250 Coins', status: 'upcoming' }
];

const activities = [
  { user: 'Amy S. reached VIP status', amount: '+500 coins' },
  { user: 'Lisa K. hit mega jackpot', amount: '+$1,250' },
  { user: 'Sarah M. won 3,200 coins', amount: '+$32' },
  { user: 'Tom R. completed treasure hunt', amount: '+$75' },
  { user: 'David L. collected daily bonus', amount: '+400 coins' },
];

const bonuses = [
  { title: 'WELCOME BONUS', reward: '$500', description: '100% Match Bonus', cta: '⬆ CLAIM $500 BONUS', note: 'Limited time offer' },
  { title: 'MEGA SPIN', reward: '$250', description: '3 SPINS LEFT TODAY', cta: '🎰 SPIN TO WIN NOW', note: 'Free spins reset daily' },
  { title: 'VIP CASHBACK', reward: '20%', description: 'Weekly Cashback', cta: '💎 CLAIM CASHBACK', note: 'VIP exclusive offer' },
  { title: 'FLASH SALE', reward: '75% OFF', description: 'All Coin Packages', cta: '⚡ GRAB FLASH DEAL', note: 'Only 2 days left' },
  { title: 'TREASURE HUNT', reward: '$100', description: '3 clues found today', cta: '🔍 START HUNTING', note: 'New treasures daily' },
  { title: 'TEAM CHALLENGE', reward: '$200', description: 'Team Reward Pool', cta: '🤝 JOIN TEAM NOW', note: 'Invite friends to win more' },
];