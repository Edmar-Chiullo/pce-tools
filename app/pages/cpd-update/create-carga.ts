

export function carga({...data}) {
        const { dataForm, carga } = data
    const obj = {
        bulkId: carga.bulkId,
        bulkDriver: dataForm.motorista,
        bulkDriverPhoneNumber: dataForm.telefone,
        bulkCarrier: dataForm.transportadora,
        bulkAgenda: dataForm.ticket,
        bulkPlate: dataForm.placa,
        bulkCpdOperator: carga.bulkCpdOperator, 
        bulkDoca: carga.bulkDoca,
        bulkTipoCarga: carga.bulkTipoCarga,
        bulkControl: dataForm.controle,
        bulkQtPallet: carga.bulkQtPallet,
        bulkReceiptOperator: carga.bulkReceiptOperator,
        bulkCpdDate: carga.bulkCpdDate,
        bulkReceiptDate: carga.bulkReceiptDate,
        bulkState: carga.bulkState,
        bulkStateCpdDescription: carga.bulkStateCpdDescription,
        bulkStateReceiptDescription: carga.bulkStateReceiptDescription
    }
    return obj
}