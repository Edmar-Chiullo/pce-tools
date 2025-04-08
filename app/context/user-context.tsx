'use client'

import React from "react";

import { UserProps } from "@/app/interface/interface";
import { createContext, useContext } from "react";

interface LoginContextProps {
  user: UserProps | null
  setUser: (user: UserProps | null) => void;
}

export const LoginContext = createContext<LoginContextProps | null>(null);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};