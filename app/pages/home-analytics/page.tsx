'use client'

import { useEffect, useState } from "react"

import { app } from "@/app/firebase/fbkey"
import { getDatabase, ref, onValue, set } from "firebase/database";

import { fullDate, fullDatePrint, hourPrint, validateDate } from "@/utils/date-generate"
import { exportFileXlsx } from "@/utils/ger-xlsx";
import { getActivityTwo } from "@/app/firebase/fbmethod";
import { tractDate } from "@/utils/trac-date";

import { Button } from "@/components/ui/button";


export default function Dashboard() {

    const [ tasks, setTasks ] = useState<any>([])
    const [ listTask, setListTask ] = useState<any>([])
    const [ color, setColor ] = useState<any>()
    const [ status, setStatus ] = useState<any>()
    const [ clock, setClock ] = useState<any>()

    useEffect(() => {
        const db = getDatabase(app)
        const tasks = ['Aéreo vazio', 'Validação enderço x produto', 'Rotativo de picking']
        const nameTask = 'Aéreo vazio'
        const taskVal = 'Validação enderço x produto'
        const taskRP = 'Rotativo de picking'
        const strDate = fullDate()
        .replace('/','')
        .replace('/','')
        
        const highRotation = ref(db, `activity/${tasks[0]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(highRotation, (snapshot) => {
        if (snapshot.exists()) {
            const tks = snapshot.val() 
            setTasks((object:any) => [...object, tks])
        } else {
            return "No data available"
        }
        })

        const addressproduct = ref(db, `activity/${tasks[1]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(addressproduct, (snapshot) => {
        if (snapshot.exists()) {
            const tks = snapshot.val() 
            setTasks((object:any) => [...object, tks])
        } else {
            return "No data available"
        }
        })

        const picingRotation = ref(db, `activity/${tasks[2]}/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)
        onValue(picingRotation, (snapshot) => {
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

    function trackEndNull({...activiArray}:any) {
        const rerultTask = JSON.parse(activiArray[7])
        
        const tract = rerultTask.map(({address, date, status }:any) => {
            return {'Centro':activiArray[2], 
                    'Endereço':address, 
                    'Situação': 'VAZIO',
                    'Operador':activiArray[5], 
                    'Data':fullDatePrint(date), 
                    'Hora':hourPrint(date), 
                    'Atividade':activiArray[3], 
                    }
        })
        
        return tract
    }

    function trackEndProd({...activiArray}:any) {
        const rerultTask = JSON.parse(activiArray[7])
        const tract = rerultTask.map(({address, date, product }:any) => {
            return {'Centro':activiArray[2], 
                    'Endereço':address, 
                    'Produto': product,
                    'Operador':activiArray[6], 
                    'Data':fullDatePrint(date), 
                    'Hora':hourPrint(date), 
                    'Atividade':activiArray[3] 
                    }
        })
        
        return tract
    }  

    function trackPickingRotation({...activiArray}:any) {
        console.log(activiArray)
        const rerultTask = JSON.parse(activiArray[7])
        const tract = rerultTask.map(({address, date, product, quant, valid }:any) => {
            return {'Centro':activiArray[2], 
                    'Endereço':address,
                    'Produto': product,
                    'Quantidade': quant,
                    'Validade': validateDate(valid), 
                    'Operador':activiArray[6], 
                    'Data':fullDatePrint(date), 
                    'Hora':hourPrint(date), 
                    'Atividade':activiArray[3], 
                    }
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
                    tract = trackEndNull(activiArray)
                    exportFileXlsx(tract)
                    break;
                case 'Validação enderço x produto':
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
    
    let arr = []
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