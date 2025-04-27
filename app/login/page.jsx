"use client";

import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi"; // <-- import icons
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Registering:", email, password);
      // Call your Register API here
    } else {
      console.log("Logging in:", email, password);
      // Call your Login API here
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-8"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid #9b9494",
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "var(--foreground)" }}
        >
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FiMail
              className="absolute top-5 left-3 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              placeholder="Email address"
              className="peer w-full rounded-lg border border-gray-300 bg-transparent pl-10 pt-5 pb-2 text-sm text-gray-900 dark:text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="email"
              className="absolute left-10 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock
              className="absolute top-5 left-3 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              placeholder="Password"
              className="peer w-full rounded-lg border border-gray-300 bg-transparent pl-10 pt-5 pb-2 text-sm text-gray-900 dark:text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="password"
              className="absolute left-10 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Password
            </label>
            {/* Toggle Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-5 right-3 text-gray-400 dark:text-gray-500"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          {isRegistering && (
            <div className="relative">
              <FiLock
                className="absolute top-5 left-3 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                id="confirmPassword"
                placeholder="Confirm Password"
                className="peer w-full rounded-lg border border-gray-300 bg-transparent pl-10 pt-5 pb-2 text-sm text-gray-900 dark:text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-10 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
              >
                Confirm Password
              </label>
              {/* Toggle Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-5 right-3 text-gray-400 dark:text-gray-500"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Switch Form */}
        <p
          className="mt-6 text-center text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="underline font-semibold text-purple-600 dark:text-purple-400"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
