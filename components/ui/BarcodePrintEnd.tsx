// 'use client'

// import JsBarcode from 'jsbarcode'
// import { useEffect, useRef, useState } from 'react'
// import { useReactToPrint } from 'react-to-print'
// import { ScrollArea } from '@radix-ui/react-scroll-area'

// interface BarcodeData {
//   endereco: string
//   descricao: string
//   codigo: string
// }

// export default function BarcodePrintEnd({ data }: { data: BarcodeData[] }) {
//   const contentRef = useRef<HTMLDivElement>(null)

//   const handlePrint = useReactToPrint({
//     contentRef,
//     documentTitle: 'Identificação prod. end.',
//     onAfterPrint: () => console.log('Impressão concluída'),
//   })

//   useEffect(() => {
//     data.forEach((item, i) => {
//       const barcode2 = document.getElementById(`barcode-codigo-${i}`)
//       if (barcode2 && item.codigo) {
//         JsBarcode(barcode2, item.codigo, {
//           format: 'CODE128',
//           displayValue: true,
//           height: 150,
//           width: 6,
//         })
//       }
//     })
//   }, [data])

//   return (
//     <>
//       <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded-[6px] hover:scale-[1.01] cursor-pointer">Imprimir</button>
//       <div ref={contentRef}>
//         <ScrollArea>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', pageBreakAfter: 'always', padding: '30px' }}>
//             {data.map((item, i) => (
//               <div key={i}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
//                   <h1 className='text-4xl'>{item.descricao}</h1>
//                   <div className='flex'>
//                     <div className='flex flex-col items-end w-full'>
//                         <h3 className='mr-10'>Endereço:</h3>
//                         <h1 className='text-[18px] self-start'>{item.endereco}</h1>
//                     </div>
//                     <div className='p-1'>
//                         <svg id={`barcode-codigo-${i}`} />
//                     </div>
//                     <hr className='mt-4' />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </div>
//     </>
//   )
// }

'use client'

import JsBarcode from 'jsbarcode'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ScrollArea } from '@radix-ui/react-scroll-area' // Mantido, mas pode não ser ideal para impressão

// Estrutura do item de dado original
interface BarcodeData {
  Endereco: string
  Descricao: string
  Codigo: string
}

// Estrutura do dado agrupado
interface GroupedData {
  Endereco: string
  items: BarcodeData[]
}

// Função para agrupar os dados
const groupDataByEndereco = (data: BarcodeData[]): GroupedData[] => {
  const grupos: { [key: string]: GroupedData } = {}

  data.forEach((item) => {
    const { Endereco } = item
    if (!grupos[Endereco]) {
      // Se o endereço não existe, inicializa o grupo
      grupos[Endereco] = {
        Endereco: Endereco,
        items: [],
      }
    }
    // Adiciona o item ao array do endereço correspondente
    grupos[Endereco].items.push(item)
  })

  // Retorna um array dos valores (os grupos)
  return Object.values(grupos)
}

export default function BarcodePrintEnd({ data }: { data: BarcodeData[] }) {
  const contentRef = useRef<HTMLDivElement>(null)

  // 1. Agrupamento dos dados usando useMemo para performance
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

  // 2. Adaptação do useEffect para percorrer a estrutura agrupada
  useEffect(() => {
    groupedData.forEach((grupo, grupoIndex) => {
      grupo.items.forEach((item, itemIndex) => {
        // ID único baseado no índice do grupo e do item
        const barcodeElement = document.getElementById(
          `barcode-grupo-${grupoIndex}-item-${itemIndex}`,
        )

        if (barcodeElement && item.Codigo) {
          JsBarcode(barcodeElement, item.Codigo, {
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
      {/* Botão de impressão (não deve aparecer na impressão, classe 'no-print') */}
      <button 
        onClick={handlePrint} 
        className="bg-blue-500 text-white p-2 rounded-[6px] hover:scale-[1.01] cursor-pointer no-print"
      >
        Imprimir
      </button>

      <div ref={contentRef}>
        {/*
          O componente ScrollArea do Radix pode interferir na impressão.
          Se precisar de scroll na tela, mantenha. Para impressão, é melhor que o conteúdo flua naturalmente.
        */}
        {/* <ScrollArea> */}
          <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', padding: '30px' }}>
            
            {/* 3. Renderização com loop aninhado */}
            {groupedData.map((grupo, grupoIndex) => (
              // Contêiner do grupo: garante a quebra de página após o último item do endereço
              <div 
                key={grupoIndex} 
                className='page-break' // Esta classe força uma quebra de página após o grupo
                style={{ width: '100%', marginBottom: '120px' }} // Adiciona algum espaço entre grupos
              >
                {/* Cabeçalho do endereço, que só é renderizado uma vez por grupo */}
                <div style={{ padding: '10px 0', borderBottom: '2px solid #ccc', marginBottom: '10px' }}>
                    <h1 className='text-xl font-bold'>Endereço: {grupo.Endereco}</h1>
                </div>

                {/* Loop sobre os itens (códigos) dentro do endereço */}
                {grupo.items.map((item, itemIndex) => (
                    <div 
                        key={itemIndex} 
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', gap: '5px', alignItems: 'center', borderBottom: '1px dotted #eee' }}
                    >
                        <div style={{ flexGrow: 1 }}>
                            <h1 className='text-4xl'>{item.Descricao}</h1>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: '350px' }}>
                            {/* O SVG com o ID único */}
                            <svg 
                                id={`barcode-grupo-${grupoIndex}-item-${itemIndex}`} 
                            />
                        </div>
                    </div>
                ))}
              </div>
            ))}
          </div>
        {/* </ScrollArea> */}
      </div>
    </>
  )
}
