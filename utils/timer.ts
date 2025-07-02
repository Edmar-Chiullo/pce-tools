let startTime:any
let timerInterval:any

export function iniciarAtividade(dInit: any) {
  // Registra o momento de início
  startTime = new Date(dInit);

  // Inicia o timer
  if (timerInterval) clearInterval(timerInterval); // se já tiver um timer, limpa ele

  timerInterval = setInterval(() => {
    const agora:any = new Date();
    const diffMs = agora - startTime;
    const segundos = Math.floor(diffMs / 1000) % 60;
    const minutos = Math.floor(diffMs / 1000 / 60) % 60;
    const horas = Math.floor(diffMs / 1000 / 60 / 60);
    
   return  `${horas}:${minutos}:${segundos}`;
  }, 1000);

  return timerInterval
}

export class TimerPrint {
    timer: Date | null
    constructor(t:any) {
        this.timer = iniciarAtividade(t)
    }
}
