export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'architect' | 'developer';
  companyId?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  userId?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  status: 'LEAD' | 'PROSPECT' | 'ACTIVE_CLIENT' | 'INACTIVE';
  totalProjects: number;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  scale: string;
  website?: string;
  address?: string;
  contactEmail: string;
  contactPhone: string;
}

export interface LegacyLead {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  industry: string;
  applicationType: string;
  userCount: string;
  requiredFeatures: string[];
  budgetEstimate: string;
  message: string;
  status: 'NEW_LEAD' | 'CONTACTED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'DISQUALIFIED';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  industry: string;
  appType: string;
  techStack: string[];
  status: 'PLANNING' | 'IN_DEVELOPMENT' | 'TESTING' | 'DEPLOYED' | 'MAINTENANCE';
  progressPercentage: number;
  startDate: string;
  targetCompletionDate: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  recommendedFor: string[];
  badge?: string;
}

export interface IndustrySolution {
  id: string;
  title: string;
  category: 'primary' | 'agriculture' | 'healthcare' | 'commerce' | 'operations';
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  aiCapability: string;
  impactMetrics: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  industry: string;
  badge: 'Concept / Custom Solution' | string;
  description: string;
  fullDetails: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  aiFeature: string;
  imageBg: string;
  slug?: string;
}

export type PortfolioProjectType = 'Concept' | 'Prototype' | 'Internal' | 'Client' | 'Demo';
export type PortfolioProjectStatus = 'CONCEPT PROJECT' | 'PROTOTYPE' | 'DEMO' | 'IN DEVELOPMENT' | 'COMPLETED' | 'CLIENT PROJECT';
export type PortfolioVisibility = 'PUBLIC' | 'CUSTOMER' | 'INTERNAL';
export type PortfolioApprovalStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface PortfolioProblem {
  id: string;
  title: string;
  description: string;
  impact?: string;
}

export interface PortfolioModuleItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  aiEnabled?: boolean;
}

export interface PortfolioTechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'API' | 'Cloud' | 'Authentication' | 'AI' | 'Analytics' | string;
  description?: string;
}

export interface PortfolioAIFeatureItem {
  id: string;
  name: string;
  description: string;
  status: 'CONCEPT' | 'PLANNED' | 'PROTOTYPE' | 'AVAILABLE';
  iconName?: string;
}

export interface PortfolioScreenshotItem {
  id: string;
  title: string;
  description: string;
  image: string;
  device: 'desktop' | 'tablet' | 'mobile' | 'dashboard' | 'module';
  sortOrder: number;
}

export interface PortfolioWorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface PortfolioDashboardPreview {
  kpis: { label: string; value: string; change?: string; trend?: 'up' | 'down' | 'neutral' }[];
  charts?: { title: string; type: 'bar' | 'line' | 'pie'; data: any[] }[];
  recentData?: { col1: string; col2: string; col3: string; status?: string }[];
  aiInsights?: string[];
}

export interface PortfolioConfig {
  id: string;
  name: string;
  slug: string;
  industry: string;
  category: string;
  description: string;
  fullDescription: string;
  projectType: PortfolioProjectType;
  status: PortfolioProjectStatus;
  coverImage: string; // Gradient class or image URL
  problems: PortfolioProblem[];
  solution: {
    summary: string;
    digitalSolution: string;
    businessImpact: string;
  };
  modules: PortfolioModuleItem[];
  technology: PortfolioTechItem[];
  aiFeatures: PortfolioAIFeatureItem[];
  benefits: string[];
  workflow: PortfolioWorkflowStep[];
  screenshots: PortfolioScreenshotItem[];
  demoVideoUrl?: string;
  dashboardPreview?: PortfolioDashboardPreview;
  visibility: PortfolioVisibility;
  featured: boolean;
  approvalStatus: PortfolioApprovalStatus;
  relatedIndustrySlug?: string;
  viewsCount?: number;
  clicksCount?: number;
  version?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioAuditLog {
  id: string;
  portfolioId: string;
  portfolioName: string;
  action: 'Created' | 'Updated' | 'Published' | 'Unpublished' | 'Archived' | 'Deleted' | 'Restored';
  author: string;
  timestamp: string;
  details?: string;
}

export interface PortfolioVersionSnapshot {
  id: string;
  portfolioId: string;
  version: number;
  snapshot: PortfolioConfig;
  author: string;
  timestamp: string;
  changesDescription: string;
}

export interface BasicProposalSummary {
  id: string;
  leadId?: string;
  clientName: string;
  companyName: string;
  projectTitle: string;
  scopeSummary: string;
  recommendedModules: string[];
  aiFeatures: string[];
  timelineWeeks: string;
  totalEstimate: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  validUntil: string;
  createdAt: string;
}

export interface LegacyQuotation {
  id: string;
  proposalId?: string;
  clientName: string;
  companyName: string;
  items: {
    itemDescription: string;
    qty: number;
    unitPrice: number;
    totalAmount: number;
  }[];
  subtotal: number;
  taxRatePercent: number;
  grandTotal: number;
  paymentTerms: string;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'EXPIRED';
  createdAt: string;
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type PaymentStatusType = 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'OVERPAID';
export type PaymentMethodType = 'Bank Transfer' | 'Cash' | 'Credit Card' | 'Debit Card' | 'Payment Gateway' | 'Other';
export type ReceiptStatus = 'ISSUED' | 'CANCELLED';

export interface BankSettings {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
  branch?: string;
  paymentInstructions: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  sortOrder: number;
}

export interface InvoiceAuditLog {
  id: string;
  invoiceId: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
}

export interface PaymentReminderLog {
  id: string;
  invoiceId: string;
  type: 'BEFORE_DUE' | 'DUE_TODAY' | 'OVERDUE';
  channel: 'Email' | 'WhatsApp' | 'SMS' | 'In-App';
  sentTo: string;
  sentAt: string;
  status: 'SENT' | 'READY_SIMULATED';
  message: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // "SAI-INV-2026-0001"
  status: InvoiceStatus;
  paymentStatus: PaymentStatusType;
  secureToken: string;
  
  // Related References
  quotationId?: string;
  quotationNumber?: string;
  proposalId?: string;
  proposalNumber?: string;
  projectId?: string;
  projectName: string;
  leadId?: string;
  companyId?: string;
  contactId?: string;
  
  // Customer & Billing Info
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyAddress: string;
  taxId?: string;
  industry: string;
  
  // Financial Details
  currency: string;
  exchangeRate: number;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  milestoneName?: string;
  milestonePercentage?: number;
  
  items: InvoiceItem[];
  subtotal: number;
  discountAmount: number;
  taxName: string;
  taxRate: number;
  taxAmount: number;
  taxableAmount: number;
  grandTotal: number;
  
  // Payment Progress
  paidAmount: number;
  outstandingAmount: number;
  overdueDays: number;
  
  // Bank & Notes
  bankDetails?: BankSettings;
  notes: string;
  paymentInstructions: string;
  
  // Cancellation
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  
  // Meta
  version: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  auditLogs: InvoiceAuditLog[];
  reminderLogs: PaymentReminderLog[];
}

export interface PaymentAllocation {
  id: string;
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string;
  allocatedAmount: number;
  currency: string;
  exchangeRate: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  paymentNumber: string; // "TRX-20260814-001"
  invoiceId: string;
  invoiceNumber: string;
  companyName: string;
  amount: number;
  currency: string;
  appliedExchangeRate?: number;
  invoiceCurrencyAmount?: number;
  paymentDate: string;
  paymentMethod: PaymentMethodType;
  referenceNumber: string;
  externalReference?: string;
  bank: string;
  account?: string;
  notes: string;
  status: 'VALID' | 'VOIDED';
  voidReason?: string;
  voidedBy?: string;
  voidedAt?: string;
  proofUrl?: string;
  proofFileName?: string;
  allocations: PaymentAllocation[];
  receiptId?: string;
  receiptNumber?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string; // "SAI-RCP-2026-0001"
  paymentId: string;
  paymentNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  companyName: string;
  contactName: string;
  projectName: string;
  amount: number;
  currency: string;
  issuedAt: string;
  paymentMethod: string;
  referenceNumber: string;
  remainingBalance: number;
  notes: string;
  status: ReceiptStatus;
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  createdBy: string;
}

export interface SupportTicket {
  id: string;
  projectId: string;
  clientName: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  description: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  isRead: boolean;
  createdAt: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'cloud';
  icon: string;
  description: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing' | 'support';
}

export interface LeadFormData {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  industry: string;
  applicationType: string;
  userCount: string;
  requiredFeatures: string[];
  budgetEstimate: string;
  message: string;
}

export interface AIBuilderInput {
  // Step 1: Business
  businessName: string;
  businessIndustry: string;
  businessDescription: string;
  businessLocation: string;
  businessType: 'Startup' | 'Small Business' | 'Medium Business' | 'Enterprise' | 'Organization' | '';

  // Step 2: Problem
  businessProblems: string;
  quickProblemSelections: string[];

  // Step 3: Requirements
  requirementsGoalsText: string;
  goalsSelections: string[];

  // Step 4: Scale
  userScale: '1–10' | '11–50' | '51–100' | '101–500' | '500+' | '';
  branchesCount: '1' | '2–5' | '6–20' | '21–50' | '50+' | '';
  estimatedTransactions: 'Low' | 'Medium' | 'High' | 'Very High' | '';
  operationalLocations: 'Single Location' | 'Multiple Locations' | 'Multi-Region' | 'Multi-Country' | '';

  // Step 5: Platform
  platforms: string[];

  // Step 6: Features
  selectedFeatures: string[];
  customFeatures: string;
}

// (ApplicationModule type defined in Prompt 7 section below)

export interface UserRoleItem {
  roleName: string;
  description: string;
  accessLevel: string;
}

export interface WorkflowItem {
  stepNumber: number;
  title: string;
  description: string;
  iconName?: string;
}

export interface AIFeatureItem {
  id?: string;
  name?: string;
  description?: string;
  iconName?: string;
  type?: 'Analytics' | 'Forecasting' | 'Recommendations' | 'Anomaly Detection' | 'Copilot' | 'Automation' | 'Alerts';
  feature?: string;
  purpose?: string;
  expectedBenefit?: string;
  dataRequired?: string;
}

export interface ProblemAnalysisItem {
  category: string;
  problem: string;
  impact: string;
  digitalOpportunity: string;
}

export interface DevelopmentPhaseItem {
  phase: string;
  title: string;
  description: string;
  keyModules: string[];
}

export interface ApplicationAnalysis {
  businessAnalysis: {
    businessType: string;
    operationalCharacteristics: string;
    keyProcesses: string[];
    primaryChallenges: string[];
    digitalizationOpportunities: string[];
  };
  problemAnalysis: ProblemAnalysisItem[];
  recommendedSolution: {
    solutionName: string;
    solutionDescription: string;
    primaryObjective: string;
    recommendedArchitectureType: string;
  };
  recommendedModules: ApplicationModule[];
  userRoles: UserRoleItem[];
  workflows: WorkflowItem[];
  aiFeatures: AIFeatureItem[];
  integrations: string[];
  platformRecommendation: {
    recommendedPlatform: string;
    optionalPlatforms: string[];
    reasoning: string;
  };
  scalabilityRecommendation: string;
  developmentPhases: DevelopmentPhaseItem[];
  digitalReadinessScore: {
    score: number;
    label: string;
    explanation: string;
    contributingFactors: string[];
  };
  executiveSummary: {
    businessSummary: string;
    problemSummary: string;
    solutionSummary: string;
    modulesCountText: string;
    aiAdvantageText: string;
    platformText: string;
  };
  summary: string;
  timestamp?: string;
  disclaimer?: string;
}

export interface AIScopeBlueprint {
  summary: string;
  recommendedStack: {
    frontend: string;
    backend: string;
    database: string;
    aiEngine: string;
    cloud: string;
  };
  coreModules: string[];
  aiCapabilities: string[];
  estimatedTimeWeeks: string;
  recommendedPhases: {
    phase: string;
    duration: string;
    title: string;
  }[];
  budgetTier: string;
}

// PROMPT 5: AI Requirement Analyzer Types
export interface RequirementAnalyzerInput {
  businessProfile: {
    name: string;
    industry: string;
    type: string;
    description: string;
    location: string;
  };
  businessProblems: string;
  businessGoals: string;
  companyScale: {
    userScale: string;
    branchesCount: string;
    transactions: string;
    operationalLocations: string;
  };
  platform: string[];
  selectedFeatures: string[];
  applicationBlueprint: ApplicationAnalysis | null;
  priority: string[]; // e.g. ['Cost Efficiency', 'Speed', 'Scalability', 'Security', 'Automation', 'AI Capability']
  requirementDepth: 'Basic' | 'Standard' | 'Detailed' | 'Enterprise';
}

export interface BusinessRequirementItem {
  id: string; // BR-001
  name: string;
  description: string;
  businessObjective: string;
  priority: 'High' | 'Medium' | 'Low';
  businessValue: string;
  isAIRecommendation?: boolean;
  status?: 'AI Suggested' | 'User Edited' | 'Confirmed';
}

export interface BusinessObjectiveItem {
  objective: string;
  expectedOutcome: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface FunctionalRequirementItem {
  id: string; // FR-001
  module: string;
  feature: string;
  description: string;
  userRole: string;
  category: 'Authentication' | 'User Management' | 'Dashboard' | 'Master Data' | 'Transaction' | 'Workflow' | 'Approval' | 'Reporting' | 'Notification' | 'Document' | 'Integration' | 'AI' | 'Administration';
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Optional';
  status?: 'AI Suggested' | 'User Edited' | 'Confirmed';
}

export interface NonFunctionalRequirementItem {
  id: string; // NFR-001
  category: 'Performance' | 'Security' | 'Scalability' | 'Availability' | 'Reliability' | 'Usability' | 'Accessibility' | 'Maintainability' | 'Backup' | 'Auditability' | 'Data Privacy';
  requirement: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Optional';
  rationale: string;
  status?: 'AI Suggested' | 'User Edited' | 'Confirmed';
}

export interface ModuleRequirementItem {
  id: string; // MOD-001
  name: string;
  description: string;
  priority: 'Essential' | 'Recommended' | 'Optional';
  dependencies: string[];
  keyFeatures: string[];
}

export interface RoleRequirementItem {
  id: string; // ROLE-001
  roleName: string;
  description: string;
  accessLevel: string;
  modules: string[];
  permissions: string[];
}

export interface PermissionMatrixItem {
  module: string;
  superAdmin: string[];
  management: string[];
  manager: string[];
  staff: string[];
  operator: string[];
}

export interface WorkflowRequirementItem {
  id: string; // WF-001
  workflowName: string;
  trigger: string;
  steps: string[];
  actors: string[];
  approval: string;
  output: string;
}

export interface IntegrationRequirementItem {
  id: string; // INT-001
  system: string;
  purpose: string;
  dataFlow: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Optional';
  dependency: string;
}

export interface AIRequirementItem {
  id: string; // AI-001
  feature: string;
  businessPurpose: string;
  inputData: string;
  output: string;
  user: string;
  recommendedAITechnology: string;
  dependency: string;
  priority: 'Essential' | 'Recommended' | 'Optional';
}

export interface AIDataRequirementItem {
  requiredData: string;
  dataSource: string;
  dataQuality: string;
  historicalDataRequirement: string;
  updateFrequency: string;
}

export interface OpenQuestionItem {
  question: string;
  whyItMatters: string;
  impact: string;
}

export interface RiskItem {
  risk: string;
  impact: string;
  mitigationRecommendation: string;
}

export interface TraceabilityItem {
  problem: string;
  businessRequirementId: string;
  functionalRequirementId: string;
  moduleName: string;
  workflowTitle: string;
  aiCapability: string;
}

export interface RequirementAnalysis {
  projectOverview: {
    solutionName: string;
    executiveSummary: string;
    targetDomain: string;
    targetPlatforms: string[];
  };
  businessRequirements: BusinessRequirementItem[];
  businessObjectives: BusinessObjectiveItem[];
  functionalRequirements: FunctionalRequirementItem[];
  nonFunctionalRequirements: NonFunctionalRequirementItem[];
  modules: ModuleRequirementItem[];
  userRoles: RoleRequirementItem[];
  permissionMatrix: PermissionMatrixItem[];
  workflows: WorkflowRequirementItem[];
  integrations: IntegrationRequirementItem[];
  aiRequirements: AIRequirementItem[];
  dataRequirements: AIDataRequirementItem[];
  dependencies: { source: string; target: string; reason: string }[];
  assumptions: string[];
  openQuestions: OpenQuestionItem[];
  risks: RiskItem[];
  requirementCompleteness: {
    score: number;
    label: string;
    factors: string[];
  };
  qualityWarnings?: string[];
  traceabilityMap: TraceabilityItem[];
  summary: string;
  timestamp?: string;
  disclaimer?: string;
  version?: number;
}

// PROMPT 6: AI Solution Architect Types
export interface SolutionArchitectInput {
  projectOverview?: {
    solutionName: string;
    executiveSummary: string;
    targetDomain: string;
    targetPlatforms: string[];
  };
  businessRequirements?: BusinessRequirementItem[];
  functionalRequirements?: FunctionalRequirementItem[];
  nonFunctionalRequirements?: NonFunctionalRequirementItem[];
  modules?: ModuleRequirementItem[];
  userRoles?: RoleRequirementItem[];
  workflows?: WorkflowRequirementItem[];
  integrations?: IntegrationRequirementItem[];
  aiRequirements?: AIRequirementItem[];
  platform?: string[];
  applicationType?: 'Web Application' | 'SaaS' | 'Enterprise Application' | 'Internal Business System' | 'Mobile + Web' | 'PWA';
  scale?: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  priority?: string[]; // e.g. ['Performance', 'Security', 'Scalability', 'Cost Efficiency', 'AI Capability', 'Availability']
  deploymentPreference?: 'Cloud' | 'On-Premise' | 'Hybrid' | 'Not Decided';
  aiArchitecturePreference?: 'AI Optional' | 'AI Recommended' | 'AI Core';
  requirementAnalysisSource?: RequirementAnalysis | null;
}

export interface SystemComponent {
  id: string;
  name: string;
  purpose: string;
  technology: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Cache' | 'Storage' | 'AI' | 'Auth' | 'Integration' | 'Monitoring';
  dependencies: string[];
  dataFlow?: string;
  securityNote?: string;
}

export interface DatabaseEntity {
  entityName: string;
  purpose: string;
  primaryKey: string;
  attributes: string[];
  relationships: {
    targetEntity: string;
    type: '1:1' | '1:N' | 'N:M';
    description: string;
  }[];
}

export interface ApiEndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  purpose: string;
  authentication: boolean;
  role: string;
  requestBody?: string;
  responseFormat?: string;
  errorFormat?: string;
}

export interface TechnologyStackItem {
  category: string;
  technology: string;
  reason: string;
  alternative: string;
}

export interface ArchitectureDecision {
  decision: string;
  reason: string;
  benefit: string;
  tradeOff: string;
  alternative: string;
}

export type ArchitectureNodeType = 
  | 'USER' 
  | 'FRONTEND' 
  | 'API' 
  | 'AUTH' 
  | 'BACKEND' 
  | 'DATABASE' 
  | 'CACHE' 
  | 'STORAGE' 
  | 'AI' 
  | 'EXTERNAL' 
  | 'CLOUD' 
  | 'MONITORING';

export interface ArchitectureNode {
  id: string;
  type: ArchitectureNodeType;
  name: string;
  description: string;
  technology: string;
  dependencies?: string[];
  security?: string;
  dataFlow?: string;
  x?: number;
  y?: number;
}

export interface ArchitectureConnection {
  source: string;
  target: string;
  type?: string;
  description: string;
}

export interface ArchitectureDiagram {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

export interface ArchitectureTraceabilityItem {
  requirementId: string;
  moduleName: string;
  componentId: string;
  apiEndpoint: string;
  dbTable: string;
  technology: string;
}

export interface SolutionArchitecture {
  architectureOverview: {
    pattern: string; // e.g. "Modular Monolith", "Microservices", "Serverless", "Event-Driven"
    reason: string;
    advantages: string[];
    tradeOffs: string[];
    alternatives: string[];
  };
  systemComponents: SystemComponent[];
  dataFlows: {
    step: number;
    source: string;
    target: string;
    description: string;
    protocol?: string;
  }[];
  frontendArchitecture: {
    framework: string;
    language: string;
    uiFramework: string;
    stateManagement: string;
    routing: string;
    formManagement: string;
    validation: string;
    apiClient: string;
    authState: string;
    errorHandling: string;
    caching: string;
    folderStructure: string;
  };
  backendArchitecture: {
    runtime: string;
    framework: string;
    apiStyle: string;
    businessLogic: string;
    services: string[];
    repositories: string[];
    validation: string;
    authentication: string;
    authorization: string;
    queues: string;
    caching: string;
    logging: string;
    folderStructure: string;
  };
  databaseArchitecture: {
    databaseType: string;
    primaryDatabase: string;
    cache: string;
    fileStorage: string;
    searchEngine: string;
    rationale: string;
  };
  databaseEntities: DatabaseEntity[];
  apiArchitecture: {
    apiStyle: string;
    baseUrl: string;
    format: string;
    errorFormat: string;
    versioning: string;
    authentication: string;
  };
  apiEndpoints: ApiEndpointSpec[];
  authenticationArchitecture: {
    method: string;
    flowDescription: string;
    tokenStrategy: string;
    mfaSupported: boolean;
    ssoSupported: boolean;
  };
  authorizationArchitecture: {
    model: 'RBAC' | 'ABAC' | 'Hybrid';
    description: string;
    rolePermissions: {
      role: string;
      permissions: string[];
    }[];
  };
  aiArchitecture: {
    enabled: boolean;
    providerStrategy: string;
    modelOptions: string[];
    gatewayPattern: string;
    promptManagement: string;
    contextWindow: string;
    ragSupported: boolean;
    vectorDatabase: string;
    tools: string[];
    agentArchitecture?: {
      role: string;
      tools: string[];
      guardrails: string;
    };
    guardrails: string[];
  };
  cloudArchitecture: {
    provider: string;
    frontendHosting: string;
    backendHosting: string;
    databaseHosting: string;
    storageHosting: string;
    cacheHosting: string;
    monitoring: string;
    cdn: string;
    loadBalancer: string;
  };
  securityArchitecture: {
    https: boolean;
    rbac: boolean;
    rateLimiting: string;
    encryption: string;
    secretsManagement: string;
    auditLogs: boolean;
    recommendations: string[];
  };
  integrationArchitecture: {
    system: string;
    protocol: string;
    authMethod: string;
    dataDirection: string;
    frequency: string;
    failureHandling: string;
  }[];
  deploymentArchitecture: {
    environments: string[];
    ciCdPipeline: string[];
    devStrategy: string;
    stagingStrategy: string;
    prodStrategy: string;
  };
  technologyStack: TechnologyStackItem[];
  architectureDecisions: ArchitectureDecision[];
  costConsideration: {
    category: string;
    infrastructureCost: 'Low' | 'Medium' | 'High';
    databaseCost: 'Low' | 'Medium' | 'High';
    aiCost: 'Low' | 'Medium' | 'High';
    overallTier: 'Low' | 'Medium' | 'High';
    notes: string;
  };
  scalabilityPath: {
    phase: string;
    title: string;
    strategy: string;
  }[];
  architectureDiagram: ArchitectureDiagram;
  erdDiagram: {
    entities: { id: string; name: string; fields: string[] }[];
    connections: { source: string; target: string; label: string }[];
  };
  traceabilityMatrix: ArchitectureTraceabilityItem[];
  dependencies: string[];
  assumptions: string[];
  risks: { risk: string; impact: string; recommendation: string }[];
  recommendations: string[];
  summary: string;
  timestamp?: string;
  version?: number;
  disclaimer?: string;
}

// ==========================================
// PROMPT 7: AI MODULE GENERATOR TYPES
// ==========================================

export type ModulePriority = 'Must Have' | 'Essential' | 'Recommended' | 'Optional';

export type ModuleCategory =
  | 'Core'
  | 'Operations'
  | 'Management'
  | 'Finance'
  | 'HR'
  | 'Reporting'
  | 'Integration'
  | 'AI'
  | 'Administration'
  | string;

export type ModuleStatus =
  | 'AI Recommended'
  | 'User Added'
  | 'User Modified'
  | 'Confirmed'
  | 'Removed';

export type ModuleSource = 'AI' | 'User' | 'Template' | 'Requirement' | 'Architecture';

export interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  priority: ModulePriority;
}

export interface ModuleDependency {
  moduleId: string;
  dependsOnModuleId: string;
  dependsOnModuleName?: string;
  reason: string;
}

export interface ModuleAIFeature {
  id: string;
  name: string;
  description: string;
  benefit?: string;
}

export interface ModuleWorkflowStep {
  step: number;
  title: string;
  description: string;
  role: string;
}

export interface ArchitectureImpact {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  api?: string[];
  ai?: string[];
}

export interface ApplicationModule {
  id: string;
  name: string;
  category?: ModuleCategory;
  description: string;
  purpose: string;
  priority: ModulePriority;
  features?: ModuleFeature[];
  roles?: string[];
  dependencies?: ModuleDependency[];
  aiFeatures?: ModuleAIFeature[];
  integrations?: string[];
  dataRequirements?: string[];
  workflow?: ModuleWorkflowStep[];
  status?: ModuleStatus;
  source?: ModuleSource;
  order?: number;
  architectureImpact?: ArchitectureImpact;
}

export interface ModuleGeneratorInput {
  industry: string;
  customIndustryDescription?: string;
  businessType: string;
  companyScale: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  usersCount?: string;
  branchesCount?: string;
  operationalComplexity?: string;
  requirementAnalysis?: RequirementAnalysis | null;
  solutionArchitecture?: SolutionArchitecture | null;
  existingModules?: ApplicationModule[];
}

export interface ModuleOptimizationSuggestion {
  id: string;
  type: 'Add' | 'Remove' | 'Merge' | 'Split' | 'Rename' | 'Reorder';
  title: string;
  reason: string;
  benefits: string;
  tradeOffs?: string;
  targetModuleIds?: string[];
  proposedModules?: ApplicationModule[];
}

export interface ModuleOptimizationResult {
  overallAnalysis: string;
  currentModuleCount: number;
  recommendedModuleCount: number;
  suggestions: ModuleOptimizationSuggestion[];
}

export interface ModuleConfigurationResult {
  industry: string;
  businessType: string;
  companyScale: string;
  modules: ApplicationModule[];
  summary: {
    totalModules: number;
    mustHaveCount: number;
    recommendedCount: number;
    optionalCount: number;
    aiEnabledCount: number;
    userAddedCount: number;
    userModifiedCount: number;
  };
  confirmed: boolean;
  savedAt: string;
}

// ==========================================
// PROMPT 8: AI PROJECT ESTIMATOR TYPES
// ==========================================

export type ProjectComplexityLevel = 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';

export interface ComplexityFactor {
  factorName: string;
  scoreContribution: number;
  weight: number;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface ComplexityBreakdown {
  score: number;
  level: ProjectComplexityLevel;
  moduleComplexity: number;
  userComplexity: number;
  integrationComplexity: number;
  aiComplexity: number;
  realtimeComplexity: number;
  platformComplexity: number;
  dataComplexity: number;
  securityComplexity: number;
  factors: ComplexityFactor[];
}

export interface ProjectEstimationInput {
  industry: string;
  businessType: string;
  platform: 'Web' | 'Mobile' | 'Web + Mobile' | 'PWA';
  projectScale: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  projectPriority: 'Fast Delivery' | 'Balanced' | 'Maximum Quality' | 'Enterprise Grade';
  modulesCount: number;
  featuresCount: number;
  usersCount: number | string;
  branchesCount: number | string;
  userRolesCount: number;
  aiLevel: 'None' | 'Basic' | 'Intermediate' | 'Advanced' | 'Enterprise';
  apiIntegrationsCount: number;
  realtimeLevel: 'None' | 'Basic' | 'Advanced';
  databaseComplexity: 'Basic' | 'Medium' | 'Advanced' | 'Enterprise';
  authentication: string;
  securityLevel: 'Standard' | 'Enhanced' | 'Enterprise / ISO';
  cloudDeployment: string;
  modules?: ApplicationModule[];
  requirementAnalysis?: RequirementAnalysis | null;
  solutionArchitecture?: SolutionArchitecture | null;
}

export interface EstimationPricingConfig {
  currency: string;
  baseProjectCost: number;
  costPerModule: number;
  costPerFeature: number;
  aiWeightMultiplier: Record<string, number>;
  apiWeightPerIntegration: number;
  realtimeMultiplier: Record<string, number>;
  platformMultiplier: Record<string, number>;
  priorityMultiplier: Record<string, number>;
  ratePerPersonDay: number;
}

export interface TimelinePhase {
  id: string;
  name: string;
  description: string;
  durationWeeksMin: number;
  durationWeeksMax: number;
  personDays: number;
  isParallel: boolean;
  dependencies: string[];
}

export interface CostCategoryBreakdown {
  category: 'Development' | 'AI Integration' | 'API & Integration' | 'Database & Backend' | 'Mobile App' | 'Cloud & DevOps' | 'QA & Testing' | 'Security & Compliance';
  percentage: number;
  estimatedMinAmount: number;
  estimatedMaxAmount: number;
  description: string;
}

export interface TeamMemberRole {
  role: 'Project Manager' | 'UI/UX Designer' | 'Frontend Engineer' | 'Backend Engineer' | 'Mobile Developer' | 'AI Engineer' | 'QA Engineer' | 'DevOps Engineer';
  count: number;
  effortPersonDays: number;
  allocationPercentage: number;
}

export interface EstimationScenario {
  id: 'lean' | 'balanced' | 'enterprise';
  title: string;
  subtitle: string;
  description: string;
  complexityLevel: ProjectComplexityLevel;
  complexityScore: number;
  modulesIncludedCount: number;
  timelineMonthsMin: number;
  timelineMonthsMax: number;
  investmentMinIDR: number;
  investmentMaxIDR: number;
  tradeOffs: string[];
  recommendedFor: string;
}

export interface MVPRequirement {
  modulesIncluded: string[];
  featuresCount: number;
  timelineMonthsMin: number;
  timelineMonthsMax: number;
  investmentMinIDR: number;
  investmentMaxIDR: number;
  deferredCapabilities: string[];
}

export interface PhaseDevelopmentPlan {
  phaseNumber: number;
  phaseTitle: string;
  objective: string;
  includedModules: string[];
  timelineWeeks: number;
  investmentMinIDR: number;
  investmentMaxIDR: number;
}

export interface ModuleEstimationDetail {
  moduleId: string;
  moduleName: string;
  featuresCount: number;
  complexity: 'Low' | 'Medium' | 'High' | 'Very High';
  personDaysEffort: number;
  estimatedMinIDR: number;
  estimatedMaxIDR: number;
  timelineContributionWeeks: number;
}

export interface EstimationTraceabilityItem {
  requirementCode: string;
  requirementTitle: string;
  moduleName: string;
  featureName: string;
  complexity: string;
  personDaysEffort: number;
  investmentContributionIDR: number;
}

export interface EstimationHistoryVersion {
  versionId: string;
  versionName: string;
  timestamp: string;
  inputSummary: {
    platform: string;
    scale: string;
    modulesCount: number;
    aiLevel: string;
  };
  complexityScore: number;
  timelineMonthsRange: string;
  investmentRangeIDR: string;
  estimateData: ProjectEstimate;
}

export interface ProjectEstimate {
  id: string;
  projectId?: string;
  projectTitle: string;
  industry: string;
  complexity: ComplexityBreakdown;
  scope: {
    modulesCount: number;
    featuresCount: number;
    usersCount: number | string;
    branchesCount: number | string;
    userRolesCount: number;
    apiIntegrationsCount: number;
    aiFeaturesCount: number;
  };
  timeline: {
    minMonths: number;
    maxMonths: number;
    totalPersonDaysMin: number;
    totalPersonDaysMax: number;
    phases: TimelinePhase[];
  };
  investment: {
    minIDR: number;
    maxIDR: number;
    currency: string;
    tier: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  };
  costBreakdown: CostCategoryBreakdown[];
  scenarios: EstimationScenario[];
  mvpEstimate: MVPRequirement;
  phasedPlan: PhaseDevelopmentPlan[];
  teamRecommendation: {
    team: TeamMemberRole[];
    recommendedCapacity: string;
    alternativeCapacity: string;
  };
  moduleEstimations: ModuleEstimationDetail[];
  traceability: EstimationTraceabilityItem[];
  assumptions: string[];
  exclusions: string[];
  risks: { risk: string; level: 'High' | 'Medium' | 'Low'; mitigation: string }[];
  openQuestions: string[];
  costDrivers: string[];
  costSavers: string[];
  timelineDrivers: string[];
  recommendations: { type: 'reduce_cost' | 'improve_capability'; title: string; description: string; tradeOff: string }[];
  confidence: {
    level: 'Low' | 'Medium' | 'High';
    scorePercentage: number;
    reason: string;
  };
  disclaimer: string;
  generatedAt: string;
  version: string;
}

// ==========================================
// PROMPT 9: LEAD GENERATION SYSTEM TYPES
// ==========================================

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Consultation Scheduled'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'On Hold';

export type LeadPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type LeadSource =
  | 'Website Contact Form'
  | 'AI Application Builder'
  | 'AI Requirement Analyzer'
  | 'AI Solution Architect'
  | 'AI Project Estimator'
  | 'Homepage CTA'
  | 'Service Page'
  | 'Industry Page'
  | 'Portfolio'
  | 'WhatsApp'
  | 'Direct Consultation'
  | 'Referral'
  | 'Other';

export interface LeadActivity {
  id: string;
  leadId: string;
  type:
    | 'lead_created'
    | 'ai_builder_completed'
    | 'requirements_generated'
    | 'architecture_generated'
    | 'estimate_generated'
    | 'contact_form_submitted'
    | 'consultation_requested'
    | 'application_requested'
    | 'whatsapp_clicked'
    | 'status_changed'
    | 'assigned'
    | 'note_added'
    | 'proposal_sent';
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
  metadata?: Record<string, any>;
}

export interface LeadNote {
  id: string;
  leadId: string;
  author: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

export interface LeadConsent {
  contactConsent: boolean;
  marketingConsent: boolean;
  consentTimestamp: string;
  ipAddress?: string;
}

export interface LeadAssignment {
  assignedTo: string;
  role: string;
  assignedAt: string;
  assignedBy?: string;
}

export interface LeadScoreFactor {
  factorName: string;
  scoreContribution: number;
  maxScore: number;
  reason: string;
}

export interface LeadScore {
  totalScore: number;
  level: 'Cold' | 'Warm' | 'Hot';
  factors: LeadScoreFactor[];
  explanation: string;
}

export interface Lead {
  id: string;
  referenceCode: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  industry: string;
  companySize: string;
  service: string;
  projectType?: string;
  message?: string;
  source: LeadSource;
  campaign?: string;
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  status: LeadStatus;
  priority: LeadPriority;
  score: LeadScore;
  assignedTo?: string;
  assignedRole?: string;
  estimateId?: string;
  estimateSummary?: {
    title: string;
    complexity: string;
    timeline: string;
    investment: string;
  };
  requirementId?: string;
  architectureId?: string;
  moduleConfigurationId?: string;
  applicationDetails?: {
    businessProblem?: string;
    mainGoals?: string;
    expectedUsers?: string;
    branchesCount?: string;
    targetPlatform?: string;
    requiredFeatures?: string[];
    aiRequirements?: string;
    integrationRequirements?: string;
    additionalNotes?: string;
    budgetRange?: string;
  };
  consultationDetails?: {
    preferredContactMethod?: string;
    preferredContactTime?: string;
    projectDescription?: string;
  };
  activities: LeadActivity[];
  notes: LeadNote[];
  consent: LeadConsent;
  possibleDuplicateOf?: string;
  lostReason?: string;
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
}

export interface LeadFilterOptions {
  status?: string;
  source?: string;
  industry?: string;
  priority?: string;
  searchQuery?: string;
  dateRange?: 'all' | 'today' | 'week' | 'month';
}

export interface WhatsAppConfig {
  whatsappNumber: string;
  businessName: string;
  defaultMessage: string;
}

// ==========================================
// PROMPT 10: SMART CRM TYPES
// ==========================================

export type OpportunityStage =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST';

export type CRMRole =
  | 'Super Admin'
  | 'Admin'
  | 'Sales'
  | 'Technical Consultant'
  | 'Project Manager';

export type NoteType =
  | 'General'
  | 'Sales'
  | 'Technical'
  | 'Meeting'
  | 'Follow-up'
  | 'Proposal'
  | 'Negotiation';

export type ActivityType =
  | 'Call'
  | 'WhatsApp'
  | 'Email'
  | 'Meeting'
  | 'Demo'
  | 'Consultation'
  | 'Proposal'
  | 'Follow-up'
  | 'Note'
  | 'Status Change';

export type FollowUpStatus = 'Pending' | 'Completed' | 'Overdue' | 'Cancelled';

export type LostReasonOption =
  | 'Budget'
  | 'Timeline'
  | 'Competitor'
  | 'No Response'
  | 'Requirements Changed'
  | 'Project Cancelled'
  | 'Not Ready'
  | 'Other';

export interface CRMNote {
  id: string;
  entityType: 'lead' | 'company' | 'contact' | 'opportunity';
  entityId: string;
  type: NoteType;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CRMActivity {
  id: string;
  type: ActivityType;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration?: string;
  contactId?: string;
  contactName?: string;
  companyId?: string;
  companyName?: string;
  leadId?: string;
  opportunityId?: string;
  assignedTo: string;
  actor?: string;
  timestamp: string;
}

export interface CRMFollowUp {
  id: string;
  leadId?: string;
  opportunityId?: string;
  companyId?: string;
  contactId?: string;
  leadName?: string;
  companyName?: string;
  contactName?: string;
  task: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  priority: LeadPriority;
  assignedTo: string;
  status: FollowUpStatus;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface CRMCompany {
  id: string;
  companyName: string;
  industry: string;
  website?: string;
  companySize: string;
  numberOfEmployees?: string;
  branches?: string;
  address?: string;
  city?: string;
  country?: string;
  description?: string;
  source?: string;
  status: 'Active' | 'Prospect' | 'Inactive';
  assignedOwner: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  deletedBy?: string;
}

export interface CRMContact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  whatsapp?: string;
  companyId?: string;
  companyName?: string;
  role: 'Decision Maker' | 'Technical Evaluator' | 'Procurement' | 'Sponsor' | 'User' | 'Other';
  preferredContactMethod: 'Email' | 'WhatsApp' | 'Phone' | 'Meeting';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  deletedBy?: string;
}

export interface Opportunity {
  id: string;
  leadId?: string;
  companyId?: string;
  contactId?: string;
  companyName: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  name: string; // Project/Opportunity name
  description: string;
  industry: string;
  stage: OpportunityStage;
  estimatedValueMin: number;
  estimatedValueMax: number;
  currency: string;
  probability: number; // e.g., 10, 20, 40, 60, 80, 100, 0
  weightedValue: number;
  leadScore: number;
  priority: LeadPriority;
  owner: string;
  technicalConsultant?: string;
  projectManager?: string;
  source: LeadSource | string;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  nextFollowUpDate?: string;
  wonAt?: string;
  finalDealValue?: number;
  winningReason?: string;
  projectReference?: string;
  lostAt?: string;
  lostReason?: LostReasonOption;
  lostNotes?: string;
  tags?: string[];
  proposalId?: string;
  proposalStatus?: 'Draft' | 'Sent' | 'Approved' | 'Rejected';
  proposalDate?: string;
  deletedAt?: string;
  deletedBy?: string;
}

export interface CRMAuditLog {
  id: string;
  user: string;
  action: 'Create' | 'Update' | 'Delete' | 'Status Change' | 'Assignment' | 'Note' | 'Follow-up' | 'Won' | 'Lost';
  entity: 'Lead' | 'Company' | 'Contact' | 'Opportunity' | 'Activity' | 'FollowUp';
  entityId: string;
  timestamp: string;
  details?: string;
}

export interface CRMStageMetric {
  stage: OpportunityStage;
  label: string;
  count: number;
  totalValue: number;
  weightedValue: number;
}

export interface PipelineSummaryMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  openOpportunities: number;
  proposalSent: number;
  negotiation: number;
  won: number;
  lost: number;
  totalPipelineValue: number;
  weightedPipelineValue: number;
  conversionRate: number; // Percentage
  avgDealValue: number;
  avgSalesCycleDays: number;
}

// ==========================================
// PROMPT 11: AI SALES ASSISTANT TYPES
// ==========================================

export type AISalesScoreLevel = 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
export type AISalesPriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type AISalesConfidenceLevel = 'Low' | 'Medium' | 'High';

export type AISalesNextActionType =
  | 'Contact Lead'
  | 'Send WhatsApp'
  | 'Schedule Meeting'
  | 'Schedule Demo'
  | 'Request More Information'
  | 'Technical Consultation'
  | 'Generate Proposal'
  | 'Follow Up'
  | 'Wait';

export interface AISalesScoreFactor {
  category: string;
  points: number;
  reason: string;
}

export interface AISalesScoreResult {
  score: number;
  level: AISalesScoreLevel;
  factors: AISalesScoreFactor[];
  confidence: AISalesConfidenceLevel;
  explanation: string;
}

export interface AISalesPriority {
  level: AISalesPriorityLevel;
  reason: string;
}

export interface AISalesRecommendedSolution {
  name: string;
  description: string;
  recommendedPlatform: string;
  coreModules: string[];
  aiCapabilities: string[];
  integrationRequirements: string[];
  recommendedArchitecture: string;
  confidence: AISalesConfidenceLevel;
}

export interface AISalesNextAction {
  action: AISalesNextActionType;
  timing: string;
  channel: string;
  reason: string;
}

export interface AISalesFollowUpMessageVariants {
  professional: string;
  friendly: string;
  executive: string;
  technical: string;
  shortWhatsapp: string;
}

export interface AISalesObjectionItem {
  objection: string;
  suggestedResponse: string;
}

export interface AISalesBusinessProblemItem {
  problem: string;
  impact: string;
  desiredOutcome: string;
}

export interface AISalesMeetingBrief {
  objective: string;
  customerSummary: string;
  businessProblem: string;
  requirements: string[];
  modules: string[];
  architecture: string;
  estimate: string;
  openQuestions: string[];
  talkingPoints: string[];
  potentialObjections: AISalesObjectionItem[];
  recommendedNextStep: string;
}

export interface AISalesScoreHistoryItem {
  date: string;
  score: number;
  priority: string;
  reason: string;
}

export interface AISalesAnalysisResult {
  id: string;
  leadId: string;
  companyName: string;
  contactName: string;
  industry: string;
  timestamp: string;
  leadScore: AISalesScoreResult;
  priority: AISalesPriority;
  recommendedSolution: AISalesRecommendedSolution;
  nextAction: AISalesNextAction;
  summary: string;
  executiveSummary: string;
  businessProblem: AISalesBusinessProblemItem[];
  requirementCompleteness: {
    score: number;
    status: 'Good' | 'Incomplete';
  };
  missingInformation: string[];
  discoveryQuestions: string[];
  salesInsights: string[];
  proposalReadiness: {
    isReady: boolean;
    reason: string;
    criteria: {
      requirementsDefined: boolean;
      modulesDefined: boolean;
      architectureAvailable: boolean;
      estimateAvailable: boolean;
      customerIntentSufficient: boolean;
    };
  };
  consultationReadiness: {
    isReady: boolean;
    reason: string;
  };
  demoReadiness: {
    isReady: boolean;
    reason: string;
  };
  recommendedServicePackage: string;
  talkingPoints: string[];
  potentialObjections: AISalesObjectionItem[];
  expansionOpportunities: {
    name: string;
    description: string;
  }[];
  risks: string[];
  scoreHistory: AISalesScoreHistoryItem[];
  resultVersion: number;
}

export interface AISalesAuditLog {
  id: string;
  leadId: string;
  userId: string;
  analysisId: string;
  timestamp: string;
  modelRef?: string;
  resultVersion: number;
}

export interface AISalesRecommendationFeedback {
  id: string;
  analysisId: string;
  helpful: boolean;
  reason?: string;
  timestamp: string;
}

// ==========================================
// PROMPT 12: AI PROPOSAL GENERATOR TYPES
// ==========================================

export type ProposalStatus =
  | 'DRAFT'
  | 'IN REVIEW'
  | 'APPROVED'
  | 'SENT'
  | 'VIEWED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

export type ProposalInvestmentMode = 'Estimated' | 'Fixed' | 'Custom';

export interface ProposalFeature {
  name: string;
  description: string;
  businessValue?: string;
}

export interface ProposalModule {
  name: string;
  category: 'Core Management' | 'Operations' | 'Analytics' | 'AI' | 'Finance' | 'HR' | 'Integration' | string;
  description: string;
  keyFeatures: string[];
  businessValue?: string;
}

export interface ProposalPaymentTerm {
  milestone: string;
  percentage: number;
  description: string;
}

export interface ProposalSupportPackage {
  name: string; // 'Basic' | 'Standard' | 'Premium' | 'Custom'
  periodDays: number;
  responseTime: string;
  supportChannel: string;
  maintenanceScope: string;
  updateScope: string;
}

export interface ProposalVersionItem {
  version: string; // "v1", "v2"
  status: ProposalStatus;
  author: string;
  date: string;
  summaryOfChanges?: string;
}

export interface ProposalChangeLog {
  id: string;
  section: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  date: string;
}

export interface Proposal {
  id: string;
  proposalNumber: string; // e.g. "SAI-PROP-2026-0001"
  publicToken: string; // secure random public view token
  version: string; // "v1"
  status: ProposalStatus;
  leadId?: string;
  opportunityId?: string;
  companyName: string;
  contactName: string;
  contactPosition?: string;
  contactEmail?: string;
  contactPhone?: string;
  companyAddress?: string;
  companyWebsite?: string;
  title: string;
  executiveSummary: string;
  customerProblem: {
    currentSituation: string;
    keyChallenges: string[];
    businessImpact: string;
  };
  projectObjectives: string[];
  proposedSolution: {
    overview: string;
    coreCapabilities: string[];
    architectureApproach: string;
    aiCapabilities: string[];
    integrationApproach: string;
  };
  features: ProposalFeature[];
  modules: ProposalModule[];
  scope: {
    included: string[];
    excluded: { text: string; isSuggested?: boolean }[];
  };
  technologyStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    api: string[];
    ai: string[];
    cloud: string[];
    monitoring: string[];
  };
  architectureDiagramUrl?: string;
  architectureSummary?: string;
  aiCapabilities: string[];
  integrations: { name: string; status: 'Proposed Integration' | 'Confirmed' | 'To Be Confirmed' }[];
  platforms: string[]; // Web, Mobile, Android, iOS, PWA
  estimatedUsers?: string;
  estimatedBranches?: string;
  securityFeatures: string[];
  developmentMethodology: { step: string; description: string }[];
  timeline: {
    totalMonths: string;
    breakdown: { phase: string; duration: string; details: string }[];
    disclaimer: string;
  };
  investment: {
    mode: ProposalInvestmentMode;
    rangeMin: number;
    rangeMax: number;
    fixedPrice?: number;
    breakdown?: { category: string; cost: number }[];
  };
  support: ProposalSupportPackage;
  paymentTerms: ProposalPaymentTerm[];
  warranty: string;
  assumptions: string[];
  termsAndConditions: { title: string; content: string }[];
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  sentAt?: string;
  firstViewedAt?: string;
  lastViewedAt?: string;
  viewCount: number;
  acceptedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  revisionRequest?: string;
  versions: ProposalVersionItem[];
  changeLogs: ProposalChangeLog[];
}

// ==========================================
// SMART QUOTATION SYSTEM TYPES (PROMPT 13)
// ==========================================

export type QuotationStatus =
  | 'DRAFT'
  | 'IN REVIEW'
  | 'APPROVED'
  | 'SENT'
  | 'VIEWED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'REVISION REQUIRED';

export type QuotationItemCategory =
  | 'Package'
  | 'Module'
  | 'Feature'
  | 'Customization'
  | 'Development'
  | 'AI'
  | 'Integration'
  | 'Mobile'
  | 'Cloud'
  | 'Maintenance'
  | 'Other';

export type PricingType =
  | 'Fixed Price'
  | 'Per Module'
  | 'Per User'
  | 'Per Branch'
  | 'Per Device'
  | 'Per Month'
  | 'Subscription'
  | 'Custom';

export type DiscountType = 'Percentage' | 'Fixed';

export interface QuotationItem {
  id: string;
  quotationId: string;
  category: QuotationItemCategory;
  name: string;
  description: string;
  pricingType: PricingType;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  subtotal: number;
  total: number;
  recurringFrequency?: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual';
  sortOrder: number;
}

export interface QuotationPackage {
  id: string;
  name: string; // 'MVP' | 'Standard' | 'Professional' | 'Enterprise' | 'Custom'
  description: string;
  basePrice: number;
  monthlyPrice?: number;
  pricingModel?: 'One-time' | 'Monthly' | 'Hybrid';
  modules: string[];
  features: string[];
  users: string;
  platform: string;
  support: string;
  warranty: string;
  timeline: string;
  active: boolean;
}

export interface IndustrySectorConfig {
  id: string;
  name: string;
  category: string;
  iconName: string;
  tagline: string;
  complexityLevel: 'Standard' | 'Medium-High' | 'High-Compliance' | 'Mission-Critical';
  priceMultiplier: number;
  packagePrices: {
    MVP: number;
    Standard: number;
    Professional: number;
    Enterprise: number;
  };
  monthlyPackagePrices?: {
    MVP: number;
    Standard: number;
    Professional: number;
    Enterprise: number;
  };
  packageDescriptions?: {
    MVP?: string;
    Standard?: string;
    Professional?: string;
    Enterprise?: string;
  };
  monthlyPackageDescriptions?: {
    MVP?: string;
    Standard?: string;
    Professional?: string;
    Enterprise?: string;
  };
  packageModules: {
    MVP: string[];
    Standard: string[];
    Professional: string[];
    Enterprise: string[];
  };
  complianceStandards?: string[];
  recommendedCatalogCategories?: string[];
}

export interface PaymentMilestone {
  id: string;
  name?: string;
  milestoneName: string;
  percentage: number;
  amount: number;
  dueCondition: string;
}

export interface QuotationApproval {
  id: string;
  quotationId: string;
  approverId: string;
  approverName: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED';
  comment: string;
  createdAt: string;
}

export interface QuotationAIReview {
  id: string;
  quotationId: string;
  score: number;
  status: 'READY FOR REVIEW' | 'NEEDS ATTENTION';
  issues: { category: string; description: string; severity: 'high' | 'medium' | 'low' }[];
  recommendations: string[];
  createdAt: string;
}

export interface QuotationVersionItem {
  version: string;
  status: QuotationStatus;
  author: string;
  date: string;
  summaryOfChanges?: string;
}

export interface QuotationAuditLog {
  id: string;
  quotationId: string;
  action: string;
  changedBy: string;
  details: string;
  timestamp: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. "SAI-QTN-2026-0001"
  version: string; // "v1"
  secureToken: string;
  status: QuotationStatus;
  leadId?: string;
  companyId?: string;
  contactId?: string;
  projectId?: string;
  proposalId?: string;
  proposalNumber?: string;
  
  // Customer Info
  companyName: string;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  companyAddress: string;
  
  // Project Info
  projectName: string;
  industry: string;
  platform: string;
  usersCount: string;
  branchesCount: string;
  projectType: string;
  
  // Package & Currency
  packageName: string;
  pricingModel?: 'One-time' | 'Monthly' | 'Hybrid';
  currency: string;
  exchangeRate: number;
  
  // Commercial Financial Totals
  subtotal: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  discountReason: string;
  taxName: string;
  taxRate: number;
  taxIncluded: boolean;
  taxAmount: number;
  taxableAmount: number;
  grandTotal: number;
  
  // Recurring Totals
  recurringMonthly: number;
  recurringAnnual: number;
  
  // Items
  items: QuotationItem[];
  
  // Payment Terms
  paymentTermsType: 'Full Payment' | 'Milestone' | 'Monthly' | 'Quarterly' | 'Custom';
  paymentMilestones: PaymentMilestone[];
  validityDays: number;
  quotationDate: string;
  validUntil: string;
  
  // Notes & Clauses
  commercialNotes: string;
  technicalNotes: string;
  customerNotes: string;
  assumptions: string[];
  exclusions: string[];
  termsAndConditions: {
    paymentTerms: string;
    scope: string;
    changeRequest: string;
    timeline: string;
    customerResponsibilities: string;
    thirdPartyCosts: string;
    warranty: string;
    maintenance: string;
    cancellation: string;
    confidentiality: string;
    intellectualProperty: string;
    acceptance: string;
  };
  
  // Workflow & Metadata
  createdBy: string;
  approvedBy?: string;
  approvalHistory: QuotationApproval[];
  aiReview?: QuotationAIReview;
  auditLogs: QuotationAuditLog[];
  versionHistory: QuotationVersionItem[];
  viewCount: number;
  firstViewedAt?: string;
  lastViewedAt?: string;
  customerResponse?: {
    status: 'ACCEPTED' | 'REVISION_REQUESTED';
    comment: string;
    timestamp: string;
    signerName?: string;
    signerPosition?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PriceCatalogItem {
  id: string;
  category: QuotationItemCategory;
  name: string;
  description: string;
  defaultPrice: number;
  pricingModel: PricingType;
  currency: string;
  active: boolean;
  updatedBy: string;
  updatedAt: string;
  priceHistory: { oldPrice: number; newPrice: number; changedBy: string; reason: string; date: string }[];
}

// ==================================================
// PROMPT 15: CUSTOMER ACCOUNT & CUSTOMER PORTAL TYPES
// ==================================================

export type CustomerRole =
  | 'CUSTOMER_ADMIN'
  | 'CUSTOMER_FINANCE'
  | 'CUSTOMER_PROJECT_MANAGER'
  | 'CUSTOMER_USER';

export interface CustomerAccount {
  id: string;
  companyId: string;
  userId: string;
  role: CustomerRole;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED' | 'DEACTIVATED';
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerCompany {
  id: string;
  name: string;
  legalName: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  taxInformation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerUser {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  role: CustomerRole;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED' | 'DEACTIVATED';
  avatar?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus =
  | 'PLANNING'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'UAT'
  | 'DEPLOYMENT'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ProjectModuleItem {
  id: string;
  name: string;
  progress: number;
  status: 'Pending' | 'In Progress' | 'Testing' | 'Completed';
}

export interface ProjectMilestoneItem {
  id: string;
  name: string;
  dueDate: string;
  progress: number;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  description: string;
}

export interface ProjectUpdateItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface CustomerProject {
  id: string;
  companyId: string;
  projectName: string;
  description: string;
  status: ProjectStatus;
  progressPercentage: number;
  startDate: string;
  expectedCompletion: string;
  projectManager: string;
  industry: string;
  techStack: string[];
  modules: ProjectModuleItem[];
  milestones: ProjectMilestoneItem[];
  updates: ProjectUpdateItem[];
  financialSummary: {
    contractValue: number;
    invoiced: number;
    paid: number;
    outstanding: number;
    overdue: number;
  };
}

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CUSTOMER'
  | 'WAITING_FOR_INTERNAL'
  | 'TESTING'
  | 'RESOLVED'
  | 'CLOSED'
  | 'REOPENED'
  | 'WAITING_CUSTOMER';

export type TicketCategory =
  | 'BUG_REPORT'
  | 'TECHNICAL_SUPPORT'
  | 'FEATURE_REQUEST'
  | 'ACCOUNT_ISSUE'
  | 'BILLING_ISSUE'
  | 'Technical Support'
  | 'Bug'
  | 'Feature Request'
  | 'Billing'
  | 'Account'
  | 'General'
  | (string & {});

export type TicketMessageType = 'CUSTOMER_REPLY' | 'SUPPORT_REPLY' | 'INTERNAL_NOTE' | 'SYSTEM_EVENT';
export type TicketMessageVisibility = 'CUSTOMER_VISIBLE' | 'INTERNAL';
export type SLAStatus = 'ON_TIME' | 'AT_RISK' | 'BREACHED';

export interface TicketAttachment {
  id?: string;
  ticketId?: string;
  messageId?: string;
  name: string;
  fileName?: string;
  url: string;
  storageReference?: string;
  size?: string;
  fileSize?: string;
  fileType?: string;
  uploadedBy?: string;
  uploadedByName?: string;
  isScanned?: boolean;
  scanStatus?: 'CLEAN' | 'PENDING' | 'INFECTED';
  createdAt?: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  senderType: 'CUSTOMER' | 'SUPPORT' | 'SYSTEM';
  message: string;
  messageType?: TicketMessageType;
  visibility?: TicketMessageVisibility;
  attachments?: TicketAttachment[];
  createdAt: string;
}

export interface TicketStatusHistory {
  id: string;
  ticketId: string;
  oldStatus: TicketStatus;
  newStatus: TicketStatus;
  changedBy: string;
  changedByName: string;
  reason?: string;
  createdAt: string;
}

export interface TicketResolution {
  id: string;
  ticketId: string;
  summary: string;
  rootCause?: string;
  fixVersion?: string;
  testResult?: string;
  tester?: string;
  testDate?: string;
  testNotes?: string;
  resolvedBy: string;
  resolvedByName: string;
  resolvedAt: string;
}

export interface TicketSatisfaction {
  id: string;
  ticketId: string;
  companyId: string;
  companyName?: string;
  rating: number; // 1 to 5
  feedback?: string;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  createdAt: string;
}

export interface TicketTimelineEvent {
  id?: string;
  date: string;
  title: string;
  description: string;
  author?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g. "SAI-TKT-2026-000001"
  companyId: string;
  companyName?: string;
  customerUserId?: string;
  customerUserName?: string;
  projectId?: string;
  projectName?: string;
  moduleId?: string;
  moduleName?: string;
  releaseVersion?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  
  assignedTo?: string; // Legacy / Display
  assigneeId?: string;
  assigneeName?: string;
  assigneeRole?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  
  slaPolicyId?: string;
  slaStatus?: SLAStatus;
  responseDueAt?: string;
  resolutionDueAt?: string;
  firstRespondedAt?: string;
  
  // Category Specific Data Structures
  categorySpecificData?: {
    // Bug Report
    affectedModule?: string;
    stepsToReproduce?: string;
    expectedResult?: string;
    actualResult?: string;
    browser?: string;
    device?: string;
    operatingSystem?: string;
    // Technical Support
    problemDescription?: string;
    environment?: string;
    errorMessage?: string;
    // Feature Request
    featureName?: string;
    businessNeed?: string;
    expectedBenefit?: string;
    // Account Issue
    issueType?: string;
    affectedUser?: string;
    accountEmail?: string;
    // Billing Issue
    invoiceNumber?: string;
    paymentReference?: string;
    issueDescription?: string;
    [key: string]: any;
  };
  
  // Ticket Relations & Links
  parentTicketId?: string;
  duplicateOfId?: string;
  relatedTicketIds?: string[];
  relatedDocIds?: string[];
  tags?: string[];
  internalTags?: string[];
  
  // Sub-collections
  messages: TicketMessage[];
  attachments?: TicketAttachment[];
  statusHistory?: TicketStatusHistory[];
  resolution?: TicketResolution;
  satisfaction?: TicketSatisfaction;
  timeline?: TicketTimelineEvent[];
  
  // AI Assistance Insights
  aiAnalysis?: {
    suggestedCategory?: TicketCategory;
    suggestedPriority?: TicketPriority;
    suggestedModule?: string;
    suggestedAssigneeId?: string;
    summary?: string;
    possibleRootCauses?: string[];
    troubleshootingSteps?: string[];
    similarTicketIds?: string[];
    featureAnalysis?: {
      businessValue?: string;
      complexity?: 'LOW' | 'MEDIUM' | 'HIGH';
      potentialImpact?: string;
      suggestedModule?: string;
      recommendedPriority?: TicketPriority;
    };
  };
}

export interface CustomerNotification {
  id: string;
  companyId: string;
  userId: string;
  type: 'PROJECT_UPDATE' | 'PROPOSAL' | 'QUOTATION' | 'INVOICE' | 'PAYMENT' | 'TICKET' | 'SYSTEM';
  title: string;
  message: string;
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}

export interface CustomerActivity {
  id: string;
  companyId: string;
  userId: string;
  userName?: string;
  type: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface CustomerDocument {
  id: string;
  companyId: string;
  projectId?: string;
  type: 'ALL' | 'PROPOSAL' | 'QUOTATION' | 'INVOICE' | 'RECEIPT' | 'PROJECT' | 'OTHER';
  name: string;
  storageReference: string;
  accessLevel: string;
  fileSize?: string;
  createdAt: string;
  downloadCount?: number;
}

export interface CustomerInvitation {
  id: string;
  companyId: string;
  email: string;
  role: CustomerRole;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED';
  token: string;
  invitedBy: string;
  createdAt: string;
  expiresAt: string;
}

// ==================================================
// PROMPT 16: PROJECT MANAGEMENT & TRACKING TYPES
// ==================================================

export type FullProjectStatus =
  | 'PLANNING'
  | 'REQUIREMENT'
  | 'DESIGN'
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'UAT'
  | 'DEPLOYMENT'
  | 'MAINTENANCE'
  | 'COMPLETED'
  | 'ON_HOLD'
  | 'CANCELLED';

export type ProjectHealthStatus =
  | 'ON_TRACK'
  | 'AT_RISK'
  | 'DELAYED'
  | 'BLOCKED'
  | 'COMPLETED';

export type ProjectPhaseName =
  | 'Requirement'
  | 'UI/UX'
  | 'Development'
  | 'Testing'
  | 'Deployment';

export type ProjectPhaseStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELAYED'
  | 'BLOCKED';

export interface ProjectPhaseDetails {
  id: string;
  projectId: string;
  name: ProjectPhaseName;
  status: ProjectPhaseStatus;
  progress: number; // 0-100
  weight: number; // percentage weight, e.g., 10, 15, 45, 20, 10
  startDate: string;
  dueDate: string;
  completedDate?: string;
  sortOrder: number;
  subItems?: {
    name: string;
    completed: boolean;
    category?: string;
  }[];
}

export type MilestoneStatus =
  | 'UPCOMING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELAYED'
  | 'BLOCKED';

export interface FullProjectMilestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: MilestoneStatus;
  progress: number; // 0-100%
  weight: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  sortOrder: number;
  ownerId?: string;
  ownerName?: string;
}

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'BLOCKED'
  | 'DONE'
  | 'CANCELLED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TaskVisibility = 'INTERNAL' | 'CUSTOMER_VISIBLE';

export type TaskAssigneeRole =
  | 'Project Manager'
  | 'Developer'
  | 'Designer'
  | 'QA'
  | 'DevOps'
  | 'Other Team Member';

export interface ProjectTask {
  id: string;
  projectId: string;
  milestoneId?: string;
  phaseName?: ProjectPhaseName;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // 0-100: TODO=0, DONE=100, IN_PROGRESS=1-99
  assigneeId?: string;
  assigneeName?: string;
  assigneeRole?: TaskAssigneeRole;
  dueDate: string;
  weight: number;
  visibility: TaskVisibility;
  dependsOnTaskId?: string; // Dependency: if parent task not DONE, task is BLOCKED
  labels?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ActivityVisibility = 'INTERNAL' | 'CUSTOMER_VISIBLE';

export interface ProjectActivityLog {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userRole?: string;
  activityType:
    | 'PROJECT_CREATED'
    | 'STATUS_CHANGED'
    | 'PHASE_UPDATED'
    | 'MILESTONE_UPDATED'
    | 'TASK_CREATED'
    | 'TASK_UPDATED'
    | 'TASK_COMPLETED'
    | 'DOCUMENT_UPLOADED'
    | 'MEETING_SCHEDULED'
    | 'UPDATE_POSTED'
    | 'UAT_SUBMITTED'
    | 'UAT_APPROVED'
    | 'RELEASE_PUBLISHED'
    | 'RISK_FLAGGED';
  title: string;
  description: string;
  visibility: ActivityVisibility;
  entityType?: string;
  entityId?: string;
  createdAt: string;
}

export type TimelineEventType =
  | 'PHASE'
  | 'MILESTONE'
  | 'TASK'
  | 'MEETING'
  | 'UPDATE'
  | 'DOCUMENT'
  | 'RELEASE';

export interface ProjectTimelineEvent {
  id: string;
  projectId: string;
  date: string;
  title: string;
  description: string;
  type: TimelineEventType;
  status?: string;
  createdBy: string;
  createdAt: string;
}

export type ProjectDocumentType =
  | 'Requirement Document'
  | 'UI/UX Preview'
  | 'Proposal'
  | 'Quotation'
  | 'Specification'
  | 'User Manual'
  | 'Release Notes'
  | 'Other Project Documents';

export interface FullProjectDocument {
  id: string;
  projectId: string;
  name: string;
  type: ProjectDocumentType;
  version: string; // e.g. "v1.0", "v1.1"
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
  storageReference: string;
  uploadedBy: string;
  fileSize?: string;
  description?: string;
  downloadCount: number;
  downloadLogs?: { downloadedBy: string; downloadedAt: string }[];
  createdAt: string;
}

export type MeetingType =
  | 'Kickoff'
  | 'Requirement'
  | 'Design Review'
  | 'Development Review'
  | 'UAT'
  | 'Progress Meeting'
  | 'Deployment'
  | 'Other';

export type MeetingStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export interface ProjectMeetingItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingType: MeetingType;
  meetingUrl: string; // Google Meet, Zoom, MS Teams or configurable URL
  status: MeetingStatus;
  participants: string[]; // e.g. ['Customer', 'Project Manager', 'Lead Developer']
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
  notes?: {
    internalNotes?: string;
    customerVisibleNotes?: string;
  };
  createdBy: string;
  createdAt: string;
}

export interface ProjectUpdateNotice {
  id: string;
  projectId: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
  author: string;
  authorId?: string;
  createdAt: string;
}

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ProjectRiskItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  impact: string;
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
  severity: RiskSeverity;
  mitigation: string;
  ownerId?: string;
  ownerName?: string;
  status: 'ACTIVE' | 'MITIGATED' | 'CLOSED';
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
  createdAt: string;
}

export type IssueSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface ProjectIssueItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  status: IssueStatus;
  ownerId?: string;
  ownerName?: string;
  dueDate: string;
  resolution?: string;
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
  createdAt: string;
}

export type ReleaseStatus = 'PLANNED' | 'IN_DEVELOPMENT' | 'TESTING' | 'RELEASED' | 'ROLLED_BACK';

export interface ProjectReleaseItem {
  id: string;
  projectId: string;
  version: string; // e.g. "v1.0.0"
  releaseDate: string;
  status: ReleaseStatus;
  environment: 'Development' | 'Staging' | 'UAT' | 'Production';
  releaseNotes: {
    newFeatures: string[];
    bugFixes: string[];
    improvements: string[];
  };
  createdAt: string;
}

export type UATStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PASSED' | 'FAILED' | 'APPROVED';

export interface ProjectUATTestCase {
  id: string;
  projectId: string;
  testCase: string;
  description: string;
  expectedResult: string;
  actualResult?: string;
  status: UATStatus;
  tester?: string;
  date?: string;
  notes?: string;
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
}

export interface ProjectUATApproval {
  id: string;
  projectId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REQUEST_CHANGES';
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

export interface ProjectChatMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: string; // e.g. "Customer PM", "SMART-AI PM"
  senderType: 'CUSTOMER' | 'PM' | 'SUPPORT';
  message: string;
  attachments?: { name: string; url: string }[];
  timestamp: string;
  visibility: 'INTERNAL' | 'CUSTOMER_VISIBLE';
}

export interface FullProjectRecord {
  id: string;
  projectNumber: string; // e.g. "PRJ-2026-001"
  companyId: string;
  customerName: string;
  projectName: string;
  description: string;
  status: FullProjectStatus;
  health: ProjectHealthStatus;
  startDate: string;
  targetDate: string;
  completedDate?: string;
  overallProgress: number; // 0-100, calculated via weighted phase/task engine
  projectManagerId: string;
  projectManagerName: string;
  industry: string;
  appType: string;
  techStack: string[];
  quotationId?: string;
  proposalId?: string;
  requirementAnalysisId?: string;
  
  // Sub-collections
  phases: ProjectPhaseDetails[];
  milestones: FullProjectMilestone[];
  tasks: ProjectTask[];
  documents: FullProjectDocument[];
  meetings: ProjectMeetingItem[];
  updates: ProjectUpdateNotice[];
  risks: ProjectRiskItem[];
  issues: ProjectIssueItem[];
  releases: ProjectReleaseItem[];
  uatTestCases: ProjectUATTestCase[];
  uatApproval?: ProjectUATApproval;
  messages: ProjectChatMessage[];
  activities: ProjectActivityLog[];
  timeline: ProjectTimelineEvent[];
  
  financialSummary: {
    contractValue: number;
    invoiced: number;
    paid: number;
    outstanding: number;
    currency: string;
  };
  
  createdAt: string;
  updatedAt: string;
}

// ==================================================
// PROMPT 17: DOCUMENT CENTER & DIGITAL DOCUMENT MANAGEMENT TYPES
// ==================================================

export type DocumentCategory =
  | 'PROPOSAL'
  | 'QUOTATION'
  | 'CONTRACT'
  | 'INVOICE'
  | 'PAYMENT_RECEIPT'
  | 'REQUIREMENT'
  | 'TECHNICAL_DOCUMENT'
  | 'PROJECT_DOCUMENT'
  | 'UI_UX_DOCUMENT'
  | 'UAT_DOCUMENT'
  | 'RELEASE_NOTE'
  | 'USER_MANUAL'
  | 'OTHER';

export type DocumentStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'ACTIVE'
  | 'SUPERSEDED'
  | 'ARCHIVED'
  | 'EXPIRED'
  | 'CANCELLED';

export type DocumentClassification =
  | 'PUBLIC_TO_CUSTOMER'
  | 'CUSTOMER_PRIVATE'
  | 'INTERNAL'
  | 'CONFIDENTIAL';

export type DocumentVisibility = 'CUSTOMER_VISIBLE' | 'INTERNAL';

export type ContractStatus =
  | 'DRAFT'
  | 'PENDING_SIGNATURE'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'TERMINATED'
  | 'CANCELLED';

export type ContractSignatureStatus = 'PENDING' | 'SIGNED' | 'DECLINED' | 'EXPIRED';

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: string; // e.g. "v1.0", "v1.1", "v2.0"
  fileReference: string;
  fileSize?: string;
  changeDescription: string;
  uploadedBy: string;
  createdAt: string;
}

export interface DocumentApproval {
  id: string;
  documentId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REQUEST_CHANGES';
  comment: string;
  reviewedAt: string;
}

export interface DocumentShare {
  id: string;
  documentId: string;
  tokenHash: string;
  shareUrl: string;
  createdBy: string;
  expiresAt: string;
  revokedAt?: string;
  createdAt: string;
}

export interface DocumentAuditLog {
  id: string;
  documentId: string;
  action:
    | 'CREATED'
    | 'UPLOADED'
    | 'UPDATED'
    | 'VIEWED'
    | 'DOWNLOADED'
    | 'SHARED'
    | 'REVOKED'
    | 'VERSION_CREATED'
    | 'APPROVED'
    | 'REJECTED'
    | 'ARCHIVED'
    | 'RESTORED'
    | 'CANCELLED';
  performedBy: string;
  details: string;
  timestamp: string;
}

export interface DocumentRequest {
  id: string;
  companyId: string;
  companyName: string;
  projectId?: string;
  projectName?: string;
  requestedBy: string;
  requestedByName: string;
  documentType: DocumentCategory;
  description: string;
  requiredByDate: string;
  status: 'REQUESTED' | 'IN_PROGRESS' | 'READY' | 'DELIVERED' | 'CANCELLED';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractDocument {
  id: string;
  contractNumber: string; // e.g. "SAI-CON-2026-0001"
  contractName: string;
  companyId: string;
  projectId?: string;
  proposalId?: string;
  quotationId?: string;
  effectiveDate: string;
  expirationDate: string;
  status: ContractStatus;
  version: string;
  signatureStatus: ContractSignatureStatus;
  signerName?: string;
  signerRole?: string;
  signedAt?: string;
}

export interface DocumentModel {
  id: string;
  documentNumber: string; // e.g. "SAI-DOC-2026-0001"
  companyId: string;
  companyName: string;
  projectId?: string;
  projectName?: string;
  proposalId?: string;
  proposalNumber?: string;
  quotationId?: string;
  quotationNumber?: string;
  contractId?: string;
  contractNumber?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  paymentId?: string;
  receiptNumber?: string;
  
  name: string;
  description: string;
  category: DocumentCategory;
  type: string; // e.g. "PDF", "DOCX", "XLSX", "PNG"
  mimeType: string;
  fileSize: string;
  version: string; // "v1.0"
  status: DocumentStatus;
  visibility: DocumentVisibility;
  classification: DocumentClassification;
  storageReference: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  downloadCount: number;
  tags?: string[];
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  watermarked?: boolean;
  
  // Relations & Version Control
  versions: DocumentVersion[];
  approvals: DocumentApproval[];
  auditLogs: DocumentAuditLog[];
  shareLinks?: DocumentShare[];
  contractDetails?: ContractDocument;
  
  // Linked Document Graph IDs
  relatedDocIds?: string[];
}

// ==================================================
// PROMPT 18: SUPPORT TICKET & CUSTOMER SUPPORT TYPES
// ==================================================

export interface SupportAgent {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'SUPPORT_AGENT' | 'DEVELOPER' | 'PROJECT_MANAGER' | 'FINANCE_SPECIALIST' | 'ADMIN';
  skills: string[]; // e.g. ['Technical', 'Bug', 'Billing', 'Account', 'Feature', 'React', 'IoT', 'Database']
  activeStatus: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  currentWorkload: number; // Number of assigned active open/in-progress tickets
  maxConcurrentTickets?: number;
  avatar?: string;
  phone?: string;
}

export interface SupportSLAPolicy {
  id: string;
  name: string;
  priority: TicketPriority;
  responseTimeTargetHours: number; // e.g. Low=24, Med=12, High=4, Urgent=1
  resolutionTimeTargetHours: number; // e.g. Low=72, Med=48, High=24, Urgent=8
  businessHours: string; // e.g. "Monday–Friday 08:00–17:00 WIB"
  active: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Account' | 'Getting Started' | 'How To' | 'Troubleshooting' | 'Billing' | 'Technical' | 'FAQ' | string;
  content: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  visibility: 'CUSTOMER_VISIBLE' | 'INTERNAL';
  views: number;
  helpfulCount: number;
  unhelpfulCount: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportCategoryConfig {
  id: string;
  code: TicketCategory;
  name: string;
  description: string;
  recommendedRole: 'SUPPORT_AGENT' | 'DEVELOPER' | 'PROJECT_MANAGER' | 'FINANCE_SPECIALIST' | 'ADMIN';
  iconName?: string;
  active: boolean;
}

export interface SupportSystemSettings {
  ticketPrefix: string; // e.g. "SAI-TKT"
  numberFormat: string; // e.g. "SAI-TKT-{YEAR}-{6DIGITS}"
  autoCloseDays: number; // e.g. 7 (0 = disabled)
  enableAutoClose: boolean;
  enableAutoAssignment: boolean;
  enableMalwareScan: boolean;
  allowedFileTypes: string[]; // ['.png', '.jpg', '.jpeg', '.pdf', '.docx', '.txt', '.log', '.zip']
  maxFileSizeMb: number; // e.g. 20
  whatsappSupportNumber: string; // e.g. "+6281234567890"
  businessHours: string;
}

// ==================================================
// PROMPT 19: AI CHATBOT & KNOWLEDGE BASE TYPES
// ==================================================

export type ChatbotMode = 'SALES' | 'CONSULTANT' | 'SUPPORT' | 'GENERAL';

export type UserIntent = 
  | 'INFORMATION'
  | 'PRODUCT_INTEREST'
  | 'PROJECT_INQUIRY'
  | 'PRICE_INQUIRY'
  | 'CONSULTATION'
  | 'SUPPORT'
  | 'FEATURE_REQUEST';

export interface ConversationMemory {
  industry?: string;
  businessType?: string;
  companySize?: string;
  numberOfUsers?: string;
  numberOfBranches?: string;
  platform?: string;
  requiredModules?: string[];
  integrations?: string[];
  aiRequirements?: string[];
  budgetRange?: string;
  timeline?: string;
  detectedIntent?: UserIntent;
  leadCaptured?: boolean;
}

export interface ChatSession {
  id: string;
  userId?: string;
  companyId?: string;
  sessionTitle: string;
  mode: ChatbotMode;
  pageContext?: string;
  memory: ConversationMemory;
  createdAt: string;
  updatedAt: string;
}

export interface ChatActionCTA {
  label: string;
  action: string; // e.g. 'OPEN_ESTIMATOR', 'OPEN_REQUIREMENT_ANALYZER', 'OPEN_ARCHITECT', 'OPEN_MODULE_GENERATOR', 'OPEN_BUILDER', 'LEAD_CAPTURE', 'CREATE_TICKET', 'OPEN_URL'
  targetRoute?: string;
  url?: string;
  params?: Record<string, any>;
}

export interface ChatMessageSource {
  title: string;
  category: string;
  id?: string;
  snippet?: string;
}

export interface ChatMessageMetadata {
  sources?: ChatMessageSource[];
  intent?: UserIntent;
  suggestedQuestions?: string[];
  ctaButtons?: ChatActionCTA[];
  disclaimer?: string;
  isFact?: boolean;
  isEstimate?: boolean;
  isRecommendation?: boolean;
  isAssumption?: boolean;
  leadScore?: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  createdAt: string;
  metadata?: ChatMessageMetadata;
}

export type KnowledgeCategory = 
  | 'Services'
  | 'Industries'
  | 'AI Capabilities'
  | 'Technology'
  | 'Integration'
  | 'Process'
  | 'Pricing Guidance'
  | 'FAQ'
  | 'Support'
  | 'Company Information';

export type KnowledgeMainCategory =
  | 'COMPANY'
  | 'SERVICES'
  | 'INDUSTRIES'
  | 'FAQ'
  | 'PRICING'
  | 'TECHNOLOGY'
  | 'PORTFOLIO'
  | 'SALES'
  | 'SUPPORT';

export type KnowledgeVisibility = 'PUBLIC' | 'CUSTOMER' | 'INTERNAL';
export type KnowledgeStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface KnowledgeArticleVersion {
  version: number;
  content: string;
  summary: string;
  updatedAt: string;
  updatedBy: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: KnowledgeCategory | KnowledgeMainCategory;
  mainCategory?: KnowledgeMainCategory;
  content: string;
  summary: string;
  tags: string[];
  status: KnowledgeStatus;
  visibility: KnowledgeVisibility;
  priority?: number;
  version?: number;
  versions?: KnowledgeArticleVersion[];
  views: number;
  helpfulCount: number;
  unhelpfulCount: number;
  qualityScore?: number;
  lastReviewedAt?: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  multiplier: number;
  calculationType: 'PERCENTAGE' | 'FLAT_ADDITION' | 'MULTIPLIER';
  priority: number;
  active: boolean;
}

export interface CompanyInfo {
  name: string;
  brandName: string;
  website: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  description: string;
  mission: string;
  vision: string;
  coreValues: string[];
  history: string;
  businessFocus: string[];
}

export interface KnowledgeChunk {
  id: string;
  articleId: string;
  title: string;
  content: string;
  category: string;
  visibility: KnowledgeVisibility;
  tags: string[];
}

export interface KnowledgeAuditLog {
  id: string;
  articleId: string;
  articleTitle: string;
  action: 'CREATE' | 'UPDATE' | 'PUBLISH' | 'ARCHIVE' | 'ROLLBACK';
  version: number;
  user: string;
  timestamp: string;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  intent: UserIntent | string;
  sessionTitle?: string;
  createdAt: string;
  status: 'OPEN' | 'RESOLVED';
  convertedArticleId?: string;
}

export interface ChatbotConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  enableRAG: boolean;
  responseLanguage: 'id' | 'en' | 'auto';
  fallbackMessage: string;
  rateLimitMessagesPerMinute: number;
}

export interface ChatAnalytics {
  totalSessions: number;
  totalMessages: number;
  leadConversions: number;
  consultationRequests: number;
  estimatorStarts: number;
  ticketsCreated: number;
  topIntents: { intent: string; count: number }[];
}

// ==========================================
// PROMPT 20: AI BUSINESS COPILOT ENGINE TYPES
// ==========================================

export type CopilotMode =
  | 'ANALYTICS'
  | 'REPORTING'
  | 'FORECASTING'
  | 'RECOMMENDATION'
  | 'ANOMALY_DETECTION'
  | 'BUSINESS_QA'
  | 'OPERATIONAL_ASSISTANT'
  | 'DOCUMENT_ASSISTANT';

export type IndustryType =
  | 'MINING'
  | 'HOSPITAL'
  | 'SCHOOL'
  | 'MANUFACTURING'
  | 'PLANTATION'
  | 'POULTRY'
  | 'SHRIMP_FARM'
  | 'RETAIL'
  | 'CUSTOM';

export type UserRole =
  | 'CEO'
  | 'FINANCE'
  | 'OPERATIONS'
  | 'WAREHOUSE'
  | 'HR'
  | 'GENERAL_MANAGER';

export type MetricType =
  | 'REVENUE'
  | 'SALES'
  | 'PROFIT'
  | 'COST'
  | 'ORDERS'
  | 'CUSTOMERS'
  | 'INVENTORY'
  | 'PRODUCTION'
  | 'ATTENDANCE'
  | 'UTILIZATION'
  | 'DOWNTIME'
  | 'FUEL'
  | 'MAINTENANCE'
  | 'PATIENTS'
  | 'STUDENTS'
  | 'OEE'
  | 'FCR'
  | 'YIELD';

export type DimensionType =
  | 'PRODUCT'
  | 'CUSTOMER'
  | 'BRANCH'
  | 'REGION'
  | 'DEPARTMENT'
  | 'EMPLOYEE'
  | 'MACHINE'
  | 'VEHICLE'
  | 'PROJECT'
  | 'DATE'
  | 'CATEGORY'
  | 'POND'
  | 'BLOCK'
  | 'HOUSE';

export type TimeRangeType =
  | 'TODAY'
  | 'YESTERDAY'
  | 'THIS_WEEK'
  | 'LAST_WEEK'
  | 'THIS_MONTH'
  | 'LAST_MONTH'
  | 'THIS_QUARTER'
  | 'LAST_QUARTER'
  | 'THIS_YEAR'
  | 'LAST_YEAR'
  | 'CUSTOM';

export type ComparisonType =
  | 'PREVIOUS_PERIOD'
  | 'SAME_PERIOD_LAST_YEAR'
  | 'TARGET'
  | 'BUDGET'
  | 'BRANCH_VS_BRANCH'
  | 'PRODUCT_VS_PRODUCT';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type BusinessHealthStatus = 'HEALTHY' | 'ATTENTION_REQUIRED' | 'CRITICAL';

export interface IntentStructure {
  mode: CopilotMode;
  metric: MetricType;
  dimension?: DimensionType;
  timeRange: TimeRangeType;
  comparison?: ComparisonType;
  filters?: Record<string, string>;
  industry: IndustryType;
  rawQuestion: string;
}

export interface MetricDataPoint {
  label: string;
  currentValue: number;
  previousValue?: number;
  targetValue?: number;
  unit?: string;
  date?: string;
}

export interface MetricResult {
  metricName: string;
  currentTotal: number;
  previousTotal?: number;
  targetTotal?: number;
  growthPercent?: number;
  variance?: number;
  achievementPercent?: number;
  unit: string;
  formattedCurrent: string;
  formattedPrevious?: string;
  dataPoints: MetricDataPoint[];
}

export interface InsightItem {
  id: string;
  title: string;
  summary: string;
  impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  magnitude: string;
  metric: MetricType;
  details?: string[];
}

export interface AnomalyAlert {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  metric: MetricType;
  detectedAt: string;
  magnitude: string;
  whatHappened: string;
  potentialFactors: string[];
  recommendedAction: string;
  dimension?: string;
}

export interface CopilotRecommendation {
  id: string;
  title: string;
  actionText: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  impactDescription: string;
  targetPage?: string;
  ctaText?: string;
}

export interface ForecastResult {
  metric: MetricType;
  forecastPeriodName: string;
  forecastedValue: number;
  formattedValue: string;
  confidenceInterval: { min: number; max: number };
  trendDirection: 'INCREASING' | 'DECREASING' | 'STABLE';
  disclaimer: string;
  forecastPoints: { date: string; predicted: number; lowerBound: number; upperBound: number }[];
}

export interface DataSourceConfig {
  id: string;
  name: string;
  type: 'SQL' | 'REST_API' | 'IOT_STREAM' | 'ERP' | 'SIMRS' | 'CSV';
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING';
  lastSync: string;
  tablesCount: number;
  recordsCount: number;
  readOnly: boolean;
}

export interface SemanticMetricMapping {
  id: string;
  metric: MetricType;
  displayName: string;
  industry: IndustryType;
  sourceTable: string;
  formula: string;
  unit: string;
  defaultTimeFrame: TimeRangeType;
}

export interface CopilotQueryResponse {
  id: string;
  question: string;
  intent: IntentStructure;
  summaryText: string;
  metricResult?: MetricResult;
  insights: InsightItem[];
  alerts: AnomalyAlert[];
  recommendations: CopilotRecommendation[];
  forecast?: ForecastResult;
  chartType?: 'LINE' | 'BAR' | 'DONUT' | 'AREA' | 'TABLE' | 'NONE';
  chartData?: any[];
  dataSourceName: string;
  periodLabel: string;
  lastUpdated: string;
  confidence: ConfidenceLevel;
  dataQualityNotice?: string;
  calculationExplanation: string;
  followUpQuestions: string[];
  roleAllowed: boolean;
  timestamp: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text?: string;
  responseObject?: CopilotQueryResponse;
  timestamp: string;
}

export interface CopilotAuditRecord {
  id: string;
  userName: string;
  userRole: UserRole;
  industry: IndustryType;
  question: string;
  intentMode: CopilotMode;
  metricsQueried: string[];
  dataSource: string;
  executionTimeMs: number;
  confidence: ConfidenceLevel;
  timestamp: string;
}

export interface FailedQuestionRecord {
  id: string;
  question: string;
  userRole: UserRole;
  industry: IndustryType;
  failureReason: string;
  timestamp: string;
  status: 'UNRESOLVED' | 'RESOLVED';
  notes?: string;
}

export interface ExecutiveBriefing {
  greeting: string;
  healthScore: number;
  healthStatus: BusinessHealthStatus;
  keyMetricsSummary: {
    label: string;
    val: string;
    change: string;
    isPositive: boolean;
  }[];
  criticalAlerts: AnomalyAlert[];
  top3Insights: string[];
  recommendedActions: CopilotRecommendation[];
}

// ==========================================
// PROMPT 22: INDUSTRY SOLUTIONS TYPES
// ==========================================

export type IndustrySolutionCategory =
  | 'All'
  | 'Industrial'
  | 'Healthcare'
  | 'Education'
  | 'Agriculture'
  | 'Aquaculture'
  | 'Hospitality'
  | 'Retail'
  | 'Finance'
  | 'Food & Beverage'
  | 'Logistics'
  | 'Enterprise';

export interface IndustryModuleItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  aiBadge?: string;
  features?: string[];
}


export interface IndustryProblemItem {
  id: string;
  title: string;
  description: string;
  impact: string;
  solutionHighlight: string;
}

export interface IndustryUseCaseItem {
  id: string;
  title: string;
  scenario: string;
  aiRole: string;
  outcome: string;
}

export interface DashboardMetricSample {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext?: string;
}

export interface DashboardChartData {
  name: string;
  actual: number;
  target: number;
  secondary?: number;
}

export interface IndustryDashboardPreviewConfig {
  kpis: DashboardMetricSample[];
  chartTitle: string;
  chartData: DashboardChartData[];
  tableTitle: string;
  tableHeaders: string[];
  tableRows: Record<string, string | number>[];
  aiInsightBanner: string;
  mapOrExtraType?: 'map' | 'grid' | 'alerts';
}

export interface IndustrySolutionConfig {
  slug: string;
  name: string;
  subtitle: string;
  category: IndustrySolutionCategory;
  isFeatured?: boolean;
  published?: boolean;
  icon: string;
  heroTagline: string;
  heroDescription: string;
  problems: IndustryProblemItem[];
  solutionOverview: string;
  businessImpactSummary: string[];
  modules: IndustryModuleItem[];
  aiFeatures: AIFeatureItem[];
  workflowSteps: { step: number; title: string; desc: string; icon: string }[];
  dashboardPreview: IndustryDashboardPreviewConfig;
  benefits: string[];
  useCases: IndustryUseCaseItem[];
  integrations: string[];
  technologies: { category: string; stack: string[] }[];
  relatedSlugs: string[];
  cta?: { primaryText?: string; secondaryText?: string; consultationPresetMessage?: string; buildText?: string; consultText?: string; estimateText?: string; [key: string]: any };
  metaTitle: string;
  metaDescription: string;
}

// ============================================================================
// PROMPT 24 — BLOG & CONTENT MANAGEMENT SYSTEM TYPES
// ============================================================================

export type BlogArticleStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
export type BlogArticleType = 'ARTICLE' | 'GUIDE' | 'CONCEPT' | 'CASE STUDY';
export type BlogVisibility = 'PUBLIC' | 'PRIVATE' | 'PASSWORD_PROTECTED';
export type CommentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM';
export type ContentIdeaStatus = 'IDEA' | 'PLANNED' | 'WRITING' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  role: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: string;
  articleId: string;
  articleTitle?: string;
  name: string;
  email: string;
  comment: string;
  status: CommentStatus;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string;
  title?: string;
  description?: string;
  type: 'image' | 'video' | 'document';
  sizeBytes: number;
  uploadedBy: string;
  createdAt: string;
}

export interface BlogArticleVersion {
  version: number;
  author: string;
  updatedAt: string;
  title: string;
  content: string;
  changeSummary: string;
}

export interface BlogArticleCTA {
  title?: string;
  type: 'AI_BUILDER' | 'INDUSTRY_SOLUTION' | 'PORTFOLIO' | 'CONSULTATION' | 'CUSTOM';
  buttonText: string;
  linkUrl?: string;
  industrySlug?: string;
  portfolioSlug?: string;
  customMessage?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  author?: BlogAuthor;
  categoryId: string;
  category?: BlogCategory;
  tags: string[];
  articleType: BlogArticleType;
  status: BlogArticleStatus;
  visibility: BlogVisibility;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  updatedAt: string;
  createdAt: string;
  readingTime: number;
  viewCount: number;
  ctaClicks?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  knowledgeEnabled?: boolean;
  syncedToKnowledgeBase?: boolean;
  industrySlug?: string;
  portfolioSlug?: string;
  relatedServiceId?: string;
  cta?: BlogArticleCTA;
  versions?: BlogArticleVersion[];
}

export interface ContentIdea {
  id: string;
  title: string;
  topic: string;
  category: string;
  targetIndustry?: string;
  keywords: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: ContentIdeaStatus;
  assignedTo?: string;
  createdAt: string;
}

export interface BlogAuditLog {
  id: string;
  action: 'CREATE' | 'EDIT' | 'PUBLISH' | 'UNPUBLISH' | 'SCHEDULE' | 'ARCHIVE' | 'RESTORE' | 'DELETE' | 'SYNC_KB';
  articleId: string;
  articleTitle: string;
  actor: string;
  timestamp: string;
  details?: string;
}

// ==========================================
// PROMPT 25 — SEO ENGINE INTERFACES
// ==========================================

export type SEOPageStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type SearchIntentType = 'Commercial' | 'Informational' | 'Transactional' | 'Navigational';

export interface SEOLandingPage {
  id: string;
  title: string;
  slug: string;
  keyword: string;
  secondaryKeywords: string[];
  description: string;
  content: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  industry?: string;
  service?: string;
  problems?: { title: string; desc: string }[];
  solutions?: { title: string; desc: string }[];
  capabilities?: { title: string; desc: string; icon?: string }[];
  processSteps?: { step: string; title: string; desc: string }[];
  faq: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  status: SEOPageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SEOKeyword {
  id: string;
  keyword: string;
  searchIntent: SearchIntentType;
  targetPage: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'PLANNED' | 'ARCHIVED';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SEORedirect {
  id: string;
  source: string;
  destination: string;
  statusCode: 301 | 302;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SEOAuditIssue {
  type: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  code: string;
  message: string;
  recommendation?: string;
}

export interface SEOAuditResult {
  id: string;
  pageUrl: string;
  pageType: string;
  score: number;
  issues: SEOAuditIssue[];
  warnings: string[];
  checkedAt: string;
}

export interface SEOPageMeta {
  id: string;
  url: string;
  pageType: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noindex: boolean;
  nofollow: boolean;
  schemaType: 'Organization' | 'WebSite' | 'Service' | 'SoftwareApplication' | 'Article' | 'FAQPage' | 'BreadcrumbList';
  createdAt: string;
  updatedAt: string;
}

export interface SEOInternalLink {
  id: string;
  sourcePage: string;
  targetPage: string;
  anchorText: string;
  status: 'ACTIVE' | 'SUGGESTED';
  createdAt: string;
}

export interface SEOSettings {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  robotsRules: string;
  sitemapEnabled: boolean;
  schemaEnabled: boolean;
  searchConsoleConnected: boolean;
  analyticsConnected: boolean;
}

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'SALES' 
  | 'DEVELOPER' 
  | 'FINANCE' 
  | 'SUPPORT' 
  | 'CUSTOMER'
  | 'PROJECT_MANAGER' 
  | 'CONTENT_MANAGER' 
  | 'ANALYST'
  | string;

export type AdminPermission = 'VIEW' | 'CREATE' | 'EDIT' | 'DELETE' | 'APPROVE' | 'PUBLISH' | 'EXPORT' | 'SEND' | 'ASSIGN' | 'ARCHIVE' | 'RESTORE';

export interface Permission {
  id: string;
  code: string; // e.g., 'LEAD_VIEW', 'INVOICE_CREATE', 'PROJECT_EDIT'
  name: string;
  description: string;
  module: string; // e.g., 'LEADS', 'INVOICES', 'PROJECTS'
  action: string; // e.g., 'VIEW', 'CREATE', 'EDIT', 'DELETE', 'APPROVE', 'EXPORT'
  createdAt: string;
}

export interface Role {
  id: string;
  code: string; // e.g., 'SUPER_ADMIN', 'SALES', 'PROJECT_COORDINATOR'
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  isSystemRole: boolean;
  permissions: string[]; // Array of Permission codes
  userCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserPermissionOverride {
  userId: string;
  permissionCode: string;
  effect: 'ALLOW' | 'DENY';
  createdAt: string;
  assignedBy?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  roles?: string[]; // Multiple roles support
  customerId?: string; // Tenant/Customer isolation reference
  companyId?: string; // Company tenant isolation reference
  avatarUrl?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  department?: string;
  phone?: string;
  lastLogin?: string;
  permissionOverrides?: UserPermissionOverride[];
  createdAt: string;
}

export interface RolePermissionMatrix {
  role: AdminRole;
  modulePermissions: Record<string, AdminPermission[]>;
}

// ==========================================
// PROMPT 28 — ENTERPRISE NOTIFICATION CENTER
// ==========================================

export type NotificationType =
  | 'NEW_LEAD'
  | 'NEW_CUSTOMER'
  | 'PROPOSAL'
  | 'QUOTATION'
  | 'PAYMENT'
  | 'PROJECT_UPDATE'
  | 'SUPPORT_TICKET'
  | 'SYSTEM';

export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type NotificationStatus = 'UNREAD' | 'READ' | 'ARCHIVED';
export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'WHATSAPP' | 'PUSH';

export interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  status: 'UNREAD' | 'READ';
  link?: string;
}

export interface AppNotification {
  id: string;
  userId?: string; // Specific user or undefined for role broadcast
  targetRole?: AdminRole | 'ALL';
  tenantId?: string; // companyId for Customer Multi-Tenant Isolation
  type: NotificationType;
  category: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  channels: NotificationChannel[];
  entityType?: 'lead' | 'customer' | 'proposal' | 'quotation' | 'invoice' | 'payment' | 'project' | 'ticket' | 'system' | string;
  entityId?: string;
  actionUrl: string;
  metadata?: Record<string, any>;
  createdAt: string;
  readAt?: string;
  archivedAt?: string;
  deliveryStatus?: {
    inApp?: 'SENT' | 'DELIVERED';
    email?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
    whatsapp?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
    push?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
  };
}

export interface ChannelPreferenceItem {
  inApp: boolean;
  email: boolean;
  whatsapp: boolean;
  push: boolean;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  role: string;
  preferences: Record<NotificationType, ChannelPreferenceItem>;
  soundEnabled: boolean;
  retentionDays: 30 | 60 | 90 | number;
  emailDigest: 'NONE' | 'DAILY' | 'WEEKLY';
  updatedAt: string;
}

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  variables: string[];
  priority: NotificationPriority;
  enabled: boolean;
  channels: NotificationChannel[];
  emailSubject?: string;
  whatsappTemplate?: string;
  updatedAt: string;
}

export interface NotificationDeliveryLog {
  id: string;
  notificationId: string;
  type: NotificationType;
  title: string;
  recipientName: string;
  recipientEmail?: string;
  recipientPhone?: string;
  channel: NotificationChannel;
  status: 'SENT' | 'DELIVERED' | 'FAILED' | 'QUEUED';
  failureReason?: string;
  createdAt: string;
  sentAt?: string;
}

export interface NotificationEventPayload {
  id?: string;
  type: NotificationType;
  entityType: string;
  entityId: string;
  payload: Record<string, any>;
  targetRole?: AdminRole | 'ALL';
  userId?: string;
  tenantId?: string;
  createdAt?: string;
}


export interface AdminApprovalItem {
  id: string;
  itemType: 'PROPOSAL' | 'QUOTATION' | 'INVOICE' | 'CONTENT' | 'KNOWLEDGE_BASE';
  title: string;
  requestedBy: string;
  requestedAt: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'REJECTED';
  dataRefId: string;
  notes?: string;
}

export interface AdminAuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  recordId?: string;
  recordName?: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
}

export interface AdminCompanySettings {
  companyName: string;
  logoUrl: string;
  faviconUrl: string;
  brandName: string;
  defaultOgImage: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  taxInformation: string;
  bankInformation: string;
}

export interface AdminSystemSettings {
  company: AdminCompanySettings;
  branding: {
    logo: string;
    favicon: string;
    brandName: string;
    defaultOgImage: string;
  };
  notifications: {
    emailEnabled: boolean;
    whatsappEnabled: boolean;
    inAppEnabled: boolean;
    leadNotifyEmail: string;
    invoiceNotifyEmail: string;
  };
  aiConfig: {
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
    maskedApiKey: string;
  };
  security: {
    sessionTimeoutMinutes: number;
    mfaRequired: boolean;
    passwordMinLength: number;
  };
}

// ==========================================
// PROMPT 29: SECURITY HARDENING & AUDIT TYPES
// ==========================================

export type SecurityStatusLevel = 'PASS' | 'WARNING' | 'FAIL';
export type SecurityThreatSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityTestCase {
  id: string;
  category: 'AUTHENTICATION' | 'AUTHORIZATION' | 'RBAC' | 'IDOR' | 'TENANT_ISOLATION' | 'INPUT_VALIDATION' | 'SQL_INJECTION' | 'XSS' | 'CSRF' | 'RATE_LIMITING' | 'SESSION' | 'FILE_UPLOAD' | 'API_SECURITY' | 'SECRET_EXPOSURE' | 'ERROR_HANDLING';
  name: string;
  description: string;
  principle: string;
  targetLayer: string;
  status: SecurityStatusLevel;
  executionTimeMs: number;
  details: string;
  mitigation?: string;
  verifiedAt: string;
}

export interface SecurityReadinessCategory {
  id: string;
  name: string;
  score: number; // 0-100
  status: SecurityStatusLevel;
  totalChecks: number;
  passedChecks: number;
  warningChecks: number;
  failedChecks: number;
  description: string;
}

export interface SecuritySession {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  email: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  isCurrentSession: boolean;
  loginAt: string;
  lastActiveAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}

export interface SecurityThreatEvent {
  id: string;
  timestamp: string;
  type: 'FAILED_LOGIN_SPIKE' | 'BRUTE_FORCE_THROTTLED' | 'IDOR_ATTEMPT_BLOCKED' | 'UNAUTHORIZED_ROLE_ACCESS' | 'XSS_PAYLOAD_SANITIZED' | 'RATE_LIMIT_EXCEEDED' | 'PATH_TRAVERSAL_DETECTED' | 'SQLI_PAYLOAD_BLOCKED' | 'SUSPICIOUS_IP_ACTIVITY';
  severity: SecurityThreatSeverity;
  sourceIp: string;
  targetEndpoint: string;
  actorId?: string;
  description: string;
  actionTaken: 'BLOCKED' | 'THROTTLED' | 'SANITIZED' | 'FLAGGED_FOR_REVIEW';
  status: 'RESOLVED' | 'UNDER_INVESTIGATION' | 'IGNORED';
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAgeDays: number;
  preventReuseCount: number;
  maxFailedAttemptsBeforeDelay: number;
}

export interface MFASettings {
  enabled: boolean;
  enforcedRoles: string[];
  method: 'TOTP_AUTHENTICATOR' | 'SMS_OTP' | 'EMAIL_OTP';
  gracePeriodDays: number;
  backupCodesGenerated: boolean;
}

export interface SecurityAuditReport {
  reportId: string;
  generatedAt: string;
  environment: 'PRODUCTION_READY' | 'STAGING' | 'SANDBOX';
  evaluatedBy: string;
  overallReadinessScore: number;
  overallStatus: SecurityStatusLevel;
  categories: SecurityReadinessCategory[];
  testResults: SecurityTestCase[];
  threatsBlockedCount: number;
  activeSessionsCount: number;
  complianceCertifications: string[];
  recommendations: string[];
}










