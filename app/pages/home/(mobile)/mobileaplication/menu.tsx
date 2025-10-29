'use client'

import { useState, useMemo, ReactNode } from "react"
import ValidatyAddressProduct from "./validate-address-product/validaty-addressproduct"
import HighNullRotation from "./high-rotation-null/highnull-rotatetion"
import PickingRotation from "./pincking-rotation/picking-rotation"
import FractionalQuarentine from "./fractional-quarentine/fractional-quarentine"
import { Activity } from "@/app/class/class-activity"
import { dateDb, fullDate } from "@/utils/date-generate"
import { ActivityProps } from "@/app/interface/interface"

//import { setActivityDb } from "@/lib/firebase/server-database"
import { ref, set } from "firebase/database"
import { db } from "@/app/firebase/fbkey"

type User = {
  first: string
  email: string
  name: string
  id: string
  role: string
}

type Step = "center" | "operation" | "street" | "side" | "confirm" | "running"

export default function NavigationMenu({ user }: { user: User }) {
  const atividade = useMemo(() => new Activity(user), [user])
  const [step, setStep] = useState<Step>("center")
  const [subtitle, setSubtitle] = useState("Selecione a operação")
  const [title, setTitle] = useState(true)
  const [activity, setActivity] = useState<ActivityProps>()
  const [currentForm, setCurrentForm] = useState<ReactNode | null>(null)

  const operations = {
    "Validação endereço x produto": {
      prefix: "VEP",
      form: <ValidatyAddressProduct activity={activity} />
    },
    "Aéreo vazio": {
      prefix: "AV",
      form: <HighNullRotation activity={activity} />
    },
    "Rotativo de picking": {
      prefix: "RP",
      form: <PickingRotation activity={activity} />
    },
    "Quarentena fracionada": {
      prefix: "PL",
      form: <FractionalQuarentine activity={activity} />
    }
  } as const

  function navigation(e: React.MouseEvent<HTMLButtonElement>) {
    setTitle(false)
    console.log(atividade)
    let content = e.currentTarget.innerText
    const userCenter = `Centro ${JSON.parse(user.name).center}`
    
    if (content.startsWith("PP")) content = "PP"

    if (content.startsWith("Ferramentas")) {
      atividade.updateLocalWork(userCenter)
      setStep("operation")
      setSubtitle("Selecione a operação")
      return
    }

    if (content in operations) {
      const { prefix } = operations[content as keyof typeof operations]
      atividade.updateId(prefix)
      atividade.updateName(content)
      setActivity(atividade)
      setStep("confirm")
      setSubtitle("")
    }
  }

  async function setActivityDb(activity:any) {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')
    try {
        await set(ref(db,`${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/pce/${activity?.activityName}/${activity?.activityID}`), {
            activity: activity
        });
        return 'Confirmado sussesso!'
    } catch (error) {
        return 'Aldo deu errado!'
    }
  }

  function startActivity() {
    if (!activity) return
    atividade.updateInitDate(dateDb())
    const { form } = operations[activity.activityName as keyof typeof operations]
    setCurrentForm(form)

    const atividadeData = {
        activityUserCenter: activity.activityUserCenter,
        activityID: atividade.activityID,
        activityName: atividade.activityName,
        activityLocalWork: atividade.activityLocalWork,
        activityInitDate: atividade.activityInitDate,
        activtyUserName: atividade.activtyUserName,
        activityUserID: atividade.activityUserID,
        activityState: true,
        activityTasks: 'no value',
        activityFinisDate: 'no value'    
  }
    setActivityDb(atividadeData)
    setStep("running")
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full py-10 px-4">
      {
        title &&
        <div className="flex items-center justify-center h-20">
          <h1><strong>OPERAÇÕES PCE</strong></h1>
        </div>
      }
      <div className="flex justify-start w-full p-1">
        <h1>{subtitle}</h1>
      </div>
      
      {step === "center" && (
        <div className="flex flex-col gap-2 w-full">
          <button onClick={navigation} className="bg-zinc-950 text-zinc-50 h-10 rounded-md">Ferramentas PCE</button>
        </div>
      )}

      {step === "operation" && (
        <div className="flex flex-col gap-2 w-full">
          {Object.keys(operations).map(op => (
            <button key={op} onClick={navigation} className="bg-zinc-950 text-zinc-50 h-10 rounded-md">{op}</button>
          ))}
        </div>
      )}

      {step === "confirm" && (
        <div className="flex flex-col gap-2 w-full h-full mt-6">
          <h1>Iniciar atividade?</h1>
          <button className="w-full text-lg font-light bg-zinc-950 text-zinc-50 h-10 rounded-md" onClick={startActivity}>
            Iniciar
          </button>
        </div>
      )}

      {step === "running" && currentForm}
    </div>
  )
}
