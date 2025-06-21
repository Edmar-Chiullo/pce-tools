

export function selectApp(userPermission:string) {
    switch (userPermission) {
        case 'pce-analytics':
            return 'pages/homeanalytics/'
        case 'pce-operation':
            return 'pages/homeoperator/' 
        case 'cpd-operation':
            return 'pages/cpdoperator/'
        case 'receipt-operator':
            return 'pages/receiptoperator/'
        case 'receipt-conf':
            return 'pages/receiptconf/'
        default:
            return 'Tipo de permissão não encontrada'
    }
}