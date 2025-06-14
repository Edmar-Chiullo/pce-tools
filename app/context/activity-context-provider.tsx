'use client'

import React, { useState, ReactNode } from "react";

import { ActivityProps } from "../interface/interface";
import { ActiviContext } from "./acitivy-context";

export const ActiviContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ atividade, setAtividade ] = useState<ActivityProps  | null>(null)
    
    return (
        <ActiviContext.Provider value={{ atividade, setAtividade }}>
            {children}
        </ActiviContext.Provider>
    )
}