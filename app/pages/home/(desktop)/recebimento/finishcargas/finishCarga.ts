import { dateDb } from "@/utils/date-generate"


export function finishCarga({...data}) {
    const obj = {
        bulkId: data.bulkId,
        bulkDriver: data.bulkDriver,
        bulkDriverPhoneNumber: data.bulkDriverPhoneNumber,
        bulkCarrier: data.bulkCarrier,
        bulkAgenda: data.bulkAgenda,
        bulkPlate: data.bulkPlate,
        bulkCpdOperator: data.bulkCpdOperator, 
        bulkDoca: data.bulkDoca,
        bulkTipoCarga: data.bulkTipoCarga,
        bulkControl: data.bulkControl,
        bulkQtPallet: data.bulkQtPallet,
        bulkReceiptOperator: data.bulkReceiptOperator,
        bulkReceiptConf: data.bulkReceiptConf,
        bulkCpdDate: data.bulkCpdDate,
        bulkReceiptDate: data.bulkReceiptDate,
        bulkConfDate: data.bulkConfDate,
        bulkStateConf: data.bulkStateConf,
        bulkStateCpd: data.bulkStateCpd,
        bulkStateReceipt: data.bulkStateReceipt,
        bulkStatusLeadTimeReceipt: 'Carga retirada', 
        bulkLeadTimeReceipt: dateDb(), 
        bulkStateCpdDescription: data.bulkStateCpdDescription,
        bulkStateReceiptDescription: data.bulkStateReceiptDescription
    }
    return obj
}