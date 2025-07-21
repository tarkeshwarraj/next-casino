'use client';

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [info, setInfo] = useState(null);
    const [gamingAccounts, setGamingAccounts] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [loadingGamingAccounts, setLoadingGamingAccounts] = useState(true);

    //User info fetch on login
    const fetchUserInfo = async () => {
        setLoadingGamingAccounts(true);
        try{
            const res = await fetch('/api/user/info');
            const data = await res.json();
            setInfo(data);
        }catch (err) {
            console.log("Error fetching user info:", err);
        }finally{
            setLoadingInfo(false);
        }
    };

    //Gaming Accounts fetch on demand
    const fetchGamingAccounts = async () => {
        //If already loaded, no need to fetch again
        if(gamingAccounts) return;

        setLoadingGamingAccounts(true);

        try{
            const res = await fetch('/api/user/gaming-accounts');
            const data = await res.json();
            setGamingAccounts(data);
        }catch(err){
            console.log("Error fetching gaming accounts:", err);

        }finally {
            setLoadingGamingAccounts(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    },[]);

    return (
        <UserContext.Provider value={{info, gamingAccounts, loadingInfo, loadingGamingAccounts, fetchGamingAccounts}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);