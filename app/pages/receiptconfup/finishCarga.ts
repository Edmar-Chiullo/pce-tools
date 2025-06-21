import { dateDb } from "@/utils/date-generate"


export function finishCarga({...data}) {
        const { dataForm, label, text, conf, tpallet, tcarga } = data
    const obj = {
        bulkId: dataForm.bulkId,
        bulkDriver: dataForm.bulkDriver,
        bulkDriverPhoneNumber: dataForm.bulkDriverPhoneNumber,
        bulkCarrier: dataForm.bulkCarrier,
        bulkAgenda: dataForm.bulkAgenda,
        bulkPlate: dataForm.bulkPlate,
        bulkCpdOperator: dataForm.bulkCpdOperator, 
        bulkDoca: dataForm.bulkDoca,
        bulkTipoCarga: tcarga,
        bulkControl: dataForm.bulkControl,
        bulkQtPallet: tpallet,
        bulkReceiptOperator: dataForm.bulkReceiptOperator,
        bulkReceiptConf: conf,
        bulkCpdDate: dataForm.bulkCpdDate,
        bulkReceiptDate: dataForm.bulkReceiptDate,
        bulkConfDate: dateDb(),
        bulkState: label,
        bulkStateCpdDescription: dataForm.bulkStateCpdDescription,
        bulkStateReceiptDescription: text
    }
    return obj
}