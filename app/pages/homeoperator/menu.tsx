'use client'

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

import { objectStreet } from "@/app/objects/object-street"
import ValidatyAddressProduct from "./validate-address-product/validaty-addressproduct"
import { Activity } from "@/app/class/class-activity"
import { dateDb } from "@/utils/date-generate"
import HighNullRotation from "./high-rotation-null/highnull-rotatetion"
import { setActivityDb } from "@/app/firebase/fbmethod"

import { useLoginContext } from "@/app/context/user-context"
import { useActiviContext } from "@/app/context/acitivy-context"
import PickingRotation from "./pincking-rotation/picking-rotation"
import FractionalQuarentine from "./fractional-quarentine/fractional-quarentine"

export default function NavigationMenu() {
    const [ selectCenter, setSelectCenter ] = useState<boolean>(true)
    const [ selectOperation, setSelectOperation ] = useState<boolean>(false)
    const [ selectStreet, setSelectStreet ] = useState<boolean>(false)
    const [ selectSide, setSelectSide ] = useState<boolean>(false)
    const [ highRotation, setHighRotation ] = useState<boolean>(false)
    const [ pickingRotation, setPickingRotation ] = useState<boolean>(false)
    const [ fractionalQuarentine, setFractonalQuarentine ] = useState<boolean>(false)
    const [ btnInit, setBtnInit ] = useState<boolean>(false)

    const [ subtitle, setSubtitle ] = useState<string>('')

    const [ validatyAddressProduct , setValidatyAddressProduct ] = useState<boolean>(false)
    const [ center , setCenter ] = useState<string>('')

    const [ activity, setActivity ] = useState<Activity>()

    const { user } = useLoginContext()
    const { setAtividade }:any = useActiviContext()

    useEffect(() => {
        setSubtitle('Selecione a operação')
    }, [selectCenter])

    function selectForm(aplication: string | null | undefined) {
        switch (aplication) {
            case 'Validação endereço x produto':
                activity?.updateInitDate(dateDb())
                setActivityDb(activity)
                setValidatyAddressProduct(true)
                setAtividade(activity)

                setBtnInit(false)
                break;
            case 'Aéreo vazio': 
                activity?.updateInitDate(dateDb())
                setActivityDb(activity)
                setAtividade(activity)
                setHighRotation(true)
                setBtnInit(false)
                break;  
            case 'Rotativo de picking': 
                activity?.updateInitDate(dateDb())
                setActivityDb(activity)
                setAtividade(activity)
                setPickingRotation(true)
                setBtnInit(false)
                break;  
            case 'Quarentena fracionada': 
                activity?.updateInitDate(dateDb())
                setActivityDb(activity)
                setAtividade(activity)
                setFractonalQuarentine(true)
                setBtnInit(false)
                break;  
            default:
                break;
        }
    } 

    function createActivity({...activity}) {
        const task = new Activity({pre: activity.pre, 
                                    activityName:activity.activity,  
                                    userID: activity.userId, 
                                    userName: activity.user})
        return task
    }

    function navigation(value: any) {
        let content = value.target.innerText

        if (content.slice(0, 2) === 'PP') content = 'PP'

        switch (content) {
            case 'Centro 1046':
                setCenter(content)
                setSelectCenter(false)
                setSelectOperation(true)
                setSubtitle('Selecione a operação')
                break;
            case 'Centro 1125':
                setCenter(content)
                setSelectCenter(false)
                setSelectOperation(true)
                setSubtitle('Selecione a operação')
                break;
            case 'Validação endereço x produto':
                setSelectOperation(false)
                const taskAddressProduct = createActivity({pre:'VEP', activity:content, user:user?.userName, userId: user?.userID })
                taskAddressProduct.updateLocalWork(center)   
                setActivity(taskAddressProduct)
                setSubtitle('')
                setBtnInit(true)
                break;
            case 'Rotativo de picking':
                setSelectOperation(false)
                const taskPincingRotation = createActivity({pre:'RP', activity:content, user:user?.userName, userId: user?.userID })
                taskPincingRotation.updateLocalWork(center)   
                setActivity(taskPincingRotation)
                setSubtitle('')
                setBtnInit(true)
                break;
                    
            case 'Aéreo vazio': 
                setSelectOperation(false)
                const taskHighNull = createActivity({pre:'AV', activity:content, user:user?.userName, userId: user?.userID })
                taskHighNull.updateLocalWork(center)   
                taskHighNull.updateInitDate(dateDb())
                setActivity(taskHighNull)
                setSubtitle('')
                setBtnInit(true)
                break
            case 'Quarentena fracionada': 
            console.log(content)
                setSelectOperation(false)
                const taskFractional = createActivity({pre:'PL', activity:content, user:user?.userName, userId: user?.userID })
                taskFractional.updateLocalWork(center)   
                taskFractional.updateInitDate(dateDb())
                setActivity(taskFractional)
                setSubtitle('')
                setBtnInit(true)
                break
            default:
                break;
        }
    }

    function startTask() {
        selectForm(activity?.activityName)
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center w-full pl-4 pr-4">
            <div className="flex justify-start w-full">
                <h1>{subtitle}</h1>
            </div>
            <div className="relative flex justify-center items-start w-full">
                { selectCenter &&
                    <div className="absolute z-20 flex flex-col justify-center gap-2 w-full">
                        <Button onClick={((value) => navigation(value))}>Centro 1046</Button>
                        <Button onClick={((value) => navigation(value))}>Centro 1125</Button>
                    </div>
                }
                { selectOperation &&    
                    <div className="absolute z-30 flex flex-col justify-center gap-2 w-full">
                        <Button onClick={(value) => navigation(value)}>Aéreo vazio</Button>
                        <Button onClick={(value) => navigation(value)}>Rotativo de picking</Button>
                        <Button onClick={(value) => navigation(value)}>Validação endereço x produto</Button>
                        <Button onClick={(value) => navigation(value)}>Quarentena fracionada</Button>
                    </div>
                }
                {selectStreet && 
                    <div className="absolute z-30 grid grid-cols-3 grid-rows-4 gap-2 w-full">
                        {
                            objectStreet.map(({streetDescription}, i) => <Button key={i} onClick={(value) => 
                                        navigation(value)} className={`col-start-[${i}] row-start-[${i}]`}>{streetDescription}</Button>)
                        }
                    </div>
                }
                {selectSide && 
                    <div className="absolute z-40 flex flex-col justify-center gap-2 w-full">
                        <Button onClick={((value) => navigation(value))}>Par</Button>
                        <Button onClick={((value) => navigation(value))}>Impar</Button>
                    </div>
                }
                {btnInit &&
                    <div className="flex flex-col gap-1 w-full h-12 mt-6">
                        <h1>Iniciar atividade?</h1>
                        <Button className="w-full text-[20px] text-center font-light" onClick={startTask}>Iniciar</Button>
                    </div>
                }
                {validatyAddressProduct && <ValidatyAddressProduct />}
                {highRotation && <HighNullRotation />}
                {pickingRotation && <PickingRotation />}
                {fractionalQuarentine && <FractionalQuarentine />}
            </div>
        </div>
    )
}