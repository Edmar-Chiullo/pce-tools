
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

function welcomeText(name:string) {
    const text = "Olá, "+""+name.trim()+"!"+" Seja bem vindo ao centro de distribuição do grupo Muffato. A partir deste momento todos os processos sobre sua carga será informado por meio deste canal. Fique atento as notficações."
    return text
}

export class EvolutionApi {
    constructor() {}

    sentTextWelcome({...value}: ContentProps) {
        const text = welcomeText(value.motorista)
        try {            
            const options = {
                method: 'POST',
                headers: {apikey: process.env.NEXT_PUBLIC_AUTHENTICATION_API_KEY  + '', 'Content-Type': 'application/json'},
                body: `{"number":"55${value.telefone}","text":"${text}","delay":2000}`
            };

            fetch('http://localhost:8080/message/sendText/myapiphone', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

    sentTextDiverCpd({...value}: NotificationProps) {
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

            fetch('http://localhost:8080/message/sendText/myapiphone', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

            return 'Mensagem enviada com sussesso.'
        } catch (error) {
            return `Mensagem enviada com sussesso. Error: ${error}`
            
        }
    }

}