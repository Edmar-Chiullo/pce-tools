import { dateDb, generateId } from "@/utils/date-generate";
import { TaskProps, TaskEndProdProps, TaskFractionalQuarentineProps, ReceiptProps, ReceiptOperatorProps, ReceiptMelloProps } from "../interface/interface";

export class Task implements TaskProps {
    address: string | null
    date: number | null
    status: boolean | null

    constructor(data:any) {
        this.address = data
        this.date = dateDb()
        this.status = true
    }
}

export class TaskEndProd implements TaskEndProdProps {
    address: string | null
    date: number | null
    product: string | null

    constructor(data:any) {
        this.address = data.loadAddress
        this.product = data.loadProduct
        this.date = dateDb()
    }
}


export class TaskPickingRotation implements TaskPickingRotation {
    address: string | null
    product: string | null
    quant: string | null
    valid: string | null
    date: number | null

    constructor(data:any) {
        this.address = data.loadAddress
        this.product = data.loadProduct
        this.quant = data.loadQuant
        this.valid = data.loadValid
        this.date = dateDb()
    }
}

export class TaskFractionalQuarentine implements TaskFractionalQuarentineProps {
    product: string | null
    quant: string | null
    valid: string | null
    constructor(data:any) {
        this.product = data.loadProduct
        this.quant = data.loadQuant
        this.valid = data.loadValid
    }
}

export class Receipt implements ReceiptProps {
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


    constructor (data:any) {
        this.bulkId = generateId('RC')
        this.bulkDriver = data.motorista
        this.bulkDriverPhoneNumber = data.telefone
        this.bulkCarrier = data.transportadora
        this.bulkAgenda = data.ticket
        this.bulkPlate = data.placa
        this.bulkControl = data.controle
        this.bulkDate = dateDb()
        this.bulkState = undefined
        this.bulkStateDescription = undefined
    }

    alterBulkState(params:string) {
        this.bulkState = params
    }

    alterBulkStateDescription(params:string) {
        this.bulkStateDescription = params
    }
}

export class ReceiptOperator implements ReceiptOperatorProps {
    bulkId: string | null
    bulkFilial: string | null
    bulkAgenda: string | null
    bulkDoca: string | null
    bulkControle: string | null
    bulkTipoCarga: string | null
    bulkQtPallet: string | null
    bulkDate: number | null
    bulkState: string | undefined | null
    bulkStateDescription: string | undefined | null


    constructor (data:any) {
        this.bulkId = generateId('RC')
        this.bulkFilial = data.filial
        this.bulkAgenda = data.agenda
        this.bulkDoca = data.doca
        this.bulkControle = data.controle
        this.bulkTipoCarga = data.tipo_carga
        this.bulkQtPallet = data.qt_pallet
        this.bulkDate = dateDb()
        this.bulkState = undefined
        this.bulkStateDescription = undefined
    }

    alterBulkState(params:string) {
        this.bulkState = params
    }

    alterBulkStateDescription(params:string) {
        this.bulkStateDescription = params
    }
}

export class ReceiptMello implements ReceiptMelloProps {
    bulkId: string | null
    bulkAgenda: string | null
    bulkDriver: string | null
    bulkDriverPhoneNumber: string | null
    bulkCarrier: string | null
    bulkPlate: string | null
    bulkCpdOperator: string | null
    bulkReceiptOperator: string | null
    bulkCpdDate: number | null
    bulkReceiptDate: number | null | string
    bulkStateCpdDescription: string | undefined | null
    bulkStateReceiptDescription: string | undefined | null
    bulkDoca: string | null
    bulkControl: string | null
    bulkTipoCarga: string | null
    bulkQtPallet: number | null | string
    bulkState: string | undefined | null


    constructor ({...data}) {
        const { carga, cpdOperator } = data
        this.bulkId = generateId('RC')
        this.bulkDriver = carga.motorista
        this.bulkDriverPhoneNumber = carga.telefone
        this.bulkCarrier = carga.transportadora
        this.bulkAgenda = carga.ticket
        this.bulkPlate = carga.placa
        this.bulkCpdOperator = cpdOperator.userName
        this.bulkDoca = 'no value'
        this.bulkControl = carga.controle
        this.bulkTipoCarga = 'no value'
        this.bulkDoca = 'no value'
        this.bulkControl = carga.controle
        this.bulkQtPallet = 'no value'
        this.bulkReceiptOperator = 'no value'
        this.bulkCpdDate = dateDb()
        this.bulkReceiptDate = 'no value'
        this.bulkState = 'entrada'
        this.bulkStateCpdDescription = 'no value'
        this.bulkStateReceiptDescription = 'no value'
    }

    alterBulkState(params:string) {
        this.bulkState = params
    }

    alterBulkStateCpdDescription(params:string) {
        this.bulkStateCpdDescription = params
    }

    alterBulkStateReceipDescription(params:string) {
        this.bulkStateReceiptDescription = params
    }

    afterCpd({...data}:any) {
        this.bulkDoca = data.doca
        this.bulkReceiptOperator = data.operator
        this.bulkReceiptDate = dateDb()
        this.bulkTipoCarga = data.typeCarga
    }
}