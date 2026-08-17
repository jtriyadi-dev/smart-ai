import {
  LayoutDashboard,
  Bell,
  Users,
  FolderKanban,
  Building2,
  Briefcase,
  Cpu,
  Factory,
  Layers,
  PenTool,
  FileText,
  DollarSign,
  Receipt,
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  CheckSquare,
  History,
  Shield,
  Zap,
  Smartphone,
  ClipboardCheck,
  Server,
  Terminal,
  Settings,
  LucideIcon
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  aliases: string[];
  icon: LucideIcon;
  permission: string;
  section: 'CORE' | 'SALES_CRM' | 'DELIVERY_CONTENT' | 'FINANCE' | 'SUPPORT_AI' | 'GOVERNANCE' | 'ENGINEERING' | 'SYSTEM';
  description?: string;
  badge?: string;
}

export const CONTROL_PANEL_NAVIGATION: NavigationItem[] = [
  // 1. Dashboard
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '/admin',
    aliases: ['/admin', '/admin/dashboard', '/control-panel', '/control-panel/dashboard'],
    icon: LayoutDashboard,
    permission: 'DASHBOARD_VIEW',
    section: 'CORE',
    description: 'Control Center Overview, metrics, and high-level health'
  },
  // 2. Notifications
  {
    id: 'notifications',
    label: 'Notifications',
    route: '/admin/notifications',
    aliases: ['/admin/notifications', '/control-panel/notifications'],
    icon: Bell,
    permission: 'DASHBOARD_VIEW',
    section: 'CORE',
    description: 'Multi-channel real-time notification engine & alerts'
  },
  // 3. Leads
  {
    id: 'leads',
    label: 'Leads',
    route: '/admin/leads',
    aliases: ['/admin/leads', '/control-panel/leads'],
    icon: Users,
    permission: 'LEADS_VIEW',
    section: 'SALES_CRM',
    description: 'Lead generation, inbound inquiries & qualification'
  },
  // 4. CRM
  {
    id: 'crm',
    label: 'CRM',
    route: '/admin/crm',
    aliases: [
      '/admin/crm',
      '/control-panel/crm',
      '/admin/crm/leads',
      '/admin/crm/companies',
      '/admin/crm/contacts',
      '/admin/crm/pipeline',
      '/admin/crm/activities',
      '/admin/crm/follow-ups'
    ],
    icon: FolderKanban,
    permission: 'CRM_VIEW',
    section: 'SALES_CRM',
    description: 'Kanban sales pipeline, contacts, companies & activities'
  },
  // 5. Customers
  {
    id: 'customers',
    label: 'Customers',
    route: '/admin/customers',
    aliases: ['/admin/customers', '/control-panel/customers'],
    icon: Building2,
    permission: 'CUSTOMERS_VIEW',
    section: 'SALES_CRM',
    description: 'Client accounts, organizations & relationship management'
  },
  // 6. Projects
  {
    id: 'projects',
    label: 'Projects',
    route: '/admin/projects',
    aliases: ['/admin/projects', '/admin/projects/new', '/control-panel/projects', '/control-panel/projects/new'],
    icon: Briefcase,
    permission: 'PROJECTS_VIEW',
    section: 'DELIVERY_CONTENT',
    description: 'Project delivery, milestones, tasks & sprint execution'
  },
  // 7. Services
  {
    id: 'services',
    label: 'Services',
    route: '/admin/services',
    aliases: ['/admin/services', '/control-panel/services'],
    icon: Cpu,
    permission: 'SERVICES_VIEW',
    section: 'DELIVERY_CONTENT',
    description: 'Master service offerings catalog & pricing matrices'
  },
  // 8. Industries
  {
    id: 'industries',
    label: 'Industries',
    route: '/admin/industries',
    aliases: ['/admin/industries', '/control-panel/industries'],
    icon: Factory,
    permission: 'INDUSTRIES_VIEW',
    section: 'DELIVERY_CONTENT',
    description: '19 Master enterprise industry vertical templates'
  },
  // 9. Portfolio
  {
    id: 'portfolio',
    label: 'Portfolio',
    route: '/admin/portfolio',
    aliases: ['/admin/portfolio', '/control-panel/portfolio'],
    icon: Layers,
    permission: 'PORTFOLIO_VIEW',
    section: 'DELIVERY_CONTENT',
    description: 'Case studies, project showcases & client results'
  },
  // 10. Blog
  {
    id: 'blog',
    label: 'Blog',
    route: '/admin/blog',
    aliases: ['/admin/blog', '/control-panel/blog'],
    icon: PenTool,
    permission: 'BLOG_VIEW',
    section: 'DELIVERY_CONTENT',
    description: 'Blog posts, content management, SEO tags & categories'
  },
  // 11. Proposals
  {
    id: 'proposals',
    label: 'Proposals',
    route: '/admin/proposals',
    aliases: ['/admin/proposals', '/admin/proposals/new', '/control-panel/proposals', '/control-panel/proposals/new'],
    icon: FileText,
    permission: 'PROPOSALS_VIEW',
    section: 'FINANCE',
    description: 'Commercial proposals, AI generator & client approvals'
  },
  // 12. Quotations
  {
    id: 'quotations',
    label: 'Quotations',
    route: '/admin/quotations',
    aliases: ['/admin/quotations', '/admin/quotations/new', '/control-panel/quotations', '/control-panel/quotations/new'],
    icon: DollarSign,
    permission: 'QUOTATIONS_VIEW',
    section: 'FINANCE',
    description: 'Formal quotations, itemized pricing & PDF export'
  },
  // 13. Invoices
  {
    id: 'invoices',
    label: 'Invoices',
    route: '/admin/invoices',
    aliases: ['/admin/invoices', '/admin/invoices/new', '/control-panel/invoices', '/control-panel/invoices/new'],
    icon: Receipt,
    permission: 'INVOICES_VIEW',
    section: 'FINANCE',
    description: 'Billing invoices, payment tracking, receipts & escrow'
  },
  // 14. Support
  {
    id: 'support',
    label: 'Support',
    route: '/admin/support',
    aliases: [
      '/admin/support',
      '/admin/support/queue',
      '/admin/support/agents',
      '/admin/support/categories',
      '/admin/support/reports',
      '/admin/support/settings',
      '/control-panel/support',
      '/control-panel/support/queue'
    ],
    icon: LifeBuoy,
    permission: 'SUPPORT_VIEW',
    section: 'SUPPORT_AI',
    description: 'Helpdesk ticketing queue, SLA monitoring & agent routing'
  },
  // 15. AI Control
  {
    id: 'ai',
    label: 'AI Control',
    route: '/admin/ai',
    aliases: ['/admin/ai', '/admin/copilot', '/admin/ai-sales-assistant', '/control-panel/ai', '/control-panel/copilot'],
    icon: Sparkles,
    permission: 'AI_VIEW',
    section: 'SUPPORT_AI',
    description: 'AI model parameters, telemetry, prompt settings & Copilot'
  },
  // 16. Users & RBAC
  {
    id: 'users',
    label: 'Users & RBAC',
    route: '/admin/users',
    aliases: [
      '/admin/users',
      '/admin/users/roles',
      '/admin/roles',
      '/control-panel/users',
      '/control-panel/roles',
      '/control-panel/users/roles'
    ],
    icon: ShieldCheck,
    permission: 'USERS_VIEW',
    section: 'GOVERNANCE',
    description: 'User provisioning, roles, permissions matrix & security overrides'
  },
  // 17. Approvals
  {
    id: 'approvals',
    label: 'Approvals',
    route: '/admin/approvals',
    aliases: ['/admin/approvals', '/control-panel/approvals'],
    icon: CheckSquare,
    permission: 'PROPOSALS_VIEW',
    section: 'GOVERNANCE',
    description: 'Document approval workflow, signing & compliance gates'
  },
  // 18. Activity Trail
  {
    id: 'activity',
    label: 'Activity Trail',
    route: '/admin/activity',
    aliases: ['/admin/activity', '/control-panel/activity'],
    icon: History,
    permission: 'AUDIT_LOGS_VIEW',
    section: 'GOVERNANCE',
    description: 'Immutable audit logs, user actions & operational trail'
  },
  // 19. Security & WAF
  {
    id: 'security',
    label: 'Security & WAF',
    route: '/admin/security',
    aliases: ['/admin/security', '/control-panel/security'],
    icon: Shield,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: 'Zero-trust security, firewall rules, brute force & rate limits'
  },
  // 20. Performance & CWV
  {
    id: 'performance',
    label: 'Performance & CWV',
    route: '/admin/performance',
    aliases: ['/admin/performance', '/control-panel/performance'],
    icon: Zap,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: 'Core Web Vitals telemetry, memory leaks & latency benchmarks'
  },
  // 21. Responsive & UI Audit
  {
    id: 'responsive-audit',
    label: 'Responsive & UI Audit',
    route: '/admin/responsive',
    aliases: [
      '/admin/responsive',
      '/admin/responsive-audit',
      '/control-panel/responsive',
      '/control-panel/responsive-audit'
    ],
    icon: Smartphone,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: 'Mobile-first compliance, viewport rendering & touch-target audits'
  },
  // 22. Master QA & System Test
  {
    id: 'qa',
    label: 'Master QA & System Test',
    route: '/admin/qa',
    aliases: [
      '/admin/qa',
      '/admin/system-test',
      '/control-panel/qa',
      '/control-panel/system-test'
    ],
    icon: ClipboardCheck,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: '21-Category test execution plan, defect matrix & quality gates'
  },
  // 23. Production & DevOps
  {
    id: 'devops',
    label: 'Production & DevOps',
    route: '/admin/production',
    aliases: [
      '/admin/production',
      '/admin/devops',
      '/control-panel/production',
      '/control-panel/devops'
    ],
    icon: Server,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: 'Infrastructure health, container status, database connection & DNS'
  },
  // 24. Developer Control Panel
  {
    id: 'developer',
    label: 'Developer Control Panel',
    route: '/admin/developer',
    aliases: [
      '/admin/developer',
      '/admin/developer-control-panel',
      '/control-panel/developer',
      '/control-panel/developer-control-panel'
    ],
    icon: Terminal,
    permission: 'SETTINGS_VIEW',
    section: 'ENGINEERING',
    description: 'Live content editor, media assets, API Keys & system overrides'
  },
  // 25. Settings
  {
    id: 'settings',
    label: 'Settings',
    route: '/admin/settings',
    aliases: ['/admin/settings', '/control-panel/settings'],
    icon: Settings,
    permission: 'SETTINGS_VIEW',
    section: 'SYSTEM',
    description: 'System configurations, branding, SEO, WhatsApp & integrations'
  }
];

export function getActiveNavigationItem(currentPath: string): NavigationItem | undefined {
  // 1. Direct match on route or aliases
  for (const item of CONTROL_PANEL_NAVIGATION) {
    if (item.route === currentPath || item.aliases.includes(currentPath)) {
      return item;
    }
  }

  // 2. Prefix match (excluding root dashboard to prevent false positives)
  for (const item of CONTROL_PANEL_NAVIGATION) {
    if (item.id === 'dashboard') continue;

    if (
      currentPath.startsWith(item.route) ||
      item.aliases.some((alias) => alias !== '/admin' && alias !== '/control-panel' && currentPath.startsWith(alias))
    ) {
      return item;
    }
  }

  // 3. Fallback to dashboard if admin or control-panel
  if (currentPath === '/admin' || currentPath === '/control-panel' || currentPath === '/admin/dashboard' || currentPath === '/control-panel/dashboard') {
    return CONTROL_PANEL_NAVIGATION[0];
  }

  return undefined;
}
