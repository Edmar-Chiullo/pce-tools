'use client'

import { use, useMemo, useState } from "react";
import { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";
import { useSession } from "next-auth/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ReceiptProps } from "@/app/interface/interface";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { carga } from "@/app/pages/home/(desktop)/cpd/[id]/liberarcanhoto/carga";

const formSchema = z.object({
  pesquisar: z.string().min(2, {
    message: "Inserir com o nome do motorista.",
  }),
})

type UserData = {
    first: string
    session: string
    center: string
}

type Carga = {
  carga: ReceiptProps[]
}

export default function CanhotosLiberados({ props }: {props: Carga[]}) {
    const [ bulk, setBulk ] = useState<Carga[]>(props)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { data: session } = useSession()

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
        // props.length >= 2 ? setBulk(props) : setBulk([{ carga: props[0] } as any])
        setBulk(props)
    }, [props])

    useEffect(() => {
        console.log(bulk)
    }, [bulk])
    
    useEffect(() => {
        const strDate = fullDate().replace(/\//g, "");
        const basePath = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento/`;

        const cargaReceipt = ref(db, basePath) 
        onChildAdded(cargaReceipt, (snapshot) => {
            if (snapshot.exists()) {
            const arr = snapshot.val();
            const { carga } = arr;
           // setBulk((prev: any) => {
            //     const exists = prev.some((item:any) => item.carga.bulkId === carga.bulkId);
            //     if (!exists) {
            //     return [...prev, { carga }];
            //     }
            //     return prev;
            // });
            }
        });  

        const alterCarga = ref(db, basePath)
        onChildChanged(alterCarga, (snapshot) => {
            if (snapshot.exists()) {
            const { carga } = snapshot.val();
            const id = carga.bulkId;
            // setBulk((prev:any) =>
            //     prev.map((item:any) => item.carga.bulkId === id ? { carga } : item)
            // );
            }
        });

    }, [])

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
        params.set('query', term);
        } else {
        params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200)
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        pesquisar: "",
        },
    })

    function onSubmit(value:z.infer<typeof formSchema>) {
        //const listaDeCarga = Object.values(bulk)
        //const result = listaDeCarga.filter(({carga}:any) => carga.bulkId === value.pesquisar.toUpperCase())

        //if (result[0] !== undefined) {
        // if (result[0]?.carga.bulkStateCpd !== 'liberar canhoto') {
        //     toast.warn('Carga pode não existir ou estar em processo de conferência.', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     transition: Bounce,
        //     });

        //     form.reset({
        //     pesquisar: ''
        //     }) 

        //     return
        // }
        // } else {
        // toast.warn('Carga não encontrada.', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     transition: Bounce,
        // });

        form.reset({
            pesquisar: ''
        })  
        return
    }

    return (
        <div className="main flex flex-col justify-end p-2 w-full h-full rounded-2xl bg-zinc-800">
        <ToastContainer />
        <div className="flex justify-center items-center w-full">
            <h1 className="text-3xl text-zinc-50">Canhotos Liberados</h1>
        </div>
        <div className="flex justify-end w-full p-2">
            <div className="flex justify-between items-center gap-2 h-9 bg-zinc-50 rounded-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-2 pr-1">           
                    <input 
                        type="text" 
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('query')?.toString()}
                        placeholder="Insira o controle" 
                        className="input-quary rounded-sm h-8 p-1 bg-zinc-50"
                    />
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
                <ul className="grid grid-cols-7 gap-8 text-zinc-50">
                <li className="col-start-1 place-self-center">Motorista</li>
                <li className="col-start-2 place-self-center">Transportadora</li>
                <li className="col-start-3 place-self-center">Agenda</li>
                <li className="col-start-4 place-self-center">Controle</li>
                <li className="col-start-5 place-self-center">Data</li>
                <li className="col-start-6 place-self-center">Hora</li>
                <li className="col-start-7 place-self-center mr-2">Situação</li>
                </ul>
            </div>
            <ScrollArea className="w-full">
                {bulk.length === 0 || false ? (
                    <div className="w-full bg-zinc-200">
                        <p>Nenhum canhoto encontrado.</p>
                    </div>
                ) : (
                    bulk.map(({carga}:any, key) => {
                        if (carga.bulkStateCpd === 'liberar canhoto') return (
                        <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] bg-zinc-200`}>
                            <ul className="grid grid-cols-7 gap-10 text-[15px] w-full">
                            <li className="col-start-1 place-self-center">{carga.bulkDriver.toUpperCase()}</li>
                            <li className="col-start-2 place-self-center">{carga.bulkCarrier.toUpperCase()}</li>
                            <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                            <li className="col-start-4 place-self-center">{carga.bulkId}</li>
                            <li className="col-start-5 place-self-center">{fullDatePrint(carga.bulkCpdDate).toUpperCase()}</li>
                            <li className="col-start-6 place-self-center">{hourPrint(carga.bulkCpdDate).toUpperCase()}</li>
                            <li id={carga.bulkId} className="col-start-7 place-self-center self-center"> 
                                {carga.bulkStateCpd.toUpperCase()}
                            </li>        
                            </ul>
                        </div>
                        )
                    })
                )
                }
                
            </ScrollArea>
            </div>
        </div>
        </div>
    );
}