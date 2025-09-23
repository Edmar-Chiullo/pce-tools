'use client'

import { useEffect, useRef  } from "react"
import { setTaskActivity, finishActivity, pushTaskActivity } from "@/lib/firebase/server-database"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dateDb } from "@/utils/date-generate"
import { formFrctionalQuaren } from "@/utils/form-schemas"
import { ActivityData } from "@/app/type/type"



const validSectors = ["PP", "FR", "TP", "FB", "BL", "CF"]
const validSides = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


// const formSchema = z.string().refine((val) => {
//   if (val.length !== 9) return false
//   const sector = val.slice(0, 2)
//   const street = Number(val.slice(2, 4))
//   const block = Number(val.slice(4, 7))
//   const floor = Number(val.slice(7, 8))
//   const side = val.slice(8, 9)

//   return (
//     validSectors.includes(sector) &&
//     street >= 0 && street <= 52 &&
//     block >= 0 && block <= 260 &&
//     floor >= 0 && floor <= 5 &&
//     validSides.includes(side)
//   )
// }, "Endereço inválido (ex: PP010010A)")

export default function FractionalQuarentine({ activity }: { activity: ActivityData | any }) {
  const inputAddress = useRef(null); 
  const  { reset, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formFrctionalQuaren>>({
    resolver: zodResolver(formFrctionalQuaren),
    defaultValues: {
      activityID: activity?.activityID,
      activityName: activity?.activityName,
      loadProduct: "",
      loadQuant: "",
      loadValid: ""
    },
  })

  useEffect(() => {
    const inputEnd:any = document.querySelector('.loadProduct')
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

  async function onSubmit(values: z.infer<typeof formFrctionalQuaren>) {

    reset({
      loadProduct: '',
      loadQuant:  '',
      loadValid: '',
      activityID: activity?.activityID,
      activityName: activity?.activityName,
    })

     const data = {
        activityID: values.activityID,
        activityName: values.activityName,
        loadProduct: values.loadProduct,
        loadQuant: values.loadQuant,
        loadValid: values.loadValid,
        activityDate: dateDb()
    }
    
    const result = await pushTaskActivity(data)
  }

  return (
    <div className="absolute flex flex-col gap-4 items-center justify-start w-full h-full py-6 px-4">
      <h1 className="md:text-xl lg:text-2xl">Quarentena Fracionada</h1>
      <span className="self-end">{activity.activityID}</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full md:gap-4">
          <div>
            <label htmlFor="">Produto</label>
            <input type="text" placeholder="Leia o produto" {...register("loadProduct", { required: true })} className="loadProduct w-full border rounded-sm p-2"/>
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
         
          <input type="hidden" name="activityID"  />
          <input type="hidden" name="activityName" />
         
          <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
            Confirmar
          </button>
        </form>
        <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
          Finalizar
        </button>
    </div>
  );
}
