/**
 * Este modulo servira de apoio no carregamento de um aquivo xlsx,
 * contedo os endereços para atividades de rotativo de picking.
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import * as XLSX from 'xlsx'

export const config = {
  api: {
    bodyParser: false, // Desativa o bodyParser padrão do Next
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const form = new formidable.IncomingForm({ keepExtensions: true })
  

  form.parse(req, (err, fields, files) => {

    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao processar o upload' })
    }

    const uploadedFile:any = files.file
    const pathToFile = Array.isArray(uploadedFile)
      ? uploadedFile[0].filepath
      : uploadedFile?.filepath

    if (!pathToFile) {
      return res.status(400).json({ error: 'Arquivo não encontrado' })
    }

    // Carregar o arquivo. 
    const buffer = fs.readFileSync(pathToFile)

    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet)

    console.log(json)

    res.status(200).json(json)
  })
}


