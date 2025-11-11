'use client'

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react";
import { db } from "@/app/firebase/fbkey";
import { ref, onChildChanged, DataSnapshot, onChildAdded } from "firebase/database";
import { fullDate } from "@/utils/date-generate"
import ContainerTasks from "@/components/ui/contatiner-tasks";
import { ActivityProps } from "@/app/interface/interface";

type UserData = {
    first: string
    center: string
}

type ActiviProps = {
    activity: ActivityProps
}

export default function Dashboard() {
    const [lists, setLists] = useState<ActivityProps[]>([]);
    const [ swap, setSwap ] = useState< ActiviProps | null>() 
    const { data: session, status } = useSession()

    const user: UserData | null = useMemo(() => {
        if (session?.user?.name) {
            try {
                return JSON.parse(session.user.name) as UserData
            } catch (error) {
                console.error("Erro ao fazer parse dos dados do usuário:", error)
                return null
            }
        }
        return null
    }, [session])
   
    useEffect(() => {
        if (swap) {
            const id = swap?.activity.activityID
            setLists((taskElement:any) => {
                const filteredLists = taskElement.filter((task:any) => id !== task.activity.activityID)
                return [...filteredLists, swap]
            })  
            
            setSwap(null)
        }
    }, [swap])

    useEffect(() => {    
        const strDate = fullDate().replace(/\//g, '');
        const dbPath = `${strDate.slice(4, 8)}/${strDate.slice(2, 8)}/${strDate.slice(0, 2)}/${user?.center}/pce`;
        const dbRef = ref(db, dbPath);

        let initialActivities: ActivityProps[] = []

        const unsubscribeAdd = onChildAdded(dbRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const values = snapshot.val() 

                Object.values(values).forEach(task => {
                    initialActivities.push(task as ActivityProps)
                })
                setLists(initialActivities)
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

    }, [status, user]);

    function listSwap(list: ActivityProps[]): void {
        setLists(list)
    }

    return (
        <div className="flex w-full h-full py-1 px-2 rounded-2xl bg-zinc-800">
            <ContainerTasks activities={lists} listSwap={listSwap}/>
        </div>
    )
}