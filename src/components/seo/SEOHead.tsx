import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Jasa Pembuatan Aplikasi AI & Web Custom Indonesia | SMART-AI.ID',
  description = 'SMART-AI.ID menyediakan jasa pembuatan aplikasi AI, aplikasi web custom, dan software bisnis enterprise untuk berbagai industri di Indonesia.',
  canonicalUrl = 'https://www.smart-ai.id',
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  ogType = 'website',
  noindex = false,
  nofollow = false,
  jsonLd
}) => {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to set or create meta
    const setMeta = (nameAttr: string, attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create link
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard Meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`);

    // Canonical
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'SMART-AI.ID');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // JSON-LD Script tag
    const scriptId = 'smartai-jsonld-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLdStr) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = jsonLdStr;
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalUrl, ogImage, ogType, noindex, nofollow, jsonLdStr]);

  return null; // Side-effect component
};
