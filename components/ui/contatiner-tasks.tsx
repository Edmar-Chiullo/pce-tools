'use client'

import { useState } from "react";
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
import { finishActivity } from "@/lib/firebase/server-database";

const formSchema = z.object({
  pesquisar: z.string().min(2, {
    message: "Inserir data a ser consultada.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ContainerTasks({ props }: { props: ActivityProps[] }) {
    const [ btnConfirm, setBtnPopUp ] = useState(false)
    const [ task, setTask] = useState<ActivityProps>()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pesquisar: "",
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

    if (!item) {
      console.error(`Atividade com ID ${activityId} não encontrada.`);
      return;
    }

    const result = importXLSX(item, activityName)
    
    if (result === null) {
      setBtnPopUp(true)
      setTask(item)
    }
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

  const onSubmit = (data: FormSchemaType) => {
    const initCharAddress = data.pesquisar.trim().toUpperCase().slice(0, 2);
    const isValid = validAddress(initCharAddress);

    if (!isValid) {
      alert('Código inserido não é válido.');
      return;
    }
  };

  return (
    <div className="relative flex justify-between w-full h-full">
        {
          btnConfirm && <Alert title="Tarefa em execução" description="Deseja finalizar?" acao="Deseja finalizar?" close={closePopUp} finish={finishTask}/>
        }
      <div className="flex flex-col justify-between gap-5 w-[64%] p-1">
        <div className="flex justify-end items-start w-full h-12 px-28">
          <h1 className="text-3xl text-zinc-50">PCE TOOLS</h1>
        </div>
        <div className="box-activity flex w-[100%] flex-col justify-end gap-1 bg-zinc-100 p-2 rounded-2xl">
          <div className="flex justify-between w-full h-9">
            <h1 className="ml-2 self-end">Atividades em execução</h1>
            <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-1 pr-1">
                <input
                  type="text"
                  placeholder="Insira o código"
                  {...form.register("pesquisar")}
                  className="input-quary rounded-sm h-8 p-1 bg-zinc-50"
                />
                <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm">
                  <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto" />
                </button>
              </form>
            </div>
          </div>
          <ScrollArea className="flex flex-col h-[440px] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">
            {props && props.map(({ activity }:any, i) => {
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
      <div className="self-end flex flex-col gap-1 w-[35%] h-[500px] bg-zinc-100 p-2 rounded-2xl">
        <div className="flex justify-start items-end w-full h-9">
          <h1 className="">Ferramentas</h1>
        </div>
        <div className="flex flex-col gap-1 w-full h-[89%] bg-zinc-500/10 rounded-md p-1">
          <Link href={'/pages/home/pcetools/print-barcode'}>
            <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] hover:cursor-pointer text-zinc-50">COD. BARRAS</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}









// 'use client'

// import { ReactNode, useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useForm } from "react-hook-form";
// import { ActivityProps } from "@/app/interface/interface";
// import { fullDatePrint, hourPrint } from "@/utils/date-generate";
// import { validAddress } from "@/utils/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Link from "next/link";

// import { exportFileXlsx } from "@/utils/ger-xlsx";
// import { trackEndNull, trackEndProd, trackFractional, trackPickingRotation } from "@/utils/treatment-data-print";
// import { getElementId, getElementTask } from "@/utils/get-elementHtml";

// const formSchema = z.object({
//     pesquisar: z.string().min(2, {
//         message: "Inserir data a ser consultada.",
//     }),
// })

// export default function ContainerTasks({ props }: {props: ActivityProps[]}) {
//     const [ statusTasks, setStatusTasks ] = useState<string>('')
  

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//         pesquisar: "",
//         },
//     })

//     function printExcel(element:any) {
//         const result = importXLSX(element)   
//     }

//     function importXLSX(element: ReactNode) {
//         const elementId = getElementId(element)
//         const elementTesk = getElementTask(element)

//         let tract
//         props.map((item:any) => {
//             const result = item.activity.activityID === elementId ? elementTesk : ''
//             switch (result) {
//                 case 'Aéreo vazio':
//                     tract = trackEndNull(item)
//                     if (!tract) return false
//                     exportFileXlsx(tract)
//                     return true
//                 case 'Validação endereço x produto':
//                     tract = trackEndProd(item)
//                     if (!tract) return null
//                     exportFileXlsx(tract)
//                 case 'Rotativo de picking':
//                     tract = trackPickingRotation(item)
//                     if (!tract) return null
//                     exportFileXlsx(tract)
//                     return true
//                 case 'Quarentena fracionada':
//                     tract = trackFractional(item)
//                     if (!tract) return null
//                     exportFileXlsx(tract)
//                     return true
//                 default:
//                     break
//             }
//         })
//     }

//     function onSubmit() {
//         const data:any = document.querySelector('.input-quary')

//         const initCharAddress = data.value.trim().toUpperCase().slice(0,2)
//         const prx = validAddress(initCharAddress)

//         if(!prx) {
//             alert('Código inserido não é válido.')
//             return
//         }
//     }

//     return (
//         <div className="flex justify-between w-full h-full">
//             <div className="flex flex-col justify-between gap-5 w-[64%] p-1">
//                 <div className="flex justify-end items-start w-full h-12">
//                     <h1 className="text-3xl text-zinc-50">PCE TOOLS</h1>
//                 </div>
//                 <div className="box-activity flex w-[100%] flex-col justify-end gap-1 bg-zinc-100 p-2 rounded-2xl">
//                     <div className="flex justify-between w-full h-9">
//                         <h1 className="ml-2 self-end">Atividades em execução</h1>
//                         <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-1 pr-1">           
//                                 <input type="text" placeholder="Insira o código" className="input-quary rounded-sm h-8 p-1 bg-zinc-50"/>
//                                 <button className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm" >
//                                     <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto"/>
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                     <ScrollArea className="flex flex-col h-[400px] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">           
//                         {       
//                             props && props.map(({activity}:any, i) => {
//                                 const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName } = activity 
//                                 let color = activityState ? 'bg-orange-100' : 'bg-green-100' 
//                                 let hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50' 
//                                 let status = activityState ? 'Executando' : 'Finalizado'
                                
//                                 return  (
//                                     <div key={activityID} className={`flex justify-between w-full h-12 mt-1 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
//                                         <div className="flex flex-col gap-1">
//                                             <div className="flex gap-4 font-light text-[14px]">
//                                                 <div className="flex gap-1">
//                                                     <span>Cod. Atividade:</span>
//                                                     <span>{activityID}</span> 
//                                                 </div>
//                                                 <div className="flex gap-1">
//                                                     <span>Data:</span>
//                                                     <span>{fullDatePrint(activityInitDate)}</span> 
//                                                 </div>
//                                                 <div className="flex gap-1">
//                                                     <span>Hora:</span>
//                                                     <span>{hourPrint(activityInitDate)}</span>                                             
//                                                 </div>
//                                                 <div className="flex gap-6">
//                                                     <span>{activityLocalWork}</span>   
//                                                     <span>{}</span>                                          
//                                                 </div>
//                                             </div>
//                                             <div className="nameOperator flex gap-6">
//                                                 <div className="flex gap-1">
//                                                     <span>Colaborador:</span>
//                                                     <h1>{activtyUserName}</h1>
//                                                 </div>
//                                                 <div className="flex gap-1">
//                                                     <span>Atividade:</span>
//                                                     <span>{activityName}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <button className="self-center w-20 h-8 text-[12px] rounded-md cursor-pointer hover:scale-[1.04] bg-zinc-950 text-zinc-100" onClick={(element) => printExcel(element)}>{status}</button>
//                                     </div>
//                                 )                    
//                             })
//                         }
//                     </ScrollArea>
//                 </div>
//             </div>
//             <div className="self-end flex flex-col gap-1 w-[35%] h-[460px] bg-zinc-100 p-2 rounded-2xl">
//                 <div className="flex justify-start items-end w-full h-9">
//                     <h1 className="">Ferramentas</h1>
//                 </div>
//                 <div className="flex flex-col gap-1 w-full h-[89%] bg-zinc-500/10 rounded-md p-1">
//                     <Link href={'/pages/home/pcetools/print-barcode'}>
//                         <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] hover:cursor-pointer text-zinc-50">COD. BARRAS</h1>            
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }