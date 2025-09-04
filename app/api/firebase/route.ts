'use server'

import { db } from "@/app/firebase/fbkey";
import { ref, set, push, update, child, get } from "firebase/database";
import { fullDate, dateDb } from "@/utils/date-generate";

const re = ref(db)

// Função dedicada a somente iniciar/gravar a tarefa no banco.
export async function setActivityDb(activity:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    
    try {
        await set(ref(db,`${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity?.activityName}/${activity?.activityID}`), {
            activity: activity
        });

        return true
    } catch (error) {
        return false
    }
}

// Função auxiliar dedicada a lançar cada item da tarefa para o banco.
export async function pushTaskActivity(data:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    console.log(data)
    const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${data.activityName}/${data.activityID}/activity/activityTasks`;
    try {  
        await push(ref(db, path, ), {
            activity: data
        });

        return true 
    } catch(erro) {
        return false
    }
}

// Função dedicada somente a finaização da atividade/tarefa.
export async function finishActivity(activity:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    
    const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityName}/${activity.activityID}/activity/activityFinisDate`;
    const pathState = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityName}/${activity.activityID}/activity/activityState`;
    
    try {          
        const date = dateDb()
        await update(ref(db), {
            [path]: date,
            [pathState]: false,
        });

        return true
    } catch(erro) {
        return false
    }
}   

//####################################################

// Açoes de busca no banco.

export async function getTaskes() {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    
    const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/`)).then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : false
    }).catch((error) => {
        return false
    })

  return result
}