function addLeftZZero(value:number) {
    return value < 10 ? `0${value}` : value 
}


export function generateId(pre: string) {
    const hour = datePrint().getHours()
    const minutes = datePrint().getMinutes()
    const seconds = datePrint().getSeconds()

    return `${pre}${hour}${minutes}${seconds}`
}

export function fullDate() {
    const day = addLeftZZero(datePrint().getDate())
    const month = addLeftZZero(datePrint().getMonth())
    const year = datePrint().getFullYear()

    return `${day}/${month}/${year}`
}

export function fullDatePrint(date:number) {
    const day = addLeftZZero(datePrintInt(date).getDate())
    const month = addLeftZZero(datePrintInt(date).getMonth())
    const year = datePrintInt(date).getFullYear()

    return `${day}/${month}/${year}`
}

export function hourPrint(date:number) {
    const hour = addLeftZZero(datePrintInt(date).getHours())
    const minutes = addLeftZZero(datePrintInt(date).getMinutes())
    const seconds = addLeftZZero(datePrintInt(date).getSeconds())

    return `${hour}:${minutes}:${seconds}`
}

export function datePrintInt(dt:number) {
    const date = new Date(dt)    
    return date
}



export function hour() {
    const hour = addLeftZZero(datePrint().getHours())
    const minutes = addLeftZZero(datePrint().getMinutes())
    const seconds = addLeftZZero(datePrint().getSeconds())

    return `${hour}:${minutes}:${seconds}`
}

export function datePrint() {
    const date = new Date()    
    return date
}

export function dateDb() {
    const date = Date.now()    
    return date
}
