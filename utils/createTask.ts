import { Task, TaskEndProd, TaskPickingRotation } from "@/app/class/class-task";
import { useActiviContext } from "@/app/context/acitivy-context";

export function createTasks({...aplication}) {

    const { atividade }:any = useActiviContext()

    if (atividade.activityName === 'Aéreo vazio') {
        return new Task(aplication)
    } else if (atividade.activityName === 'Validação enderço x produto') { 
        return new TaskEndProd(aplication)
    } else if (atividade.activityName === 'Picking rotation') {
        return new TaskPickingRotation(aplication)
    }
}