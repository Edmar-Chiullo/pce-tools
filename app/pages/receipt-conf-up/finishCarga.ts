import { dateDb } from "@/utils/date-generate"


export function finishCarga({...data}) {
        const { dataForm, label, text } = data
        console.log(dataForm.bulkId)
    const obj = {
        bulkId: dataForm.bulkId,
        bulkDriver: dataForm.bulkDriver,
        bulkDriverPhoneNumber: dataForm.bulkDriverPhoneNumber,
        bulkCarrier: dataForm.bulkCarrier,
        bulkAgenda: dataForm.bulkAgenda,
        bulkPlate: dataForm.bulkPlate,
        bulkCpdOperator: dataForm.bulkCpdOperator, 
        bulkDoca: dataForm.bulkDoca,
        bulkTipoCarga: dataForm.bulkTipoCarga,
        bulkControl: dataForm.bulkControl,
        bulkQtPallet: dataForm.bulkQtPallet,
        bulkReceiptOperator: dataForm.bulkReceiptOperator,
        bulkCpdDate: dataForm.bulkCpdDate,
        bulkReceiptDate: dataForm.bulkReceiptDate,
        bulkConfDate: dateDb(),
        bulkState: label,
        bulkStateCpdDescription: dataForm.bulkStateCpdDescription,
        bulkStateReceiptDescription: text
    }
    return obj
}