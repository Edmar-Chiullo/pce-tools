import { string } from "zod"

export interface UserProps {
    userID: string | null
    userName: string | null
    userPermission: string | null
    userLocalWork: string | null
    userRegistrationDate: Date | null
}

export interface ActivityProps {
    activityID: string
    activityUserID: string
    activtyUserName: string
    activityName: string | null
    activityState: boolean | null
    activityLocalWork: string | null
    activityTasks: Task[] | null
    activityStreet: string | null
    activitySide: string | null
    activityInitDate: Date | null
    activityFinisDate: Date | null
}

export interface Task {
        address: string,
        product: string,
        date: Date,
        status: boolean
}