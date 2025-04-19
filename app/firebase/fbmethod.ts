import { ActivityProps } from "../interface/interface";
import { db } from "./fbkey";
import { getDatabase, ref, child, get, onValue, set, connectDatabaseEmulator } from "firebase/database";

import { fullDate } from "@/utils/date-generate";

const re = ref(db)

// Get data.....
export async function getUser({...user}) {
    const result = get(child(re, `users/`)).then((snapshot) => {
      return snapshot.exists() ? snapshot.val() : "Usuário não encontrado!"
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

  set(ref(db,`activity/${activity.activityName}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/${activity.activityID}`), {
    activi: activity
  });
}
