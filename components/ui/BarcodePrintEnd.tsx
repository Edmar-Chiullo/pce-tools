'use client'

import JsBarcode from 'jsbarcode'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useReactToPrint } from 'react-to-print'

interface BarcodeData {
  Endereco: string
  Descricao: string
  Codigo: string
}

interface GroupedData {
  Endereco: string
  items: BarcodeData[]
}

const groupDataByEndereco = (data: BarcodeData[]): GroupedData[] => {
  const grupos: { [key: string]: GroupedData } = {}

  data.forEach((item) => {
    const { Endereco } = item
    if (!grupos[Endereco]) {
      grupos[Endereco] = {
        Endereco: Endereco,
        items: [],
      }
    }
    grupos[Endereco].items.push(item)
  })

  return Object.values(grupos)
}

export default function BarcodePrintEnd({ data }: { data: BarcodeData[] }) {
  const contentRef = useRef<HTMLDivElement>(null)

  const groupedData = useMemo(() => groupDataByEndereco(data), [data])

  // const handlePrint = useReactToPrint({
  //   content: () => contentRef.current, // Corrigido para content, conforme documentação
  //   documentTitle: 'Identificação prod. end.',
  //   onAfterPrint: () => console.log('Impressão concluída'),
  //   // Adicionado um estilo básico de impressão para controlar quebras de página
  //   pageStyle: `@media print { 
  //     .page-break { page-break-after: always; }
  //     .no-print { display: none; }
  //   }`,
  // })

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Identificação prod. end.',
    onAfterPrint: () => console.log('Impressão concluída'),
  })

  useEffect(() => {
    groupedData.forEach((grupo, grupoIndex) => {
      grupo.items.forEach((item, itemIndex) => {
        const barcodeElement = document.getElementById(
          `barcode-grupo-${grupoIndex}-item-${itemIndex}`,
        )

        if (barcodeElement && item.Codigo) {
          JsBarcode(barcodeElement, item.Codigo.trim(), {
            format: 'CODE128',
            displayValue: true,
            height: 100,
            width: 6,
          })
        }
      })
    })
  }, [groupedData])

  return (
    <>
      <button 
        onClick={handlePrint} 
        className="bg-blue-500 text-white p-2 rounded-[6px] hover:scale-[1.01] cursor-pointer no-print"
      >
        Imprimir
      </button>

      <div ref={contentRef}>
          <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', padding: '30px' }}>
            
            {groupedData.map((grupo, grupoIndex) => (
              <div 
                key={grupoIndex} 
                className='page-break'
                style={{ width: '100%', marginBottom: '120px' }}
              >
                <div style={{ padding: '10px 0', borderBottom: '2px solid #ccc', marginBottom: '10px' }}>
                    <h1 className='text-xl font-bold'>Endereço: {grupo.Endereco.trim()}</h1>
                </div>

                {grupo.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', gap: '5px', alignItems: 'center', borderBottom: '1px dotted #eee' }}
                    >
                      <div style={{ flexGrow: 1 }}>
                        <h1 className='text-4xl'>{item.Descricao.trim()}</h1>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', minWidth: '350px' }}>
                        <svg 
                            id={`barcode-grupo-${grupoIndex}-item-${itemIndex}`} 
                        />
                      </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>
    </>
  )
}
