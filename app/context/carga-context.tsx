'use client'

import { ReceiptProps } from "../interface/interface";
import { createContext, useContext } from "react";

interface ReceiptContextProps {
  receipt: ReceiptProps | null
  setReceipt: (receipt: ReceiptProps | null) => void;
}
//
export const ReceiptContext = createContext<ReceiptContextProps | null>(null);

export const useReceiptContext = () => {
  const context = useContext(ReceiptContext);
  
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};