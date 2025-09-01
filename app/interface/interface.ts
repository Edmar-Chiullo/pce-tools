
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
    activityTasks: string | null
    activityStreet: string | null
    activitySide: string | null
    activityInitDate: Date | null | number | string
    activityFinisDate: Date | null | number | string
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

export interface TaskPickingRotation {
    address: string | null
    product: string | null
    quanti: string | null
    date: number | null
}

export interface TaskFractionalQuarentineProps {
    product: string | null
    quant: string | null
    valid: string | null
}

export interface ReceiptProps {
    bulkId: string | null
    bulkDriver: string | null
    bulkDriverPhoneNumber: string | null
    bulkCarrier: string | null
    bulkAgenda: string | null
    bulkPlate: string | null
    bulkControl: string | null
    bulkDate: number | null
    bulkState: string | undefined | null
    bulkStateDescription: string | undefined | null
}

export interface ReceiptMelloProps {
    bulkId: string | null
    bulkDriver: string | null
    bulkDriverPhoneNumber: string | null
    bulkCpdOperator: string | null
    bulkReceiptOperator: string | null
    bulkReceiptConf: string | null | number
    bulkDoca: string | null
    bulkCarrier: string | null
    bulkAgenda: string | null
    bulkPlate: string | null
    bulkControl: string | null
    bulkCpdDate: number | null
    bulkReceiptDate: number | null | string
    bulkQtPallet: number | null | string
    bulkTipoCarga: string | null
    bulkStateCpd: string | undefined | null
    bulkStateConf: string | undefined | null
    bulkStateReceipt: string | undefined | null
    bulkStateCpdDescription: string | undefined | null
    bulkStateReceiptDescription: string | undefined | null
}

export interface ReceiptOperatorProps {
    bulkId: string | null
    bulkFilial: string | null
    bulkAgenda: string | null
    bulkDoca: string | null
    bulkControle: string | null
    bulkTipoCarga: string | null
    bulkQtPallet: string | null
    bulkDate: number | null
    bulkStateCpd: string | undefined | null
    bulkStateConf: string | undefined | null
    bulkStateReceipt: string | undefined | null
    bulkStateDescription: string | undefined | null
}