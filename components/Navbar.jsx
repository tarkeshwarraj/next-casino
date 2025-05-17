"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
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

  return (
    <div className="relative text-sm text-white w-full">
      <nav className="relative h-[70px] flex items-center justify-between px-6 bg-white text-gray-900 shadow-sm"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <Link href="#">
          <img
            className="h-9"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
            alt="Logo"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 " style={{ color: "var(--foreground)" }}>
          <li className="px-6 py-2 rounded-full border border-gray-300 active:scale-95">
            <Link href="/">Home</Link>
          </li>
          <li className="px-6 py-2 rounded-full border border-gray-300 active:scale-95">
            <Link href="#">Games</Link>
          </li>
          <li className="px-6 py-2 rounded-full border border-gray-300 active:scale-95">
            <Link href="/trust-pay">Load Game</Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className=" hover:bg-gray-50 border border-gray-300 px-6 py-2 rounded-full active:scale-95 transition-all" style={{ color: "var(--foreground)" }}>
            Get started
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 active:scale-90 transition"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="currentColor"
            >
              <path
                d="M3 7h24M3 14h24M3 21h24"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Small Floating Mobile Menu */}
      {/* Container fixed top-right below navbar, small box with smooth slide */}
      {/* Mobile menu with smooth transition */}
      <div
        className={`fixed top-[70px] right-4 w-60 bg-white shadow-lg rounded-lg p-6 overflow-hidden transition-all duration-300 ease-in-out
    ${
      isMenuOpen
        ? "max-h-[400px] opacity-100 translate-x-0"
        : "max-h-0 opacity-0 translate-x-10 pointer-events-none"
    }`}
    style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <ul onClick={()=>{setIsMenuOpen(false)}} className="flex flex-col space-y-4 text-lg text-black" style={{ color: "var(--foreground)" }}>
          <li className="active:scale-95">
            <Link href="/" className="text-sm px-6 py-2 rounded-full border border-gray-300">
              Home
            </Link>
          </li>
          <li className="active:scale-95">
            <Link href="#" className="text-sm px-6 py-2 rounded-full border border-gray-300">
              Games
            </Link>
          </li>
          <li className="active:scale-95">
            <Link  href="/trust-pay" className="text-sm px-6 py-2 rounded-full border border-gray-300 " >Load Game</Link>
          </li>
        </ul>

        <button
          onClick={()=>{setIsMenuOpen(false)}}
          type="button"
          className=" text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-full h-11 rounded-full"
          style={{ color: "var(--foreground)" }}
        >
          Get started
        </button>

        <button
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            setIsMenuOpen(false);
          }}
          className={`gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 w-full mt-4 active:scale-95 ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200 border border-gray-300"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
