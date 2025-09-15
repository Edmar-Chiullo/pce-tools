'use server'

import { db } from "@/app/firebase/fbkey";
import { ref, set, push, update, child, get } from "firebase/database";

import { fullDate, dateDb } from "@/utils/date-generate";
import { HourTaskProps } from "@/app/interface/interface";

const re = ref(db)
// Função auxiliar
function validAddress(address:any) {
    const prefix = [ 'PP', 'FR', 'TP', 'FB', 'BL', 'CF']
    const result = prefix.filter((pr) => pr === address)
    
    return result[0]
  }

// Função dedicada a somente iniciar/gravar a tarefa no banco.
export async function setActivityDb(activity:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    try {        
        await set(ref(db,`${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity?.activityName}/${activity?.activityID}`), {
            activity: activity
        });
        return 'Confirmado sussesso!'
    } catch (error) {
        return 'Aldo deu errado!'
    }
}

// Função auxiliar dedicada a lançar cada item da tarefa para o banco.
export async function pushTaskActivity(value:HourTaskProps) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')

    const fmData = value.data

    const data = {
        loadAddress: fmData.get("loadAddress") ?? null,
        activityID: fmData.get("activityID") ?? null,
        activityName: fmData.get("activityName") ?? null,
        loadProduct: fmData.get("loadProduct") ?? null,
        loadQuant: fmData.get("loadQuant") ?? null,   
        loadValid: fmData.get("loadValid") ?? null,
        activityDate: value.date
    }

    if (data.activityID === 'AV') {
        if (!data.activityID || !data.activityName || !data.loadAddress) {
            return {
                success: false,
                message: 'Dados incompletos. Por favor, preencha todos os campos.'
            };
        }
    }

    if (data.activityID?.slice(0,2) === 'RP') {
        if (!data.activityID || !data.activityName || !data.loadAddress || 
            !data.loadProduct || !data.loadQuant || !data.loadValid) {
            return {
                success: false,
                message: 'Dados incompletos. Por favor, preencha todos os campos.'
            };
        }
    }


    const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${data.activityName}/${data.activityID}/activity/activityTasks`;
    try {  
        await push(ref(db, path, ), {
            activity: data
        }); 
    } catch(erro) {
        return {
            success: false,
            message: 'Falha gravar o endereço!'
        };  

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
    } catch(erro) {
        return {
            success: false,
            message: 'Falha ao finalizar a atividade'
        };  
    }
}   

// Função auxiliar dedicada a lançar cada item da tarefa para o banco.
export async function setTaskActivity(
    prevState: string | undefined,
    formData: FormData,
) {
    const value = {
        data: formData,
        date: dateDb()
    }
    
    try {
        await pushTaskActivity(value)
    } catch (error) {
        return 'Confirmado com sussesso.'
    }
}

// Função auxiliar dedicada somente a finaização da atividade/tarefa.
export async function finishTask(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await finishActivity(formData)      
    } catch (error) {
        return 'Erro com sussesso.'
    }
}


//####################################################

// Açoes de busca no banco.

const strDate = fullDate().replace(/\//g, '');

export async function getTaskes() {
    const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/`)).then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : false
    }).catch((error) => {
        return error
    })

  return result
}

export async function getTask({...activity}:any) {
  const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityName}/${activity.id}/`))
  .then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : console.log("Usuário não encontrado!")
  }).catch((error) => {
      return error
  })

  return result
}

export async function getActivity(mouth: string) {
  const result = get(child(re, `${strDate.slice(4,8)}/${mouth}`))
  .then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : null
  }).catch((error) => {
      return error
  })

  return result
}