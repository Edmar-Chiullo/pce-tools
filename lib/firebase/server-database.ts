'use server'

import { db } from "@/app/firebase/fbkey";
import { ref, set, push, update, child, get } from "firebase/database";

import { fullDate, dateDb, fullDatePrint } from "@/utils/date-generate";
import { ReceiptMelloProps, UserProps } from "@/app/interface/interface";
import { auth } from "@/auth";

const re = ref(db)

// Função dedicada a somente iniciar/gravar a tarefa no banco.
export async function setUsers(user:UserProps) {
      const path = `users/${user.userID}`;
    try {
        await update(ref(db), {
            [path]: user,
        });
        return 'Usuário criado com sucesso!'
    } catch(erro) {
        return 'Aldo deu errado!'
    }
}

// Função dedicada a somente iniciar/gravar a tarefa no banco.
export async function setActivityDb(activity:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    try {
        await set(ref(db,`${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/${activity?.activityName}/${activity?.activityID}`), {
            activity: activity
        });
        return 'Confirmado sussesso!'
    } catch (error) {
        return 'Aldo deu errado!'
    }
}

// Função auxiliar dedicada a lançar cada item da tarefa para o banco.
export async function pushTaskActivity(values:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')

    const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${values.activityUserCenter}/${values.activityName}/${values.activityID}/activity/activityTasks`;
    try {
        await push(ref(db, path, ), {
            activity: values
        });
        
        return {
            success: true,
            message: 'Dados salvo com sucesso.'
        }
    } catch(erro) {
        return {
            success: false,
            message: 'Falha gravar o endereço!'
        };
    }
}

// Função dedicada somente a finaização da atividade/tarefa.
export async function finishActivity(activity:any) {
    const strDate = fullDatePrint(activity.activityInitDate)
    .replace('/','')
    .replace('/','')

    const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/${activity.activityName}/${activity.activityID}/activity/activityFinisDate`;
    const pathState = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/${activity.activityName}/${activity.activityID}/activity/activityState`;
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

////////////////////////////////////////////////////////////////////////////////////

export async function setBulkCpd({...carga}:ReceiptMelloProps | undefined | any) {
  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
  const strDate = fullDate()
  
  .replace('/','')
  .replace('/','')

  set(ref(db,`${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user.center}/recebimento/${carga.bulkId}` ), {
    carga
  });
}

export async function setTaskActivity(
  prevState: string | undefined,
  formData: FormData
) {
  const values = Object.fromEntries(formData)
    // const prefix = values.activityID.slice(0,2)
    // if (prefix === 'RP') {
    //     // Validação Zod
    //     const parsed = taskSchema.safeParse(values)
    //     if (!parsed.success) {
    //       // Retorna mensagem de erro para o cliente
    //       return `Erro de validação: ${parsed.error.issues[0].message}`
    //     }        
    // }
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

export async function getReceipt() {
  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";

  const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento/`)).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}

export async function getReceiptById(id: string) {
  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";

  const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento/${id}`)).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}

export async function getCargasLiberadas() {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')

  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";

  const result = get(child(re, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento/`)).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}

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
    const session = await auth();
    const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
    
    const result = get(child(re, `${strDate.slice(4,8)}/${mesano}/${dia}/${user.center}/pce`))
    .then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : null
    }).catch((error) => {
        return error
    })

  return result
}