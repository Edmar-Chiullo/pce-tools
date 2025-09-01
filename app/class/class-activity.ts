import { generateId } from "@/utils/date-generate";
import { ActivityProps } from "../interface/interface";

export class Activity implements ActivityProps {
    activityID: string
    activityUserID: string
    activtyUserName: string
    activityName: string | null
    activityState: boolean
    activityLocalWork: string | null
    activityTasks: string | null
    activityStreet: string | null
    activitySide: string | null
    activityInitDate: Date | null | number | string
    activityFinisDate: Date | null | number | string

    constructor({ ...props }) {
        const name = JSON.parse(props.name)

        this.activityID = 'no value'
        this.activityUserID = props.id
        this.activtyUserName = name.first
        this.activityName = 'no value'
        this.activityState = true
        this.activityLocalWork = 'no value'
        this.activityTasks = 'no value'
        this.activityStreet = 'no value'
        this.activitySide = 'no value'
        this.activityInitDate = 'no value'
        this.activityFinisDate = 'no value'
    }

    updateId(prefixo:string) {
        this.activityID = generateId(prefixo)
    }
    
    updateName(name: string) {
        this.activityName = name
    }

    updateTask (task: string | null):void {
        this.activityTasks = task 
    }

    updateLocalWork(localWork: string):void {
        this.activityLocalWork = localWork
    }

    updateStreet(street: string):void {
        this.activityStreet = street
    }

    updateSide(side: string):void {
        this.activitySide = side
    }

    updateInitDate(date: Date | number):void {
        this.activityInitDate = date        
    }

    updateFinisHour(date: Date):void {
        this.activityFinisDate = date        
    }

    updateState(state:boolean) {
        this.activityState = state
    }
}