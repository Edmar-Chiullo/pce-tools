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