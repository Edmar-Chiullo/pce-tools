import { fullDatePrint, hourPrint, validateDate } from "./date-generate"


export function trackEndNull({...activiArray}:any) {
    const rerultTask = JSON.parse(activiArray[7])
    
    const tract = rerultTask.map(({address, date, status }:any) => {
        return {'Centro':activiArray[2], 
                'Tarefa': activiArray[0],
                'Endereço':address, 
                'Situação': 'VAZIO',
                'Operador':activiArray[5], 
                'Data':fullDatePrint(date), 
                'Hora':hourPrint(date), 
                'Atividade':activiArray[3], 
                }
    })
    
    return tract
}

export function trackEndProd({...activiArray}:any) {
    const rerultTask = JSON.parse(activiArray[7])
    const tract = rerultTask.map(({address, date, product }:any) => {
        return {'Centro':activiArray[2], 
                'Endereço':address, 
                'Tarefa': activiArray[0],
                'Produto': product,
                'Operador':activiArray[6], 
                'Data':fullDatePrint(date), 
                'Hora':hourPrint(date), 
                'Atividade':activiArray[3] 
                }
    })
    
    return tract
}  

export function trackFractional({...activiArray}:any) {
    const rerultTask = JSON.parse(activiArray[7])
    const tract = rerultTask.map(({ product, valid, quant }:any) => {
        return {'Centro':activiArray[2],
                'Pallet': activiArray[0], 
                'Tarefa': activiArray[0],
                'Produto': product,
                'Quantidade': quant,
                'Data validade': validateDate(valid), 
                'Operador':activiArray[6], 
                'Atividade':activiArray[3] 
                }
    })
    
    return tract
}  

export function trackPickingRotation({...activiArray}:any) {
    const rerultTask = JSON.parse(activiArray[7])
    const tract = rerultTask.map(({address, date, product, quant, valid }:any) => {
        return {'Centro':activiArray[2], 
                'Tarefa': activiArray[0],
                'Endereço':address,
                'Produto': product,
                'Quantidade': quant,
                'Validade': validateDate(valid), 
                'Operador':activiArray[6], 
                'Data':fullDatePrint(date), 
                'Hora':hourPrint(date), 
                'Atividade':activiArray[3], 
                }
    })
    
    return tract
}  
