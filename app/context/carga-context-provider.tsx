'use client'

import React, { useState, ReactNode } from "react";

import { ReceiptProps } from "../interface/interface";
import { ReceiptContext } from "./carga-context";

export const ReceiptContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ receipt, setReceipt ] = useState<ReceiptProps  | null>(null)
    
    return (
        <ReceiptContext.Provider value={{ receipt, setReceipt }}>
            {children}
        </ReceiptContext.Provider>
    )
}