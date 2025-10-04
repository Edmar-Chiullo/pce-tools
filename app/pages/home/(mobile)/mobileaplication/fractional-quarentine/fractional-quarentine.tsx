'use client'

import { finishActivity, pushTaskActivity } from "@/lib/firebase/server-database"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dateDb, fullDate, fullDatePrint } from "@/utils/date-generate"
import { formFrctionalQuaren } from "@/utils/form-schemas"
import { ActivityData } from "@/app/type/type"
import { push, ref, update } from "firebase/database"
import { db } from "@/app/firebase/fbkey"

export default function FractionalQuarentine({ activity }: { activity: ActivityData | any }) {
  const  { reset, register, handleSubmit, setFocus, formState: { errors } } = useForm<z.infer<typeof formFrctionalQuaren>>({
    resolver: zodResolver(formFrctionalQuaren),
    defaultValues: {
      activityID: activity?.activityID,
      activityName: activity?.activityName,
      loadProduct: "",
      loadQuant: "",
      loadValid: ""
    },
  })


  async function pushTaskActivity(values:any) {
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
  
  async function finishActivity(activity:any) {
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
  
  function getActivity(act: ActivityData) {
    const atividadeData = {
      activityUserCenter: activity.activityUserCenter,
      activityID: activity.activityID,
      activityName: activity.activityName,
      activityInitDate: activity.activityInitDate
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
        activityUserCenter: activity.activityUserCenter,
        activityID: values.activityID,
        activityName: values.activityName,
        loadProduct: values.loadProduct,
        loadQuant: values.loadQuant,
        loadValid: values.loadValid,
        activityDate: dateDb()
    }
    
    const result = await pushTaskActivity(data)
    setFocus("loadProduct")
  }

  return (
    <div className="absolute top-10 flex flex-col gap-2 w-full h-auto px-4">
      <h1 className="md:text-xl lg:text-2xl">Quarentena Fracionada</h1>
      <span className="self-end">{activity.activityID}</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full md:gap-4">
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
