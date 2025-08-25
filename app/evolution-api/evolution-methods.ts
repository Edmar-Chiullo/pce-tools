
interface ContentProps  {
    motorista: string
    transportadora: string
    telefone: string
    placa: string 
    ticket: string
    controle: string
}

interface NotificationProps  {
    motorista: string
    transportadora: string
    telefone: string
    placa: string 
    ticket: string
    controle: string
    textarea: string | null
}

interface NotificationCarga {
    bulkId: string | null
    bulkAgenda: string | null
    bulkDriver: string | null
    bulkDriverPhoneNumber: string | null
    bulkCarrier: string | null
    bulkPlate: string | null
    bulkCpdOperator: string | null
    bulkReceiptOperator: string | null
    bulkReceiptConf: string | null | number
    bulkCpdDate: number | null
    bulkReceiptDate: number | null | string
    bulkStateCpdDescription: string | undefined | null
    bulkStateReceiptDescription: string | undefined | null
    bulkDoca: string | null
    bulkControl: string | null
    bulkTipoCarga: string | null
    bulkQtPallet: number | null | string
    bulkStateCpd: string | undefined | null
    bulkStateConf: string | undefined | null
    bulkStateReceipt: string | undefined | null

}

interface NotificationCanhotoProps  {
    motorista: string
    telefone: string
    textarea: string | null
}

function welcomeText({...value}:any) {
    const text = `Olá, ${value.motorista}. 
Seja bem vindo ao centro de distribuição do grupo Muffato. 
O número do seu controle será: ${value.id}. Quero informar que apartir de deste momento as informarções refernte a sua carga será enviada atravez deste canal.
Obs: este canal é somente para nós passarmos o status de sua carga. Não envie mensagem atravez dele pois não serão respondidas.`
    // const text = "Olá, "+""+value.bulkDriver.trim()+"!"+" Seja bem vindo ao centro de distribuição do grupo Muffato. A partir deste momento todos os processos sobre sua carga será informado por meio deste canal. Fique atento as notficações. O número de seu controle é: " + value.bulkId
    return text
}

function senText(name:string) {
    const text = name.trim()+"!"+" analisamos suas notas estão ok. Favor comparecer no recebimento com o caminhão."
    return text
}

export class EvolutionApi {
    constructor() {}    
    sentTextWelcome({...value}: NotificationCarga) {
        const text = welcomeText({motorista:value.bulkDriver, id:value.bulkId})
        
        const content = {
            number: `55${value.bulkDriverPhoneNumber}`,
            text:text,
            delay:2000
        }

        try {            
            const options = {
                method: 'POST',
                headers: {apikey: process.env.NEXT_PUBLIC_AUTHENTICATION_API_KEY  + '', 'Content-Type': 'application/json'},
                body: JSON.stringify(content)
            };

            fetch('http://31.97.24.67:8080/message/sendText/pessoal', options)
            .then(response => response.json())
            .then(response => {return response})
            .catch(err => {return err});

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

    sendTextConvocationDriver({...value}: NotificationProps) {
        const text = senText(value.motorista.trim())           
        try {         
            const payload = {
                number: `55${value.telefone}`,
                text: text,
                delay: 2000
            };   
            const options = {
                method: 'POST',
                headers: {apikey: process.env.NEXT_PUBLIC_AUTHENTICATION_API_KEY  + '', 'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch('http://31.97.24.67:8080/message/sendText/pessoal', options)
            .then(response => response.json())
            .then(response => {return response})
            .catch(err => {return err});

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

    sentTextAddInformation({...value}: NotificationProps) {
        const text = `Olá, ${value.motorista.trim()}. ${value.textarea}`
        try {         
            const payload = {
                number: `55${value.telefone}`,
                text: text,
                delay: 2000
            };   
            const options = {
                method: 'POST',
                headers: {apikey: process.env.NEXT_PUBLIC_AUTHENTICATION_API_KEY  + '', 'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch('http://31.97.24.67:8080/message/sendText/pessoal', options)
            .then(response => response.json())
            .then(response => {return response})
            .catch(err => {return err});

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

    sentTextDiverCpdCanhoto({...value}: NotificationCanhotoProps) {
        const text = `Olá, ${value.motorista}. ${value.textarea}`
        try {         
            const payload = {
                number: `55${value.telefone}`,
                text: text,
                delay: 2000
            };   
            const options = {
                method: 'POST',
                headers: {apikey: process.env.NEXT_PUBLIC_AUTHENTICATION_API_KEY  + '', 'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch('http://31.97.24.67:8080/message/sendText/pessoal', options)
            .then(response => response.json())
            .then(response => {return response})
            .catch(err => {return err});

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

}