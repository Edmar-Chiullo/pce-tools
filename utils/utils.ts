import { getTask } from "@/lib/firebase/server-database";
import { exportFileXlsx } from "./ger-xlsx"
import { trackEndNull, trackEndProd, trackPickingRotation, trackFractional } from "@/utils/treatment-data-print";

// Função responsavel por exportar tarefas para excel.
function exportXLSX(element: any) {
    getTask({id: 'Id tarefa', task: 'tarefa'}).then((result) => {
        const { activi } = result
        const activiArray:any = Object.values(activi)
        let tract
        switch (activi.activityName) {
            case 'Aéreo vazio':
                tract = trackEndNull(activiArray)
                exportFileXlsx(tract)
                break;
            case 'Validação endereço x produto':
                tract = trackEndProd(activiArray)
                exportFileXlsx(tract)
                break
            case 'Rotativo de picking':
                tract = trackPickingRotation(activiArray)
                exportFileXlsx(tract)
                break
            case 'Quarentena fracionada':
                tract = trackFractional(activiArray)
                exportFileXlsx(tract)
                break
        default:
                break
        }
    })
} 

// Função responsavel por validar o prefixo do endereços lidos.
export function validAddress(address:any) {
    const prefix = [ 'AV', 'RP', 'VE', 'PL']
    const result = prefix.filter((pr) => pr === address)
    
    return result[0]
}