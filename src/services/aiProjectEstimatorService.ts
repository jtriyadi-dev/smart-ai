import {
  ProjectEstimationInput,
  ProjectEstimate,
  EstimationPricingConfig,
  ComplexityBreakdown,
  ComplexityFactor,
  ProjectComplexityLevel,
  TimelinePhase,
  CostCategoryBreakdown,
  TeamMemberRole,
  EstimationScenario,
  MVPRequirement,
  PhaseDevelopmentPlan,
  ModuleEstimationDetail,
  EstimationTraceabilityItem,
  EstimationHistoryVersion,
  ApplicationModule,
  RequirementAnalysis
} from '../types';

export const DEFAULT_PRICING_CONFIG: EstimationPricingConfig = {
  currency: 'IDR',
  baseProjectCost: 25000000,
  costPerModule: 12500000,
  costPerFeature: 2000000,
  aiWeightMultiplier: {
    'None': 0,
    'Basic': 15000000,
    'Intermediate': 35000000,
    'Advanced': 75000000,
    'Enterprise': 140000000
  },
  apiWeightPerIntegration: 8500000,
  realtimeMultiplier: {
    'None': 0,
    'Basic': 15000000,
    'Advanced': 38000000
  },
  platformMultiplier: {
    'Web': 1.0,
    'PWA': 1.18,
    'Mobile': 1.35,
    'Web + Mobile': 1.65
  },
  priorityMultiplier: {
    'Fast Delivery': 1.15,
    'Balanced': 1.0,
    'Maximum Quality': 1.28,
    'Enterprise Grade': 1.55
  },
  ratePerPersonDay: 2200000
};

const STORAGE_KEY_ESTIMATE = 'smart_ai_project_estimate_latest';
const STORAGE_KEY_HISTORY = 'smart_ai_project_estimate_history';
const STORAGE_KEY_PRICING = 'smart_ai_project_pricing_config';

export class AIProjectEstimatorService {
  /**
   * Get configured pricing settings or default
   */
  public static getPricingConfig(): EstimationPricingConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRICING);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved pricing config', e);
    }
    return DEFAULT_PRICING_CONFIG;
  }

  /**
   * Save custom pricing config (Admin function abstraction)
   */
  public static savePricingConfig(config: EstimationPricingConfig): void {
    localStorage.setItem(STORAGE_KEY_PRICING, JSON.stringify(config));
  }

  /**
   * Primary method to generate estimate via API or local fallback engine
   */
  public static async generateEstimate(input: ProjectEstimationInput): Promise<ProjectEstimate> {
    try {
      const response = await fetch('/api/ai-project-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          this.saveEstimateLocally(result.data);
          return result.data;
        }
      }
    } catch (err) {
      console.warn('Backend estimation endpoint failed, using client-side calculation engine:', err);
    }

    // Fallback to deterministic client-side calculation engine
    const localEstimate = this.calculateLocalEstimate(input);
    this.saveEstimateLocally(localEstimate);
    return localEstimate;
  }

  /**
   * Client-side deterministic estimation calculation engine
   */
  public static calculateLocalEstimate(input: ProjectEstimationInput): ProjectEstimate {
    const config = this.getPricingConfig();
    const complexity = this.calculateComplexity(input);
    const timeline = this.calculateTimeline(input, complexity.score);
    const investment = this.calculateInvestment(input, complexity.score, config);
    const costBreakdown = this.generateCostBreakdown(investment.minIDR, investment.maxIDR, input);
    const teamRecommendation = this.generateTeamRecommendation(complexity.score, input.platform, input.aiLevel);
    const moduleEstimations = this.generateModuleEstimations(input, config);
    const traceability = this.generateTraceability(input, moduleEstimations);
    
    const baseEstimatePartial: Partial<ProjectEstimate> = {
      complexity,
      scope: {
        modulesCount: input.modulesCount || 10,
        featuresCount: input.featuresCount || 45,
        usersCount: input.usersCount || 100,
        branchesCount: input.branchesCount || 1,
        userRolesCount: input.userRolesCount || 3,
        apiIntegrationsCount: input.apiIntegrationsCount || 2,
        aiFeaturesCount: input.aiLevel === 'None' ? 0 : input.aiLevel === 'Basic' ? 2 : 5
      },
      timeline,
      investment
    };

    const scenarios = this.generateScenarios(input, baseEstimatePartial as ProjectEstimate);
    const mvpEstimate = this.generateMVPEstimate(input, baseEstimatePartial as ProjectEstimate);
    const phasedPlan = this.generatePhasedPlan(input, investment.minIDR, investment.maxIDR);

    const assumptions = this.generateAssumptions(input);
    const exclusions = this.generateExclusions(input);
    const risks = this.generateRisks(input, complexity.score);
    const openQuestions = this.generateOpenQuestions(input);
    const costDrivers = this.generateCostDrivers(input, complexity.score);
    const costSavers = this.generateCostSavers(input);
    const timelineDrivers = this.generateTimelineDrivers(input);
    const recommendations = this.generateRecommendations(input);
    const confidence = this.calculateConfidence(input);

    const fullEstimate: ProjectEstimate = {
      id: `EST-${Date.now().toString(36).toUpperCase()}`,
      projectTitle: `${input.industry} ${input.businessType} Platform`,
      industry: input.industry,
      complexity,
      scope: {
        modulesCount: input.modulesCount,
        featuresCount: input.featuresCount,
        usersCount: input.usersCount,
        branchesCount: input.branchesCount,
        userRolesCount: input.userRolesCount,
        apiIntegrationsCount: input.apiIntegrationsCount,
        aiFeaturesCount: input.aiLevel === 'None' ? 0 : input.aiLevel === 'Basic' ? 2 : 5
      },
      timeline,
      investment,
      costBreakdown,
      scenarios,
      mvpEstimate,
      phasedPlan,
      teamRecommendation,
      moduleEstimations,
      traceability,
      assumptions,
      exclusions,
      risks,
      openQuestions,
      costDrivers,
      costSavers,
      timelineDrivers,
      recommendations,
      confidence,
      disclaimer: 'Estimasi ini dibuat menggunakan analisis AI berdasarkan konfigurasi dan informasi yang tersedia. Hasil merupakan estimasi awal untuk membantu perencanaan dan pengambilan keputusan, bukan quotation final, kontrak, atau jaminan biaya maupun waktu pengerjaan. Estimasi final dapat berubah setelah validasi requirement, technical review, scope confirmation, dan project discussion.',
      generatedAt: new Date().toISOString(),
      version: '1.0'
    };

    return fullEstimate;
  }

  /**
   * Calculate Complexity Score (0 - 100) and factor contributions
   */
  public static calculateComplexity(input: ProjectEstimationInput): ComplexityBreakdown {
    const factors: ComplexityFactor[] = [];

    // 1. Modules & Features (Weight: 25 points)
    const modulesCount = input.modulesCount || 10;
    const featuresCount = input.featuresCount || 40;
    const modScore = Math.min(25, Math.round((modulesCount * 1.2) + (featuresCount * 0.25)));
    factors.push({
      factorName: 'Skala Modul & Fitur Fungsional',
      scoreContribution: modScore,
      weight: 25,
      description: `${modulesCount} modul dengan total ~${featuresCount} fitur utama`,
      impact: modScore > 18 ? 'High' : modScore > 10 ? 'Medium' : 'Low'
    });

    // 2. User Scale & Permissions (Weight: 15 points)
    let userVal = typeof input.usersCount === 'number' ? input.usersCount : parseInt(String(input.usersCount).replace(/[^0-9]/g, '')) || 100;
    let branchVal = typeof input.branchesCount === 'number' ? input.branchesCount : parseInt(String(input.branchesCount).replace(/[^0-9]/g, '')) || 1;
    let userScore = 3;
    if (userVal > 5000 || branchVal > 10 || input.userRolesCount > 8) userScore = 15;
    else if (userVal > 1000 || branchVal > 3 || input.userRolesCount > 5) userScore = 11;
    else if (userVal > 200 || input.userRolesCount > 3) userScore = 7;

    factors.push({
      factorName: 'Pengguna, Role & Otorisasi Cabang',
      scoreContribution: userScore,
      weight: 15,
      description: `${userVal.toLocaleString('id-ID')} estimasi user, ${input.userRolesCount} hirarki role, ${branchVal} cabang`,
      impact: userScore > 10 ? 'High' : userScore > 5 ? 'Medium' : 'Low'
    });

    // 3. AI Intelligence Level (Weight: 15 points)
    let aiScore = 0;
    if (input.aiLevel === 'Enterprise') aiScore = 15;
    else if (input.aiLevel === 'Advanced') aiScore = 12;
    else if (input.aiLevel === 'Intermediate') aiScore = 8;
    else if (input.aiLevel === 'Basic') aiScore = 4;

    factors.push({
      factorName: 'Tingkat Kapabilitas Artificial Intelligence',
      scoreContribution: aiScore,
      weight: 15,
      description: `Tingkat kecerdasan AI: ${input.aiLevel}`,
      impact: aiScore > 10 ? 'High' : aiScore > 4 ? 'Medium' : 'Low'
    });

    // 4. API & Integration Complexity (Weight: 10 points)
    const apiCount = input.apiIntegrationsCount || 0;
    const apiScore = Math.min(10, apiCount * 2.5);
    factors.push({
      factorName: 'Integrasi Sistem / Third-Party API',
      scoreContribution: apiScore,
      weight: 10,
      description: `${apiCount} poin integrasi API / layanan pihak ketiga`,
      impact: apiScore > 7 ? 'High' : apiScore > 3 ? 'Medium' : 'Low'
    });

    // 5. Realtime Requirements (Weight: 10 points)
    let realtimeScore = 0;
    if (input.realtimeLevel === 'Advanced') realtimeScore = 10;
    else if (input.realtimeLevel === 'Basic') realtimeScore = 5;

    factors.push({
      factorName: 'Sistem Kebutuhan Realtime / Sync',
      scoreContribution: realtimeScore,
      weight: 10,
      description: `Kebutuhan realtime: ${input.realtimeLevel}`,
      impact: realtimeScore > 7 ? 'High' : realtimeScore > 3 ? 'Medium' : 'Low'
    });

    // 6. Platform & Mobile Complexity (Weight: 10 points)
    let platformScore = 3;
    if (input.platform === 'Web + Mobile') platformScore = 10;
    else if (input.platform === 'Mobile') platformScore = 7;
    else if (input.platform === 'PWA') platformScore = 5;

    factors.push({
      factorName: 'Multi-Platform Target Deployment',
      scoreContribution: platformScore,
      weight: 10,
      description: `Platform target: ${input.platform}`,
      impact: platformScore > 7 ? 'High' : platformScore > 3 ? 'Medium' : 'Low'
    });

    // 7. Database & Security Complexity (Weight: 15 points)
    let dataSecScore = 4;
    if (input.databaseComplexity === 'Enterprise' || input.securityLevel === 'Enterprise / ISO') dataSecScore = 15;
    else if (input.databaseComplexity === 'Advanced' || input.securityLevel === 'Enhanced') dataSecScore = 11;
    else if (input.databaseComplexity === 'Medium') dataSecScore = 7;

    factors.push({
      factorName: 'Keamanan, Database & Compliance',
      scoreContribution: dataSecScore,
      weight: 15,
      description: `Database ${input.databaseComplexity}, Security ${input.securityLevel}`,
      impact: dataSecScore > 10 ? 'High' : dataSecScore > 5 ? 'Medium' : 'Low'
    });

    const totalScore = Math.min(100, Math.max(12, Math.round(
      modScore + userScore + aiScore + apiScore + realtimeScore + platformScore + dataSecScore
    )));

    let level: ProjectComplexityLevel = 'Medium';
    if (totalScore <= 20) level = 'Very Low';
    else if (totalScore <= 40) level = 'Low';
    else if (totalScore <= 60) level = 'Medium';
    else if (totalScore <= 80) level = 'High';
    else level = 'Very High';

    return {
      score: totalScore,
      level,
      moduleComplexity: modScore,
      userComplexity: userScore,
      integrationComplexity: apiScore,
      aiComplexity: aiScore,
      realtimeComplexity: realtimeScore,
      platformComplexity: platformScore,
      dataComplexity: Math.round(dataSecScore * 0.6),
      securityComplexity: Math.round(dataSecScore * 0.4),
      factors
    };
  }

  /**
   * Calculate timeline in months range & phase details considering parallel execution
   */
  public static calculateTimeline(input: ProjectEstimationInput, complexityScore: number): {
    minMonths: number;
    maxMonths: number;
    totalPersonDaysMin: number;
    totalPersonDaysMax: number;
    phases: TimelinePhase[];
  } {
    // Base person-days calculation
    const baseModules = input.modulesCount || 10;
    const baseFeatures = input.featuresCount || 40;
    
    let totalPersonDaysMin = Math.round(35 + (baseModules * 5) + (baseFeatures * 1.5) + (complexityScore * 1.8));
    if (input.platform === 'Web + Mobile') totalPersonDaysMin = Math.round(totalPersonDaysMin * 1.35);
    if (input.projectPriority === 'Fast Delivery') totalPersonDaysMin = Math.round(totalPersonDaysMin * 0.88); // compressed with higher parallel team capacity
    
    const totalPersonDaysMax = Math.round(totalPersonDaysMin * 1.45);

    // Phases definition
    const phases: TimelinePhase[] = [
      {
        id: 'PHASE-1',
        name: '1. Discovery & SRS Requirements',
        description: 'Analisis mendalam, spesifikasi SRS, workflow, dan persetujuan wireframe awal',
        durationWeeksMin: 1.5,
        durationWeeksMax: 2.5,
        personDays: Math.round(totalPersonDaysMin * 0.10),
        isParallel: false,
        dependencies: []
      },
      {
        id: 'PHASE-2',
        name: '2. UI/UX Design & Prototyping',
        description: 'Perancangan Design System, Figma interactive prototype, dan UI responsiveness',
        durationWeeksMin: 2,
        durationWeeksMax: 3.5,
        personDays: Math.round(totalPersonDaysMin * 0.15),
        isParallel: false,
        dependencies: ['PHASE-1']
      },
      {
        id: 'PHASE-3',
        name: '3. Backend & Database Architecture',
        description: 'Skema DB, API gateway, autentikasi RBAC, skenario transaksi & audit log',
        durationWeeksMin: 3.5,
        durationWeeksMax: 6,
        personDays: Math.round(totalPersonDaysMin * 0.30),
        isParallel: true, // Overlaps with UI/UX & Frontend
        dependencies: ['PHASE-1']
      },
      {
        id: 'PHASE-4',
        name: '4. Frontend & Mobile Development',
        description: 'Implementasi antarmuka pengguna, komponen interaktif, state management, dan UI integration',
        durationWeeksMin: 4,
        durationWeeksMax: 7,
        personDays: Math.round(totalPersonDaysMin * 0.25),
        isParallel: true, // Overlaps with Backend
        dependencies: ['PHASE-2']
      },
      {
        id: 'PHASE-5',
        name: '5. AI Integration & Third-Party APIs',
        description: 'Pengembangan prompt model AI, pipeline data RAG/Predictive, dan konektor API eksternal',
        durationWeeksMin: 2,
        durationWeeksMax: 4,
        personDays: Math.round(totalPersonDaysMin * 0.12),
        isParallel: true,
        dependencies: ['PHASE-3']
      },
      {
        id: 'PHASE-6',
        name: '6. QA Testing, Security Audit & UAT',
        description: 'Pengujian fungsional, load testing, vulnerability check, UAT bersama stakeholder',
        durationWeeksMin: 2,
        durationWeeksMax: 3,
        personDays: Math.round(totalPersonDaysMin * 0.08),
        isParallel: false,
        dependencies: ['PHASE-4', 'PHASE-5']
      },
      {
        id: 'PHASE-7',
        name: '7. Cloud Deployment & Training',
        description: 'Infrastruktur Cloud Run/AWS, CI/CD pipeline, SSL, DNS, dokumentasi, dan user training',
        durationWeeksMin: 1,
        durationWeeksMax: 1.5,
        personDays: Math.round(totalPersonDaysMin * 0.05),
        isParallel: false,
        dependencies: ['PHASE-6']
      }
    ];

    // Calendar timeline calculation taking parallel execution into account
    // (Discovery) + (UI/UX) + max(Backend, Frontend) + max(AI, QA) + Deployment
    let minMonths = 2.5;
    let maxMonths = 4.5;

    if (complexityScore <= 25) {
      minMonths = 1.5;
      maxMonths = 3.0;
    } else if (complexityScore <= 45) {
      minMonths = 2.5;
      maxMonths = 4.5;
    } else if (complexityScore <= 65) {
      minMonths = 3.5;
      maxMonths = 6.0;
    } else if (complexityScore <= 85) {
      minMonths = 5.0;
      maxMonths = 8.5;
    } else {
      minMonths = 7.0;
      maxMonths = 12.0;
    }

    return {
      minMonths,
      maxMonths,
      totalPersonDaysMin,
      totalPersonDaysMax,
      phases
    };
  }

  /**
   * Calculate Investment Range in IDR and Tier
   */
  public static calculateInvestment(
    input: ProjectEstimationInput,
    complexityScore: number,
    config: EstimationPricingConfig
  ): {
    minIDR: number;
    maxIDR: number;
    currency: string;
    tier: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  } {
    const base = config.baseProjectCost;
    const modulesCost = (input.modulesCount || 10) * config.costPerModule;
    const featuresCost = (input.featuresCount || 40) * config.costPerFeature;
    const aiCost = config.aiWeightMultiplier[input.aiLevel] || 0;
    const apiCost = (input.apiIntegrationsCount || 0) * config.apiWeightPerIntegration;
    const realtimeCost = config.realtimeMultiplier[input.realtimeLevel] || 0;

    let subtotal = base + modulesCost + featuresCost + aiCost + apiCost + realtimeCost;

    // Apply platform and priority multipliers
    const platMult = config.platformMultiplier[input.platform] || 1.0;
    const prioMult = config.priorityMultiplier[input.projectPriority] || 1.0;

    subtotal = subtotal * platMult * prioMult;

    // Range calculation (-12% min, +25% max)
    const minIDR = Math.round((subtotal * 0.88) / 1000000) * 1000000;
    const maxIDR = Math.round((subtotal * 1.25) / 1000000) * 1000000;

    let tier: 'Starter' | 'Professional' | 'Business' | 'Enterprise' = 'Business';
    if (minIDR < 100000000) tier = 'Starter';
    else if (minIDR < 250000000) tier = 'Professional';
    else if (minIDR < 600000000) tier = 'Business';
    else tier = 'Enterprise';

    return {
      minIDR,
      maxIDR,
      currency: config.currency,
      tier
    };
  }

  /**
   * Generate Cost Category Breakdown percentages
   */
  public static generateCostBreakdown(
    minIDR: number,
    maxIDR: number,
    input: ProjectEstimationInput
  ): CostCategoryBreakdown[] {
    let devPct = 42;
    let aiPct = input.aiLevel === 'None' ? 0 : input.aiLevel === 'Basic' ? 10 : input.aiLevel === 'Intermediate' ? 16 : 22;
    let apiPct = Math.min(15, (input.apiIntegrationsCount || 1) * 3.5);
    let dbPct = 12;
    let mobPct = input.platform === 'Web + Mobile' ? 18 : input.platform === 'Mobile' ? 15 : 0;
    let cloudPct = 6;
    let qaPct = 8;
    let secPct = input.securityLevel === 'Enterprise / ISO' ? 8 : 4;

    const totalRaw = devPct + aiPct + apiPct + dbPct + mobPct + cloudPct + qaPct + secPct;
    const norm = (val: number) => Math.round((val / totalRaw) * 100);

    devPct = norm(devPct);
    aiPct = norm(aiPct);
    apiPct = norm(apiPct);
    dbPct = norm(dbPct);
    mobPct = norm(mobPct);
    cloudPct = norm(cloudPct);
    qaPct = norm(qaPct);
    secPct = 100 - (devPct + aiPct + apiPct + dbPct + mobPct + cloudPct + qaPct);

    const categories: CostCategoryBreakdown[] = [
      {
        category: 'Development',
        percentage: devPct,
        estimatedMinAmount: Math.round((minIDR * devPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * devPct) / 100),
        description: 'Frontend, UI Component, State Engine & Core App Logic'
      },
      {
        category: 'Database & Backend',
        percentage: dbPct,
        estimatedMinAmount: Math.round((minIDR * dbPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * dbPct) / 100),
        description: 'Micro-services / REST API, Database ORM, RBAC Otorisasi & Audit Logs'
      }
    ];

    if (aiPct > 0) {
      categories.push({
        category: 'AI Integration',
        percentage: aiPct,
        estimatedMinAmount: Math.round((minIDR * aiPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * aiPct) / 100),
        description: `Integrasi model AI (${input.aiLevel}), Prompt Engineering, Pipeline Data`
      });
    }

    if (apiPct > 0) {
      categories.push({
        category: 'API & Integration',
        percentage: apiPct,
        estimatedMinAmount: Math.round((minIDR * apiPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * apiPct) / 100),
        description: `${input.apiIntegrationsCount} konektor API pihak ketiga & integrasi Webhook`
      });
    }

    if (mobPct > 0) {
      categories.push({
        category: 'Mobile App',
        percentage: mobPct,
        estimatedMinAmount: Math.round((minIDR * mobPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * mobPct) / 100),
        description: 'Pengembangan Native Cross-platform App (Android & iOS) / PWA'
      });
    }

    categories.push(
      {
        category: 'QA & Testing',
        percentage: qaPct,
        estimatedMinAmount: Math.round((minIDR * qaPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * qaPct) / 100),
        description: 'Pengujian Fungsional, Stress Testing, Bug Fixing & Skenario UAT'
      },
      {
        category: 'Cloud & DevOps',
        percentage: cloudPct,
        estimatedMinAmount: Math.round((minIDR * cloudPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * cloudPct) / 100),
        description: 'Setup Container Server, CI/CD Pipeline, Domain SSL & Server Monitoring'
      },
      {
        category: 'Security & Compliance',
        percentage: secPct,
        estimatedMinAmount: Math.round((minIDR * secPct) / 100),
        estimatedMaxAmount: Math.round((maxIDR * secPct) / 100),
        description: 'Enkripsi Data, Proteksi OWASP Top 10 & Skenario Backup Recovery'
      }
    );

    return categories;
  }

  /**
   * Generate 3 Scenarios: Lean (MVP), Balanced (Recommended), Enterprise
   */
  public static generateScenarios(
    input: ProjectEstimationInput,
    baseEstimate: Partial<ProjectEstimate>
  ): EstimationScenario[] {
    const baseMin = baseEstimate.investment?.minIDR || 250000000;
    const baseMax = baseEstimate.investment?.maxIDR || 400000000;
    const baseMinM = baseEstimate.timeline?.minMonths || 3;
    const baseMaxM = baseEstimate.timeline?.maxMonths || 5;
    const baseScore = baseEstimate.complexity?.score || 55;

    return [
      {
        id: 'lean',
        title: 'Lean / MVP Scenario',
        subtitle: 'Fokus Fitur Utama (Must Have)',
        description: 'Pengembangan cepat versi MVP dengan hanya mengaktifkan modul prioritas tinggi untuk validasi pasar.',
        complexityLevel: 'Low',
        complexityScore: Math.round(baseScore * 0.65),
        modulesIncludedCount: Math.max(3, Math.round((input.modulesCount || 10) * 0.5)),
        timelineMonthsMin: Math.max(1.5, Math.round(baseMinM * 0.6)),
        timelineMonthsMax: Math.max(2.5, Math.round(baseMaxM * 0.65)),
        investmentMinIDR: Math.round((baseMin * 0.6) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((baseMax * 0.62) / 1000000) * 1000000,
        tradeOffs: [
          'Fitur sekunder dan analisis AI tingkat lanjut ditunda ke Fase 2',
          'Cakupan platform difokuskan pada Web Application terlebih dahulu',
          'Integrasi API pihak ketiga dibatasi hanya untuk yang esensial'
        ],
        recommendedFor: 'Startup / perusahaan yang membutuhkan peluncuran cepat ke pasar (Fast Time to Market)'
      },
      {
        id: 'balanced',
        title: 'Balanced Scenario (Rekomendasi Utama)',
        subtitle: 'Cakupan Penuh Sesuai Kebutuhan Skenario',
        description: 'Rekomendasi ideal yang menyeimbangkan antara kecepatan pengerjaan, cakupan modul lengkap, dan otomatisasi AI.',
        complexityLevel: baseEstimate.complexity?.level || 'Medium',
        complexityScore: baseScore,
        modulesIncludedCount: input.modulesCount || 10,
        timelineMonthsMin: baseMinM,
        timelineMonthsMax: baseMaxM,
        investmentMinIDR: baseMin,
        investmentMaxIDR: baseMax,
        tradeOffs: [
          'Arsitektur modular siap dikembangkan tanpa perombakan kode',
          'Layanan AI dan otomatisasi operasional sudah aktif secara penuh',
          'Mendukung skalabilitas pengguna hingga ribuan transaksi'
        ],
        recommendedFor: 'Solusi paling disarankan untuk perusahaan yang menginginkan sistem siap pakai dan terintegrasi'
      },
      {
        id: 'enterprise',
        title: 'Enterprise High-Scale Scenario',
        subtitle: 'Maksimum Performa, Keamanan ISO & Multi-Region',
        description: 'Dilengkapi arsitektur microservices tingkat lanjut, pengujian keamanan terpadu, dan infrastruktur High Availability.',
        complexityLevel: 'Very High',
        complexityScore: Math.min(100, Math.round(baseScore * 1.35)),
        modulesIncludedCount: (input.modulesCount || 10) + 3,
        timelineMonthsMin: Math.round(baseMinM * 1.4),
        timelineMonthsMax: Math.round(baseMaxM * 1.5),
        investmentMinIDR: Math.round((baseMin * 1.5) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((baseMax * 1.6) / 1000000) * 1000000,
        tradeOffs: [
          'Infrastruktur Kubernetes / Multi-region cloud deployment',
          'Penetration testing eksternal dan sertifikasi audit keamanan',
          'Garansi SLA ketersediaan 99.9% dan dukungan pemeliharaan 24/7'
        ],
        recommendedFor: 'Organisasi skala besar, BUMN, atau institusi yang memerlukan kepatuhan standar ISO/Enterprise'
      }
    ];
  }

  /**
   * MVP Estimator
   */
  public static generateMVPEstimate(
    input: ProjectEstimationInput,
    baseEstimate: Partial<ProjectEstimate>
  ): MVPRequirement {
    const baseMin = baseEstimate.investment?.minIDR || 250000000;
    const baseMax = baseEstimate.investment?.maxIDR || 400000000;
    const baseMinM = baseEstimate.timeline?.minMonths || 3;
    const baseMaxM = baseEstimate.timeline?.maxMonths || 5;

    const mustHaveModules = input.modules
      ? input.modules.filter(m => m.priority === 'Must Have' || m.priority === 'Essential').map(m => m.name)
      : ['Core Platform & Authentication', 'Master Data Management', 'Main Operational Module'];

    return {
      modulesIncluded: mustHaveModules.length > 0 ? mustHaveModules : ['Core Dashboard', 'Main Processing Module'],
      featuresCount: Math.round((input.featuresCount || 40) * 0.45),
      timelineMonthsMin: Math.max(1.5, Math.round(baseMinM * 0.55)),
      timelineMonthsMax: Math.max(2.5, Math.round(baseMaxM * 0.6)),
      investmentMinIDR: Math.round((baseMin * 0.55) / 1000000) * 1000000,
      investmentMaxIDR: Math.round((baseMax * 0.6) / 1000000) * 1000000,
      deferredCapabilities: [
        'AI Predictive Analytics & Automated Forecasting',
        'Advanced Realtime GPS & Live Monitoring',
        'Secondary Reporting & Export PDF Generator',
        'Multi-branch complex approval routing'
      ]
    };
  }

  /**
   * Phased Plan (Fase 1 MVP -> Fase 2 Advanced -> Fase 3 AI -> Fase 4 Enterprise)
   */
  public static generatePhasedPlan(
    input: ProjectEstimationInput,
    minIDR: number,
    maxIDR: number
  ): PhaseDevelopmentPlan[] {
    return [
      {
        phaseNumber: 1,
        phaseTitle: 'Fase 1: Core Foundation & MVP Launch',
        objective: 'Membangun pondasi database, sistem otorisasi, dan 3 modul operasional utama',
        includedModules: ['Core Platform & Auth', 'Master Data Management', 'Main Operations'],
        timelineWeeks: 8,
        investmentMinIDR: Math.round((minIDR * 0.45) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((maxIDR * 0.45) / 1000000) * 1000000
      },
      {
        phaseNumber: 2,
        phaseTitle: 'Fase 2: Complete Workflows & Integrations',
        objective: 'Penyelesaian seluruh modul sekunder, alur persetujuan, dan koneksi API eksternal',
        includedModules: ['Approval Workflow', 'Third-Party Integration Module', 'Reporting & Analytics'],
        timelineWeeks: 6,
        investmentMinIDR: Math.round((minIDR * 0.30) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((maxIDR * 0.30) / 1000000) * 1000000
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Fase 3: Smart AI Capabilities & Automation',
        objective: 'Aktivasi kecerdasan AI, otomatisasi dokumen, dan rekomendasi keputusan',
        includedModules: ['AI Copilot Engine', 'Predictive Insights', 'Automated Notification'],
        timelineWeeks: 4,
        investmentMinIDR: Math.round((minIDR * 0.18) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((maxIDR * 0.18) / 1000000) * 1000000
      },
      {
        phaseNumber: 4,
        phaseTitle: 'Fase 4: Mobile App & Enterprise Scaling',
        objective: 'Peluncuran aplikasi Mobile (iOS/Android), hardening keamanan, dan High Availability Cloud',
        includedModules: ['Mobile Apps Native', 'Security Hardening', 'Disaster Recovery'],
        timelineWeeks: 4,
        investmentMinIDR: Math.round((minIDR * 0.12) / 1000000) * 1000000,
        investmentMaxIDR: Math.round((maxIDR * 0.12) / 1000000) * 1000000
      }
    ];
  }

  /**
   * Team Recommendation based on complexity & scope
   */
  public static generateTeamRecommendation(
    complexityScore: number,
    platform: string,
    aiLevel: string
  ): {
    team: TeamMemberRole[];
    recommendedCapacity: string;
    alternativeCapacity: string;
  } {
    const isMobile = platform.includes('Mobile');
    const isAI = aiLevel !== 'None';

    const team: TeamMemberRole[] = [
      {
        role: 'Project Manager',
        count: 1,
        effortPersonDays: Math.round(15 + complexityScore * 0.3),
        allocationPercentage: 50
      },
      {
        role: 'UI/UX Designer',
        count: 1,
        effortPersonDays: Math.round(20 + complexityScore * 0.35),
        allocationPercentage: 80
      },
      {
        role: 'Frontend Engineer',
        count: complexityScore > 65 ? 2 : 1,
        effortPersonDays: Math.round(35 + complexityScore * 0.6),
        allocationPercentage: 100
      },
      {
        role: 'Backend Engineer',
        count: complexityScore > 65 ? 2 : 1,
        effortPersonDays: Math.round(40 + complexityScore * 0.7),
        allocationPercentage: 100
      }
    ];

    if (isMobile) {
      team.push({
        role: 'Mobile Developer',
        count: 1,
        effortPersonDays: Math.round(30 + complexityScore * 0.4),
        allocationPercentage: 100
      });
    }

    if (isAI) {
      team.push({
        role: 'AI Engineer',
        count: 1,
        effortPersonDays: Math.round(18 + complexityScore * 0.3),
        allocationPercentage: 60
      });
    }

    team.push(
      {
        role: 'QA Engineer',
        count: 1,
        effortPersonDays: Math.round(15 + complexityScore * 0.25),
        allocationPercentage: 60
      },
      {
        role: 'DevOps Engineer',
        count: 1,
        effortPersonDays: Math.round(10 + complexityScore * 0.15),
        allocationPercentage: 40
      }
    );

    const totalEngineers = team.reduce((acc, t) => acc + t.count, 0);

    return {
      team,
      recommendedCapacity: `Tim Standar (${totalEngineers} Profesional): Pengerjaan seimbang dengan koordinasi optimal`,
      alternativeCapacity: `Tim Akselerasi (${totalEngineers + 2} Profesional): Mempercepat rilis hingga 25% namun memerlukan effort manajemen tambahan`
    };
  }

  /**
   * Detail estimation for each module
   */
  public static generateModuleEstimations(
    input: ProjectEstimationInput,
    config: EstimationPricingConfig
  ): ModuleEstimationDetail[] {
    const modules = input.modules && input.modules.length > 0
      ? input.modules
      : [
          { id: 'MOD-001', name: 'Core Platform & Authentication', features: [{ name: 'F1' }, { name: 'F2' }, { name: 'F3' }], priority: 'Must Have' },
          { id: 'MOD-002', name: 'Master Data Management', features: [{ name: 'F1' }, { name: 'F2' }], priority: 'Must Have' },
          { id: 'MOD-003', name: 'Main Operations Engine', features: [{ name: 'F1' }, { name: 'F2' }, { name: 'F3' }, { name: 'F4' }], priority: 'Must Have' },
          { id: 'MOD-004', name: 'Reporting & Analytics Dashboard', features: [{ name: 'F1' }, { name: 'F2' }], priority: 'Recommended' },
          { id: 'MOD-005', name: 'AI Copilot & Smart Assistant', features: [{ name: 'F1' }, { name: 'F2' }], priority: 'Recommended' }
        ];

    return modules.map((m, idx) => {
      const featCount = m.features ? m.features.length : 3;
      let complexity: 'Low' | 'Medium' | 'High' | 'Very High' = 'Medium';
      if (featCount > 6 || m.name.toLowerCase().includes('ai') || m.name.toLowerCase().includes('engine')) complexity = 'High';
      if (featCount <= 2) complexity = 'Low';

      const personDays = 8 + (featCount * 3) + (idx === 0 ? 5 : 0);
      const minCost = Math.round((personDays * config.ratePerPersonDay * 0.9) / 1000000) * 1000000;
      const maxCost = Math.round((personDays * config.ratePerPersonDay * 1.35) / 1000000) * 1000000;

      return {
        moduleId: m.id || `MOD-00${idx + 1}`,
        moduleName: m.name,
        featuresCount: featCount,
        complexity,
        personDaysEffort: personDays,
        estimatedMinIDR: minCost,
        estimatedMaxIDR: maxCost,
        timelineContributionWeeks: Math.max(1, Math.round(personDays / 10))
      };
    });
  }

  /**
   * Requirement -> Module -> Feature -> Cost Traceability
   */
  public static generateTraceability(
    input: ProjectEstimationInput,
    moduleDetails: ModuleEstimationDetail[]
  ): EstimationTraceabilityItem[] {
    const items: EstimationTraceabilityItem[] = [];

    moduleDetails.forEach((md, idx) => {
      items.push({
        requirementCode: `REQ-00${idx + 1}`,
        requirementTitle: `Kebutuhan Otomatisasi ${md.moduleName}`,
        moduleName: md.moduleName,
        featureName: `Core Workflow & Management ${md.moduleName}`,
        complexity: md.complexity,
        personDaysEffort: md.personDaysEffort,
        investmentContributionIDR: Math.round((md.estimatedMinIDR + md.estimatedMaxIDR) / 2)
      });
    });

    return items;
  }

  public static generateAssumptions(input: ProjectEstimationInput): string[] {
    return [
      `Estimasi dihitung berdasarkan skenario ${input.platform} dengan ${input.modulesCount || 10} modul aplikasi`,
      'Seluruh dokumentasi API eksternal dan hak akses sandbox dianggap sudah tersedia saat pengerjaan dimulai',
      'Konten awal, skema data master, dan aset visual (logo, copywriting) disediakan oleh pihak Klien',
      'Persetujuan UAT dan keputusan alur bisnis dilakukan secara tepat waktu tanpa penundaan berlebih',
      'Biaya langganan lisensi pihak ketiga (misal: API Google Maps, OpenAI Token API, Payment Gateway) ditanggung Klien'
    ];
  }

  public static generateExclusions(input: ProjectEstimationInput): string[] {
    return [
      'Migrasi data histori skala besar dari legacy database (dapat disediakan sebagai adendum layanan terpisah)',
      'Pengadaan perangkat keras (hardware), scanner barcode, tablet khusus, atau infrastruktur server fisik on-premise',
      'Biaya pembuatan konten media (fotografi produk, videografi, dan pembuatan materi pemasaran)',
      'Sertifikasi resmi pemerintah / audit ISO oleh lembaga audit independen (apabila diperlukan)',
      'Biaya akomodasi & perjalanan dinas untuk tim teknis di luar area wilayah operasional utama'
    ];
  }

  public static generateRisks(input: ProjectEstimationInput, complexityScore: number): { risk: string; level: 'High' | 'Medium' | 'Low'; mitigation: string }[] {
    const risks: { risk: string; level: 'High' | 'Medium' | 'Low'; mitigation: string }[] = [
      {
        risk: 'Keterlambatan Penyediaan Akses / Dokumentasi API Pihak Ketiga',
        level: input.apiIntegrationsCount > 3 ? 'High' : 'Medium',
        mitigation: 'Melakukan mock/stub API di awal pengembangan agar frontend & backend dapat terus berjalan'
      },
      {
        risk: 'Scope Creep / Perubahan Requirement di Tengah Pengerjaan',
        level: 'Medium',
        mitigation: 'Menerapkan Change Request Management formal dengan penyesuaian timeline & effort'
      }
    ];

    if (input.aiLevel === 'Advanced' || input.aiLevel === 'Enterprise') {
      risks.push({
        risk: 'Akurasi Model AI Perlu Tuning Berulang pada Dataset Spesifik',
        level: 'High',
        mitigation: 'Mengalokasikan sprint khusus untuk prompt refinement dan pengujian akurasi dataset'
      });
    }

    if (complexityScore > 70) {
      risks.push({
        risk: 'Kompleksitas Sinkronisasi Data Realtime pada Wilayah Sinyal Lemah',
        level: 'High',
        mitigation: 'Implementasi strategi Offline-First Storage dengan fitur background auto-sync'
      });
    }

    return risks;
  }

  public static generateOpenQuestions(input: ProjectEstimationInput): string[] {
    return [
      'Berapa rata-rata volume transaksi/data harian yang diperkirakan pada tahun pertama?',
      'Apakah integrasi API eksternal sudah memiliki lingkungan Testing/Sandbox yang aktif?',
      'Apakah aplikasi membutuhkan mode Offline-First untuk penggunaan di area tanpa sinyal?',
      'Apakah ada standar kepatuhan regulasi khusus (misal: HIPAA, OJK, ISO 27001) yang diwajibkan?'
    ];
  }

  public static generateCostDrivers(input: ProjectEstimationInput, complexityScore: number): string[] {
    const drivers: string[] = [];
    if (input.platform === 'Web + Mobile') drivers.push('+ Pengembangan Native Mobile App (Android + iOS)');
    if (input.aiLevel === 'Advanced' || input.aiLevel === 'Enterprise') drivers.push(`+ Kapabilitas AI Tingkat Lanjut (${input.aiLevel})`);
    if (input.apiIntegrationsCount > 2) drivers.push(`+ ${input.apiIntegrationsCount} Integrasi API & Webhook Pihak Ketiga`);
    if (input.realtimeLevel === 'Advanced') drivers.push('+ Fitur Realtime Live Tracking & Streaming Socket');
    if (input.securityLevel === 'Enterprise / ISO') drivers.push('+ Keamanan ISO & Audit Log Otorisasi Berlapis');
    if (drivers.length === 0) drivers.push('+ Jumlah Modul & Alur Fitur Utama');
    return drivers;
  }

  public static generateCostSavers(input: ProjectEstimationInput): string[] {
    const savers: string[] = [];
    if (input.platform === 'Web') savers.push('+ Arsitektur Single Web App (Tanpa biaya maintain Mobile App terpisah)');
    if (input.realtimeLevel === 'None') savers.push('+ Tanpa kebutuhan infrastruktur WebSocket berbiaya tinggi');
    savers.push('+ Arsitektur Micro-Modular AI yang dapat dikembangkan secara terukur');
    savers.push('+ Penggunaan komponen UI standar teruji untuk percepatan desain');
    return savers;
  }

  public static generateTimelineDrivers(input: ProjectEstimationInput): string[] {
    return [
      `Jumlah modul yang cukup besar (${input.modulesCount || 10} modul)`,
      `Ketersediaan & kestabilan ${input.apiIntegrationsCount} API pihak ketiga`,
      `Pengujian skenario otorisasi role user & persetujuan berjenjang`,
      'Proses UAT & validasi akhir oleh tim bisnis/stakeholder'
    ];
  }

  public static generateRecommendations(input: ProjectEstimationInput): { type: 'reduce_cost' | 'improve_capability'; title: string; description: string; tradeOff: string }[] {
    return [
      {
        type: 'reduce_cost',
        title: 'Mulai dengan Strategi Rilis MVP (Phase-1)',
        description: 'Luncurkan 5 modul esensial terlebih dahulu untuk langsung mendapatkan feedback dari user dalam waktu 2 bulan.',
        tradeOff: 'Fitur AI canggih dan integrasi sekunder ditunda ke pengiriman tahap kedua.'
      },
      {
        type: 'improve_capability',
        title: 'Tambahkan Modul AI Predictive Analytics',
        description: 'Manfaatkan data operasional yang terkumpul untuk otomatisasi estimasi stok/penjualan secara presisi.',
        tradeOff: 'Menambah investasi ~15% dan membutuhkan alokasi 2 minggu tambahan.'
      }
    ];
  }

  public static calculateConfidence(input: ProjectEstimationInput): {
    level: 'Low' | 'Medium' | 'High';
    scorePercentage: number;
    reason: string;
  } {
    let score = 80;
    if (input.modulesCount && input.modulesCount > 0) score += 5;
    if (input.requirementAnalysis) score += 10;
    if (input.solutionArchitecture) score += 5;

    let level: 'Low' | 'Medium' | 'High' = 'High';
    if (score < 60) level = 'Low';
    else if (score < 85) level = 'Medium';
    else level = 'High';

    return {
      level,
      scorePercentage: Math.min(98, score),
      reason: level === 'High' 
        ? 'Spesifikasi modul, requirement, dan arsitektur sistem sudah cukup detail untuk estimasi presisi.'
        : 'Beberapa integrasi eksternal belum terspesifikasi secara mendetail.'
    };
  }

  /**
   * Save estimate to history & latest key
   */
  public static saveEstimateLocally(estimate: ProjectEstimate): void {
    try {
      localStorage.setItem(STORAGE_KEY_ESTIMATE, JSON.stringify(estimate));

      const history = this.getEstimateHistory();
      const versionItem: EstimationHistoryVersion = {
        versionId: estimate.id,
        versionName: `Versi ${history.length + 1} (${estimate.industry})`,
        timestamp: new Date().toISOString(),
        inputSummary: {
          platform: estimate.scope.modulesCount + ' Modul',
          scale: estimate.investment.tier,
          modulesCount: estimate.scope.modulesCount,
          aiLevel: estimate.complexity.level
        },
        complexityScore: estimate.complexity.score,
        timelineMonthsRange: `${estimate.timeline.minMonths}-${estimate.timeline.maxMonths} Bln`,
        investmentRangeIDR: `Rp ${(estimate.investment.minIDR/1000000).toFixed(0)}M - Rp ${(estimate.investment.maxIDR/1000000).toFixed(0)}M`,
        estimateData: estimate
      };

      const updatedHistory = [versionItem, ...history.filter(h => h.versionId !== estimate.id)].slice(0, 10);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn('Failed to save estimate locally', e);
    }
  }

  /**
   * Retrieve saved estimate
   */
  public static getLatestSavedEstimate(): ProjectEstimate | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ESTIMATE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load latest estimate', e);
    }
    return null;
  }

  /**
   * Get version history
   */
  public static getEstimateHistory(): EstimationHistoryVersion[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load estimate history', e);
    }
    return [];
  }

  /**
   * Export JSON download helper
   */
  public static exportEstimateJSON(estimate: ProjectEstimate): void {
    const jsonStr = JSON.stringify(estimate, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Estimasi-SMART-AI-${estimate.projectTitle.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
