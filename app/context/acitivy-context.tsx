'use client'

import { ActivityProps } from "../interface/interface";
import { Activity } from "../class/class-activity";
import { createContext, useContext } from "react";

interface ActiviContextProps {
  atividade: ActivityProps | Activity | null
  setAtividade: (activi: ActivityProps | Activity | null) => void;
}
//
export const ActiviContext = createContext<ActiviContextProps | null>(null);

export const useActiviContext = () => {
  const context = useContext(ActiviContext);
  
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};