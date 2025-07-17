'use client';
import React, { useState, useEffect, Suspense} from 'react';
import { FaGoogle, FaFacebookF, FaLock, FaGift } from 'react-icons/fa';
import {useSearchParams} from 'next/navigation';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';


export default function LoginPage() {
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout, checkLogin } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

    useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'signup') {
      setIsRegistering(true)
    }
  }, [searchParams])

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isRegistering) {
      if(password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      //Here You can call your api route to register user in DB
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });
      if(!res.ok) {
        alert("Signup failed");
        return;
      }
    }

    //Sign in after register or for login
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
      credentials: "include",
    });

    const data = await res.json();

    if(res.ok) {
      await checkLogin();
      router.push("/");
    }else{
      alert("Login failed");
    }
  };


  return (
    <div className="px-4 md:px-0 relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c143a] to-[#1a2b87] text-white overflow-hidden">
      
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <span className="absolute top-10 left-10 text-3xl opacity-10 animate-float">🎰</span>
        <span className="absolute top-20 right-12 text-2xl opacity-10 animate-float2">🎲</span>
        <span className="absolute bottom-16 left-20 text-2xl opacity-10 animate-float">💎</span>
        <span className="absolute bottom-10 right-16 text-3xl opacity-10 animate-float2">👑</span>
      </div>

      {/* Login/Register Card */}
      <div className="z-10 w-full max-w-md bg-[#1c2654]/50 backdrop-blur-md p-10 rounded-3xl border border-purple-500/30 ring-2 ring-purple-400/20 shadow-2xl animate-glow text-white">
        <h1 className="text-center text-3xl font-bold mb-2 text-yellow-400">👑 Royal Casino</h1>
        <p className="text-center text-gray-300 mb-6 text-sm">
          {isRegistering ? "Create your free account" : "Welcome back to luxury gaming"}
        </p>

        <h2 className="text-white text-lg font-semibold mb-4">
          {isRegistering ? "Register Your Account" : "Sign In to Your Account"}
        </h2>

        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-[#2c3866] text-white placeholder-gray-400 border border-[#3f4c7a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="🔒 Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-[#2c3866] text-white placeholder-gray-400 border border-[#3f4c7a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Confirm Password if Registering */}
          {isRegistering && (
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="🔒 Confirm your password"
                className="w-full px-4 py-2 rounded-full bg-[#2c3866] text-white placeholder-gray-400 border border-[#3f4c7a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}

          {/* Submit Button */}
          <button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 rounded-full font-bold text-black shadow-lg hover:shadow-yellow-500/40 hover:scale-105 transition-transform">
            {isRegistering ? "🎯 Sign Up & Play" : "🎮 Sign In & Play"}
          </button>

          {/* OR with Socials */}
          <div className="text-center text-sm text-gray-400">Or continue with</div>
          <div className="flex gap-3">
            <button 
            onClick={() => signIn('google')}
            className="flex-1 bg-[#121d3f] hover:bg-[#1f2a4d] py-2 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow-md">
              <FaGoogle /> Google
            </button>
            <button 
            onClick={() => signIn('facebook')}
            className="flex-1 bg-[#121d3f] hover:bg-[#1f2a4d] py-2 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow-md">
              <FaFacebookF /> Facebook
            </button>
          </div>

          {/* Toggle Mode */}
          <p className="text-center text-xs mt-4 text-gray-400">
            {isRegistering ? "Already have an account?" : "Don’t have an account?"}{' '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-yellow-400 font-bold hover:underline"
            >
              {isRegistering ? "Sign in now" : "Sign up now"}
            </button>
          </p>
        </div>
      </div>

      {/* Bottom Utility Buttons */}
      <div className="absolute bottom-8 flex gap-4 z-10 hidden">
        <button className="bg-[#1f2a4d] hover:bg-[#26346e] text-white px-5 py-2 rounded-full border border-white/10 text-sm flex items-center gap-2 shadow-md">
          <FaLock /> Secure Login
        </button>
        <button className="bg-[#1f2a4d] hover:bg-[#26346e] text-white px-5 py-2 rounded-full border border-white/10 text-sm flex items-center gap-2 shadow-md">
          💸 Instant Access
        </button>
        <div className="bg-[#1f2a4d] hover:bg-[#26346e] text-white px-5 py-2 border border-white/10 text-sm flex items-center gap-2 shadow-md">
          <FaGift /> Welcome Bonus
        </div>
      </div>
    </div>
  );
}
