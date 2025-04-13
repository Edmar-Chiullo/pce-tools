'use client'

import React, { useState, ReactNode, useEffect } from "react";

import { ActivityProps } from "../interface/interface";
import { Activity } from "../class/class-activity";
import { ActiviContext } from "./acitivy-context";

export const ActiviContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ atividade, setAtividade ] = useState<ActivityProps  | null>(null)
    
    return (
        <ActiviContext.Provider value={{ atividade, setAtividade }}>
            {children}
        </ActiviContext.Provider>
    )
}