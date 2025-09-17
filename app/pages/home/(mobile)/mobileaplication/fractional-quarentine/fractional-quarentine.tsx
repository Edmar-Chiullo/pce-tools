'use client'

import { useActionState, useEffect, useState } from "react"
import { setTaskActivity, finishActivity } from "@/lib/firebase/server-database"
import z from "zod"

type ActivityData = {
  activityFinisDate?: string
  activityID?: string
  activityInitDate?: string
  activityLocalWork?: string
  activityName?: string
  activitySide?: string
  activityState?: string
  activityStreet?: string
  activityTasks?: string
  activityUserID?: string
  activtyUserName?: string
}

export default function FractionalQuarentine({ activity }: { activity: ActivityData | any }) {
  
  const [errorMessage, formAction, isPending] = useActionState(setTaskActivity, undefined)
  const [productError, setProductError] = useState<string | null>(null)
  const [statusBtn, setStatuBtn] = useState<boolean>(false)
  const [validError, setValidError] = useState<string | null>(null)

  const validSectors = ["PP", "FR", "TP", "FB", "BL", "CF"]
  const validSides = ["A", "B"]

  // Schemas Zod
  const addressSchema = z.string().refine((val) => {
    if (val.length !== 9) return false
    const sector = val.slice(0, 2)
    const street = Number(val.slice(2, 4))
    const block = Number(val.slice(4, 7))
    const floor = Number(val.slice(7, 8))
    const side = val.slice(8, 9)

    return (
      validSectors.includes(sector) &&
      street >= 1 && street <= 52 &&
      block >= 1 && block <= 260 &&
      floor >= 0 && floor <= 5 &&
      validSides.includes(side)
    )
  }, "Endereço inválido (ex: PP010010A)")

  const productSchema = z.string().regex(/^\d{4,13}$/, "Produto inválido (4 ou 13 dígitos)")
  const quantSchema = z.preprocess(val => Number(val), z.number().min(0).max(1000000, "Quantidade inválida"))
  const validSchema = z.string().regex(/^\d{8}$/, "Validade inválida (ex: 16092025)")

  useEffect(() => {
    const inputEnd:any = document.querySelector('.loadProduct')
    inputEnd.focus()
  }, [])

  useEffect(() => {
    const inputEnd:any = document.querySelector('.loadProduct')
    inputEnd.focus()
  }, [isPending])

  function getActivity(act: ActivityData) {
    const atividadeData = {
      activityID: activity.activityID,
      activityName: activity.activityName,
    }

    finishActivity(atividadeData)

    window.location.reload()
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = productSchema.safeParse(e.target.value)
    const inputEnd:any = document.querySelector('.loadProduct')
    if (!result.success) inputEnd.focus()
    setProductError(result.success ? null : result.error.issues[0].message)
  }

  const handleValidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validSchema.safeParse(e.target.value)
    const inputEnd:any = document.querySelector('.loadValid')
    if (!result.success) inputEnd.focus()
    if (result.success) setStatuBtn(false)
    setValidError(result.success ? null : result.error.issues[0].message)
  }

  const handleValidFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = validSchema.safeParse(e.target.value)
    const inputEnd:any = document.querySelector('.loadValid')
    setStatuBtn(true)
    setValidError(result.success ? null : result.error.issues[0].message)
  }

  return (
    <div className="absolute flex flex-col gap-4 items-center justify-start w-full h-full p-4">
      <h1 className="md:text-xl lg:text-2xl">Quarentena Fracionada</h1>
      <span className="self-end">{activity.activityID}</span>
      <form action={formAction} className="flex flex-col gap-6 w-full md:gap-10">
        <input type="text" onBlur={handleProductChange} placeholder="Leia o produto" name="loadProduct" className="loadProduct w-full border rounded-sm p-2" required/>
        {productError && <p className="text-red-500 text-sm">{productError}</p>}
        <input type="text" placeholder="Informe a quantidade" name="loadQuant" className="w-full border rounded-sm p-2" required/>
        <input type="text" onChange={handleValidChange} onFocus={handleValidFocus} placeholder="Informe a validade" name="loadValid" className="loadValid w-full border rounded-sm p-2" required/>
        {validError && <p className="text-red-500 text-sm">{validError}</p>}
        <input type="hidden" name="activityID" defaultValue={activity?.activityID ?? ""} />
        <input type="hidden" name="activityName" defaultValue={activity?.activityName ?? ""} />
        <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm" disabled={statusBtn}>
          {isPending ? "Confirmando..." : "Confirmar"}
        </button>
      </form>
      <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm" disabled={statusBtn}>
        Finalizar
      </button>
       {errorMessage && (
          <p className="flex text-red-500 mt-4">{errorMessage}</p>
        )}
    </div>
  );
}
