import { dateDb } from "@/utils/date-generate"


export function alterIdCarga({...data}) {
        const { dataForm, situacao, user, box } = data
    const obj = {
        bulkId: dataForm.bulkId,
        bulkDriver: dataForm.bulkDriver,
        bulkDriverPhoneNumber: dataForm.bulkDriverPhoneNumber,
        bulkCarrier: dataForm.bulkCarrier,
        bulkAgenda: dataForm.bulkAgenda,
        bulkPlate: dataForm.bulkPlate,
        bulkCpdOperator: dataForm.bulkCpdOperator, 
        bulkDoca: box,
        bulkTipoCarga: dataForm.bulkTipoCarga,
        bulkControl: dataForm.bulkControl,
        bulkQtPallet: dataForm.bulkQtPallet,
        bulkReceiptOperator: user.userName,
        bulkCpdDate: dataForm.bulkCpdDate,
        bulkReceiptDate: dateDb(),
        bulkState: situacao,
        bulkStateCpdDescription: dataForm.bulkStateCpdDescription,
        bulkStateReceiptDescription: dataForm.bulkStateReceiptDescription
    }
    return obj
}