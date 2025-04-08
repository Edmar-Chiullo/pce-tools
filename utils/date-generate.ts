function addLeftZZero(value:number) {
    if (value < 10) return `0${value}`  
}


export function generateId(pre: string) {
    const hour = date().getHours()
    const minutes = date().getMinutes()
    const seconds = date().getSeconds()

    return `${pre}${hour}${minutes}${seconds}`
}

export function fullDate() {
    const day = addLeftZZero(date().getDate())
    const month = addLeftZZero(date().getMonth())
    const year = date().getFullYear()

    return `${day}/${month}/${year}`
}

export function hour() {
    const hour = addLeftZZero(date().getHours())
    const minutes = addLeftZZero(date().getMinutes())
    const seconds = addLeftZZero(date().getSeconds())

    return `${hour}:${minutes}:${seconds}`
}

export function date() {
    const date = new Date()    
    return date
}
