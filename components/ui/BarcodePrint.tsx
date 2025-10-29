'use client'

import { formatDate } from '@/utils/date-generate'
import JsBarcode from 'jsbarcode'
import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import Image from 'next/image'

interface BarcodeData {
  Codigo: string
  Validade: string
  Descricao: string
  Endereco: string
}

export default function BarcodePrint({ data }: { data: BarcodeData[] }) {
  const contentRef = useRef<HTMLDivElement>(null)

   const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Etiquetas',
    onAfterPrint: () => console.log('Impressão concluída'),
  })


  useEffect(() => {
    data.forEach((item, i) => {
      const barcode1 = document.getElementById(`barcode-codigo-${i}`)
      const barcode2 = document.getElementById(`barcode-validade-${i}`)
      
      if (barcode1 && item.Codigo) {
        JsBarcode(barcode1, item.Codigo, {
          format: 'CODE128',
          displayValue: true,
          height: 80,
          width: 4,
        })
      }

      if (barcode2 && item.Validade) {
        JsBarcode(barcode2, formatDate(item.Validade), {
          format: 'CODE128',
          displayValue: true,
          height: 80,
          width: 3,
        })
      }
    })
  }, [data])

  return (
    <>
      <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded-[6px] hover:scale-[1.01] cursor-pointer">Imprimir</button>

      <div ref={contentRef}>
        <ScrollArea>
          {data.map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', gap: "20px", pageBreakAfter: 'always', padding: '20px' }}>
              <div className='flex justify-start w-full '>
                <Image 
                  src={'/logo-muffato.png'}
                  width={200}
                  height={100}
                  alt="Pesquisar tarefa"
                />
              </div>
              <div className='flex flex-col items-end w-full'>
                <h3 className='mr-20'>Endereço:</h3>
                <h1 className='text-3xl'>{item.Endereco}</h1>
              </div>
              <div className='flex flex-col items-start w-full p-2 border-4 border-zinc-950 rounded-[6px]'>
                <h3>Descrição:</h3>
                <h3 className='text-4xl'>{item.Descricao}</h3>
              </div>
              {/* Códigos de barras lado a lado */}
              <div style={{ display: 'flex', gap: '50px', marginTop: '20px', height: 'auto' }}>
                <div className='border-4 border-zinc-950 rounded-[6px] p-1'>
                  <p style={{ textAlign: 'center', fontSize: '28px' }}>Produto</p>
                  <svg id={`barcode-codigo-${i}`} />
                </div>

                <div className='border-4 border-zinc-950 rounded-[6px]'>
                  <p style={{ textAlign: 'center', fontSize: '28px' }}>Validade</p>
                  <svg id={`barcode-validade-${i}`} />
                </div>
              </div>
              <div className='flex justify-center w-full border-4 border-zinc-950 rounded-[6px] p-1 mt-4'>
                <span className='text-8xl text-center'>{formatDate(item.Validade)}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  )
}
