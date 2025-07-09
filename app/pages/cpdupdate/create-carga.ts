

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
        bulkReceiptConf: carga.bulkReceiptConf,
        bulkDoca: carga.bulkDoca,
        bulkTipoCarga: carga.bulkTipoCarga,
        bulkControl: dataForm.controle,
        bulkQtPallet: carga.bulkQtPallet,
        bulkReceiptOperator: carga.bulkReceiptOperator,
        bulkCpdDate: carga.bulkCpdDate,
        bulkReceiptDate: carga.bulkReceiptDate,
        bulkStateCpd: dataForm.liberado ? 'liberar entrada' : 'chegada carro',
        bulkStateConf: carga.bulkStateConf,
        bulkStateReceipt: carga.bulkStateReceipt,
        bulkStateCpdDescription: carga.bulkStateCpdDescription,
        bulkStateReceiptDescription: carga.bulkStateReceiptDescription
    }
    return obj
}