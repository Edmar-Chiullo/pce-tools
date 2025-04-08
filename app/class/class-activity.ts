import { generateId } from "@/utils/date-generate";
import { ActivityProps, Task } from "../interface/interface";

export class Activity implements ActivityProps {
    activityID: string
    activityUserID: string
    activtyUserName: string
    activityName: string | null
    activityState: boolean
    activityLocalWork: string | null
    activityTasks: Task[] | null
    activityStreet: string | null
    activitySide: string | null
    activityInitDate: Date | null
    activityFinisDate: Date | null

    constructor({ ...props }) {
        this.activityID = generateId(props.pre)
        this.activityUserID = props.userID
        this.activtyUserName = props.userName
        this.activityName = props.activityName
        this.activityState = true
        this.activityLocalWork = null
        this.activityTasks = null
        this.activityStreet = null
        this.activitySide = null
        this.activityInitDate = null
        this.activityFinisDate = null
    }
    
    updateTask (task: Task[] | null):void {
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

    updateInitDate(date: Date):void {
        this.activityInitDate = date        
    }

    updateFinisHour(date: Date):void {
        this.activityFinisDate = date        
    }
    
}