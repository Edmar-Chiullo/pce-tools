'use client'

import { useEffect, useState } from "react"

import { app } from "@/app/firebase/fbkey"
import { getDatabase, ref, onValue } from "firebase/database";

import { fullDate, fullDatePrint, hourPrint } from "@/utils/date-generate"
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { getActivityTwo } from "@/app/firebase/fbmethod";
import { tractDate } from "@/utils/trac-date";

import { Button } from "@/components/ui/button";


export default function Dashboard() {

    const [ tasks, setTasks ] = useState<any>([])
    const [ color, setColor ] = useState<any>()
    const [ status, setStatus ] = useState<any>()
    const [ clock, setClock ] = useState<any>()

    useEffect(() => {
        const db = getDatabase(app)
        const nameTask = 'Aéreo vazio'
        const taskVal = 'Validação enderço x produto'
        const strDate = fullDate()
        .replace('/','')
        .replace('/','')
        
        const pa = ref(db, `activity/${taskVal}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(pa, (snapshot) => {
        if (snapshot.exists()) {
            const tks = snapshot.val() 
            setTasks((object:any) => [...object, tks])
        } else {
            return "No data available"
        }
        })

        const path = ref(db, `activity/${nameTask}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(path, (snapshot) => {
        if (snapshot.exists()) {
            const tks = snapshot.val() 
            setTasks((object:any) => [...object, tks])
        } else {
            return "No data available"
        }
        })
    }, [])

    function getElementId(element: any) {
        const parentElement = element.target.parentElement
        const chOne = parentElement.children[0]
        const chTwo = chOne.children[0]
        const chThree = chTwo.children[0]
        
        const value = chThree.children[1].innerText

        return value
    }

    function getElementTask(element: any) {
        const parentElement = element.target.parentElement
        const chOne = parentElement.children[0]
        const chTwo = chOne.children[1]
        const chThree = chTwo.children[1]
        
        const value = chThree.children[1].innerText

        return value
    }

    function trackEndNull(activiArray:any) {
        const rerultTask = JSON.parse(activiArray[7])
        
        const tract = rerultTask.map(({address, date, status }:any) => {
            return {'Endereço':address, 'Data':fullDatePrint(date), 'Situação': 'VAZIO'}
        })
        
        return tract
    }

    function trackEndProd({...activiArray}:any) {
        const rerultTask = JSON.parse(activiArray[9])
        const tract = rerultTask.map(({address, date, product }:any) => {
            return {'Centro':activiArray[2], 
                    'Atividade':activiArray[3], 
                    'Operador':activiArray[8], 
                    'Endereço':address, 
                    'Data':fullDatePrint(date), 
                    'Hora':hourPrint(date), 
                    'Produto': product}
        })
        
        return tract
    }  
    
    function importXLSX(element: any) {
        const elementId = getElementId(element)
        const elementTesk = getElementTask(element)

        getActivityTwo({id: elementId, task: elementTesk}).then((result) => {
            const { activi } = result
            const activiArray:any = Object.values(activi)
            let tract
            switch (activi.activityName) {
                case 'Aéreo vazio':
                    tract = trackEndNull({act: activi, tasks: activiArray})
                    exportFileXlsx(tract)
                    break;
                case 'Validação enderço x produto':
                    tract = trackEndProd(activiArray)
                    exportFileXlsx(tract)
                    break
                case 'Picking rotation':
                    tract = trackEndProd(activiArray)
                    exportFileXlsx(tract)
                    break
                default:
                    break;
            }
        })
    }
    
    return (
        <div className="flex w-full p-2">
            <div className="flex flex-col w-[60%] p-1">
                <h1 className="self-center">Atividades em execução</h1>
                <div className="box-activity flex flex-col gap-1">
                    {
                        tasks && tasks.map((activi:any) => {
                            const act = Object.values(activi)
                            return act.map((a:any, i:number) => {
                                const { activityID, activityState, activityInitDate, activityLocalWork, activtyUserName, activityName } = a.activi
                            
                                let color = activityState ? 'bg-orange-100' : 'bg-green-100' 
                                let hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50' 
                                let status = activityState ? 'Executando' : 'Finalizado'

                                return  (
                                    <div key={activityID} className={`flex justify-between gap-8 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
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
                </div>
            </div>
        </div>
    )
}