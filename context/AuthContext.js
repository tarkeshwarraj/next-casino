"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await fetch("/api/auth/auth-check", { credentials: "include" });
      const data = await res.json();
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(data.user);
        localStorage.setItem("token", data.user.token);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token')
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //This is for LOGOUT
  const logout = async () => {   // cookies browser sa delete nhi ho rahi thi bcs route.js dane thi but mana logout.js name sa file banaya tha
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token')
  };

  useEffect(() => {
    const store = localStorage.getItem("token");
    if(store) {
      // setUser(JSON.parse(store));
      setIsLoggedIn(true);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
        isLoggedIn,
        user,
        loading,
        checkLogin, // ✅ Expose it to consumer
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
