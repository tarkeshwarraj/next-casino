"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <div className="text-sm text-white w-full">
      {/* Top Banner */}
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
        <p>
          Exclusive Price Drop! Hurry,{" "}
          <span className="underline underline-offset-2">Offer Ends Soon!</span>
        </p>
      </div>

      {/* Navbar */}
      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow-sm">
        <Link href="#">
          <img
            className="h-9"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
            alt="Logo"
          />
        </Link>

        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Portfolio</Link></li>
          <li><Link href="/trust-pay">Load Game</Link></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4 ml-10">
        <button className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all">
          Get started
        </button>

        <button
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            setIsMenuOpen(false);
          }}
          className={`gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden bg-white shadow-sm p-6">
          <ul className="flex flex-col space-y-4 text-lg text-black">
            <li><Link href="#" className="text-sm">Home</Link></li>
            <li><Link href="#" className="text-sm">Services</Link></li>
            <li><Link href="#" className="text-sm">Portfolio</Link></li>
            <li><Link href="#" className="text-sm">Pricing</Link></li>
          </ul>

          <button
            type="button"
            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Get started
          </button>

          <button
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            setIsMenuOpen(false);
          }}
          className={`gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        </div>
      )}

     
    </div>
  );
}
