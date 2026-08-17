import React from 'react';
import { TeamMemberRole } from '../../types';
import { Users, UserCheck, Briefcase, Clock, Sparkles } from 'lucide-react';

interface TeamRecommendationCardProps {
  teamRecommendation: {
    team: TeamMemberRole[];
    recommendedCapacity: string;
    alternativeCapacity: string;
  };
}

export const TeamRecommendationCard: React.FC<TeamRecommendationCardProps> = ({
  teamRecommendation
}) => {
  const getRoleIconColor = (role: string) => {
    if (role.includes('Manager')) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (role.includes('Designer')) return 'text-pink-400 bg-pink-500/10 border-pink-500/30';
    if (role.includes('Frontend')) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    if (role.includes('Backend')) return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    if (role.includes('Mobile')) return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    if (role.includes('AI')) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (role.includes('QA')) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    return 'text-teal-400 bg-teal-500/10 border-teal-500/30';
  };

  const totalPersonDays = teamRecommendation.team.reduce((acc, t) => acc + t.effortPersonDays, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Rekomendasi Struktur Tim & Alokasi Effort</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                Development Team Model
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Komposisi profesional yang direkomendasikan berdasarkan skor kompleksitas dan target platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800 text-xs">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-slate-400">Total Dedicated Effort: </span>
          <strong className="text-white font-mono">{totalPersonDays} Person-Days</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {teamRecommendation.team.map((member, idx) => (
          <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${getRoleIconColor(member.role)}`}>
                {member.role}
              </span>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {member.count} Orang
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Alokasi Effort:</span>
              <span className="font-bold text-white font-mono">{member.effortPersonDays} Person-Days</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Dedikasi Alokasi:</span>
              <span className="font-semibold text-purple-400">{member.allocationPercentage}% Capacity</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 text-xs">
          <strong className="text-purple-300 block mb-1">Kapasitas Standar (Recommended):</strong>
          <p className="text-slate-400">{teamRecommendation.recommendedCapacity}</p>
        </div>

        <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 text-xs">
          <strong className="text-indigo-300 block mb-1">Kapasitas Akselerasi (Alternative):</strong>
          <p className="text-slate-400">{teamRecommendation.alternativeCapacity}</p>
        </div>
      </div>
    </div>
  );
};
