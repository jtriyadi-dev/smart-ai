import React, { useState, useEffect } from 'react';

export type RoutePath =
  | '/'
  | '/layanan'
  | '/solusi-industri'
  | '/portfolio'
  | '/teknologi'
  | '/tentang-kami'
  | '/faq'
  | '/contact'
  | '/ai-app-builder'
  | '/ai-requirement-analyzer'
  | '/ai-solution-architect'
  | '/ai-module-generator'
  | '/ai-project-estimator'
  | '/request-application'
  | '/consultation'
  | '/thank-you'
  | '/admin'
  | '/admin/dashboard'
  | '/control-panel'
  | '/control-panel/dashboard'
  | '/admin/notifications'
  | '/admin/leads'
  | '/admin/crm'
  | '/admin/crm/leads'
  | '/admin/crm/companies'
  | '/admin/crm/contacts'
  | '/admin/crm/pipeline'
  | '/admin/crm/activities'
  | '/admin/crm/follow-ups'
  | '/admin/customers'
  | '/admin/projects'
  | '/admin/projects/new'
  | '/admin/services'
  | '/admin/industries'
  | '/admin/portfolio'
  | '/admin/blog'
  | '/admin/proposals'
  | '/admin/proposals/new'
  | '/admin/quotations'
  | '/admin/quotations/new'
  | '/admin/invoices'
  | '/admin/invoices/new'
  | '/admin/support'
  | '/admin/support/queue'
  | '/admin/support/agents'
  | '/admin/support/categories'
  | '/admin/support/reports'
  | '/admin/support/settings'
  | '/admin/ai'
  | '/admin/copilot'
  | '/admin/ai-sales-assistant'
  | '/admin/users'
  | '/admin/roles'
  | '/admin/approvals'
  | '/admin/activity'
  | '/admin/security'
  | '/admin/performance'
  | '/admin/responsive'
  | '/admin/qa'
  | '/admin/production'
  | '/admin/developer'
  | '/admin/settings'
  | '/invoice/view'
  | '/portal/login'
  | '/portal/register'
  | '/portal/forgot-password'
  | '/portal/dashboard'
  | '/portal/projects'
  | '/portal/proposals'
  | '/portal/quotations'
  | '/portal/invoices'
  | '/portal/payments'
  | '/portal/receipts'
  | '/portal/documents'
  | '/portal/tickets'
  | '/portal/tickets/new'
  | '/portal/company'
  | '/portal/profile'
  | '/portal/notifications'
  | '/portal/settings'
  | '/login'
  | '/dashboard'
  | (string & {});

// Shared singleton route state to guarantee all components re-render simultaneously
let currentGlobalPath: string = typeof window !== 'undefined' ? (window.location.pathname || '/') : '/';
const routeListeners = new Set<(path: string) => void>();

function notifyRouteListeners(newPath: string) {
  currentGlobalPath = newPath;
  routeListeners.forEach((listener) => {
    try {
      listener(newPath);
    } catch (e) {
      console.error('[Router] Error notifying listener:', e);
    }
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    const p = window.location.pathname || '/';
    notifyRouteListeners(p);
  });
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || currentGlobalPath || '/';
    }
    return currentGlobalPath;
  });

  useEffect(() => {
    const handleRouteUpdate = (newPath: string) => {
      setCurrentPath(newPath);
    };

    routeListeners.add(handleRouteUpdate);

    // Initial sync check
    if (typeof window !== 'undefined' && window.location.pathname !== currentPath) {
      setCurrentPath(window.location.pathname || '/');
    }

    return () => {
      routeListeners.delete(handleRouteUpdate);
    };
  }, [currentPath]);

  const navigate = (path: string, options?: { scrollTargetId?: string }) => {
    // Check if it's an anchor hash navigation on the homepage
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + path);
        notifyRouteListeners('/');
      }
      setTimeout(() => {
        const el = document.querySelector(path);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    window.history.pushState({}, '', path);
    notifyRouteListeners(path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (options?.scrollTargetId) {
      setTimeout(() => {
        const el = document.querySelector(options.scrollTargetId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return {
    currentPath,
    navigate,
  };
}

export function navigateTo(path: string) {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    notifyRouteListeners(path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useNavigate() {
  return (path: string) => navigateTo(path);
}

export function useParams<T extends Record<string, string | undefined>>(): T {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const parts = path.split('/').filter(Boolean);
  const lastPart = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return {
    slug: lastPart,
    industrySlug: lastPart,
    id: lastPart
  } as unknown as T;
}

export function Link({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to);
  };

  return React.createElement(
    'a',
    { href: to, onClick: handleClick, className },
    children
  );
}


