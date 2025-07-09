'use client'
import { useState } from 'react';
import FileUploader from '@/components/ui/FileUploader';
import BarcodePrint from '@/components/ui/BarcodePrint';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  return (
    <main className="p-6">
      <h1 className="font-bold mb-4 text-2xl">IMPRESSÃO DE CÓDIGO DE BARRAS</h1>
      <div className='flex flex-col gap-2'>
        <FileUploader onDataParsed={setData} />
        {data.length > 0 && <BarcodePrint data={data} />}
      </div>
    </main>
  );
}
