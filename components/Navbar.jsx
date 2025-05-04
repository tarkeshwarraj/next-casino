"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); //null = Loading
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

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
    //Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Optional: You can show nothing or a loading spinner while checking login
  if (isLoggedIn === null) return null;

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className={`flex justify-between items-center py-6 px-8 border-b ${
        isDarkMode ? "dark:border-gray-800" : " border-gray-200"
      } relative`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Casino 🎲
      </Link>

      {/* Desktop Menu */}
      <div className="space-x-6 hidden md:flex items-center">
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

        <Link href="/deposit-withdraw">
          <button
            className="relative inline-flex items-center justify-center py-3 overflow-hidden font-bold rounded-full group transition-all"
            style={{ color: "var(--foreground)" }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-300 blur-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50"></span>
            <span className="relative">Deposit</span>
          </button>
        </Link>

        {isLoggedIn && (
          <Link href="/dashboard" className="text-blue-500">
            Go to Dashboard
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button
              className="gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600"
              style={{ color: "var(--foreground)" }}
            >
              Login
            </button>
          </Link>
        )}

        {/* Login Button */}

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

      {/* Mobile Menu Button (Animated Hamburger) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-8 h-8 flex flex-col justify-between items-center group"
        >
          {/* Line 1 */}
          <span
            className={`block h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-3" : ""
            }`}
            style={{ color: "var(--foreground)" }}
          ></span>
          {/* Line 2 */}
          <span
            className={`block h-0.5 w-8 bg-current transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : ""
            }`}
            style={{ color: "var(--foreground)" }}
          ></span>
          {/* Line 3 */}
          <span
            className={`block h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-3" : ""
            }`}
            style={{ color: "var(--foreground)" }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 right-8 rounded-lg shadow-lg flex flex-col items-start p-8 space-y-4 md:hidden z-50 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
        style={{
          backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff",
          color: isDarkMode ? "#ededed" : "#171717",
          border: "1px solid #e0e0e0",
        }}
      >
        <a
          href="#features"
          onClick={() => setIsMenuOpen(false)}
          className="hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          Features
        </a>

        <a
          href="#play"
          onClick={() => setIsMenuOpen(false)}
          className="hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          Play Now
        </a>

        <Link href="/deposit-withdraw" onClick={() => setIsMenuOpen(false)}>
          <button
            className="relative inline-flex items-center justify-center overflow-hidden font-bold rounded-full group transition-all"
            style={{ color: "var(--foreground)" }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-300 blur-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50"></span>
            <span className="relative">Deposit</span>
          </button>
        </Link>

        {/* Login Button in Mobile Menu */}

        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
          <button
            className="gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600"
            style={{ color: "var(--foreground)" }}
          >
            Login/SignUp
          </button>
        </Link>

        <button
          onClick={() => {
            toggleMode();
            setIsMenuOpen(false);
          }}
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
