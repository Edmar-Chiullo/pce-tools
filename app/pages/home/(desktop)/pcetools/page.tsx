'use client'

import { useEffect, useState } from "react"
import { db } from "@/app/firebase/fbkey";
import { ref, onChildChanged, DataSnapshot, onChildAdded } from "firebase/database";
import { fullDate } from "@/utils/date-generate"
import ContainerTasks from "@/components/ui/contatiner-tasks";
import { ActivityProps } from "@/app/interface/interface";

export default function Dashboard() {
    const [lists, setLists] = useState<ActivityProps[]>([]);
    const [ swap, setSwap ] = useState<any>() 
    
    useEffect(() => {
        if (swap) {
            const id = swap.activity.activityID;
            const state = swap.activity.activityState;
            setLists((t:any) => t.filter((task:any) => id !== task.activity.activityID))
            setLists(prevLists => [...prevLists, swap]); 
        }
    }, [swap])

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
        
                const indexTask = value.length -1
                const lestTask:any = value[indexTask]
                setSwap(lestTask)
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