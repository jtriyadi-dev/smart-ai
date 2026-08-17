/**
 * Centralized Design Tokens for SMART-AI.ID
 * Ensures visual consistency, theme scalability, and zero hardcoded style chaos across all modules.
 */

export const DESIGN_SYSTEM = {
  brand: {
    name: 'SMART-AI.ID',
    tagline: 'Build Smarter. Work Faster. Grow with AI.',
    domain: 'www.smart-ai.id',
    subtext: 'AI-Powered Application Development',
    valueProposition: 'Kami membantu bisnis membangun aplikasi web custom berbasis AI untuk mengotomatisasi proses bisnis, menganalisis data, meningkatkan produktivitas, dan mempercepat pertumbuhan.',
  },
  colors: {
    bgDark: '#06090e',
    bgCard: '#0b111f',
    bgGlass: 'rgba(13, 20, 36, 0.65)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(56, 189, 248, 0.4)',
    cyanAccent: '#38bdf8',
    indigoAccent: '#6366f1',
    purpleAccent: '#c084fc',
    emeraldSuccess: '#10b981',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    textSubtle: '#64748b',
  },
  typography: {
    displayFont: 'Outfit, sans-serif',
    bodyFont: 'Plus Jakarta Sans, sans-serif',
    monoFont: 'JetBrains Mono, monospace',
  },
  radius: {
    card: '1rem', // 16px
    button: '0.75rem', // 12px
    badge: '9999px', // Pill
  },
  shadows: {
    glowCyan: '0 0 25px rgba(6, 182, 212, 0.35)',
    glowPurple: '0 0 25px rgba(168, 85, 247, 0.35)',
    cardHover: '0 12px 30px -10px rgba(14, 165, 233, 0.15)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
} as const;
