'use client'

import { useState } from 'react';
import FileBarCode from '@/components/ui/FileBarCode';
import BarcodePrintEt from '@/components/ui/BarcodePrintEt';

export default function FichaPallet() {
  const [data, setData] = useState<any[]>([]);

  return (
    <main className="w-full h-full p-6">
      <h1 className="font-bold mb-4 text-2xl">IMPRESSÃO DE CÓDIGO DE BARRAS</h1>
      <div className='flex flex-col gap-2'>
        <FileBarCode onDataParsed={setData} />
        {data.length > 0 && <BarcodePrintEt data={data} />}
      </div>
    </main>
  );
}
