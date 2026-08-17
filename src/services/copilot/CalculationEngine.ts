import { MetricDataPoint, MetricResult } from '../../types';

export class CalculationEngine {
  /**
   * Format number into IDR currency locale (e.g., Rp 1.180.000.000 or Rp 1,18 Miliar)
   */
  static formatCurrency(val: number): string {
    if (Math.abs(val) >= 1_000_000_000) {
      const billions = val / 1_000_000_000;
      return `Rp ${billions.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Miliar`;
    }
    if (Math.abs(val) >= 1_000_000) {
      const millions = val / 1_000_000;
      return `Rp ${millions.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Juta`;
    }
    return `Rp ${Math.round(val).toLocaleString('id-ID')}`;
  }

  /**
   * Format unit with locale (e.g. 1.250 Ton, 88.5%, 4.280 Orders)
   */
  static formatValue(val: number, unit: string): string {
    if (unit === 'IDR' || unit === 'Rp') {
      return this.formatCurrency(val);
    }
    if (unit === '%') {
      return `${val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
    }
    return `${val.toLocaleString('id-ID')} ${unit}`;
  }

  /**
   * Deterministic Growth Percentage Calculation: ((Current - Previous) / Previous) * 100
   */
  static calculateGrowthPercent(current: number, previous: number): number {
    if (!previous || previous === 0) return 0;
    const growth = ((current - previous) / Math.abs(previous)) * 100;
    return Number(growth.toFixed(1));
  }

  /**
   * Calculate Target Achievement Percentage: (Actual / Target) * 100
   */
  static calculateAchievementPercent(actual: number, target: number): number {
    if (!target || target === 0) return 100;
    const ach = (actual / target) * 100;
    return Number(ach.toFixed(1));
  }

  /**
   * Calculate Variance: Actual - Target
   */
  static calculateVariance(actual: number, target: number): number {
    return actual - target;
  }

  /**
   * Build complete MetricResult from data points
   */
  static buildMetricResult(
    metricName: string,
    dataPoints: MetricDataPoint[],
    unit: string,
    previousTotal?: number,
    targetTotal?: number
  ): MetricResult {
    const currentTotal = dataPoints.reduce((acc, p) => acc + p.currentValue, 0);

    let growthPercent: number | undefined;
    if (previousTotal !== undefined && previousTotal > 0) {
      growthPercent = this.calculateGrowthPercent(currentTotal, previousTotal);
    }

    let variance: number | undefined;
    let achievementPercent: number | undefined;
    if (targetTotal !== undefined) {
      variance = this.calculateVariance(currentTotal, targetTotal);
      achievementPercent = this.calculateAchievementPercent(currentTotal, targetTotal);
    }

    return {
      metricName,
      currentTotal,
      previousTotal,
      targetTotal,
      growthPercent,
      variance,
      achievementPercent,
      unit,
      formattedCurrent: this.formatValue(currentTotal, unit),
      formattedPrevious: previousTotal !== undefined ? this.formatValue(previousTotal, unit) : undefined,
      dataPoints
    };
  }
}
