import React from 'react'

const Card = ({ image, title }) => {
  return (
    <div className="relative w-full sm:w-[250px] md:w-[280px] h-[480px] rounded-[30px] transition ease-in-out duration-300 shadow-[0_0_30px_rgba(209,38,197,0.5)] hover:shadow-[0_0_30px_rgba(209,38,197,1)] bg-gradient-to-br from-pink-600 via-pink-500 to-cyan-400 overflow-hidden">
      {/* Inner dark background */}
      <div className="absolute z-[1] top-[1%] left-[1%] w-[98%] h-[98%] rounded-[28px] bg-[#181818] p-4 flex flex-col items-center text-white">
        
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold text-center">{title}</h2>

      </div>
    </div>
  )
}

export default Card
