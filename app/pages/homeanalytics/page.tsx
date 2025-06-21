'use client'

import { useEffect, useState } from "react"
import Image from "next/image";

import { app } from "@/app/firebase/fbkey"
import { getDatabase, ref, onValue, onChildAdded, onChildChanged } from "firebase/database";

import { dateDb, datePrint, datePrintInt, fullDate, fullDatePrint, hourPrint, validateDate } from "@/utils/date-generate"
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { getActivityTwo, getTaske, getTaskes } from "@/app/firebase/fbmethod";
import { getElementId, getElementTask } from "@/utils/get-elementHtml";
import { trackEndNull, trackEndProd, trackPickingRotation, trackFractional } from "@/utils/treatment-data-print";
import UploadExcel from "@/app/pages/homeanalytics/import-file";
import { tractDate } from "@/utils/trac-date";
import handler from "@/app/pages/api/read-file";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { valDate } from "@/utils/valid-data-print";
import { object } from "zod";
import { Input } from "@/components/ui/input";
import ResultQuery from "./query";
import { Console } from "console";

export default function Dashboard() {

    const [ tasks, setTasks ] = useState<any>([])
    const [ taskConcluid, setTaskConcluid ] = useState<any>()
    const [ clock, setClock ] = useState<any>()
    const [ inputFileController, setInputFileController ] = useState<string>('')
    const [ component, setComponent ] = useState(false)
    const [ objQuery, setObjQuery ] = useState<any>(null)
    const [ statusObjQuery, setStatusObjQuery ] = useState<any>()

    useEffect(() => {
        if (!taskConcluid) return
        const id = taskConcluid.activi.activityID
        setTasks((t:any) => t.filter((task:any) => id !== task.activi.activityID))
        setTasks((object:any) => [...object, taskConcluid])
        
    }, [taskConcluid])

    useEffect(() => {
        const data:any = document.querySelector('.input-quary')
        if (data) data.focus()
        const db = getDatabase(app)
        const tasksDescription = ['Aéreo vazio', 'Validação endereço x produto', 'Rotativo de picking', 'Quarentena fracionada']
        const nameTask = 'Aéreo vazio'
        const taskVal = 'Validação endereço x produto'
        const taskRP = 'Rotativo de picking'
        const strDate = fullDate()
        .replace('/','')
        .replace('/','')        

        // Buscando atividades aéreo vazio
        getTaskes({descricao: tasksDescription[0], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
        .then((result) => {
            const resultArr = Object.values(result)
            setTasks(resultArr)
            getTaskes({descricao: tasksDescription[2], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
            .then((result) => {
                const resultArr = Object.values(result)
                resultArr.map((el) => setTasks((object:any) => [...object, el]))
                getTaskes({descricao: tasksDescription[1], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
                .then((result) => {
                    const resultArr = Object.values(result)
                    resultArr.map((el) => setTasks((object:any) => [...object, el]))
                    getTaskes({descricao: tasksDescription[3], dateAno: strDate.slice(4,8), dateMes: strDate.slice(2,8)})
                    .then((result) => {
                        const resultArr = Object.values(result)
                        resultArr.map((el) => setTasks((object:any) => [...object, el]))
                    })
    
                })
            })
        })

        const highRotation = ref(db, `activity/${tasksDescription[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
        onChildAdded(highRotation, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTasks((object:any) => [...object, result])
            } else {
                return "No data available"
            }
        })

        const highRotationChange = ref(db, `activity/${tasksDescription[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onChildChanged(highRotationChange, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTaskConcluid(result)
            } else {
                return "No data available"
            }
        })
        
        // Buscando atividades Rotativo de picking...
        const pickingRotation = ref(db, `activity/${tasksDescription[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
        onChildAdded(pickingRotation, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTasks((object:any) => [...object, result])
            } else {
                return "No data available"
            }
        })

        const pickingRotationChange = ref(db, `activity/${tasksDescription[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onChildChanged(pickingRotationChange, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTaskConcluid(result)
            } else {
                return "No data available"
            }
        })
        // Buscando atividades Rotativo de aereo cheio...

        const highRotationFull = ref(db, `activity/${tasksDescription[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
        onChildAdded(highRotationFull, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTasks((object:any) => [...object, result])
            } else {
                return "No data available"
            }
        })

        const highRotationFullChange = ref(db, `activity/${tasksDescription[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onChildChanged(highRotationFullChange, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTaskConcluid(result)
            } else {
                return "No data available"
            }
        })
    
        // Buscando quarentena fracionada...

        const fractionalAdd = ref(db, `activity/${tasksDescription[3]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
        onChildAdded(fractionalAdd, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTasks((object:any) => [...object, result])
            } else {
                return "No data available"
            }
        })

        const fractionalChange = ref(db, `activity/${tasksDescription[3]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onChildChanged(fractionalChange, (snapshot) => {
            if (snapshot.exists()) {
                const result = snapshot.val()
                setTaskConcluid(result)
            } else {
                return "No data available"
            }
        })

    }, [])

    function importXLSX(element: any) {
        const elementId = getElementId(element)
        const elementTesk = getElementTask(element)
        setObjQuery(null)

        getActivityTwo({id: elementId, task: elementTesk}).then((result) => {
            const { activi } = result
            const activiArray:any = Object.values(activi)
            let tract
            switch (activi.activityName) {
                case 'Aéreo vazio':
                    tract = trackEndNull(activiArray)
                    exportFileXlsx(tract)
                    break;
                case 'Validação endereço x produto':
                    tract = trackEndProd(activiArray)
                    exportFileXlsx(tract)
                    break
                case 'Rotativo de picking':
                    tract = trackPickingRotation(activiArray)
                    exportFileXlsx(tract)
                    break
                case 'Quarentena fracionada':
                    tract = trackFractional(activiArray)
                    exportFileXlsx(tract)
                    break
            default:
                    break
            }
        })
    }
    
    function validAddress(address:any) {
        const prefix = [ 'AV', 'RP', 'VE', 'PL']
        const result = prefix.filter((pr) => pr === address)
        
        return result[0]
    }

    function onSubmit() {
        const data:any = document.querySelector('.input-quary')

        const initCharAddress = data.value.trim().toUpperCase().slice(0,2)
        const prx = validAddress(initCharAddress)

        if(!prx) {
            alert('Código inserido não é válido.')
            return
        }

        const result = tasks.filter((obj:any) => obj.activi.activityID === data.value.trim().toUpperCase())
        const { activi } = result[0]
        activi.activityState ? setStatusObjQuery('Executando') : setStatusObjQuery('Finalizado') 
        setObjQuery(activi)
        data.value = ''
    }

    return (
        <div className="flex w-full items-end p-2">
            {objQuery &&
                <div className="absolute z-10 w-[59%] h-[403px] bg-white rounded-1xl">
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
            <div className="flex flex-col w-[60%] p-1">
                <h1 className="self-end mr-10 text-2xl">PCE TOOLS</h1>
                <div className="box-activity flex w-[100%] mt-15 flex-col justify-end gap-1">
                    <div className="flex justify-between w-full h-9">
                        <h1 className="ml-2 self-end">Atividades em execução</h1>
                        <div className="flex gap-2">
                            <Input type="text" placeholder="Insira o código" className="input-quary w-32 h-8"/>
                            <Button className="w-16 h-8 cursor-pointer hover:scale-[1.04]" onClick={onSubmit}>
                                <Image 
                                    src={'/lupa-de-pesquisa.png'}
                                    width={24}
                                    height={24}
                                    alt="Pesquisar tarefa"
                                />
                            </Button>
                        </div>
                    </div>
                    <ScrollArea className="flex justify-center h-[400px] border-t-2 pl-1 pr-1">
                        {
                            tasks && tasks.map((tasks:any) => {
                                const act = Object.values(tasks)
                                return act.map((activi:any, i:number) => {
                                    const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName } = activi 
                                    let color = activityState ? 'bg-orange-100' : 'bg-green-100' 
                                    let hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50' 
                                    let status = activityState ? 'Executando' : 'Finalizado'

                                    const print = valDate(activityInitDate)
                                    if (print) return  (
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
                            })
                        }
                    </ScrollArea>
                </div>
            </div>
            <div className="self-start w-[40%] mt-10">
            </div>
        </div>
    )
}