"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/login");
    } else {
      fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => {
          console.error(err);
          router.push("/login");
        });
    }
  }, []);

  if(!user) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return(
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4">Welcome, {user.email}</h1>
        <p className="mb-2">💰 Wallet Balance: ₹1000 (static)</p>
        <button
        onClick={() =>router.push('/games')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Play Game 🎲
        </button>
    </div>
  );
}
