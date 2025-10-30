'use client'

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { ActivityProps } from "@/app/interface/interface";
import { dateDb, fullDatePrint, hourPrint } from "@/utils/date-generate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { trackEndNull, trackEndProd, trackFractional, trackPickingRotation } from "@/utils/treatment-data-print";
import Alert  from '@/components/ui/alertl'
import { getActivity } from "@/lib/firebase/server-database";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { ref, update } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

const formSchema = z.object({
  date: z.string()
});

type FormSchemaType = z.infer<typeof formSchema>;

type UserData = {
    first: string
    session: string
    center: string
}

export default function ContainerTasks({ activities, listSwap }: { activities: ActivityProps[], listSwap: ( listSwap: ActivityProps[]) => void}) {
  const [ btnConfirm, setBtnPopUp ] = useState(false)
  const [ userData, setUserData ] = useState<UserData>()
  const [ task, setTask] = useState<ActivityProps>()

   const { data: session, status } = useSession()

   const user: UserData | null = useMemo(() => {
       if (session?.user?.name) {
           try {
               setUserData(JSON.parse(session.user.name) as UserData)
               return JSON.parse(session.user.name) as UserData
           } catch (error) {
               console.error("Erro ao fazer parse dos dados do usuário:", error)
               return null
           }
       }
       return null
   }, [session])

  function formatDateTime() {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // pesquisar: "",
      date: formatDateTime()
    },
  });

  async function finishActivity(activity:any) {
      const strDate = fullDatePrint(activity.activityInitDate)
      .replace('/','')
      .replace('/','')
    
      const path = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/pce/${activity.activityName}/${activity.activityID}/activity/activityFinisDate`;
      const pathState = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${activity.activityUserCenter}/pce/${activity.activityName}/${activity.activityID}/activity/activityState`;
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

  const finishTask = () => {
    const { activity }:any = task

    finishActivity(activity)
    setBtnPopUp(false)
  }

  const closePopUp = (status: boolean) => {
    setBtnPopUp(status)
  }

  const printXLSX = (activityId: string, activityName: string) => {
    const item = activities.find((item:any) => item.activity.activityID === activityId);
    const { activity }:any = item
    
    if(activity.activityTasks === 'no value') {
      toast.warn('Tarefa não contém valores para serem importados.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return
    } 

    if (activity.activityState) {
      setBtnPopUp(true)
      setTask(item)
      return
    }

    if (!item) {
      console.error(`Atividade com ID ${activityId} não encontrada.`);
      return;
    }

    const result = importXLSX(item, activityName)
  } 

  const importXLSX = (item:ActivityProps, activityName: string) => {
    let track;
    switch (activityName) {
      case 'Aéreo vazio':
        track = trackEndNull(item);
        break;
      case 'Validação endereço x produto':
        track = trackEndProd(item);
        break;
      case 'Rotativo de picking':
        track = trackPickingRotation(item);
        break;
      case 'Quarentena fracionada':
        track = trackFractional(item);
        break;
      default:
        console.error('Tipo de atividade desconhecido:', activityName);
        return;
    }

    if (track) {
      exportFileXlsx(track);
    }

    if (!track) {
        return null
    }
  };

  const onSubmit = async (data: FormSchemaType) => {
    
    const date:any = data.date

    if (date.length === 10) {
      const dia = date.slice(8,10)
      const year = date.slice(0,4)
      const mouth = date.slice(5,7)
      const mesano = `${mouth}${year}`
      const result = await getActivity(mesano, dia)
     
      if (result) {
        const arr = Object.values(result)
        const arrList:ActivityProps[] = []
        for (const values of arr) {
          const tasks = Object.values(values as [])
          for (const task of tasks) {
            arrList.push(task)
          }
        }

        listSwap(arrList)
      } else {
        toast.warn('Não foi encontrada atividades para esse dia.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      return
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-end w-full h-full">
      {btnConfirm && <Alert title={'Tarefa em execução'} description={'Deseja finalizar a atividade?'} acao={''} close={closePopUp} finish={finishTask} />}
      <ToastContainer />
      <div className="flex justify-center items-start w-full py-2 px-28">
        <h1 className="text-3xl text-zinc-50">PCE Tools</h1>
      </div>
      <div className="flex items-end w-full h-full gap-3">
        <div className="flex justify-start w-[70%] h-full bg-zinc-100 p-2 rounded-2xl">
          <div className="flex flex-col w-full h-full justify-end gap-1 bg-zinc-100 p-2 rounded-2xl">
            <div className="flex justify-between w-full h-9">
              <h1 className="ml-2 self-end">Atividades em execução</h1>
              <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center w-56 gap-2 pr-1">
                  <input
                    type="date"
                    placeholder="Insira a data"
                    {...form.register("date")}
                    className="input-quary rounded-sm h-8 p-1 bg-zinc-50"
                  />
                  <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] transition-transform duration-100 ease-in-out rounded-sm">
                    <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto" />
                  </button>
                </form>
              </div>
            </div>
            <div>
          
            <ScrollArea className="flex lg:h-[420px] 2xl:h-[72vh] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">
              {activities && activities.map(({activity}:any, i) => {
                const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName } = activity;
                const color = activityState ? 'bg-orange-100' : 'bg-green-100';
                const hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50';
                const status = activityState ? 'Executando' : 'Finalizado';
              return (
                  <div key={i} className={`flex justify-between w-full h-12 mt-1 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-4 font-light text-[14px]">
                        <div className="flex gap-1">
                          <span>Cod. Atividade:</span>
                          <span>{activityID}</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Data:</span>
                          <span>{fullDatePrint(activityInitDate)}</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Hora:</span>
                          <span>{hourPrint(activityInitDate)}</span>
                        </div>
                      </div>
                      <div className="nameOperator flex gap-6">
                        <div className="flex gap-1">
                          <span>Colaborador:</span>
                          <h1>{activtyUserName}</h1>
                        </div>
                        <div className="flex gap-1">
                          <span>Atividade:</span>
                          <span>{activityName}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="self-center w-20 h-8 text-[12px] rounded-md cursor-pointer hover:scale-[1.03] transition-transform duration-100 ease-in-out bg-zinc-950 text-zinc-100"
                      onClick={() => printXLSX(activityID, activityName)}
                    >
                      {status}
                    </button>
                  </div>
                );
              })}
            </ScrollArea>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[35%] h-full 2xl:h-[80vh] bg-zinc-100 p-2 rounded-2xl">
          <div className="flex justify-start items-end w-full h-9">
            <h1 className="">Ferramentas</h1>
          </div>
          <div className="flex flex-col gap-1 w-full h-full bg-zinc-500/10 rounded-md p-1">
            <Link href={'/pages/home/pcetools/print-barcode'}>
              <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] transition-transform duration-400 ease-in-out hover:cursor-pointer text-zinc-50">FICHA PALLET</h1>
            </Link>
            <Link href={'/pages/home/gercode'}>
              <h1 className={clsx(`p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] transition-transform duration-400 ease-in-out hover:cursor-pointer text-zinc-50`, { 'hidden': userData?.first !== 'Claudinei X. Oliveira' })}>ETIQUETAS</h1>
            </Link>
            <Link href={'/pages/home/pcetools/create-json'}>
              <h1 className={clsx(`hidden p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] transition-transform duration-400 ease-in-out hover:cursor-pointer text-zinc-50`, { 'hidden': userData?.first !== 'Edmar Carlos' })}>Criar JSON</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
    )
}