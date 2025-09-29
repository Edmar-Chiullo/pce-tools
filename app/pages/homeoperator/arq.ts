    // useEffect(() => {        
    //     const data:any = document.querySelector('.input-quary')
        
    //     if (data) data.focus()
    //     const db = getDatabase(app)
    //     const tasksDescription = ['Aéreo vazio', 'Validação endereço x produto', 'Rotativo de picking', 'Quarentena fracionada']
    //     const nameTask = 'Aéreo vazio'
    //     const taskVal = 'Validação endereço x produto'
    //     const taskRP = 'Rotativo de picking'
    //     const strDate = fullDate()
    //     .replace('/','')
    //     .replace('/','')        

    //     // Buscando atividades aéreo vazio
    //     getTaskes({descricao: tasksDescription[0], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
    //     .then((result) => {
    //         const resultArr = Object.values(result)
    //         setTasks(resultArr)
    //         getTaskes({descricao: tasksDescription[2], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
    //         .then((result) => {
    //             const resultArr = Object.values(result)
    //             resultArr.map((el) => setTasks((object:any) => [...object, el]))
    //             getTaskes({descricao: tasksDescription[1], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
    //             .then((result) => {
    //                 const resultArr = Object.values(result)
    //                 resultArr.map((el) => setTasks((object:any) => [...object, el]))
    //                 getTaskes({descricao: tasksDescription[3], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
    //                 .then((result) => {
    //                     const resultArr = Object.values(result)
    //                     resultArr.map((el) => setTasks((object:any) => [...object, el]))
    //                 })
    
    //             })
    //         })
    //     })

    //     const highRotation = ref(db, `activity/${tasksDescription[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    //     onChildAdded(highRotation, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTasks((object:any) => [...object, result])
    //         } else {
    //             return "No data available"
    //         }
    //     })

    //     const highRotationChange = ref(db, `activity/${tasksDescription[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
    //     onChildChanged(highRotationChange, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTaskConcluid(result)
    //         } else {
    //             return "No data available"
    //         }
    //     })
        
    //     // Buscando atividades Rotativo de picking...
    //     const pickingRotation = ref(db, `activity/${tasksDescription[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    //     onChildAdded(pickingRotation, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTasks((object:any) => [...object, result])
    //         } else {
    //             return "No data available"
    //         }
    //     })

    //     const pickingRotationChange = ref(db, `activity/${tasksDescription[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
    //     onChildChanged(pickingRotationChange, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTaskConcluid(result)
    //         } else {
    //             return "No data available"
    //         }
    //     })
    //     // Buscando atividades Rotativo de aereo cheio...

    //     const highRotationFull = ref(db, `activity/${tasksDescription[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    //     onChildAdded(highRotationFull, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTasks((object:any) => [...object, result])
    //         } else {
    //             return "No data available"
    //         }
    //     })

    //     const highRotationFullChange = ref(db, `activity/${tasksDescription[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
    //     onChildChanged(highRotationFullChange, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTaskConcluid(result)
    //         } else {
    //             return "No data available"
    //         }
    //     })
    
    //     // Buscando quarentena fracionada...

    //     const fractionalAdd = ref(db, `activity/${tasksDescription[3]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    //     onChildAdded(fractionalAdd, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTasks((object:any) => [...object, result])
    //         } else {
    //             return "No data available"
    //         }
    //     })

    //     const fractionalChange = ref(db, `activity/${tasksDescription[3]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
    //     onChildChanged(fractionalChange, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const result = snapshot.val()
    //             setTaskConcluid(result)
    //         } else {
    //             return "No data available"
    //         }
    //     })

    // }, [])





        // useEffect(() => {
        //     if (!taskConcluid) return
        //     const id = taskConcluid.activi.activityID
        //     setTasks((t:any) => t.filter((task:any) => id !== task.activi.activityID))
        //     setTasks((object:any) => [...object, taskConcluid])
            
        // }, [taskConcluid])
    
        // const [ lists, setLists ] = useState<ActivityProps[]>([])
    
        // useEffect(() => {
        //     server()
        //     .then((listTasks) => {
        //         const arrTasks = Object.values(listTasks)
        //         const arrs:any = []
        //         arrTasks.map((tasks:any) => {
        //             const task = Object.values(tasks)
        //             task.map((val) => {
        //                 setLists((list:any) => [...list, val])
        //             })
        //         })
        //     })
    
        //     const strDate = fullDate()
        //     .replace('/','')
        //     .replace('/','')
    
        //     const addResult = ref(db, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}`)
        //     onChildAdded(addResult, (snapshot) => {
        //         if (snapshot.exists()) {
        //             const result = snapshot.val()
        //             console.log(result)
        //             setLists((object:any) => [...object, result])
        //         } else {
        //             return "No data available"
        //         }
        //     })
    
    
        //     const ChangeResult = ref(db, `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}`)
        //     onChildChanged(ChangeResult, (snapshot) => {
        //     if (snapshot.exists()) {
        //         const chenge = snapshot.val()
        //         setLists((object:any) => [...object, chenge])
        //     } else {
        //         return "No data available"
        //     }
        // })
    
        // }, [])
    

        /**
         * 
         *             {objQuery &&
                <div className="absolute z-10 w-[59%] h-[403px] bg-white">
                    <div key={objQuery.activityID} className={`flex justify-between mt-1 rounded-sm pl-2 pr-2 bg-zinc-50 hover:bg-zinc-100`}>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-4 font-light text-[14px]">
                                <div className="flex gap-1">
                                    <span>Cod. Atividade:</span>
                                    <span>{objQuery.activityID}</span> 
                                </div>
                                <div className="flex gap-1">
                                    <span>Data:</span>
                                    <span>{fullDatePrint(objQuery.activityInitDate)}</span> 
                                </div>
                                <div className="flex gap-1">
                                    <span>Hora:</span>
                                    <span>{hourPrint(objQuery.activityInitDate)}</span>                                             
                                </div>
                                <div className="flex gap-6">
                                    <span>{objQuery.activityLocalWork}</span>   
                                    <span>{}</span>                                          
                                </div>
                            </div>
                            <div className="nameOperator flex gap-6">
                                <div className="flex gap-1">
                                    <span>Colaborador:</span>
                                    <h1>{objQuery.activtyUserName}</h1>
                                </div>
                                <div className="flex gap-1">
                                    <span>Atividade:</span>
                                    <span>{objQuery.activityName}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04]" onClick={(element) => importXLSX(element)}>{statusObjQuery}</Button>
                    </div>
                
                </div>
            }
            <div className="flex justify-between w-full h-full">
                <div className="flex flex-col justify-between gap-5 w-[64%] p-1">
                    <div className="flex justify-end items-start w-full h-12">
                        <h1 className="text-3xl text-zinc-50">PCE TOOLS</h1>
                    </div>
                    <div className="box-activity flex w-[100%] flex-col justify-end gap-1 bg-zinc-100 p-2 rounded-2xl">
                        <div className="flex justify-between w-full h-9">
                            <h1 className="ml-2 self-end">Atividades em execução</h1>
                            <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-1 pr-1">           
                                    <input type="text" placeholder="Insira o código" className="input-quary rounded-sm h-8 p-1 bg-zinc-50"/>
                                    <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm" >
                                        <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto"/>
                                    </button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                        <ScrollArea className="flex justify-center h-[400px] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">
                            {
                                lists && lists.map(({activity, key=1}:any) => {

                                    if (!activity) return ''

                                    const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName } = activity 
                                    let color = activityState ? 'bg-orange-100' : 'bg-green-100' 
                                    let hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50' 
                                    let status = activityState ? 'Executando' : 'Finalizado'

                                    return  (
                                        <div key={activityID} className={`flex justify-between mt-1 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
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
                                                        <span>{}</span>                                          
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
                                            <Button className="self-center w-20 h-8 text-[12px] rounded-3xl cursor-pointer hover:scale-[1.04]" onClick={(element) => importXLSX(element)}>{status}</Button>
                                        </div>
                                    )                    
                                })
                            }
                        </ScrollArea>
                    </div>
                </div>
                <div className="self-end flex flex-col gap-1 w-[35%] h-[460px] bg-zinc-100 p-2 rounded-2xl">
                    <div className="flex justify-start items-end w-full h-9">
                        <h1 className="">Ferramentas</h1>
                    </div>
                    <div className="flex flex-col gap-1 w-full h-[89%] bg-zinc-500/10 rounded-md p-1">
                        <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] hover:cursor-pointer text-zinc-50" onClick={() => router.push('/pages/print-barcode')}>COD. BARRAS</h1>            
                    </div>
                </div>
            </div>

         */

            /**
             * 
             * const value = Object.values(snapshot.val())
                let arr:ActivityProps[] = []
                for (const task of value) {
                    const t:any = task
                    arr.push(t); // Adiciona o novo item ao final
                }
             */

                        // server()
                        //     .then((listTasks) => {
                        //         // console.log(listTasks)
                        //         const processedTasks = processTasks(listTasks);
                        //         setLists(processedTasks); // Chama setLists apenas uma vez
                        //     })
                        //     .catch(error => {
                        //         console.error("Erro ao buscar dados iniciais:", error);
                        //     });


    /**
     * 
     *  <div className="absolute flex flex-col gap-4 items-center justify-start w-full h-full p-4">
      <h1 className="md:text-xl lg:text-2xl">Quarentena Fracionada</h1>
      <span className="self-end">{activity.activityID}</span>
      <form action={formAction} className="flex flex-col gap-6 w-full md:gap-10">
        <input type="text" onBlur={handleProductChange} placeholder="Leia o produto" name="loadProduct" className="loadProduct w-full border rounded-sm p-2" required/>
        {productError && <p className="text-red-500 text-sm">{productError}</p>}
        <input type="text" placeholder="Informe a quantidade" name="loadQuant" className="w-full border rounded-sm p-2" required/>
        <input type="text" onChange={handleValidChange} onFocus={handleValidFocus} placeholder="Informe a validade" name="loadValid" className="loadValid w-full border rounded-sm p-2" required/>
        {validError && <p className="text-red-500 text-sm">{validError}</p>}
        <input type="hidden" name="activityID" defaultValue={activity?.activityID ?? ""} />
        <input type="hidden" name="activityName" defaultValue={activity?.activityName ?? ""} />
        <button type="submit" className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm" disabled={statusBtn}>
          {isPending ? "Confirmando..." : "Confirmar"}
        </button>
      </form>
      <button onClick={() => getActivity(activity)} className="w-full h-10 bg-zinc-950 text-zinc-50 rounded-sm" disabled={statusBtn}>
        Finalizar
      </button>
       {errorMessage && (
          <p className="flex text-red-500 mt-4">{errorMessage}</p>
        )}
    </div>
     */


'use client'

import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { db } from "@/app/firebase/fbkey"
import { ref, onChildChanged, DataSnapshot, onChildAdded, off } from "firebase/database"
import { fullDate } from "@/utils/date-generate"
import ContainerTasks from "@/components/ui/contatiner-tasks"
import { ActivityProps } from "@/app/interface/interface"

// A tipagem 'ActivityProps' deve ser usada para o estado 'lists' e 'swap'
// para melhor clareza e segurança de tipo.
// A interface 'ActivityProps' provavelmente já define a estrutura completa,
// mas vou criar um tipo local para o objeto que contém a atividade
// que é retornado do Firebase e manipulado em 'swap'.

interface ActivityContainer {
    activity: ActivityProps;
    // ... outras propriedades que possam existir no objeto retornado do Firebase
}

// O tipo User original estava correto, mas vou movê-lo para um lugar mais claro.
type UserData = {
    first: string
    center: string
}

export default function Dashboard() {
    // 1. Tipagem mais precisa e valor inicial consistente (Array vazio).
    const [lists, setLists] = useState<ActivityProps[]>([])
    // 2. Usando a tipagem de container para 'swap' para clareza, assumindo que
    // é um objeto que contém 'activity'.
    const [swap, setSwap] = useState<ActivityContainer | null>(null)

    const { data: session, status } = useSession()

    // 3. Obtendo e tipando os dados do usuário usando useMemo para cálculo
    // e evitar re-renderizações desnecessárias.
    // 'data?.user?.name' deve ser verificado.
    const user: UserData | null = useMemo(() => {
        if (session?.user?.name) {
            try {
                // É crucial verificar se 'session.user.name' é uma string JSON válida.
                return JSON.parse(session.user.name) as UserData
            } catch (error) {
                console.error("Erro ao fazer parse dos dados do usuário:", error)
                return null
            }
        }
        return null
    }, [session]) // Dependência: 'session'

    // O código original usava 'setUser' fora do useEffect, causando um loop
    // ou comportamento inesperado. 'useMemo' resolve isso.

// ---

    /**
     * Efeito para atualizar 'lists' quando 'swap' muda.
     * Objetivo: Remover a versão antiga da tarefa e adicionar a nova.
     */
    useEffect(() => {
        if (swap) {
            const { activityID } = swap.activity
            
            setLists(prevLists => {
                // Filtra o array para remover a tarefa com o ID antigo
                const filteredLists = prevLists.filter(task => activityID !== task.activityID)
                
                // Adiciona o novo objeto (ActivityProps) ao array
                // NOTA: É fundamental que 'swap' contenha exatamente o objeto
                // que 'lists' espera (ActivityProps). Se 'swap' é ActivityContainer,
                // você pode precisar usar 'swap.activity'. Vou assumir que o 'setLists'
                // espera o objeto ActivityProps.
                // Ajustei a linha abaixo para adicionar diretamente o objeto ActivityProps de dentro do container 'swap'.
                return [...filteredLists, swap.activity]
            })

            // Após a atualização, limpa o 'swap' para evitar re-execução desnecessária
            // e garantir que ele só reaja à próxima mudança do Firebase.
            setSwap(null) 
        }
    }, [swap]) // Dependência: 'swap'

// ---

    /**
     * Efeito para configuração das listeners do Firebase.
     */
    useEffect(() => {
        // Sai se o usuário ou o centro não estiverem carregados.
        if (status !== 'authenticated' || !user?.center) {
            return
        }

        const strDate = fullDate().replace(/\//g, '')
        // Construção do caminho do banco de dados (mais claro)
        const year = strDate.slice(4, 8)
        const monthDay = strDate.slice(2, 8)
        const day = strDate.slice(0, 2)
        const dbPath = `${year}/${monthDay}/${day}/${user.center}`
        const dbRef = ref(db, dbPath)
        
        // Array temporário para acumular as atividades iniciais do onChildAdded
        // Isso evita múltiplas chamadas ao setLists, melhorando a performance.
        let initialActivities: ActivityProps[] = []

        /**
         * Listener para quando um filho é ADICIONADO (carregamento inicial).
         */
        const unsubscribeAdd = onChildAdded(dbRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const values = snapshot.val() // Objeto onde as chaves são as atividades
                
                // Itera sobre os valores para obter o objeto da atividade.
                Object.values(values).forEach(task => {
                    // Tipagem forçada para o objeto ActivityProps
                    initialActivities.push(task as ActivityProps)
                })
            }
        }, 
        // Callback de completion/cancelamento para garantir que as atualizações
        // em lote ocorram após o carregamento inicial.
        () => {
             // Atualiza o estado 'lists' de uma só vez com todas as atividades iniciais
            setLists(prevLists => [...prevLists, ...initialActivities])
            initialActivities = [] // Limpa o array temporário
        })

        /**
         * Listener para quando um filho é MODIFICADO.
         */
        const unsubscribeChange = onChildChanged(dbRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const values = Object.values(snapshot.val()) as ActivityContainer[]
                
                // O código original assumia que o item modificado é sempre o último
                // do array de valores, o que pode ser um risco. Se este for o
                // comportamento *esperado* do seu banco de dados, mantenha.
                // Caso contrário, é melhor iterar ou encontrar o item pelo ID.
                const lastTask = values[values.length - 1]
                
                // Se 'lastTask' for do tipo ActivityContainer, 'setSwap' deve recebê-lo.
                setSwap(lastTask)
            }
        })
        
        // Função de limpeza do useEffect.
        return () => {
            // É mais seguro usar a função 'off' do Firebase.
            off(dbRef, 'child_added', unsubscribeAdd as any) 
            off(dbRef, 'child_changed', unsubscribeChange as any)
        }
    }, [status, user]) // Dependências: 'status' e 'user'

// // ---

//     /**
//      * Função para trocar/atualizar a lista, passada como prop.
//      * Mantenha a tipagem 'ActivityProps[]' para consistência.
//      */
//     function listSwap(list: ActivityProps[]): void {
//         setLists(list)
//     }

//     // Se o status não for 'authenticated', pode ser útil retornar algo
//     if (status === 'loading' || !user) {
//         return <div className="flex w-full h-full p-2 rounded-2xl bg-zinc-800 text-amber-50">Carregando painel...</div>
//     }

//     return (
//         <div className="flex w-full h-full p-2 rounded-2xl bg-zinc-800">
//             {/* O componente ContainerTasks deve receber a lista de atividades (ActivityProps[]) */}
//             <ContainerTasks activities={lists} listSwap={listSwap} /> 
//         </div>
//     )
}

// 'use client'

// import { useState } from "react"
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useForm } from "react-hook-form"
// import { ActivityProps } from "@/app/interface/interface" // Certifique-se que esta tipagem é o objeto raiz!
// import { fullDatePrint, hourPrint } from "@/utils/date-generate"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import Link from "next/link"
// import { exportFileXlsx } from "@/utils/ger-xlsx"
// import { trackEndNull, trackEndProd, trackFractional, trackPickingRotation } from "@/utils/treatment-data-print"
// import Alert from '@/components/ui/alertl'
// import { finishActivity, getActivity } from "@/lib/firebase/server-database"

// // Definição da interface do container, se a atividade for aninhada (o que parece ser o caso)
// interface ActivityContainer {
//     activity: ActivityProps;
//     // Adicione outras propriedades raiz se houverem
// }

// // ⚠️ CORREÇÃO CHAVE: O componente `Dashboard` está enviando `ActivityProps[]` (que são os objetos com a propriedade `activity` aninhada),
// // mas a tipagem importada `ActivityProps` no `Dashboard` é confusa.
// // Assumindo que o que vem do `Dashboard` é um array de OBJETOS QUE CONTÊM a chave `activity` (ActivityContainer[]).
// // Se o que o Dashboard envia é SÓ O OBJETO DA ATIVIDADE, a tipagem da prop deve ser `ActivityProps[]` (sem aninhamento)
// // e o mapeamento abaixo deve ser ajustado.
// // Baseado no seu mapeamento: `{activities && activities.map(({activity}:any, i) => { ... }`, a prop DEVE ser um array de ActivityContainer.

// // Vamos assumir que `activities` é `ActivityContainer[]` para o mapeamento funcionar.
// type ContainerTasksProps = {
//     activities: ActivityContainer[];
//     listSwap: (listSwap: ActivityContainer[]) => void; // Ajustando a tipagem da função de callback
// }

// const formSchema = z.object({
//     date: z.string()
// });

// type FormSchemaType = z.infer<typeof formSchema>;

// // Ajuste a tipagem do componente para refletir a estrutura de dados (ActivityContainer[])
// export default function ContainerTasks({ activities, listSwap }: { activities: ActivityProps[], listSwap: ( listSwap: ActivityProps[]) => void}) {
//     const [btnConfirm, setBtnPopUp] = useState(false)
//     // Usamos 'ActivityContainer | undefined' para o estado de uma única tarefa
//     const [taskToFinish, setTaskToFinish] = useState<ActivityContainer | undefined>()

//     // ❌ REMOVIDO: O estado local `taskActivity` e o `useEffect` que o populava.
//     // As props devem ser a única fonte de verdade aqui.

//     function formatDateTime() {
//         const date = new Date()
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }

//     const form = useForm<FormSchemaType>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             date: formatDateTime()
//         },
//     });

//     const finishTask = () => {
//         // Se a tipagem for ActivityContainer, a atividade está aninhada
//         if (!taskToFinish) return

//         finishActivity(taskToFinish.activity) // Passa o objeto ActivityProps aninhado
//         setBtnPopUp(false)
//         setTaskToFinish(undefined) // Limpa o estado
//     }

//     const closePopUp = (status: boolean) => {
//         setBtnPopUp(status)
//         if (!status) {
//             setTaskToFinish(undefined) // Garante a limpeza ao fechar
//         }
//     }

//     // Função de tratamento de dados antes do XLSX
//     const importXLSX = (item: ActivityContainer, activityName: string) => {
//         let track;
//         switch (activityName) {
//             case 'Aéreo vazio':
//                 track = trackEndNull(item);
//                 break;
//             // ... (restante do switch)
//             case 'Validação endereço x produto':
//                 track = trackEndProd(item);
//                 break;
//             case 'Rotativo de picking':
//                 track = trackPickingRotation(item);
//                 break;
//             case 'Quarentena fracionada':
//                 track = trackFractional(item);
//                 break;
//             default:
//                 console.error('Tipo de atividade desconhecido:', activityName);
//                 return null;
//         }

//         if (track) {
//             exportFileXlsx(track);
//             return track;
//         }
//         return null;
//     };

//     // Função que lida com o clique no botão
//     const printXLSX = (activityId: string, activityName: string) => {
//         // Encontra o item completo (ActivityContainer)
//         const item:any = activities.find((item) => item.activityID === activityId);

//         if (!item) {
//             console.error(`Atividade com ID ${activityId} não encontrada.`);
//             return;
//         }

//         // Verifica se a atividade está em execução
//         if (item.activityState) {
//             setBtnPopUp(true)
//             setTaskToFinish(item) // Armazena o objeto ActivityContainer completo
//             return
//         }

//         // Se não estiver em execução, exporta o arquivo
//         importXLSX(item, activityName)
//     }

//     const onSubmit = async (data: FormSchemaType) => {
//         const date: string = data.date

//         if (date.length === 10) {
//             const dia = date.slice(8, 10)
//             const year = date.slice(0, 4)
//             const mouth = date.slice(5, 7)
//             const mesano = `${mouth}${year}`
//             const result = await getActivity(mesano, dia)

//             if (result) {
//                 const arr = Object.values(result)
//                 const arrList: ActivityContainer[] | any = [] // ⚠️ AQUI: Corrigir a tipagem para ActivityContainer[]
//                 for (const values of arr) {
//                     // O `values` aqui é o objeto onde as chaves são as atividades
//                     const tasks = Object.values(values as Record<string, ActivityContainer>) 
//                     for (const task of tasks) {
//                         arrList.push(task)
//                     }
//                 }
//                 // listSwap agora recebe ActivityContainer[]
//                 listSwap(arrList)
//             } else {
//                 alert("Não há dados a serem mostrados.")
//             }
//         }
//     }

//     return (
//         <div className="relative flex flex-col w-full h-full">
//             {
//                 // Usa taskToFinish para o alerta
//                 btnConfirm && taskToFinish && (
//                     <Alert
//                         title="Tarefa em execução"
//                         description="Deseja finalizar?"
//                         acao={`Finalizar ${taskToFinish.activity.activityName}?`} // Mensagem mais específica
//                         close={closePopUp}
//                         finish={finishTask}
//                     />
//                 )
//             }
//             {/* ... (cabeçalho e formulário) ... */}
//             <div className="flex justify-center items-start w-full py-2 px-28">
//                 <h1 className="text-3xl text-zinc-50">PCE Tools</h1>
//             </div>
//             <div className="flex items-end w-full h-full gap-3">
//                 <div className="flex justify-start w-[70%] h-full">
//                     <div className="flex flex-col w-full h-full justify-end gap-1 bg-zinc-100 p-2 rounded-2xl">
//                         {/* ... (header da lista e formulário de busca) ... */}
//                         <div className="flex justify-between w-full h-9">
//                             <h1 className="ml-2 self-end">Atividades em execução</h1>
//                             <div className="flex justify-between items-center gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
//                                 <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center w-56 gap-2 pr-1">
//                                     <input
//                                         type="date"
//                                         placeholder="Insira a data"
//                                         {...form.register("date")}
//                                         className="input-quary rounded-sm h-8 p-1 bg-zinc-50"
//                                     />
//                                     <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm">
//                                         <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto" />
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>

//                         <div>
//                             <ScrollArea className="flex lg:h-[420px] border-t-2 pl-1 pr-1 bg-zinc-500/10 rounded-md">
//                                 {/* 🎯 CORREÇÃO CHAVE: Usar activities diretamente e tipagem correta do mapeamento */}
//                                 {activities && activities.map((item: ActivityContainer | any, i) => {
//                                     // A tipagem 'item' agora é ActivityContainer, acesse 'activity' diretamente:
//                                     const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName }:any = item.activity;

//                                     const color = activityState ? 'bg-orange-100' : 'bg-green-100';
//                                     const hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50';
//                                     const status = activityState ? 'Executando' : 'Finalizado';

//                                     // 🔑 CORREÇÃO CHAVE: Use um ID ÚNICO como chave (key)
//                                     // Usar o índice (i) é um erro de performance se a lista for alterada.
//                                     // 'activityID' é o ID da atividade e deve ser único.
//                                     return (
//                                         <div key={activityID} className={`flex justify-between w-full h-12 mt-1 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
//                                             {/* ... (conteúdo do item da lista) ... */}
//                                             <div className="flex flex-col gap-1">
//                                                 <div className="flex gap-4 font-light text-[14px]">
//                                                     <div className="flex gap-1">
//                                                         <span>Cod. Atividade:</span>
//                                                         <span>{activityID}</span>
//                                                     </div>
//                                                     <div className="flex gap-1">
//                                                         <span>Data:</span>
//                                                         <span>{fullDatePrint(activityInitDate)}</span>
//                                                     </div>
//                                                     <div className="flex gap-1">
//                                                         <span>Hora:</span>
//                                                         <span>{hourPrint(activityInitDate)}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="nameOperator flex gap-6">
//                                                     <div className="flex gap-1">
//                                                         <span>Colaborador:</span>
//                                                         <h1>{activtyUserName}</h1>
//                                                     </div>
//                                                     <div className="flex gap-1">
//                                                         <span>Atividade:</span>
//                                                         <span>{activityName}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 className="self-center w-20 h-8 text-[12px] rounded-md cursor-pointer hover:scale-[1.04] bg-zinc-950 text-zinc-100"
//                                                 onClick={() => printXLSX(activityID, activityName)}
//                                             >
//                                                 {status}
//                                             </button>
//                                         </div>
//                                     );
//                                 })}
//                             </ScrollArea>
//                         </div>
//                     </div>
//                 </div>
//                 {/* ... (Ferramentas) ... */}
//                 <div className="flex flex-col gap-1 w-[35%] h-full bg-zinc-100 p-2 rounded-2xl">
//                     <div className="flex justify-start items-end w-full h-9">
//                         <h1 className="">Ferramentas</h1>
//                     </div>
//                     <div className="flex flex-col gap-1 w-full h-full bg-zinc-500/10 rounded-md p-1">
//                         <Link href={'/pages/home/pcetools/print-barcode'}>
//                             <h1 className="p-1 bg-zinc-950 rounded-[6px] hover:scale-[1.01] hover:cursor-pointer text-zinc-50">COD. BARRAS</h1>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
