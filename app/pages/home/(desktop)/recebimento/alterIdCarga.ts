import { dateDb } from "@/utils/date-generate"


export function alterIdCarga({...data}) {
        const { dataForm, situacao, user, box } = data
    const obj = {
        bulkId: dataForm.carga.bulkId,
        bulkDriver: dataForm.carga.bulkDriver,
        bulkDriverPhoneNumber: dataForm.carga.bulkDriverPhoneNumber,
        bulkCarrier: dataForm.carga.bulkCarrier,
        bulkAgenda: dataForm.carga.bulkAgenda,
        bulkPlate: dataForm.carga.bulkPlate,
        bulkCpdOperator: dataForm.carga.bulkCpdOperator, 
        bulkDoca: box,
        bulkTipoCarga: dataForm.carga.bulkTipoCarga,
        bulkControl: dataForm.carga.bulkControl,
        bulkQtPallet: dataForm.carga.bulkQtPallet,
        bulkReceiptOperator: user,
        bulkReceiptConf: dataForm.carga.bulkReceiptConf,
        bulkCpdDate: dataForm.carga.bulkCpdDate,
        bulkReceiptDate: dateDb(),
        bulkStateReceipt: situacao,
        bulkStateCpd: dataForm.carga.bulkStateCpd,
        bulkStateConf: dataForm.carga.bulkStateConf,
        bulkStateCpdDescription: dataForm.carga.bulkStateCpdDescription,
        bulkStateReceiptDescription: dataForm.carga.bulkStateReceiptDescription
    }
    return obj
}