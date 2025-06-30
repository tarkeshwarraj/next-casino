"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="bg-gradient-to-r from-[#0c0f24] to-[#121a36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <header className="flex justify-between items-center py-6">
          <h1
            className="text-xl font-bold text-[#FFD700] cursor-pointer hover:text-yellow-400 transition-colors duration-200"
            onClick={() => {
              router.push("/"); 
              setIsMenuOpen(false);
            }}
          >
            Royal Casino
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-200">
            <Link href="/games" className="hover:text-[#FACC15] transition-colors">
              Games
            </Link>
            <Link href="/promotions" className="hover:text-[#FACC15] transition-colors">
              Promotions
            </Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">
              VIP
            </Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">
              Support
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            <button
              className="cursor-pointer bg-[#f7c948] text-black font-bold px-6 py-2 rounded-full hover:brightness-110 transition-all shadow-lg "
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="cursor-pointer border border-[#f7c948] text-[#f7c948] font-bold px-6 py-2 rounded-full hover:bg-[#f7c948] hover:text-black transition-all shadow-md"
              onClick={() => router.push("/login?mode=signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#FFD700] text-xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden text-sm space-y-4 pb-4 text-gray-200">
            <nav className="flex flex-col gap-2" >
              <Link href="/games" onClick={() => {
                  setIsMenuOpen(false);}} className="hover:text-[#FACC15]">
                Games
              </Link>
              <Link href="/promotions" onClick={() => {
                  setIsMenuOpen(false);}} className="hover:text-[#FACC15]">
                Promotions
              </Link>
              <Link href="#" onClick={() => {
                  setIsMenuOpen(false);}} className="hover:text-[#FACC15]">
                VIP
              </Link>
              <Link href="#" onClick={() => {
                  setIsMenuOpen(false);}} className="hover:text-[#FACC15]">
                Support
              </Link>
            </nav>
            <div className="flex flex-col gap-3 pt-4">
              <button
                className="cursor-pointer bg-[#f7c948] text-black font-bold px-6 py-2 rounded-full hover:brightness-110 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/login");
                }}
              >
                Login
              </button>
              <button
                className="cursor-pointer border border-[#f7c948] text-[#f7c948] font-bold px-6 py-2 rounded-full hover:bg-[#f7c948] hover:text-black transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/login?mode=signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
