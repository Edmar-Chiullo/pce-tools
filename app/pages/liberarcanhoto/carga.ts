
export function carga({...data}) {
        const { dataForm, carga } = data
    const obj = {
        bulkId: carga.bulkId,
        bulkDriver: carga.bulkDriver,
        bulkDriverPhoneNumber: carga.bulkDriverPhoneNumber,
        bulkCarrier: carga.bulkCarrier,
        bulkAgenda: carga.bulkAgenda,
        bulkPlate: carga.bulkPlate,
        bulkCpdOperator: carga.bulkCpdOperator, 
        bulkConfDate: carga.bulkConfDate,
        bulkReceiptConf: carga.bulkReceiptConf,
        bulkDoca: carga.bulkDoca,
        bulkTipoCarga: carga.bulkTipoCarga,
        bulkControl: carga.bulkControl,
        bulkQtPallet: carga.bulkQtPallet,
        bulkReceiptOperator: carga.bulkReceiptOperator,
        bulkCpdDate: carga.bulkCpdDate,
        bulkReceiptDate: carga.bulkReceiptDate,
        bulkStateCpd: 'liberar canhoto',
        bulkStateConf: carga.bulkStateConf,
        bulkStateReceipt: carga.bulkStateReceipt,
        bulkStateCpdDescription: dataForm.textarea,
        bulkStateReceiptDescription: carga.bulkStateReceiptDescription
    }

    return obj
}