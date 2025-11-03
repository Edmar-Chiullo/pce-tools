'use client'

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { MagnifyingGlassIcon, PrinterIcon } from "@heroicons/react/20/solid";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";
import Timer from "@/components/ui/span";
import { getReceipt, getCargasLiberadas, setBulkCpd } from "@/lib/firebase/server-database";
import { handlePrint } from "@/utils/print";
import { extraction } from "@/utils/extract-carga";

import { exportFileXlsxRecebimento } from "@/utils/ger-xlsx";
import { cargaPrintXlsx } from "@/utils/treatment-data-print";

import ValidacaoCargaRetirada from "./validacao";
import { finishCarga } from "./finishCarga";
import { useSession } from "next-auth/react";
import { Bounce, toast, ToastContainer } from "react-toastify";


const formSchema = z.object({
  pesquisar: z.string().min(2, {
    message: "Inserir data a ser consultada.",
  }),
})
type UserData = {
    first: string
    center: string
}

// Component Login....
export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const [ varSwap, setVarSwap ] = useState<any[]>([])
  const [ stateSwap, setStateSwap ] = useState(false)
  const [ dataConfirm, setDataConfirm ] = useState(false)

  const [ cargaLiberar, setCargaLiberar ] = useState<any>()

  const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([]);
  const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([]);

  const [ query, setQuery ] = useState(false)

  const handleYellowTimeout = (bulkId: string) => setYellowTimeoutIds((prev) => [...prev, bulkId])
  const handleRedTimeout = (bulkId: string) => setRedTimeoutIds((prev) => [...prev, bulkId])
  
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        pesquisar: "",
      },
  })

  const { data: session, status } = useSession()
  const user: UserData | null = useMemo(() => {
      if (session?.user?.name) {
          try {
              return JSON.parse(session.user.name) as UserData
          } catch (error) {
              console.error("Erro ao fazer parse dos dados do usuário:", error)
              return null
          }
      }
      return null
  }, [session])
  
  useEffect(() => {
    getReceipt().then((val) => {
      const arr = Object.values(val)
      setBulk(arr)
    })

    const strDate = fullDate().replace(/\//g, "");
    const basePath = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento//`;

    const cargaReceipt = ref(db, basePath) 
      onChildAdded(cargaReceipt, (snapshot) => {
        if (snapshot.exists()) {
          const arr = snapshot.val();
          const { carga } = arr;

          setBulk((prev) => {
            const exists = prev.some((item) => item.carga.bulkId === carga.bulkId);
            if (!exists) {
              return [...prev, { carga }];
            }
            return prev;
          });
        }
      });  

    const alterCarga = ref(db, basePath)
      onChildChanged(alterCarga, (snapshot) => {
        if (snapshot.exists()) {
          const { carga } = snapshot.val();
          const id = carga.bulkId;
          setBulk((prev) =>
            prev.map((item) => item.carga.bulkId === id ? { carga } : item)
          );
        }
      });

  }, [status, user])

  function open(value: any) {
    const { carga } = extraction({value:value, bulk:bulk})
    handlePrint(carga)
  }

  function printXlsx() {
    const result:any = bulk.filter(({carga}:any) => carga.bulkStateConf === 'Finalizada divergente' || 
                                               carga.bulkStateConf === 'Finalizada sucesso')
    const cargas = result.map(({carga}:any) => carga)
    const dataPrint = cargaPrintXlsx(cargas) 
    if (stateSwap) setBulk(varSwap)
    exportFileXlsxRecebimento(dataPrint)

    setStateSwap(false)
  }

  function onSubmit(value:z.infer<typeof formSchema>) {
    getCargasLiberadas().then((val) => {
      const arr = Object.values(val)
      const result:any = arr.filter(({carga}:any) => carga.bulkId === value.pesquisar.toUpperCase())

      if (result[0] !== undefined) {
        if (result[0].carga.bulkStateConf !== 'Finalizada sucesso' && result[0].carga.bulkStateConf !== 'Finalizada divergente') {
          toast.warn('Carga pode não existir ou estar em processo de conferência.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return
        }
        if (result[0].carga.bulkStatusLeadTimeReceipt !== undefined && result[0].carga.bulkStatusLeadTimeReceipt !== 'no value') {
          toast.info('Carga pode não estar no recebimento.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return
        }
        setVarSwap(bulk)
        setBulk(result)
        setStateSwap(true)
      } else {
        toast.warn('Carga não encontrada.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        form.reset({
          pesquisar: ''
        })  
        return
      }
    })

    form.reset({
      pesquisar: ''
    })    
  }

  function cargaPuxada(value:any) {
    const val = value.target.innerText

    if (val === 'LIBERAR') {
      setDataConfirm(true)
      const parent = value.target.parentElement
      const element = bulk.filter(({carga}) => carga.bulkId === parent.id)
      const { carga } = element[0]
      const c = finishCarga(carga)
      setCargaLiberar(c)
      return
    }
   
    if (val === 'Sim') {
      setDataConfirm(false)
      setBulkCpd(cargaLiberar)
      return
    } else {
      setDataConfirm(false)
    }

  }
  
  return (
    <div className="main flex flex-col p-2 justify-end w-full h-[96%] rounded-2xl bg-zinc-800">
      <ToastContainer />
      <div className="flex justify-center items-center w-full h-6">
        <h1 className="text-3xl text-zinc-50">Cargas Finalizadas</h1>
      </div>
      <div className="relative flex justify-between items-start w-full py-1">
        <div onClick={printXlsx} className="self-end hover:scale-[1.10] cursor-pointer">
          <PrinterIcon className="size-6 text-zinc-50" />
        </div>
        {dataConfirm && <ValidacaoCargaRetirada props={cargaPuxada} />}
        <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-1 pr-1">           
              <input type="text" {...form.register("pesquisar")} placeholder="Insira o controle" className="input-quary rounded-sm h-8 p-1 bg-zinc-50"/>
              <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm" >
                  <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto"/>
              </button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="flex gap-9 w-full h-full">
        <div className="relative w-full h-full rounded-md bg-zinc-50">
          <div className="w-full bg-zinc-600 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-9 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Data</li>
              <li className="col-start-5 place-self-center">Hora</li>
              <li className="col-start-6 place-self-center">Tempo</li>
              <li className="col-start-7 place-self-center">Situação</li>
              <li className="col-start-8 place-self-end">Imprimir</li>
              <li className="col-start-9 place-self-center">Editar</li>
            </ul>
          </div>
          <ScrollArea className="w-full h-full">
            {
              bulk.map(({carga}, key) => {
                if ((carga.bulkStateConf === 'Finalizada sucesso' || carga.bulkStateCpd === 'liberar canhoto') && 
                    carga.bulkStatusLeadTimeReceipt === undefined || carga.bulkStatusLeadTimeReceipt === 'no value') return (
                  <div key={key} className={`flex items-center w-full h-7 p-1 rounded-[4px] mb-[1.50px] 
                    ${
                       redTimeoutIds.includes(carga.bulkId)
                      ? 'bg-red-400 hover:bg-red-500'
                      : yellowTimeoutIds.includes(carga.bulkId)
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-zinc-200 hover:bg-zinc-300'
                    }`                    
                  }>
                    <ul className="grid grid-cols-9 gap-10 text-[15px] w-full">
                      <li className="col-start-1 place-self-center">{carga.bulkId.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{hourPrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">
                        <Timer props={{
                          date: carga.bulkConfDate,
                          onYellowLimitReached: () => handleYellowTimeout(carga.bulkId),
                          onRedLimitReached: () => handleRedTimeout(carga.bulkId),
                          yellowLimitSeconds: 1800, 
                          redLimitSeconds: 3200 
                        }} />
                      </li>
                      <li id={carga.bulkId} className="col-start-7 place-self-center text-center w-48"> 
                          {carga.bulkStateConf.toUpperCase()}
                      </li>        
                      <li id={carga.bulkId} className="col-start-8 place-self-end">
                        <h1 onClick={(element) => cargaPuxada(element)} className="hover:scale-[1.01] hover:cursor-pointer bg-zinc-900 rounded-[4px] text-zinc-50 pl-2 pr-2">LIBERAR</h1>
                      </li>      
                      <li id={carga.bulkId} className="col-start-9 place-self-center">
                        <Image
                          onClick={(value) => open(value)}
                          className="cursor-pointer hover:scale-[1.10] mr-5"
                          src={'/impressora-com-papel.png'}
                          width={22}
                          height={22}
                          alt="icon impressora."
                        />
                      </li>
                    </ul>
                  </div>
                )
              })
            }
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
