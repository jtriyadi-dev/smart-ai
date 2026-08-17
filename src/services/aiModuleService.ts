import {
  ApplicationModule,
  ModuleGeneratorInput,
  ModuleOptimizationResult,
  ModuleConfigurationResult,
  ModulePriority,
  ModuleStatus,
  ModuleCategory
} from '../types';

const STORAGE_KEY = 'smart_ai_module_config';
const HISTORY_KEY = 'smart_ai_module_history';

export class AIModuleGeneratorService {
  /**
   * Save current module configuration to LocalStorage
   */
  static saveConfiguration(result: ModuleConfigurationResult): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

      // Save to history list
      const existingHistoryRaw = localStorage.getItem(HISTORY_KEY);
      const history: ModuleConfigurationResult[] = existingHistoryRaw
        ? JSON.parse(existingHistoryRaw)
        : [];

      // Unshift new item, limit to 10
      const updatedHistory = [result, ...history.filter((h) => h.savedAt !== result.savedAt)].slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (err) {
      console.warn('Failed to save module configuration to LocalStorage:', err);
    }
  }

  /**
   * Load current saved module configuration from LocalStorage
   */
  static getSavedConfiguration(): ModuleConfigurationResult | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to load module configuration:', err);
      return null;
    }
  }

  /**
   * Request AI Module Generation from Server
   */
  static async generateModules(input: ModuleGeneratorInput): Promise<ModuleConfigurationResult> {
    try {
      this.trackEvent('module_generator_started', { industry: input.industry, scale: input.companyScale });

      const response = await fetch('/api/ai-module-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !Array.isArray(data.modules)) {
        throw new Error(data.error || 'Gagal memproses rekomendasi modul.');
      }

      const modules: ApplicationModule[] = data.modules.map((m: any, index: number) => ({
        id: m.id || `MOD-${(index + 1).toString().padStart(3, '0')}`,
        name: m.name || `Module ${index + 1}`,
        category: m.category || 'Operations',
        description: m.description || '',
        purpose: m.purpose || '',
        priority: (m.priority as ModulePriority) || 'Must Have',
        features: Array.isArray(m.features) ? m.features : [],
        roles: Array.isArray(m.roles) ? m.roles : ['User'],
        dependencies: Array.isArray(m.dependencies) ? m.dependencies : [],
        aiFeatures: Array.isArray(m.aiFeatures) ? m.aiFeatures : [],
        integrations: Array.isArray(m.integrations) ? m.integrations : [],
        dataRequirements: Array.isArray(m.dataRequirements) ? m.dataRequirements : [],
        workflow: Array.isArray(m.workflow) ? m.workflow : [],
        status: (m.status as ModuleStatus) || 'AI Recommended',
        source: m.source || 'AI',
        order: m.order || index + 1,
        architectureImpact: m.architectureImpact || {
          frontend: [`${m.name} View`],
          backend: [`${m.name} Service`],
          database: [`${m.name} Table`],
          api: [`/api/v1/${m.name?.toLowerCase()?.replace(/\s+/g, '-')}`]
        }
      }));

      const summary = this.calculateSummary(modules);

      const resultConfig: ModuleConfigurationResult = {
        industry: input.industry,
        businessType: input.businessType,
        companyScale: input.companyScale,
        modules,
        summary,
        confirmed: false,
        savedAt: new Date().toISOString()
      };

      this.saveConfiguration(resultConfig);
      this.trackEvent('modules_generated', { total: modules.length, industry: input.industry });

      return resultConfig;
    } catch (err) {
      console.error('Error generating modules via API:', err);
      throw err;
    }
  }

  /**
   * Request AI Optimization analysis
   */
  static async optimizeModules(industry: string, modules: ApplicationModule[]): Promise<ModuleOptimizationResult> {
    try {
      this.trackEvent('module_optimization_requested', { industry, count: modules.length });

      const response = await fetch('/api/ai-module-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, modules })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      return data.optimization;
    } catch (err) {
      console.warn('Fallback to heuristic optimizer:', err);
      return {
        overallAnalysis: `Struktur ${modules.length} modul telah ditinjau. Rekomendasi mencakup pembagian modul kompleks dan pemeliharaan keterhubungan antar peran.`,
        currentModuleCount: modules.length,
        recommendedModuleCount: modules.length,
        suggestions: [
          {
            id: 'OPT-01',
            type: 'Merge',
            title: 'Saran Sinkronisasi Modul Gudang & Inventaris',
            reason: 'Penggabungan manajemen stok barang dan penerimaan logistik mencegah duplikasi input.',
            benefits: 'Efisiensi waktu pembaruan stok real-time.'
          }
        ]
      };
    }
  }

  /**
   * Request additional module recommendations from AI
   */
  static async askAIForMoreModules(industry: string, currentModules: ApplicationModule[]): Promise<ApplicationModule[]> {
    try {
      this.trackEvent('ai_module_recommendation_requested', { count: currentModules.length });

      const response = await fetch('/api/ai-module-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, currentModules })
      });

      if (!response.ok) throw new Error('API failed');

      const data = await response.json();
      return data.suggestedModules || [];
    } catch (err) {
      console.warn('Fallback add modules:', err);
      return [
        {
          id: `MOD-ADD-${Date.now().toString(36)}`,
          name: 'AI Analytics & Predictive Insights',
          category: 'AI',
          description: 'Modul analitik berbasis kecerdasan buatan untuk proyeksi tren dan deteksi anomali operasional.',
          purpose: 'Memberikan insight manajerial berbasis AI.',
          priority: 'Recommended',
          features: [
            { id: 'F-NEW-1', name: 'Realtime Executive Summary', description: 'Visualisasi metrik utama secara proaktif', priority: 'Must Have' }
          ],
          roles: ['Executive', 'Manager'],
          dependencies: [],
          aiFeatures: [{ id: 'AI-NEW-1', name: 'Smart Predictive Model', description: 'Model prediksi 30 hari ke depan' }],
          integrations: ['Internal DB'],
          dataRequirements: ['Operational Ledger'],
          workflow: [{ step: 1, title: 'Integasi Data', description: 'Pengambilan data otomatis', role: 'System' }],
          status: 'AI Recommended',
          source: 'AI',
          order: currentModules.length + 1
        }
      ];
    }
  }

  /**
   * Calculate statistics for current module list
   */
  static calculateSummary(modules: ApplicationModule[]) {
    return {
      totalModules: modules.length,
      mustHaveCount: modules.filter((m) => m.priority === 'Must Have').length,
      recommendedCount: modules.filter((m) => m.priority === 'Recommended').length,
      optionalCount: modules.filter((m) => m.priority === 'Optional').length,
      aiEnabledCount: modules.filter((m) => m.aiFeatures && m.aiFeatures.length > 0).length,
      userAddedCount: modules.filter((m) => m.source === 'User' || m.status === 'User Added').length,
      userModifiedCount: modules.filter((m) => m.status === 'User Modified').length
    };
  }

  /**
   * Get default industry business type options
   */
  static getBusinessTypesForIndustry(industry: string): string[] {
    const map: Record<string, string[]> = {
      'Mining': ['Mining Contractor', 'Mining Owner', 'Mining Service Company', 'Mining Logistics', 'Mining Equipment Provider'],
      'Coal Mining': ['Coal Contractor', 'Coal Mine Owner', 'Coal Hauling Provider', 'Coal Trader & Logistics'],
      'Nickel Mining': ['Nickel Smelter', 'Nickel Mining Contractor', 'Nickel Hauling & Shipping', 'Nickel Trader'],
      'Plantation': ['Palm Oil Estate (PKS)', 'Rubber Plantation', 'Tea & Coffee Plantation', 'Agro-Business Group'],
      'Poultry': ['Broiler Farm', 'Layer Farm (Egg)', 'Feedmill & Poultry Shop', 'Poultry Integrator'],
      'Shrimp Farming': ['Shrimp Pond Operator', 'Hatchery & Feed Provider', 'Seafood Processor & Exporter'],
      'Hospital': ['General Hospital (RSU)', 'Specialist Hospital (RSIA)', 'Primary Clinic / Medical Center', 'Public Health Center (Puskesmas)'],
      'School': ['K-12 School', 'Vocational High School (SMK)', 'University / Higher Education', 'Islamic Boarding School (Pesantren)'],
      'Manufacturing': ['Discrete Manufacturing', 'Process & Chemical Manufacturing', 'OEM Component Supplier', 'FMCG Producer'],
      'Retail': ['Supermarket / Minimarket Chain', 'Fashion & Apparel Retail', 'Electronics Store', 'Multi-Store Network'],
      'Restaurant': ['Fine Dining / Resto', 'Fast Food Chain', 'Café & Bakery', 'Cloud Kitchen / Catering'],
      'Distributor': ['FMCG Distributor', 'Pharma & Medical Supplier', 'Building Material Wholesaler', 'Industrial Equipment Distributor'],
      'Logistics': ['3PL / Freight Forwarding', 'Fleet & Trucking Operator', 'Express Delivery & Courier', 'Cold Chain Logistics'],
      'Construction': ['General Building Contractor', 'Infrastructure Contractor', 'EPCC Specialist', 'MEP Contractor'],
      'Property': ['Property Developer', 'Commercial Mall Manager', 'Residential Estate Operator', 'Co-working / Workspace Manager'],
      'Agriculture': ['Food Crop Farm', 'Horticulture & Greenhouse', 'Agricultural Cooperative', 'Fertilizer & Seed Supplier'],
      'Financial Services': ['Multi-Finance & Leasing', 'Fintech Peer-to-Peer', 'Micro-Finance Institution (BPR)', 'Insurance Broker'],
      'Professional Services': ['IT & Software Agency', 'Consulting & Advisory Firm', 'Accounting & Tax Firm', 'Law & Legal Office']
    };

    return map[industry] || ['General Business Operator', 'Service Provider', 'Manufacturer', 'Trader / Wholesaler'];
  }

  /**
   * Analytics tracking helper
   */
  private static trackEvent(eventName: string, details: Record<string, any>): void {
    try {
      console.log(`[ANALYTICS EVENT]: ${eventName}`, details);
    } catch (e) {
      // ignore
    }
  }
}
