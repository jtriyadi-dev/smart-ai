import React from 'react';
import { IndustryType } from '../../types';
import {
  MessageSquare,
  Database,
  Code2,
  HelpCircle,
  ShieldCheck,
  LayoutGrid,
  Bot,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CopilotSidebarProps {
  activeTab: 'chat' | 'sources' | 'semantic' | 'learning_loop' | 'audit' | 'embedded';
  onSelectTab: (t: 'chat' | 'sources' | 'semantic' | 'learning_loop' | 'audit' | 'embedded') => void;
  activeIndustry: IndustryType;
  onSelectPrompt: (prompt: string) => void;
}

export const CopilotSidebar: React.FC<CopilotSidebarProps> = ({
  activeTab,
  onSelectTab,
  activeIndustry,
  onSelectPrompt
}) => {
  const getIndustryPrompts = (): string[] => {
    switch (activeIndustry) {
      case 'MINING':
        return [
          'Analisa produksi batu bara bulan ini vs target',
          'Unit armada mana yang mengalami downtime tertinggi?',
          'Berapa total konsumsi bahan bakar solar?',
          'Prediksi produksi batu bara bulan depan'
        ];
      case 'HOSPITAL':
        return [
          'Analisa kunjungan pasien bulan ini',
          'Poliklinik mana yang memiliki antrean paling padat?',
          'Berapa rata-rata waktu tunggu pelayanan IGD?',
          'Prediksi lonjakan pasien bulan depan'
        ];
      case 'MANUFACTURING':
        return [
          'Berapa skor OEE lini produksi bulan ini?',
          'Mesin pabrik mana yang memiliki downtime terbesar?',
          'Analisa reject rate dan kualitas produksi',
          'Prediksi output produksi bulan depan'
        ];
      case 'PLANTATION':
        return [
          'Berapa total panen TBS (Tandan Buah Segar)?',
          'Blok perkebunan mana yang paling produktif?',
          'Analisa efisiensi tenaga kerja panen per hektar',
          'Prediksi hasil panen bulan depan'
        ];
      case 'POULTRY':
        return [
          'Berapa Feed Conversion Ratio (FCR) bulan ini?',
          'Kandang mana yang memiliki efisiensi pakan terbaik?',
          'Analisa tingkat mortalitas ternak',
          'Prediksi kebutuhan pakan minggu depan'
        ];
      case 'SHRIMP_FARM':
        return [
          'Berapa tingkat kelangsungan hidup (SR) udang?',
          'Kolam mana yang mencatat pertumbuhan tercepat?',
          'Analisa kualitas air dan kadar oksigen (DO)',
          'Prediksi tonase panen udang vaname'
        ];
      case 'SCHOOL':
        return [
          'Berapa persentase kehadiran siswa bulan ini?',
          'Kelas mana yang memiliki angka absensi tertinggi?',
          'Analisa ketepatan pembayaran SPP sekolah',
          'Prediksi jumlah pendaftar siswa baru'
        ];
      default:
        return [
          'Analisa penjualan bulan ini.',
          'Produk apa yang paling laku dan cabang terbaik?',
          'Peringatan stok barang yang hampir habis?',
          'Prediksi penjualan bulan depan'
        ];
    }
  };

  const navTabs = [
    { id: 'chat', label: 'Copilot Chat & Analytics', icon: MessageSquare },
    { id: 'sources', label: 'Data Source Registry', icon: Database },
    { id: 'semantic', label: 'Business Semantic Layer', icon: Code2 },
    { id: 'learning_loop', label: 'Learning Loop & Failed Queries', icon: HelpCircle },
    { id: 'audit', label: 'Audit Trail & Compliance Logs', icon: ShieldCheck },
    { id: 'embedded', label: 'Embedded Copilot Integration API', icon: LayoutGrid }
  ];

  return (
    <div className="space-y-6">
      
      {/* Studio Nav Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-1 shadow-xl">
        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase px-3 py-1">
          COPILOT ENGINE MODULES
        </div>
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as any)}
              className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </div>
              {isActive && <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          );
        })}
      </div>

      {/* Suggested Industry Natural Language Prompts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Rekomendasi Pertanyaan Natural ({activeIndustry})</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Klik salah satu pertanyaan di bawah ini untuk menguji analisis deterministik AI Copilot:
        </p>

        <div className="space-y-2 pt-1">
          {getIndustryPrompts().map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectTab('chat');
                onSelectPrompt(p);
              }}
              className="w-full text-left p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-300 hover:text-white text-xs transition leading-relaxed flex items-center justify-between group"
            >
              <span>"{p}"</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
