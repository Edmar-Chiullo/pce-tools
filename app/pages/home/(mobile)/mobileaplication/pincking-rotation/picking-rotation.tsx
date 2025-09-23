
'use client'

import { useActionState, useState } from "react"
import { useEffect } from "react"
import { setTaskActivity, finishActivity, pushTaskActivity } from "@/lib/firebase/server-database"
import z from "zod"
import { useRouter } from "next/navigation"
import { dateDb } from "@/utils/date-generate"
import { formPickingRotation } from "@/utils/form-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

export default function PickingRotation({ activity }: { activity: ActivityData | any }) {

  const  { reset, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formPickingRotation>>({
    resolver: zodResolver(formPickingRotation),
    defaultValues: {
      activityID: activity?.activityID,
      activityName: activity?.activityName,
      loadAddress: "",
      loadProduct: "",
      loadQuant: "",
      loadValid: ""
    },
  })  

  const router = useRouter()

  useEffect(() => {
    const inputEnd:any = document.querySelector('.loadAddress')
    inputEnd.focus()
  }, [])

  function getActivity(act: ActivityData) {
    const atividadeData = {
      activityID: activity.activityID,
      activityName: activity.activityName,
    }

    finishActivity(atividadeData)

    window.location.reload()
  }

  async function onSubmit(values: z.infer<typeof formPickingRotation>) {

    reset({
      loadAddress: '',
      loadProduct: '',
      loadQuant: '',
      loadValid: '',
      activityID: activity?.activityID,
      activityName: activity?.activityName,
    })

      const data = {
        activityID: values.activityID,
        activityName: values.activityName,
        loadAddress: values.loadAddress,
        activityDate: dateDb()
    }
    
    const result = await pushTaskActivity(data)
  }

  return (
  
    <div className="absolute flex flex-col gap-1 items-center justify-start w-full h-full py-4 px-4">
      <h1 className="md:text-xl lg:text-2xl">Rotativo De Picking</h1>
      <span className="self-end">{activity.activityID}</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full md:gap-3">
        <div>
        <label htmlFor="">Endereço</label>
        <input type="text" placeholder="Leia o endereço" {...register("loadAddress", { required: true })} className="loadAddress w-full border rounded-sm p-2" />
        {errors.loadAddress && <span className="text-red-500 text-sm">{errors.loadAddress.message}</span>}
        </div>
       
       <div>
        <label htmlFor="">Produto</label>
        <input type="text" placeholder="Leia o produto" {...register("loadProduct", { required: true })} className="loadProduct w-full border rounded-sm p-2" />
        {errors.loadProduct && <span className="text-red-500 text-sm">{errors.loadProduct.message}</span>}
       </div>
       <div>
        <label htmlFor="">Quantidade</label>
        <input type="text" placeholder="Informe a quantidade" {...register("loadQuant", { required: true })} className="w-full border rounded-sm p-2" />
        {errors.loadQuant && <span className="text-red-500 text-sm">{errors.loadQuant.message}</span>}
       </div>

        <div>
          <label htmlFor="">Validade</label>
          <input type="text" placeholder="Informe a validade" {...register("loadValid", { required: true })} className="loadValid w-full border rounded-sm p-2" />
          {errors.loadValid && <span className="text-red-500 text-sm">{errors.loadValid.message}</span>}
        </div>
        
        <input type="hidden" name="activityID" defaultValue={activity?.activityID ?? ""} />
        <input type="hidden" name="activityName" defaultValue={activity?.activityName ?? ""} />

        <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
          Confirmar
        </button>
      </form>

      <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 mt-2 rounded-sm">
        Finalizar
      </button>
    </div>
  );
}
