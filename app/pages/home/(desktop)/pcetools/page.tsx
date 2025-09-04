'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { db } from "@/app/firebase/fbkey";
import { ref, onChildChanged, DataSnapshot, onChildAdded } from "firebase/database";

import { fullDate } from "@/utils/date-generate"

import ContainerTasks from "@/components/ui/contatiner-tasks";
import { ActivityProps } from "@/app/interface/interface";

export default function Dashboard() {
    const [lists, setLists] = useState<ActivityProps[]>([]);

    useEffect(() => {
        const strDate = fullDate().replace(/\//g, '');
        const dbPath = `${strDate.slice(4, 8)}/${strDate.slice(2, 8)}/${strDate.slice(0, 2)}/`;
        const dbRef = ref(db, dbPath);

        const unsubscribeAdd = onChildAdded(dbRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const value = Object.values(snapshot.val())
                for (const task of value) {
                    const t:any = task
                    setLists(prevLists => [...prevLists, t]); 
                }                 
            }
        });

        const unsubscribeChange = onChildChanged(dbRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const value = Object.values(snapshot.val())
                let val:ActivityProps | any = []; 
        
                for (const task of value) {
                    const t:any = task
                    val.push(task) 
                }      
                setLists(val)
            }
        });

        return () => {
            unsubscribeAdd();
            unsubscribeChange();
        };

    }, []);
   
    return (
        <div className="flex w-full h-full items-end p-2 rounded-2xl bg-zinc-800">
            <ContainerTasks props={lists}/>
        </div>
    )
}