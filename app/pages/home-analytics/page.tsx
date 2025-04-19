'use client'

import { useEffect, useState } from "react"

import { app } from "@/app/firebase/fbkey"
import { getDatabase, ref, onValue } from "firebase/database";

import { dateDb, datePrint, datePrintInt, fullDate, fullDatePrint, hourPrint, validateDate } from "@/utils/date-generate"
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { getActivityTwo } from "@/app/firebase/fbmethod";
import { getElementId, getElementTask } from "@/utils/get-elementHtml";
import { trackEndNull, trackEndProd, trackPickingRotation } from "@/utils/treatment-data-print";
import UploadExcel from "@/app/pages/home-analytics/import-file";
import { tractDate } from "@/utils/trac-date";
import handler from "@/app/pages/api/read-file";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { valDate } from "@/utils/valid-data-print";

export default function Dashboard() {

    const [ tasks, setTasks ] = useState<any>([])
    const [ taskPickingRotation, setTaskPickingRotation ] = useState<any>([])
    const [ taskHighRotation, setTaskHighRotation ] = useState<any>([])
    const [ taskValidProEnd, setTaskValidProEnd ] = useState<any>([])
    const [ clock, setClock ] = useState<any>()
    const [ inputFileController, setInputFileController ] = useState<string>('')

    function funPickinRotation(taskList:any) {
        if (taskPickingRotation[0]) console.log(taskPickingRotation[0])
    }

    useEffect(() => {
        const db = getDatabase(app)
        const tasks = ['Aéreo vazio', 'Validação endereço x produto', 'Rotativo de picking']
        const nameTask = 'Aéreo vazio'
        const taskVal = 'Validação endereço x produto'
        const taskRP = 'Rotativo de picking'
        const strDate = fullDate()
        .replace('/','')
        .replace('/','')        
        
        const highRotation = ref(db, `activity/${tasks[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(highRotation, (snapshot) => {
        if (snapshot.exists()) {
            const actList = snapshot.val()
            setTasks((object:any) => [...object, actList])
        } else {
            return "No data available"
        }
        })

        const addressproduct = ref(db, `activity/${tasks[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(addressproduct, (snapshot) => {
        if (snapshot.exists()) {
            const actList = snapshot.val()
            setTasks((object:any) => [...object, actList])
        } else {
            return "No data available"
        }
        })

        const picingRotation = ref(db, `activity/${tasks[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(picingRotation, (snapshot) => {
        if (snapshot.exists()) {
            const actList = snapshot.val()
            setTasks((object:any) => [...object, actList])
        } else {
            return "No data available"
        }
        })

    }, [])

    function importXLSX(element: any) {
        const elementId = getElementId(element)
        const elementTesk = getElementTask(element)

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
                default:
                    break;
            }
        })
    }
    
    return (
        <div className="flexw-full items-end p-2">
            <div className="flex flex-col w-[60%] p-1">
                <h1 className="self-end mr-10 text-2xl">PCE TOOLS</h1>
                <div className="box-activity flex w-[100%] flex-col justify-end gap-1">
                    <h1 className="ml-2">Atividades em execução</h1>
                    <ScrollArea className="flex justify-center h-[500px] border-t-2 pl-1 pr-1">
                        {
                            tasks && tasks.map((tasks:any) => {
                                const act = Object.values(tasks)
                                return act.map(({ activi }:any, i:number) => {
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
                                            <Button className="self-center w-20 h-8 text-[10px] rounded-3xl" onClick={(element) => importXLSX(element)}>{status}</Button>
                                        </div>
                                    )                    
                                })
                            })
                        }
                    </ScrollArea>
                </div>
            </div>
            <div className="self-start w-[40%]">
            </div>
        </div>
    )
}