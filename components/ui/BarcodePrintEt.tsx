'use client'

import JsBarcode from 'jsbarcode'
import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { ScrollArea } from '@radix-ui/react-scroll-area'

interface BarcodeData {
  Filial: string
  Codigo: string
}

export default function BarcodePrintEt({ data }: { data: BarcodeData[] }) {
  const contentRef = useRef<HTMLDivElement>(null)

   const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Etiquetas',
    onAfterPrint: () => console.log('Impressão concluída'),
  })

  useEffect(() => {
    data.forEach((item, i) => {
      const barcode2 = document.getElementById(`barcode-codigo-${i}`)      

       if (barcode2 && item.Codigo) {
        JsBarcode(barcode2, item.Codigo, {
          format: 'CODE128',
          displayValue: true,
          height: 60,
          width: 2,
        })
      }
    })
  }, [data])

  return (
    <>
      <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded-[6px] hover:scale-[1.01] cursor-pointer">Imprimir</button>
      <div ref={contentRef}>
        <ScrollArea>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'end', pageBreakAfter: 'always', padding: '30px' }}>
                {data.map((item, i) => (
                    <div key={i}>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                            <div className='flex flex-col items-end w-full'>
                                <h3 className='mr-10'>Filial:</h3>
                                <h1 className='text-[18px] self-start'>{item.Filial}</h1>
                            </div>
                            <div className='p-1'>
                                <svg id={`barcode-codigo-${i}`} />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
        </ScrollArea>
      </div>
    </>
  )
}