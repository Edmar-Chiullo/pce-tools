import { ActivityProps } from "react";
import { fullDatePrint, hourPrint, validateDate } from "./date-generate";

// Definições de tipos para garantir a segurança do código
interface Carga {
  bulkId: string;
  bulkAgenda: string;
  bulkControl: string;
  bulkQtPallet: number;
  bulkTipoCarga: string;
  bulkConfDate: string;
  bulkReceiptDate: string;
  bulkReceiptConf: string;
  bulkLeadTimeReceipt?: string | null;
  bulkStateLeadTimeReceipt?: string;
  bulkStateConf: string;
  bulkStateReceiptDescription: string;
}

interface ActivityTask {
  activity: {
    activityID: string;
    activityName: string;
    loadAddress?: string;
    activityDate: string;
    loadProduct?: string;
    loadValid?: string;
    loadQuant?: number;
  };
}

interface Activity {
  activity: {
    activityLocalWork: string;
    activityTasks: { [key: string]: ActivityTask };
    activtyUserName: string;
    activityState: boolean;
  };
}

/**
 * Processa um array de objetos de carga para o formato de relatório do XLSX.
 * @param cargaArray Array de objetos de carga.
 * @returns Array de objetos com dados formatados para exportação.
 */
export function cargaPrintXlsx(cargaArray: Carga[]) {
  return cargaArray.map((carga:any) => ({
    'Cod. Carga': carga.bulkId,
    'Agenda': carga.bulkAgenda,
    'Controle': carga.bulkControl,
    'Qt. Pallet': carga.bulkQtPallet,
    'Tipo carga': carga.bulkTipoCarga,
    'Data': fullDatePrint(carga.bulkConfDate),
    'H. fim conferência': hourPrint(carga.bulkConfDate),
    'Tempo de espera': carga.bulkLeadTimeReceipt ? hourPrint(carga.bulkLeadTimeReceipt) : 'Carga no recebimento.',
    'Conferente': carga.bulkReceiptConf,
    'Situação conferência': carga.bulkStateConf,
    'Desc. Situação': carga.bulkStateReceiptDescription
  }));
}

/**
 * Função utilitária para processar as tarefas de uma atividade e retornar uma lista.
 * @param activity O objeto de atividade.
 * @param expectActive Se true, a função retornará tarefas somente se a atividade estiver ativa.
 * @returns Um array de tarefas ou null se as condições não forem atendidas.
 */
function processActivityTasks(activity: Activity | any, expectActive: boolean = true) {
  const { activityTasks, activityState } = activity.activity;
  // Usa `Object.values` apenas se a lista de tarefas existir.

  const list = activityTasks ? Object.values(activityTasks) : null;

  // Retorna null se não houver tarefas.
  if (!list) {
    console.error('Nenhuma tarefa encontrada para a atividade.');
    return null;
  }

  // Se a atividade estiver em execução, mas o relatório espera que esteja inativa (ou vice-versa), retorna null.
  if (activityState) {
    return null;
  }


  return list;
}

/**
 * Gera um relatório para a atividade "Aéreo vazio".
 * @param activity Objeto de atividade.
 * @returns Array de objetos formatados ou null.
 */
export function trackEndNull(activity: Activity | any) {
  const tasks = processActivityTasks(activity);
  if (!tasks) return null;

  const { activityLocalWork, activtyUserName } = activity.activity;

  return tasks.map((task:any) => ({
    'Centro': activityLocalWork,
    'Tarefa': task.activity.activityID,
    'Endereço': task.activity.loadAddress,
    'Situação': 'Vázio',
    'Operador': activtyUserName,
    'Data': fullDatePrint(task.activity.activityDate),
    'Hora': hourPrint(task.activity.activityDate),
    'Atividade': task.activity.activityName,
  }));
}

/**
 * Gera um relatório para a atividade "Validação endereço x produto".
 * @param activity Objeto de atividade.
 * @returns Array de objetos formatados ou null.
 */
export function trackEndProd(activity: Activity | any) {
  const tasks = processActivityTasks(activity, false);

  if (!tasks) return null;

  const { activityLocalWork, activtyUserName } = activity.activity;

  return tasks.map((task:any) => ({
    'Centro': activityLocalWork,
    'Tarefa': task.activity.activityID,
    'Endereço': task.activity.loadAddress,
    'Produto': task.activity.loadProduct,
    'Operador': activtyUserName,
    'Data': fullDatePrint(task.activity.activityDate),
    'Hora': hourPrint(task.activity.activityDate),
    'Atividade': task.activity.activityName,
  }));
}

/**
 * Gera um relatório para a atividade "Quarentena fracionada".
 * @param activity Objeto de atividade.
 * @returns Array de objetos formatados ou null.
 */
export function trackFractional(activity: Activity | any) {
  const tasks = processActivityTasks(activity, false);

  
  if (!tasks) return null;
  
  const { activityLocalWork, activtyUserName } = activity.activity;
  
  return tasks.map((task:any) => (
    console.log(validateDate(task.activity.loadValid)),
    
    {
    'Centro': activityLocalWork,
    'Pallet': task.activity.activityID,
    'Produto': task.activity.loadProduct,
    'Quantidade': task.activity.loadQuant,
    'Validade': validateDate(task.activity.loadValid),
    'Operador': activtyUserName,
    'Data': fullDatePrint(task.activity.activityDate),
    'Hora': hourPrint(task.activity.activityDate),
    'Atividade': task.activity.activityName,
  }
));
}

/**
 * Gera um relatório para a atividade "Rotativo de picking".
 * @param activity Objeto de atividade.
 * @returns Array de objetos formatados ou null.
 */
export function trackPickingRotation(activity: Activity | any) {
  const tasks = processActivityTasks(activity, true);

  if (!tasks) return null;

  const { activityLocalWork, activtyUserName } = activity.activity;

  return tasks.map((task:any) => ({
    'Centro': activityLocalWork,
    'Tarefa': task.activity.activityID,
    'Endereço': task.activity.loadAddress,
    'Produto': task.activity.loadProduct,
    'Quantidade': task.activity.loadQuant,
    'Validade': validateDate(task.activity.loadValid),
    'Operador': activtyUserName,
    'Data': fullDatePrint(task.activity.activityDate),
    'Hora': hourPrint(task.activity.activityDate),
    'Atividade': task.activity.activityName,
  }));
}



// import { fullDatePrint, hourPrint, validateDate } from "./date-generate"

// export function cargaPrintXlsx(cargaArray:any) {
    
//     const tract = cargaArray.map(({bulkId, 
//                                     bulkAgenda, 
//                                     bulkControl, 
//                                     bulkQtPallet, 
//                                     bulkTipoCarga,
//                                     bulkConfDate, 
//                                     bulkReceiptDate,
//                                     bulkReceiptConf,
//                                     bulkLeadTimeReceipt,
//                                     bulkStateLeadTimeReceipt,
//                                     bulkStateConf,
//                                     bulkStateReceiptDescription,
//                                     }:any) => {
//                                         return {
//                                                 'Cod. Carga':bulkId, 
//                                                 'Agenda': bulkAgenda,
//                                                 'Controle':bulkControl, 
//                                                 'Qt. Pallet': bulkQtPallet,
//                                                 'Tipo carga':bulkTipoCarga, 
//                                                 'Data':fullDatePrint(bulkConfDate), 
//                                                 'H. fim conferência':hourPrint(bulkConfDate),
//                                                 'Tempo de espera': bulkLeadTimeReceipt ? hourPrint(bulkLeadTimeReceipt) : 'Carga no recebimento.', 
//                                                 'Conferente':bulkReceiptConf, 
//                                                 'Situação conferência': bulkStateConf,
//                                                 'Desc. Situação': bulkStateReceiptDescription
//                                                 }
//                                         })
    
//      return tract
// }

// export function trackEndNull(activity:any) {
//     const { activityLocalWork, activityTasks, activtyUserName, activityState } = activity.activity

//     const list = activityTasks ? Object.values(activityTasks) : null

//     // Se não houver a lista tarefa retorna NULL.
//     if (!list) return

//     // Se a tarefa estiver em execução retornara NULL.
//     if (activityState) return false 


//     const result = list.map((value:any) => {
//         const { activityID, activityName, loadAddress, activityDate } = value.activity

//         return {
//             'Centro': activityLocalWork,
//             'Tarefa': activityID,
//             'Endereço': loadAddress,
//             'Situação': 'Vázio',
//             'Operador': activtyUserName, 
//             'Data':fullDatePrint(activityDate), 
//             'Hora':hourPrint(activityDate), 
//             'Atividade': activityName, 

//         }
//     })

//     return result
// }

// export function trackEndProd(activity:any) {
//     const { activityLocalWork, activityTasks, activtyUserName, activityState } = activity.activity

//     const list = activityTasks ? Object.values(activityTasks) : null

//     // Se não houver a lista tarefa retorna NULL.
//     if (!list) return

//     // Se a tarefa estiver em execução retornara NULL.
//     if (activityState) return false


//     const result = list.map((value:any) => {
//         const { activityID, activityName, loadAddress, activityDate, loadProduct } = value.activity

//         return {
//             'Centro': activityLocalWork,
//             'Tarefa': activityID,
//             'Endereço': loadAddress,
//             'Produto': loadProduct,
//             'Operador': activtyUserName, 
//             'Data':fullDatePrint(activityDate), 
//             'Hora':hourPrint(activityDate), 
//             'Atividade': activityName, 

//         }
//     })

//     return result
// }  

// export function trackFractional(activity:any) {
//     const { activityLocalWork, activityTasks, activtyUserName, activityState } = activity.activity
   
//     const list = activityTasks ? Object.values(activityTasks) : null

//     // Se não houver a lista tarefa retorna NULL.
//     if (!list) return

//     // Se a tarefa estiver em execução retornara NULL.
//     if (activityState) return false 


//     const result = list.map((value:any) => {
//         const { activityID, activityName, activityDate, loadProduct, loadValid, loadQuant } = value.activity

//         return {
//             'Centro': activityLocalWork,
//             'Pallet': activityID,
//             'Produto': loadProduct,
//             'Quantidade': loadQuant,
//             'Validade': loadValid,
//             'Operador': activtyUserName, 
//             'Data':fullDatePrint(activityDate), 
//             'Hora':hourPrint(activityDate), 
//             'Atividade': activityName, 
//         }
//     })

//     return result
// }  

// export function trackPickingRotation(activity:any) {
//        const { activityLocalWork, activityTasks, activtyUserName, activityState } = activity.activity

//     const list = activityTasks ? Object.values(activityTasks) : null

//     // Se não houver a lista tarefa retorna NULL.
//     if (!list) return

//     // Se a tarefa estiver em execução retornara NULL.
//     if (!activityState) return null 


//     const result = list.map((value:any) => {
//         const { activityID, activityName, loadAddress, activityDate, loadProduct, loadValid, loadQuant } = value.activity

//         return {
//             'Centro': activityLocalWork,
//             'Tarefa': activityID,
//             'Endereço': loadAddress,
//             'Produto': loadProduct,
//             'Quantidade': loadQuant,
//             'Validade': loadValid,
//             'Operador': activtyUserName, 
//             'Data':fullDatePrint(activityDate), 
//             'Hora':hourPrint(activityDate), 
//             'Atividade': activityName, 

//         }
//     })

//     return result

// }  
