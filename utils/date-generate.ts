function addLeftZZero(value:number) {
    return value < 10 ? `0${value}` : value 
}

export function generateId(pre: string) {
    const hour = addLeftZZero(datePrint().getHours())
    const minutes = addLeftZZero(datePrint().getMinutes())
    const seconds = addLeftZZero(datePrint().getSeconds())

    return `${pre}${hour}${minutes}${seconds}`
}

export function fullDate() {
    const day = addLeftZZero(datePrint().getDate())
    const month = addLeftZZero(datePrint().getMonth())
    const year = datePrint().getFullYear()

    return `${day}/${month}/${year}`
}

export function fullDatePrint(date:number | string) {
    const day = addLeftZZero(datePrintInt(date).getDate())
    const month = addLeftZZero(datePrintInt(date).getMonth() + 1)
    const year = datePrintInt(date).getFullYear()

    return `${day}/${month}/${year}`
}

export function formatDate(value: any): string {
  if (typeof value === 'number') {
    const excelEpoch = new Date(1899, 11, 30); // Excel base date
    const result = new Date(excelEpoch.getTime() + value * 86400000); // dias * ms por dia
    const dd = String(result.getDate()).padStart(2, '0');
    const mm = String(result.getMonth() + 1).padStart(2, '0');
    const yyyy = result.getFullYear();
    return `${dd}${mm}${yyyy}`;
  }

  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}${mm}${yyyy}`;
  }

  return String(value);
}


export function hourPrint(date:number) {
    const hour = addLeftZZero(datePrintInt(date).getHours())
    const minutes = addLeftZZero(datePrintInt(date).getMinutes())
    const seconds = addLeftZZero(datePrintInt(date).getSeconds())

    return `${hour}:${minutes}:${seconds}`
}

export function datePrintInt(dt:number | string) {
    const date = new Date(dt)    
    return date
}

export function hour() {
    const hour = addLeftZZero(datePrint().getHours())
    const minutes = addLeftZZero(datePrint().getMinutes())
    const seconds = addLeftZZero(datePrint().getSeconds())

    return `${hour}:${minutes}:${seconds}`
}

export function validateDate(valid:string) {
    return `${valid.slice(0,2)}/${valid.slice(2,4)}/${valid.slice(4,8)}`
}

export function datePrint() {
    const date = new Date()    
    return date
}

export function dateDb() {
    const date = Date.now()    
    return date
}
