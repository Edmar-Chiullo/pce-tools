import { hourPrint, fullDatePrint } from "./date-generate";

export function handlePrint({
  bulkAgenda,
  bulkConfDate,
  bulkId,
  bulkQtPallet,
  bulkTipoCarga,
  bulkControl,
  bulkDoca
}: any) {
    
  if (!bulkId) return;

  const printWindow = window.open('', '', 'width=800,height=600');

  if (printWindow) {
    printWindow.document.body.innerHTML = (`
      <html>
        <head>
          <title>Recibo de Carga</title>
          <style>
            body { font-family: Arial; padding: 20px; font-size: 32px; width: 100%; position: relative; }
            h1 { text-align: center; }
            .box { display:flex; flex-direction: column; justify-content: space-between; width: 100%; }
            .item { margin-bottom: 10px; width: 100%; text-align: start; font-size: 48px; }
            strong { display: inline-block; }
            span { width: 100%; }
            .background-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: -1;
              opacity: 0.1;
            }
          </style>
        </head>
        <body style="position: relative;">
          <img src="${window.location.origin}/img-estoque.jpg" class="background-img" />
          <h1>Dados da Carga</h1>
          <div class="box">
            <div class="item"><strong>ID:</strong> <span>${bulkId ?? '-'}</span></div>
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
  }
}
