import { ActivityProps, ReceiptMelloProps, ReceiptOperatorProps, ReceiptProps } from "../interface/interface";
import { db } from "./fbkey";
import { ref, child, get, onValue, set } from "firebase/database";

import { fullDate } from "@/utils/date-generate";

const re = ref(db)

// Get data....
export async function getUser(user:string) {
    const result = get(child(re, `users/${user}`)).then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : "Usuário não encontrado!"
    }).catch((error) => {
        return error
    })

    return result
}

export async function getTaskes({...tasks}) {

  const result = get(child(re, `activity/${tasks.descricao}/${tasks.dateAno}/${tasks.dateMes}/`)).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}

export async function getTaske({...tasks}) {  
  const result = get(child(re, `activity/${tasks.descricao}/${tasks.dateAno}/${tasks.dateMes}/${tasks.id}/`)).then((snapshot) => {
    
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}

export async function getReceipt() {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')
  const result = get(child(re, `activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)).then((snapshot) => {
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
  const result = get(child(re, `activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)).then((snapshot) => {
    return snapshot.exists() ? snapshot.val() : false
  }).catch((error) => {
      return error
  })

  return result
}


export async function getActivity(activity:any) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')
  
  const path = ref(db, `activity/${activity}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
  onValue(path, (snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return "No data available"
    }
  })
}

export async function getActivityTwo({...activity}:any) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')
  const result = get(child(re, `activity/${activity.task}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${activity.id}/`))
  .then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : console.log("Usuário não encontrado!")
  }).catch((error) => {
      return error
  })

  return result
}

// Set data......
export async function setActivityDb({...activity}:ActivityProps | undefined) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')

  // set(ref(db,`activity/${activity.activityName}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${activity.activityID}`), {
  //   activi: activity
  // });
}


export async function setBulkCpd({...carga}:ReceiptMelloProps | undefined) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')

  set(ref(db,`activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${carga.bulkId}`), {
    carga
  });
}


export async function upBulkCpd({...carga}:ReceiptProps | undefined) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')

  set(ref(db,`activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${carga.bulkId}`), {
    activi: carga
  });
}


export async function setBulkReceipt({...carga}:ReceiptOperatorProps | undefined) {
  const strDate = fullDate()
  .replace('/','')
  .replace('/','')

  set(ref(db,`activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${carga.bulkId}`), {
    activi: carga
  });
}
