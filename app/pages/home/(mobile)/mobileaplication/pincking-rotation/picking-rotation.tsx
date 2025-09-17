
'use client'

  import { useActionState } from "react"
  import { useEffect } from "react"
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

  export default function PickingRotation({ activity }: { activity: ActivityData | any }) {

    const [errorMessage, formAction, isPending] = useActionState(setTaskActivity, undefined)

    useEffect(() => {
      const inputEnd:any = document.querySelector('.loadAddress')
      inputEnd.focus()
    }, [])

    useEffect(() => {
      const inputEnd:any = document.querySelector('.loadAddress')
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

    return (
    
      <div className="absolute flex flex-col items-center justify-start gap-2 w-full h-full p-8 md:p-4 ">
        <h1 className="md:text-xl lg:text-2xl">Rotativo De Picking</h1>
        <span className="self-end">{activity.activityID}</span>
        <form action={formAction} className="flex flex-col w-full gap-4 mb-2 md:gap-6">
          <input type="text" placeholder="Leia o endereço" name="loadAddress" className="loadAddress w-full border rounded-sm p-2" required/>
          <input type="text" placeholder="Leia o produto" name="loadProduct" className="w-full border rounded-sm p-2" required/>
          <input type="text" placeholder="Informe a quantidade" name="loadQuant" className="w-full border rounded-sm p-2" required/>
          <input type="text" placeholder="Informe a validade" name="loadValid" className="w-full border rounded-sm p-2" required/>
          <input type="hidden" name="activityID" defaultValue={activity?.activityID ?? ""} />
          <input type="hidden" name="activityName" defaultValue={activity?.activityName ?? ""} />

          <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
            {isPending ? "Confirmando..." : "Confirmar"}
          </button>
        </form>

        <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm">
          Finalizar
        </button>
          {
              errorMessage && (
                <p className={`flex text-red-500 mt-4`}>{errorMessage}</p>
            )
          }
      </div>
    );
  }
