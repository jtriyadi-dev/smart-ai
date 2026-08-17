import { Invoice, Receipt } from '../types';

export class FinancialDocumentService {
  public static getInvoiceWatermark(invoice: Invoice): string | null {
    if (invoice.status === 'DRAFT') return 'DRAFT';
    if (invoice.status === 'PAID') return 'PAID';
    if (invoice.status === 'CANCELLED') return 'CANCELLED';
    return null;
  }

  public static getReceiptWatermark(receipt: Receipt): string | null {
    if (receipt.status === 'CANCELLED') return 'CANCELLED';
    return 'ISSUED';
  }

  public static printDocument(elementId: string): void {
    const printContent = document.getElementById(elementId);
    if (!printContent) {
      window.print();
      return;
    }

    const win = window.open('', '_blank');
    if (!win) {
      window.print();
      return;
    }

    win.document.write(`
      <html>
        <head>
          <title>Financial Document Print</title>
          <style>
            body { font-family: 'Inter', system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; color: #0f172a; }
            @media print {
              body { padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div>${printContent.innerHTML}</div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    win.document.close();
  }
}
