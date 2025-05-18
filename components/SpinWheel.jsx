"use client";
import { useRef, useState } from "react";

export default function SpinnerWheel() {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const min = 5; // 5 full spins
    const max = 10;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    const extraDeg = Math.floor(Math.random() * 360);
    const totalRotation = rand * 360 + extraDeg;

    wheelRef.current.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    // Reset and detect result
    setTimeout(() => {
      wheelRef.current.style.transition = "none";
      const normalizedRotation = totalRotation % 360;
      wheelRef.current.style.transform = `rotate(${normalizedRotation}deg)`;

      const segmentAngle = 360 / rewards.length;
      const index = Math.floor((360 - normalizedRotation + segmentAngle / 2) % 360 / segmentAngle);
      setResult(rewards[index]);

      setIsSpinning(false);
    }, 5000);
  };

  const rewards = [
    "21K", "5K", "10K", "45K", "34K", "29K", "21K", "69K",
    "170K", "17K", "25K", "13K", "38K", "30K", "250K", "17K",
    "30K", "84K", "13K"
  ];

  return (
    <div className="flex flex-col items-center justify-center">
       <h2 className="py-8" style={{ color: "var(--foreground)" }}>FreePlay Spinner</h2>
      <div className="relative w-72 h-72 rounded-full border-8 border-white shadow-lg overflow-hidden">
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
              #ff0000 0% 5.26%, #ffaa00 5.26% 10.52%, #ffff00 10.52% 15.78%,
              #aaff00 15.78% 21.04%, #00ff00 21.04% 26.3%, #00ffaa 26.3% 31.56%,
              #00ffff 31.56% 36.82%, #00aaff 36.82% 42.08%, #0044ff 42.08% 47.34%,
              #5500ff 47.34% 52.6%, #aa00ff 52.6% 57.86%, #ff00aa 57.86% 63.12%,
              #ff0055 63.12% 68.38%, #ff5500 68.38% 73.64%, #ffaa00 73.64% 78.9%,
              #ffff00 78.9% 84.16%, #aaff00 84.16% 89.42%, #00ff00 89.42% 94.68%,
              #00ffaa 94.68% 100%
            )`,
          }}
        ></div>
        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      {result && (
        <p className="mt-4 text-xl font-bold text-green-600">You got: {result}</p>
      )}
    </div>
  );
}
