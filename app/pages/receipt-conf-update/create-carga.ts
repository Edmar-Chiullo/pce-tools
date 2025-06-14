

export function carga({...data}) {
        const { dataForm, carga, situacao, user } = data
    const obj = {
        bulkId: carga.bulkId,
        bulkDriver: carga.bulkDriver,
        bulkDriverPhoneNumber: carga.bulkDriverPhoneNumber,
        bulkCarrier: carga.bulkCarrier,
        bulkAgenda: carga.bulkAgenda,
        bulkPlate: carga.bulkPlate,
        bulkCpdOperator: carga.bulkCpdOperator, 
        bulkDoca: dataForm.doca,
        bulkTipoCarga: carga.bulkTipoCarga,
        bulkControl: carga.bulkControl,
        bulkQtPallet: carga.bulkQtPallet,
        bulkReceiptOperator: user.userName,
        bulkCpdDate: carga.bulkCpdDate,
        bulkReceiptDate: carga.bulkReceiptDate,
        bulkState: situacao,
        bulkStateCpdDescription: carga.bulkStateCpdDescription,
        bulkStateReceiptDescription: carga.bulkStateReceiptDescription
    }
    return obj
}