

export function selectApp(userPermission:string) {
    switch (userPermission) {
        case 'pce-analytics':
            return 'pages/home-analytics/'
        case 'pce-operation':
            return 'pages/home-operator/' 
        case 'cpd-operation':
            return 'pages/cpd-operator/'
        case 'receipt-operator':
            return 'pages/receipt-operator/'
        default:
            return 'Tipo de permissão não encontrada'
    }
}