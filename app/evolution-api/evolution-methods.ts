
interface ContentProps  {
    motorista: string
    transportadora: string
    telefone: string
    placa: string 
    ticket: string
    controle: string
}

function welcomeText(name:string) {
    const text = "Olá, "+""+name.trim()+"!"+" Seja bem vindo ao centro de distribuição do grupo Muffato. A partir deste momento todos os processos sobre sua carga será informado por meio deste canal. Fique atento as notficações."
    return text
}

export class EvolutionApi {
    constructor() {

    }

    sentText({...value}: ContentProps) {
        const text = welcomeText(value.motorista)
        try {            
            const options = {
                method: 'POST',
                //headers: {apikey: process.env.AUTHENTICATION_API_KEY + '', 'Content-Type': 'application/json'},
                headers: {apikey: 'myapiphone', 'Content-Type': 'application/json'},
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

}