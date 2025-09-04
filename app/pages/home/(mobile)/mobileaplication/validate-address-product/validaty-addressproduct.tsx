'use client'

import { useActionState } from "react"
import { setTaskActivity, finishActivity } from "@/lib/firebase/server-database"

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

export default function ValidatyAddressProduct({ activity }: { activity: ActivityData | any }) {
  
    const [errorMessage, formAction, isPending] = useActionState(setTaskActivity, undefined)
  
    function getActivity(act: ActivityData) {
      const atividadeData = {
        activityID: activity.activityID,
        activityName: activity.activityName,
      }
  
      finishActivity(atividadeData)
  
      window.location.reload()
    }

  return (
    <div className="absolute flex flex-col gap-4 items-center justify-start w-full h-full p-4">
      <h1 className="md:text-xl lg:text-2xl">Produto x Endereço</h1>
      <form action={formAction} className="flex flex-col gap-6 w-full md:gap-10">
        <input type="text" placeholder="Leia o endereço" name="loadAddress" className="w-full border rounded-sm p-2"/>
        <input type="text" placeholder="Leia o produto" name="loadProduct" className="w-full border rounded-sm p-2"/>
        <input type="hidden" name="activityID" defaultValue={activity?.activityID ?? ""} />
        <input type="hidden" name="activityName" defaultValue={activity?.activityName ?? ""} />

        <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
          {isPending ? "Confirmando..." : "Confirmar"}
        </button>
      </form>

      <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
        Finalizar
      </button>
             {errorMessage && (
          <p className="flex text-red-500 mt-4">{errorMessage}</p>
        )}

    </div>
  );
}
