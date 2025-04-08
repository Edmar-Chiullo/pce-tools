

export function selectApp(userPermission:string) {
    switch (userPermission) {
        case 'pce-analytics':
            return 'pages/home-analytics/'
        case 'pce-operation':
            return 'pages/home-operator/'   
        default:
            return 'Tipo de permissão não encontrada'
        
    }
}