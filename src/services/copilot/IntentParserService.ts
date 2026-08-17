import { IntentStructure, CopilotMode, MetricType, TimeRangeType, IndustryType, DimensionType } from '../../types';

export class IntentParserService {
  static parseQuery(question: string, activeIndustry: IndustryType = 'RETAIL'): IntentStructure {
    const q = question.toLowerCase();

    let mode: CopilotMode = 'ANALYTICS';
    let metric: MetricType = 'SALES';
    let dimension: DimensionType | undefined;
    let timeRange: TimeRangeType = 'THIS_MONTH';

    // Detect Mode
    if (q.includes('prediksi') || q.includes('forecast') || q.includes('proyeksi') || q.includes('bulan depan')) {
      mode = 'FORECASTING';
    } else if (q.includes('anomali') || q.includes('masalah') || q.includes('turun') || q.includes('drop') || q.includes('downtime')) {
      mode = 'ANOMALY_DETECTION';
    } else if (q.includes('rekomendasi') || q.includes('saran') || q.includes('langkah')) {
      mode = 'RECOMMENDATION';
    } else if (q.includes('laporan') || q.includes('ringkasan') || q.includes('eksekutif') || q.includes('briefing')) {
      mode = 'REPORTING';
    } else if (q.includes('bagaimana') || q.includes('kenapa') || q.includes('mengapa')) {
      mode = 'BUSINESS_QA';
    }

    // Detect Metric based on Industry & Query keywords
    if (q.includes('produksi') || q.includes('hasil panen') || q.includes('output') || q.includes('tbs') || q.includes('tonase')) {
      metric = 'PRODUCTION';
    } else if (q.includes('fuel') || q.includes('solar') || q.includes('bahan bakar') || q.includes('bbm')) {
      metric = 'FUEL';
    } else if (q.includes('downtime') || q.includes('rusak') || q.includes('maintenance') || q.includes('breakdown')) {
      metric = 'DOWNTIME';
    } else if (q.includes('pasien') || q.includes('kunjungan') || q.includes('poli') || q.includes('rawat')) {
      metric = 'PATIENTS';
    } else if (q.includes('stok') || q.includes('inventory') || q.includes('gudang') || q.includes('habis')) {
      metric = 'INVENTORY';
    } else if (q.includes('oee') || q.includes('efisiensi mesin')) {
      metric = 'OEE';
    } else if (q.includes('fcr') || q.includes('pakan')) {
      metric = 'FCR';
    } else if (q.includes('laba') || q.includes('profit') || q.includes('keuntungan')) {
      metric = 'PROFIT';
    } else if (q.includes('biaya') || q.includes('cost') || q.includes('pengeluaran')) {
      metric = 'COST';
    } else if (q.includes('revenue') || q.includes('omset') || q.includes('penjualan') || q.includes('sales')) {
      metric = 'REVENUE';
    }

    // Detect Dimensions
    if (q.includes('produk') || q.includes('barang')) {
      dimension = 'PRODUCT';
    } else if (q.includes('cabang') || q.includes('region') || q.includes('wilayah')) {
      dimension = 'BRANCH';
    } else if (q.includes('unit') || q.includes('fleet') || q.includes('mesin') || q.includes('excavator')) {
      dimension = 'MACHINE';
    } else if (q.includes('kolam')) {
      dimension = 'POND';
    } else if (q.includes('blok')) {
      dimension = 'BLOCK';
    } else if (q.includes('kandang')) {
      dimension = 'HOUSE';
    }

    // Detect Time Range
    if (q.includes('hari ini') || q.includes('today')) {
      timeRange = 'TODAY';
    } else if (q.includes('minggu ini') || q.includes('this week')) {
      timeRange = 'THIS_WEEK';
    } else if (q.includes('bulan lalu') || q.includes('last month')) {
      timeRange = 'LAST_MONTH';
    } else if (q.includes('tahun ini') || q.includes('this year')) {
      timeRange = 'THIS_YEAR';
    }

    return {
      mode,
      metric,
      dimension,
      timeRange,
      comparison: 'PREVIOUS_PERIOD',
      industry: activeIndustry,
      rawQuestion: question
    };
  }
}
