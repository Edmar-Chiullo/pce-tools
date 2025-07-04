import * as XLSX from 'xlsx'
import path from 'path'

export async function exportFileXlsx(value:any) {
    const worksheet = XLSX.utils.json_to_sheet(value)
    const workbook = XLSX.utils.book_new()
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha1');

    const register = ``
    const pathRegister = "atividadade_pce"
    const filePathRegister = path.join(pathRegister, `${register}.xlsx`)            
    XLSX.writeFile(workbook, filePathRegister)
}


export async function exportFileXlsxRecebimento(value:any) {
    const worksheet = XLSX.utils.json_to_sheet(value)
    const workbook = XLSX.utils.book_new()
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planilha1');

    const register = ``
    const pathRegister = "rel_recebimento"
    const filePathRegister = path.join(pathRegister, `${register}.xlsx`)            
    XLSX.writeFile(workbook, filePathRegister)
}