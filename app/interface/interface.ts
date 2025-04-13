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
    activityTasks: Object | null
    activityStreet: string | null
    activitySide: string | null
    activityInitDate: Date | null | number
    activityFinisDate: Date | null
}

export interface TaskProps {
    address: string | null
    date: number | null
    status: boolean | null
}

export interface TaskEndProdProps {
    address: string | null
    product: string | null
    date: number | null
}