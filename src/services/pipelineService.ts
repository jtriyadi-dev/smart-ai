import {
  Opportunity,
  OpportunityStage,
  CRMStageMetric,
  PipelineSummaryMetrics,
  Lead
} from '../types';
import { CRMService } from './crmService';
import { ActivityService } from './activityService';

export interface FunnelStageMetric {
  stage: OpportunityStage;
  label: string;
  count: number;
  conversionFromPrevious: number; // percentage
  conversionFromStart: number; // percentage
}

export class PipelineService {
  public static readonly STAGES: { stage: OpportunityStage; label: string; probability: number; color: string }[] = [
    { stage: 'NEW', label: 'New Prospek', probability: 10, color: '#3B82F6' },
    { stage: 'CONTACTED', label: 'Contacted', probability: 20, color: '#06B6D4' },
    { stage: 'QUALIFIED', label: 'Qualified', probability: 40, color: '#8B5CF6' },
    { stage: 'PROPOSAL', label: 'Proposal Sent', probability: 60, color: '#EC4899' },
    { stage: 'NEGOTIATION', label: 'Negotiation', probability: 80, color: '#F59E0B' },
    { stage: 'WON', label: 'Deal Won', probability: 100, color: '#10B981' },
    { stage: 'LOST', label: 'Deal Lost', probability: 0, color: '#EF4444' }
  ];

  public static getStages() {
    return this.STAGES;
  }

  public static getStageMetrics(opportunities: Opportunity[]): CRMStageMetric[] {
    return this.STAGES.map((s) => {
      const stageOpps = opportunities.filter((o) => o.stage === s.stage);
      const totalVal = stageOpps.reduce((acc, o) => acc + (o.stage === 'WON' && o.finalDealValue ? o.finalDealValue : (o.estimatedValueMin + o.estimatedValueMax) / 2), 0);
      const weightedVal = stageOpps.reduce((acc, o) => acc + o.weightedValue, 0);

      return {
        stage: s.stage,
        label: s.label,
        count: stageOpps.length,
        totalValue: totalVal,
        weightedValue: weightedVal
      };
    });
  }

  public static getSummaryMetrics(opportunities: Opportunity[], leads: Lead[] = []): PipelineSummaryMetrics {
    const totalLeads = leads.length + opportunities.length;
    const newLeads = leads.filter((l) => l.status === 'New').length + opportunities.filter((o) => o.stage === 'NEW').length;
    const qualifiedLeads = leads.filter((l) => l.status === 'Qualified').length + opportunities.filter((o) => o.stage === 'QUALIFIED').length;
    const openOpps = opportunities.filter((o) => o.stage !== 'WON' && o.stage !== 'LOST');
    const proposalSent = opportunities.filter((o) => o.stage === 'PROPOSAL').length;
    const negotiation = opportunities.filter((o) => o.stage === 'NEGOTIATION').length;
    const won = opportunities.filter((o) => o.stage === 'WON');
    const lost = opportunities.filter((o) => o.stage === 'LOST').length;

    const totalPipelineValue = openOpps.reduce((acc, o) => acc + (o.estimatedValueMin + o.estimatedValueMax) / 2, 0);
    const weightedPipelineValue = openOpps.reduce((acc, o) => acc + o.weightedValue, 0);

    const conversionRate = totalLeads > 0 ? Math.round((won.length / totalLeads) * 100) : 0;
    const totalWonValue = won.reduce((acc, o) => acc + (o.finalDealValue || (o.estimatedValueMin + o.estimatedValueMax) / 2), 0);
    const avgDealValue = won.length > 0 ? Math.round(totalWonValue / won.length) : 0;

    // Calculate Sales Cycle
    let totalCycleDays = 0;
    let cycleCount = 0;
    won.forEach((w) => {
      if (w.wonAt && w.createdAt) {
        const diffMs = new Date(w.wonAt).getTime() - new Date(w.createdAt).getTime();
        const days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
        totalCycleDays += days;
        cycleCount++;
      }
    });
    const avgSalesCycleDays = cycleCount > 0 ? Math.round(totalCycleDays / cycleCount) : 18; // Default 18 days average

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      openOpportunities: openOpps.length,
      proposalSent,
      negotiation,
      won: won.length,
      lost,
      totalPipelineValue,
      weightedPipelineValue,
      conversionRate,
      avgDealValue,
      avgSalesCycleDays
    };
  }

  public static getFunnelMetrics(opportunities: Opportunity[]): FunnelStageMetric[] {
    const totalCount = opportunities.length || 1;
    let previousCount = totalCount;

    return this.STAGES.map((s, idx) => {
      const count = opportunities.filter((o) => {
        // Funnel accumulation: stage reaches or passed
        const stageIdx = this.STAGES.findIndex((st) => st.stage === o.stage);
        return stageIdx >= idx;
      }).length;

      const convPrev = idx === 0 ? 100 : Math.round((count / (previousCount || 1)) * 100);
      const convStart = Math.round((count / totalCount) * 100);
      previousCount = count;

      return {
        stage: s.stage,
        label: s.label,
        count,
        conversionFromPrevious: Math.min(100, convPrev),
        conversionFromStart: Math.min(100, convStart)
      };
    });
  }

  public static moveOpportunity(
    opportunityId: string,
    targetStage: OpportunityStage,
    user = 'Admin',
    notes?: string
  ): Opportunity {
    const opp = CRMService.getOpportunity(opportunityId);
    if (!opp) throw new Error('Opportunity not found');

    const oldStage = opp.stage;
    if (oldStage === targetStage) return opp;

    const updates: Partial<Opportunity> = { stage: targetStage };

    if (targetStage === 'WON') {
      updates.wonAt = new Date().toISOString();
      updates.finalDealValue = (opp.estimatedValueMin + opp.estimatedValueMax) / 2;
    } else if (targetStage === 'LOST') {
      updates.lostAt = new Date().toISOString();
      if (notes) updates.lostNotes = notes;
    }

    const updated = CRMService.updateOpportunity(opportunityId, updates);

    // Create activity record
    ActivityService.logStatusChange(opportunityId, oldStage, targetStage, user);

    return updated;
  }
}
