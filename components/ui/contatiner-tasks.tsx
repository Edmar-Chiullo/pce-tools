'use client'

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { ActivityProps } from "@/app/interface/interface";
import { fullDatePrint, hourPrint } from "@/utils/date-generate";
import { validAddress } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { trackEndNull, trackEndProd, trackFractional, trackPickingRotation } from "@/utils/treatment-data-print";
import Alert  from '@/components/ui/alertl'
import { finishActivity, getActivity } from "@/lib/firebase/server-database";

const formSchema = z.object({
  // pesquisar: z.string().min(2, {
  //   message: "Inserir data a ser consultada.",
  // }),
  date: z.string()
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ContainerTasks({ props, listSwap }: { props: ActivityProps[], listSwap: ( listSwap: ActivityProps[]) => void}) {
  const [ btnConfirm, setBtnPopUp ] = useState(false)
  const [ task, setTask] = useState<ActivityProps>()
  const [ taskActivity, setTaskActivity] = useState<ActivityProps[]>([])

  useEffect(() => {
    setTaskActivity(props)
  }, [])

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

  const finishTask = () => {
    const { activity }:any = task

    finishActivity(activity)
    setBtnPopUp(false)
  }

  const closePopUp = (status: boolean) => {
    setBtnPopUp(status)
  }

  const printXLSX = (activityId: string, activityName: string) => {
    const item = props.find((item:any) => item.activity.activityID === activityId);
    const { activity }:any = item

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
    // const initCharAddress = data.pesquisar.trim().toUpperCase().slice(0, 2);
    // const isValid = validAddress(initCharAddress);

    // if (!isValid) {
    //   alert('Código inserido não é válido.');
    //   return;
    // }
    
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
        alert("Não há dados a serem mostrados.")
      }
    }
  };

  /***
 *<input
    type="text"
    placeholder="Insira o código"
    {...form.register("pesquisar")}
    className="input-quary rounded-sm h-8 p-1 bg-zinc-50"
  />

   */

  return (
    <div className="relative flex flex-col w-full h-full">
      {
        btnConfirm && <Alert title="Tarefa em execução" description="Deseja finalizar?" acao="Deseja finalizar?" close={closePopUp} finish={finishTask}/>
      }
      <div className="flex justify-center items-start w-full py-2 px-28">
        <h1 className="text-3xl text-zinc-50">PCE Tools</h1>
      </div>
      <div className="flex items-end w-full h-full gap-3">
        <div className="flex justify-start w-[70%] h-full">
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
                  <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm">
                    <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto" />
                  </button>
                </form>
              </div>
            </div>
            <div>

            <ScrollArea className="flex lg:h-[420px] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">
              {props && props.map(({activity}:any, i) => {
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
                        <div className="flex gap-6">
                          <span>{activityLocalWork}</span>
                          <span></span>
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
                      className="self-center w-20 h-8 text-[12px] rounded-md cursor-pointer hover:scale-[1.04] bg-zinc-950 text-zinc-100"
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
        <div className="flex flex-col gap-1 w-[35%] h-full bg-zinc-100 p-2 rounded-2xl">
          <div className="flex justify-start items-end w-full h-9">
            <h1 className="">Ferramentas</h1>
          </div>
          <div className="flex flex-col gap-1 w-full h-full bg-zinc-500/10 rounded-md p-1">
            <Link href={'/pages/home/pcetools/print-barcode'}>
              <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] hover:cursor-pointer text-zinc-50">COD. BARRAS</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}