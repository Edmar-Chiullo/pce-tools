'use client'

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

import { objectStreet } from "@/app/objects/object-street"
import ValidatyAddressProduct from "./picking-rotation/validaty-addressproduct"
import { Activity } from "@/app/class/class-activity"
import { useLoginContext } from "@/app/context/user-context"
import { date } from "@/utils/date-generate"
import HighNullRotation from "./high-rotation/highnull-rotatetion"

export default function NavigationMenu() {
    const [ selectCenter, setSelectCenter ] = useState<boolean>(true)
    const [ selectOperation, setSelectOperation ] = useState<boolean>(false)
    const [ selectStreet, setSelectStreet ] = useState<boolean>(false)
    const [ selectSide, setSelectSide ] = useState<boolean>(false)
    const [ highRotation, setHighRotation ] = useState<boolean>(false)
    const [ btnInit, setBtnInit ] = useState<boolean>(false)

    const [ subtitle, setSubtitle ] = useState<string>('')

    const [ validatyAddressProduct , setValidatyAddressProduct ] = useState<boolean>(false)
    const [ center , setCenter ] = useState<string>('')

    const [ activity, setActivity ] = useState<Activity>()
    const { user } = useLoginContext()

    useEffect(() => {
        setSubtitle('Selecione a operação')
    }, [selectCenter])

    function selectForm(aplication: string | null | undefined) {
        switch (aplication) {
            case 'Validação enderço x produto':
                activity?.updateInitDate(date())
                setValidatyAddressProduct(true)
                setBtnInit(false)
                break;
            case 'Aéreo vazio': 
                activity?.updateInitDate(date())
                setHighRotation(true)
                setBtnInit(false)
                break;
            default:
                break;
        }
    } 

    function selectTitle(value: string) {
        const title:any = document.querySelector('.titleApp')
        title.innerText = value
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
        const street = content

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
            case 'Validação enderço x produto':
                setSelectOperation(false)
                const taskAddressProduct = createActivity({pre:'PSR', activity:content, user:user?.userName, userId: user?.userID })
                setActivity(taskAddressProduct)
                setSelectStreet(true)
                setSubtitle('Selecione a rua')
                break;
            case 'Aéreo vazio': 
                setSelectOperation(false)
                const taskHighNull = createActivity({pre:'AV', activity:content, user:user?.userName, userId: user?.userID })
                taskHighNull.updateLocalWork(center)   
                taskHighNull.updateInitDate(date())
                setActivity(taskHighNull)
                setSubtitle('')
                setBtnInit(true)
                break
            case 'PP':
                activity?.updateLocalWork(center)
                activity?.updateStreet(street)
                setSelectStreet(false)
                setSelectSide(true)
                setSubtitle('Selecione o lado')
                break;
            case 'Par':
                activity?.updateSide(content)
                setSelectSide(false)
                setSubtitle('')
                setBtnInit(true)
                break;
            case 'Impar':
                activity?.updateSide(content)
                setSelectSide(false)                
                setSubtitle('')
                setBtnInit(true)
                break;
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
                        <Button onClick={(value) => navigation(value)}>Validação enderço x produto</Button>
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
                {validatyAddressProduct && <ValidatyAddressProduct props={activity} />}
                {highRotation && <HighNullRotation props={activity} />}
            </div>
        </div>
    )
}