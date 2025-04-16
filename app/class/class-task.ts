import { dateDb } from "@/utils/date-generate";
import { TaskProps, TaskEndProdProps } from "../interface/interface";

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