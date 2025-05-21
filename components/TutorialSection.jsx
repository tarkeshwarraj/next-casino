import React, { useState } from "react";

const TutorialSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = (src) => {
    setVideoSrc(src);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoSrc("");
  };

  return (
    <div className=" bg-white px-3 py-6 md:py-3 rounded-lg">
      <h2 className="text-2xl text-black font-bold text-center mb-4">💸 How to Make a Payment</h2>
      <p className="text-center text-gray-600 mb-6">
        Watch these short guides to learn how to buy and pay using Bitcoin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video 1 */}
        <div
          className="cursor-pointer bg-gray-100 rounded-lg p-4 hover:shadow-lg transition"
          onClick={() => openModal("/videos/how-to-buy-bitcoin.mp4")}
        >
          {/* <h3 className="text-lg font-semibold mb-2">1. How to Buy Bitcoin</h3> */}
          <img
            src="/images/buy_bitcoin.png"
            alt="How to Buy Bitcoin"
            className="rounded-lg"
          />
        </div>

        {/* Video 2 */}
        <div
          className="cursor-pointer bg-gray-100 rounded-lg p-4 hover:shadow-lg transition"
          onClick={() => openModal("/videos/how-to-pay-bitcoin.mp4")}
        >
          {/* <h3 className="text-lg font-semibold mb-2">2. How to Pay via Bitcoin</h3> */}
          <img
            src="/images/pay_cash.png"
            alt="How to Pay via Bitcoin"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded-lg overflow-hidden w-[90%] max-w-2xl">
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center z-10"
              onClick={closeModal}
            >
              ✕
            </button>
            <video controls autoPlay className="w-full h-auto">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialSection;
