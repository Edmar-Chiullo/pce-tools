import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFileJson } from '@/lib/get-filejson';

export const config = {
    api: {
        bodyParser: false, // Desativa o bodyParser padrão do Next
        // Aumenta o limite de tamanho do corpo para 20MB
        sizeLimit: '20mb',
    },
};

const filePath = path.join(process.cwd(), 'data', 'data.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req)
    // try {
    //     const jsonData = await getFileJson(filePath);
    //     res.status(200).json(jsonData);
    // } catch (error) {
    //     console.error('Erro ao ler o arquivo JSON:', error);
    //     res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
    // }
}
