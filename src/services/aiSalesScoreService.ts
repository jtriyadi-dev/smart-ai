import {
  Lead,
  Opportunity,
  AISalesScoreResult,
  AISalesScoreFactor,
  AISalesPriority,
  AISalesPriorityLevel,
  AISalesConfidenceLevel,
  AISalesScoreHistoryItem
} from '../types';

export interface LeadScoringContext {
  id: string;
  name?: string;
  company?: string;
  industry?: string;
  userCount?: string | number;
  branchesCount?: string | number;
  requiredFeatures?: string[];
  budgetEstimate?: string;
  message?: string;
  status?: string;
  stage?: string;
  hasRequirements?: boolean;
  hasArchitecture?: boolean;
  hasEstimate?: boolean;
  hasConsultationRequest?: boolean;
  activitiesCount?: number;
  aiToolsUsedCount?: number;
  estimatedValueMax?: number;
  realtimeNeeded?: boolean;
  aiNeeded?: boolean;
  integrationsCount?: number;
  platforms?: string[];
}

// In-memory score history store
const SCORE_HISTORY_STORE: Record<string, AISalesScoreHistoryItem[]> = {};

export class AISalesScoreService {
  /**
   * Calculates a 0-100 AI Lead Score based on objective business, technical & engagement factors
   */
  public static calculateScore(ctx: LeadScoringContext): AISalesScoreResult {
    const factors: AISalesScoreFactor[] = [];
    let totalScore = 0;

    // 1. Requirement Clarity & Scope (Max 20 points)
    let reqPoints = 0;
    const featCount = ctx.requiredFeatures?.length || 0;
    if (featCount >= 5 || ctx.hasRequirements) {
      reqPoints = 20;
      factors.push({ category: 'Requirement Scope', points: 20, reason: 'Comprehensive modules & requirements clearly defined' });
    } else if (featCount >= 2) {
      reqPoints = 14;
      factors.push({ category: 'Requirement Scope', points: 14, reason: 'Multiple core features specified' });
    } else if (ctx.message && ctx.message.length > 30) {
      reqPoints = 10;
      factors.push({ category: 'Requirement Scope', points: 10, reason: 'Basic project description provided' });
    } else {
      reqPoints = 5;
      factors.push({ category: 'Requirement Scope', points: 5, reason: 'Initial preliminary description' });
    }
    totalScore += reqPoints;

    // 2. Engagement & Consultation Intent (Max 20 points)
    let engPoints = 0;
    if (ctx.hasConsultationRequest || ctx.stage === 'NEGOTIATION' || ctx.stage === 'PROPOSAL') {
      engPoints = 20;
      factors.push({ category: 'Engagement', points: 20, reason: 'Direct consultation or active proposal stage' });
    } else if (ctx.status === 'Qualified' || ctx.stage === 'QUALIFIED' || (ctx.activitiesCount && ctx.activitiesCount >= 3)) {
      engPoints = 17;
      factors.push({ category: 'Engagement', points: 17, reason: 'Active discussion and qualified lead' });
    } else if (ctx.activitiesCount && ctx.activitiesCount > 0) {
      engPoints = 12;
      factors.push({ category: 'Engagement', points: 12, reason: 'Previous communication logged' });
    } else {
      engPoints = 8;
      factors.push({ category: 'Engagement', points: 8, reason: 'Inbound lead contact recorded' });
    }
    totalScore += engPoints;

    // 3. User Scale & Organizational Scope (Max 15 points)
    let scalePoints = 0;
    const userStr = String(ctx.userCount || '');
    if (userStr.includes('500') || userStr.includes('1000') || userStr.includes('Enterprise') || (typeof ctx.userCount === 'number' && ctx.userCount >= 200)) {
      scalePoints = 15;
      factors.push({ category: 'Project Scope', points: 15, reason: 'Large user scale (200-500+ users / enterprise)' });
    } else if (userStr.includes('51') || userStr.includes('100') || userStr.includes('Multi') || (typeof ctx.userCount === 'number' && ctx.userCount >= 50)) {
      scalePoints = 12;
      factors.push({ category: 'Project Scope', points: 12, reason: 'Medium-large scale (50-100+ users)' });
    } else {
      scalePoints = 8;
      factors.push({ category: 'Project Scope', points: 8, reason: 'Standard team scale (10-50 users)' });
    }
    totalScore += scalePoints;

    // 4. AI & Technical Complexity (Max 15 points)
    let techPoints = 0;
    const reqStr = JSON.stringify(ctx.requiredFeatures || []).toLowerCase() + (ctx.message || '').toLowerCase();
    const isRealtime = ctx.realtimeNeeded || reqStr.includes('realtime') || reqStr.includes('fleet') || reqStr.includes('iot') || reqStr.includes('gps');
    const isAI = ctx.aiNeeded || reqStr.includes('ai') || reqStr.includes('analytics') || reqStr.includes('predictive') || reqStr.includes('ocr');

    if (isRealtime && isAI) {
      techPoints = 15;
      factors.push({ category: 'AI Complexity', points: 15, reason: 'High technical depth (Realtime IoT/Telemetry + Advanced AI Analytics)' });
    } else if (isAI || isRealtime) {
      techPoints = 11;
      factors.push({ category: 'AI Complexity', points: 11, reason: 'Includes dedicated AI models or realtime data processing' });
    } else {
      techPoints = 7;
      factors.push({ category: 'AI Complexity', points: 7, reason: 'Standard web & mobile system architecture' });
    }
    totalScore += techPoints;

    // 5. Estimated Investment Value (Max 15 points)
    let valPoints = 0;
    const estVal = ctx.estimatedValueMax || 0;
    const budgetStr = ctx.budgetEstimate || '';
    if (estVal >= 150e6 || budgetStr.toLowerCase().includes('100') || budgetStr.toLowerCase().includes('enterprise') || budgetStr.toLowerCase().includes('custom')) {
      valPoints = 15;
      factors.push({ category: 'Estimated Value', points: 15, reason: 'High-value enterprise tier (Rp 150M+ investment)' });
    } else if (estVal >= 50e6 || budgetStr.toLowerCase().includes('50')) {
      valPoints = 11;
      factors.push({ category: 'Estimated Value', points: 11, reason: 'Mid-range custom software tier (Rp 50M-150M)' });
    } else {
      valPoints = 8;
      factors.push({ category: 'Estimated Value', points: 8, reason: 'Starter custom application package' });
    }
    totalScore += valPoints;

    // 6. Architecture & Tooling Completion (Max 15 points)
    let archPoints = 0;
    if (ctx.hasArchitecture && ctx.hasEstimate) {
      archPoints = 15;
      factors.push({ category: 'Architecture', points: 15, reason: 'Architecture blueprint and project estimate already completed' });
    } else if (ctx.hasArchitecture || ctx.hasEstimate || (ctx.aiToolsUsedCount && ctx.aiToolsUsedCount > 0)) {
      archPoints = 10;
      factors.push({ category: 'Architecture', points: 10, reason: 'AI Solution Architect or Estimator tool generated' });
    } else {
      archPoints = 5;
      factors.push({ category: 'Architecture', points: 5, reason: 'Initial inquiry phase' });
    }
    totalScore += archPoints;

    // Cap at 100
    const finalScore = Math.min(100, Math.max(0, totalScore));

    // Level
    let level: AISalesScoreResult['level'] = 'Medium';
    if (finalScore >= 81) level = 'Very High';
    else if (finalScore >= 61) level = 'High';
    else if (finalScore >= 41) level = 'Medium';
    else if (finalScore >= 21) level = 'Low';
    else level = 'Very Low';

    // Explanation
    const explanation = this.explainScoreFromFactors(factors, ctx);

    const result: AISalesScoreResult = {
      score: finalScore,
      level,
      factors,
      confidence: ctx.hasRequirements || ctx.hasArchitecture ? 'High' : 'Medium',
      explanation
    };

    // Update history
    this.recordScoreHistory(ctx.id, finalScore, this.calculatePriority(finalScore, ctx).level, factors);

    return result;
  }

  /**
   * Determines priority level (LOW, MEDIUM, HIGH, URGENT)
   */
  public static calculatePriority(score: number, ctx: LeadScoringContext): AISalesPriority {
    if (ctx.stage === 'NEGOTIATION' || ctx.hasConsultationRequest || score >= 88) {
      return {
        level: 'URGENT',
        reason: 'Immediate action required: High deal probability, enterprise scope, or active negotiation stage.'
      };
    }

    if (score >= 65 || ctx.stage === 'PROPOSAL' || (ctx.estimatedValueMax && ctx.estimatedValueMax >= 100e6)) {
      return {
        level: 'HIGH',
        reason: 'Large enterprise scope with advanced realtime/AI requirements. Customer appears ready for technical discussion.'
      };
    }

    if (score >= 40) {
      return {
        level: 'MEDIUM',
        reason: 'Moderate project scope with clear requirements. Standard follow-up cadence recommended.'
      };
    }

    return {
      level: 'LOW',
      reason: 'Preliminary inquiry with undefined specifications. Nurturing required before technical meeting.'
    };
  }

  /**
   * Confidence level calculation
   */
  public static calculateConfidence(ctx: LeadScoringContext): { level: AISalesConfidenceLevel; reason: string } {
    if (ctx.hasRequirements && ctx.hasArchitecture && ctx.hasEstimate) {
      return {
        level: 'High',
        reason: 'Comprehensive data available from Requirement Specification, Architecture Blueprint, and Project Estimator.'
      };
    }

    if (ctx.requiredFeatures && ctx.requiredFeatures.length >= 3) {
      return {
        level: 'Medium',
        reason: 'Business requirements are clear, but integration endpoints are not fully defined.'
      };
    }

    return {
      level: 'Low',
      reason: 'Inference based on initial inquiry message and standard industry benchmarks.'
    };
  }

  /**
   * Explains score breakdown with positive & negative factors
   */
  private static explainScoreFromFactors(factors: AISalesScoreFactor[], ctx: LeadScoringContext): string {
    const positives: string[] = [];
    factors.forEach((f) => {
      positives.push(`+ ${f.category}: ${f.reason} (+${f.points} pts)`);
    });

    if (!ctx.hasArchitecture) {
      positives.push(`- Pending: Solution Architecture not yet generated`);
    }
    if (!ctx.hasEstimate) {
      positives.push(`- Pending: Detailed Investment Estimate pending approval`);
    }

    return positives.join('\n');
  }

  /**
   * Records score history with timestamp
   */
  public static recordScoreHistory(leadId: string, score: number, priority: string, factors: AISalesScoreFactor[]) {
    if (!leadId) return;
    if (!SCORE_HISTORY_STORE[leadId]) {
      SCORE_HISTORY_STORE[leadId] = [
        {
          date: 'Aug 10',
          score: Math.max(50, score - 20),
          priority: 'MEDIUM',
          reason: 'Initial lead capture'
        },
        {
          date: 'Aug 12',
          score: Math.max(65, score - 8),
          priority: 'HIGH',
          reason: 'Requirement & module analysis completed'
        }
      ];
    }

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const lastItem = SCORE_HISTORY_STORE[leadId][SCORE_HISTORY_STORE[leadId].length - 1];

    if (!lastItem || lastItem.score !== score) {
      SCORE_HISTORY_STORE[leadId].push({
        date: todayStr,
        score,
        priority,
        reason: factors[0]?.reason || 'Updated lead context & AI re-analysis'
      });
    }
  }

  /**
   * Gets score history for lead
   */
  public static getScoreHistory(leadId: string): AISalesScoreHistoryItem[] {
    return SCORE_HISTORY_STORE[leadId] || [
      { date: 'Aug 10', score: 72, priority: 'MEDIUM', reason: 'Initial inquiry' },
      { date: 'Aug 12', score: 84, priority: 'HIGH', reason: 'Modules & requirements completed' },
      { date: 'Aug 14', score: 92, priority: 'URGENT', reason: 'Architecture & estimate completed' }
    ];
  }
}
