'use client'

import React, { useState, ReactNode, useEffect } from "react";

import { UserProps } from "../interface/interface";
import { LoginContext } from "@/app/context/user-context";

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ user, setUser ] = useState<UserProps | null>(null)

     // Carrega os dados do Local Storage ao iniciar
     useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Atualiza o Local Storage sempre que o estado do usuário mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {children}
        </LoginContext.Provider>
    )
}