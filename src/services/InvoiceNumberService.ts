export class InvoiceNumberService {
  private static STORAGE_COUNTER_KEY = 'smart_ai_invoice_counter_v1';

  public static generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    let currentCounter = 1;

    try {
      const stored = localStorage.getItem(this.STORAGE_COUNTER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.year === year) {
          currentCounter = parsed.counter + 1;
        }
      }
    } catch (e) {
      console.warn('Failed to read invoice counter', e);
    }

    localStorage.setItem(
      this.STORAGE_COUNTER_KEY,
      JSON.stringify({ year, counter: currentCounter })
    );

    const padCounter = String(currentCounter).padStart(4, '0');
    return `SAI-INV-${year}-${padCounter}`;
  }
}
