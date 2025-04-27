"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
    } else {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="flex justify-between items-center py-6 px-8 border-b border-gray-200 dark:border-gray-800">
      <Link
        href="/"
        className="text-2xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Casino 🎲
      </Link>
      <div className="space-x-6">
        <a
          href="#features"
          className="hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          Features
        </a>
        <a
          href="#play"
          className="hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          Play Now
        </a>

        {/*Deposit Button */}
        {/* <Link href="/deposit-withdraw">
        <button className="bg-gradient-t0-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"  style={{ color: "var(--foreground)" }}>
          Deposit
        </button>
        </Link> */}

        <Link href="/deposit-withdraw">
          <button
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-full group transition-all"
            style={{ color: "var(--foreground)" }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-300 blur-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50"></span>
            <span className="relative">Deposit</span>
          </button>
        </Link>

        {/* Light/Dark Mode Toggle */}
        <button
          onClick={toggleMode}
          className={`gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-black"
          }`}
        >
          {isDarkMode ? <>☀️</> : <>🌙</>}
        </button>
      </div>
    </nav>
  );
}
