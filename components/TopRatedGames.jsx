'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const games = [
  {
    id: 1,
    title: 'The Witcher 3',
    rating: 9.5,
    image: '/images/cardImages/2035.png',
  },
  {
    id: 2,
    title: 'Red Dead Redemption 2',
    rating: 9.8,
    image: '/images/cardImages/2039.png',
  },
  {
    id: 3,
    title: 'God of War',
    rating: 9.7,
    image: '/images/cardImages/2103.png',
  },
  {
    id: 4,
    title: 'Elden Ring',
    rating: 9.6,
    image: '/images/cardImages/2109.png',
  },
  {
    id: 5,
    title: 'Elden Ring',
    rating: 9.6,
    image: '/images/cardImages/2133.png',
  },{
    id: 6,
    title: 'Elden Ring',
    rating: 9.6,
    image: '/images/cardImages/2575.png',
  }
];

const TopRatedGames = () => {
  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Top Rated Games</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
           <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-900 group transition-transform duration-300 hover:scale-105">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-60 md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedGames;
