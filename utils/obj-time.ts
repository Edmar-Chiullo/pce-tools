export class CreateTime {
    compontTime: object
    countSecond: number
    time: string | null | object
    constructor({...compont}:any) {
        this.compontTime = compont.compontTime
        this.countSecond = compont.second
        this.time = compont.time
    }

    //Metodo que gera timer 
    createDateNow() {
        const hour = new Date(this.countSecond * 1000)
        return hour.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        })
    }

    startDateNow() {
        this.time = setInterval(() => {
            this.countSecond++
            let cronos = this.createDateNow()

            return cronos
        }, 1000)
    }
}