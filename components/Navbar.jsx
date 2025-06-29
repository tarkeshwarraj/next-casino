"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--background", "rgb(13, 27, 42)");
      root.style.setProperty("--foreground", "#ededed");
    } else {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
    }
  }, [isDarkMode]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="bg-[#09102b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-xl font-bold text-yellow-400">Royal Casino</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link href="#" className="hover:text-yellow-300">Games</Link>
            <Link href="#" className="hover:text-yellow-300">Promotions</Link>
            <Link href="#" className="hover:text-yellow-300">VIP</Link>
            <Link href="#" className="hover:text-yellow-300">Support</Link>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex space-x-3">
            <button className="bg-yellow-400 px-4 py-1 rounded text-black font-semibold">Login</button>
            <button className="border border-yellow-400 px-4 py-1 rounded text-yellow-400 font-semibold">Sign Up</button>
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden text-yellow-400 text-xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden text-sm space-y-4 pb-4">
            <nav className="flex flex-col gap-2">
              <Link href="#" className="hover:text-yellow-300">Games</Link>
              <Link href="#" className="hover:text-yellow-300">Promotions</Link>
              <Link href="#" className="hover:text-yellow-300">VIP</Link>
              <Link href="#" className="hover:text-yellow-300">Support</Link>
            </nav>
            <div className="flex gap-2 pt-2">
              <button className="bg-yellow-400 w-full py-2 rounded text-black font-semibold">Login</button>
              <button className="border border-yellow-400 w-full py-2 rounded text-yellow-400 font-semibold">Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
