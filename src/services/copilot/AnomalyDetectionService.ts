import { AnomalyAlert, IndustryType, MetricType } from '../../types';

export class AnomalyDetectionService {
  static detectAnomalies(industry: IndustryType, metric: MetricType): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = [];

    if (industry === 'MINING') {
      alerts.push({
        id: 'anom-m1',
        title: '⚠ Lonjakan Downtime Dump Truck DT-104',
        severity: 'CRITICAL',
        metric: 'DOWNTIME',
        detectedAt: '14 Aug 2026 16:30 WIB',
        magnitude: '+62% jam downtime vs rata-rata armada',
        whatHappened: 'Dump Truck DT-104 mengalami kebocoran pipa hidrolik berat dan menunggu spareparts seal kit dari vendor.',
        potentialFactors: [
          'Jadwal preventive maintenance terlewat 120 jam operasional',
          'Suhu kerja medan tambang berdebu tinggi (Haul Road A)'
        ],
        recommendedAction: 'Percepat pengiriman spareparts seal kit dan lakukan inspeksi rutin komponen hidrolik pada 5 unit DT sejenis.',
        dimension: 'DT-104'
      });
    } else if (industry === 'HOSPITAL') {
      alerts.push({
        id: 'anom-h1',
        title: '⚠ Antrean Panjang Poliklinik Penyakit Dalam',
        severity: 'WARNING',
        metric: 'PATIENTS',
        detectedAt: '15 Aug 2026 08:15 WIB',
        magnitude: 'Waktu tunggu rata-rata mencapai 48 menit (target max 30 menit)',
        whatHappened: 'Lonjakan kedatangan pasien BPJS pada jam 08:00–10:00 melebihi kapasitas kuota dokter jaga.',
        potentialFactors: [
          'Akumulasi pendaftaran pasien online dan walk-in bersamaan',
          'Satu meja verifikasi berkas BPJS mengalami masalah koneksi jaringan'
        ],
        recommendedAction: 'Buka 1 loket verifikasi tambahan dan terapkan pembagian jam kuota kedatangan bertahap.',
        dimension: 'Poliklinik Penyakit Dalam'
      });
    } else if (industry === 'POULTRY' || industry === 'SHRIMP_FARM') {
      alerts.push({
        id: 'anom-a1',
        title: '⚠ Fluktuasi Dissolved Oxygen Kolam 03',
        severity: 'WARNING',
        metric: 'PRODUCTION',
        detectedAt: '14 Aug 2026 23:00 WIB',
        magnitude: 'Kadar DO turun ke 3.8 mg/L (Batas aman min 4.5 mg/L)',
        whatHappened: 'Sensor DO mencatat penurunan oksigen terlarut saat malam hari akibat 1 unit kincir air mati listrik sementara.',
        potentialFactors: [
          'Trip sikring kincir air nomor 4 pada pukul 22:15 WIB',
          'Biomasa udang mendekati DOC 75 (kebutuhan O2 meningkat)'
        ],
        recommendedAction: 'Aktifkan kincir cadangan dan lakukan perlakuan disinfeksi air ringan.',
        dimension: 'Kolam Intensif 03'
      });
    } else {
      // Retail / Sales Default Alert
      alerts.push({
        id: 'anom-r1',
        title: '⚠ Peringatan Potensi Stockout Produk A',
        severity: 'WARNING',
        metric: 'INVENTORY',
        detectedAt: '15 Aug 2026 07:00 WIB',
        magnitude: 'Tersisa 45 unit (estimasi habis dalam 5 hari)',
        whatHappened: 'Penjualan Produk A (Smart AI Automation Suite) melonjak 32% dalam 10 hari terakhir.',
        potentialFactors: [
          'Tinggi konversi lead dari campaign digital marketing terbaru',
          'Lead time pengadaan lisensi vendor butuh 3 hari kerja'
        ],
        recommendedAction: 'Segera lakukan reorder stok 150 unit tambahan untuk mengamankan permintaan hingga akhir bulan.',
        dimension: 'Produk A'
      });
    }

    return alerts;
  }
}
