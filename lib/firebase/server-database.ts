'use server'

import { db } from "@/app/firebase/fbkey";
import { ref, set, push, update, child, get } from "firebase/database";

import { fullDate, dateDb } from "@/utils/date-generate";
import { HourTaskProps } from "@/app/interface/interface";
import z from "zod";


const re = ref(db)
// Função auxiliar

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
const validSectors = ["PP", "FR", "TP", "FB", "BL", "CF", "KK"]
const validSides = ["A", "B"]

const taskSchema = z.object({
    // valida ENDEREÇO    
    loadAddress: z.string().refine((val) => {
    if (val.length !== 9) return false // endereço sempre tem 9 caracteres

    const sector = val.slice(0, 2)
    const street = val.slice(2, 4)
    const block = val.slice(4, 7)
    const floor = val.slice(7, 8)
    const side = val.slice(8, 9)

    // valida SETOR
    if (!validSectors.includes(sector)) return false
    // valida RUA
    const streetNum = Number(street)
    if (isNaN(streetNum) || streetNum < 1 || streetNum > 52) return false
    // valida BLOCO
    const blockNum = Number(block)
    if (isNaN(blockNum) || blockNum < 1 || blockNum > 260) return false
    // valida ANDAR
    const floorNum = Number(floor)
    if (isNaN(floorNum) || floorNum < 0 || floorNum > 5) return false
    // valida LADO
    if (!validSides.includes(side)) return false

    return true
  }, "Endereço inválido. Ex: PP010010A"),

  loadProduct: z.string().regex(/^\d{4,14}$/, "Produto inválido (5 a 14 dígitos)"),
  loadQuant: z.preprocess(val => Number(val), z.number().min(0).max(1000000)),
  loadValid: z.string().regex(/^\d{8}$/, "Validade inválida (ex: 16092025)"),
  activityID: z.string(),
  activityName: z.string(),
})

export async function setTaskActivity(
  prevState: string | undefined,
  formData: FormData
) {
  // Converte FormData em objeto
  const values = Object.fromEntries(formData)


    const prefix = values.activityID.slice(0,2)
    if (prefix === 'RP') {
        // Validação Zod
        const parsed = taskSchema.safeParse(values)
        if (!parsed.success) {
          // Retorna mensagem de erro para o cliente
          return `Erro de validação: ${parsed.error.issues[0].message}`
        }        
    }

  const value = {
    data: formData,
    date: dateDb()
  }

  try {
    await pushTaskActivity(value)
  } catch (error) {
    return `Erro ao confirmar o lançamento. ${error}`
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

export async function getActivity(mesano: string, dia: string) {
  const result = get(child(re, `${strDate.slice(4,8)}/${mesano}/${dia}`))
  .then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : null
  }).catch((error) => {
      return error
  })

  return result
}