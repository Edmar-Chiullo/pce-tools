import { ReceiptMelloProps } from "@/app/interface/interface";
import { hourPrint, fullDatePrint } from "./date-generate";

export function handlePrint({
  bulkAgenda,
  bulkConfDate,
  bulkId,
  bulkQtPallet,
  bulkTipoCarga,
  bulkControl,
  bulkDoca
  }:any) {
    
  if (!bulkId) return;

  const printWindow = window.open('', '', 'width=800,height=600');

  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Recibo de Carga</title>
          <style>
            body { font-family: Arial; padding: 20px; font-size: 24px; width: 100%; }
            h1 { text-align: center; }
            .box { display:flex; justify-content: flex-end; flex-direction: column; align-content: space-between; width: 100%;}
            .item { margin-bottom: 10px; width: 100%;}
            strong { display: inline-block; }
            span { width: 100%; align-self: flex-end}
          </style>
        </head>
        <body>
          <h1>Dados da Carga</h1>
            <div class="box">
              <div class="item"><strong>Id:</strong> <span>${bulkId ?? '-'}</span></div>
              <div class="item"><strong>Porta:</strong> <span>${bulkDoca ?? '-'}</span></div>
              <div class="item"><strong>Agenda:</strong> <span>${bulkAgenda ?? '-'}</span></div>
              <div class="item"><strong>Controle:</strong> <span>${bulkControl ?? '-'}</span></div>
              <div class="item"><strong>Data:</strong> <span>${fullDatePrint(bulkConfDate) ?? '-'}</span></div>
              <div class="item"><strong>Hora:</strong> <span>${hourPrint(bulkConfDate) ?? '-'}</span></div>
              <div class="item"><strong>Tipo carga:</strong> <span>${bulkTipoCarga ?? '-'}</span></div>
              <div class="item"><strong>Qt. Pallet:</strong> <span>${bulkQtPallet ?? '-'}</span></div>
            </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // Opcional: fecha a aba após imprimir
    // printWindow.close();
  }
}
