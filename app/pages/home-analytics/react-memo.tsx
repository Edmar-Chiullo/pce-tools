import React from 'react'

import { fullDatePrint } from '@/utils/date-generate'
import { hourPrint } from '@/utils/date-generate'

import { Button } from '@/components/ui/button'


const TaskItem = React.memo(({ data }: { data: any }) => {    
        const { activityID, activityState, activityInitDate, 
            activityLocalWork, activtyUserName, activityName } = data

        let color = activityState ? 'bg-orange-100' : 'bg-green-100' 
        let hColor = activityState ? 'hover:bg-orange-50' : 'hover:bg-green-50' 
        let status = activityState ? 'Executando' : 'Finalizado'

        return  (
            <div key={activityID} className={`activi-card flex justify-between gap-8 ${color} rounded-sm pl-2 pr-2 ${hColor}`}>
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
                <Button className="self-center w-20 h-8 text-[10px] rounded-3xl">{status}</Button>
            </div>
        )                    
    })


    export default TaskItem
