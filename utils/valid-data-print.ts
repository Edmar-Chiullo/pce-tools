
/**
 * Este modulo realizar o filtro de atividades realizada no dia atua para realizar a impressão.
 * Não permitindo a impressão de atividades de dias anteriores.
 */

import { fullDatePrint, dateDb } from "./date-generate"

export function valDate(actDate: number) {
    const dataComp = dateDb()
    const activiDate = fullDatePrint(actDate)
    const dateNow = fullDatePrint(dataComp)

    return activiDate === dateNow ? true : false
}