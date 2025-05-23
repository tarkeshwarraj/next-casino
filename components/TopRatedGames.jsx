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
    image: 'https://via.placeholder.com/300x150?text=Witcher+3',
  },
  {
    id: 2,
    title: 'Red Dead Redemption 2',
    rating: 9.8,
    image: 'https://via.placeholder.com/300x150?text=RDR2',
  },
  {
    id: 3,
    title: 'God of War',
    rating: 9.7,
    image: 'https://via.placeholder.com/300x150?text=God+of+War',
  },
  {
    id: 4,
    title: 'Elden Ring',
    rating: 9.6,
    image: 'https://via.placeholder.com/300x150?text=Elden+Ring',
  },
  {
    id: 5,
    title: 'Elden Ring',
    rating: 9.6,
    image: 'https://via.placeholder.com/300x150?text=Elden+Ring',
  },{
    id: 6,
    title: 'Elden Ring',
    rating: 9.6,
    image: 'https://via.placeholder.com/300x150?text=Elden+Ring',
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
            <div className="rounded-xl shadow-md overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
              <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{game.title}</h3>
                <p className="text-sm text-gray-600">Rating: {game.rating}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedGames;
