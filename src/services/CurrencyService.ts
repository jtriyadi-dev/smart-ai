export interface ExchangeRateConfig {
  code: string; // e.g. 'IDR', 'USD', 'SGD', 'MYR'
  symbol: string;
  name: string;
  rateToIDR: number; // e.g. 1 USD = 16000 IDR
}

export const SUPPORTED_CURRENCIES: ExchangeRateConfig[] = [
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rateToIDR: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToIDR: 16000 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToIDR: 12000 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rateToIDR: 3600 }
];

export class CurrencyService {
  /**
   * Formats numbers into locale-aware financial currency strings.
   * Avoids rounding errors and presents clear monetary values.
   */
  public static formatCurrency(amount: number, currencyCode: string = 'IDR'): string {
    const safeAmount = isNaN(amount) || amount === null || amount === undefined ? 0 : amount;
    const curr = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];

    if (currencyCode === 'IDR') {
      // Format IDR cleanly: Rp 350.000.000 (no floating point weirdness)
      const formatted = Math.round(safeAmount).toLocaleString('id-ID');
      return `Rp ${formatted}`;
    }

    if (currencyCode === 'USD') {
      const formatted = safeAmount.toLocaleString('en-US', {
        minimumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return `$${formatted}`;
    }

    if (currencyCode === 'SGD') {
      const formatted = safeAmount.toLocaleString('en-SG', {
        minimumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return `S$${formatted}`;
    }

    if (currencyCode === 'MYR') {
      const formatted = safeAmount.toLocaleString('ms-MY', {
        minimumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return `RM ${formatted}`;
    }

    return `${curr.symbol} ${safeAmount.toLocaleString()}`;
  }

  /**
   * Converts monetary amount between currencies based on configured rates.
   */
  public static convertCurrency(amount: number, fromCode: string, toCode: string): number {
    if (fromCode === toCode) return amount;
    const fromConfig = SUPPORTED_CURRENCIES.find((c) => c.code === fromCode) || SUPPORTED_CURRENCIES[0];
    const toConfig = SUPPORTED_CURRENCIES.find((c) => c.code === toCode) || SUPPORTED_CURRENCIES[0];

    // Convert to IDR base first
    const amountInIDR = amount * fromConfig.rateToIDR;
    // Convert from IDR to target currency
    const result = amountInIDR / toConfig.rateToIDR;
    return Math.round(result * 100) / 100;
  }
}
