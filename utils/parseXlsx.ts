import * as XLSX from 'xlsx'

export interface ParsedItem {
  Código: string
  Validade: string
  "Local Armazenado": string
}

export function parseXlsx(file: File): Promise<ParsedItem[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
      const bstr = evt.target?.result
      if (!bstr) return reject('Erro ao ler o arquivo.')

      const wb = XLSX.read(bstr, { type: 'binary' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json<ParsedItem>(ws, { header: 0 })

      resolve(data)
    }
    reader.onerror = () => reject('Erro ao carregar o arquivo.')
    reader.readAsBinaryString(file)
  })
}
