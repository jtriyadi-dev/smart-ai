import React from 'react';
import { Hero } from '../components/Hero';
import { ValueStrip } from '../components/ValueStrip';
import { CapabilityStats } from '../components/CapabilityStats';
import { ServicesSection } from '../components/ServicesSection';
import { AIBenefitsSection } from '../components/AIBenefitsSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { ProcessSection } from '../components/ProcessSection';
import { TechStackSection } from '../components/TechStackSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { AIValueSection } from '../components/AIValueSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { ContactCTA } from '../components/ContactCTA';
import { LeadFormSection } from '../components/LeadFormSection';
import { ServiceItem, IndustrySolution, PortfolioItem, LeadFormData } from '../types';

interface HomePageProps {
  onOpenConsultation: () => void;
  onOpenAIGenerator: () => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectIndustry: (industry: IndustrySolution) => void;
  onSelectPortfolio: (item: PortfolioItem) => void;
  initialLeadData?: Partial<LeadFormData>;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  onOpenAIGenerator,
  onSelectService,
  onSelectIndustry,
  onSelectPortfolio,
  initialLeadData
}) => {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero
        onStartConsultation={onOpenConsultation}
        onOpenAIGenerator={onOpenAIGenerator}
      />

      {/* 2. Trust / Value Strip */}
      <ValueStrip />

      {/* 3. Capability Statistics & Tech Impact */}
      <CapabilityStats />

      {/* 4. Layanan Pengembangan Aplikasi */}
      <ServicesSection
        onSelectService={onSelectService}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 5. Kapabilitas AI & Analytics */}
      <AIBenefitsSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 6. Solusi Berdasarkan Industri (including SMART MINING) */}
      <IndustriesSection
        onSelectIndustry={onSelectIndustry}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 7. Alur Kerja & Metodologi (6 Steps) */}
      <ProcessSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 8. Ekosistem Teknologi Stack */}
      <TechStackSection />

      {/* 9. Portfolio & Concept Solutions */}
      <PortfolioSection
        onSelectPortfolio={onSelectPortfolio}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 10. Mengapa Memilih SMART-AI.ID */}
      <WhyChooseUsSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 11. Sebelum & Sesudah Transformasi AI */}
      <BeforeAfterSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 12. Dampak & Nilai Tambah AI */}
      <AIValueSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 13. Testimonial & Kepercayaan Klien */}
      <TestimonialsSection onOpenConsultation={onOpenConsultation} />

      {/* 14. FAQ Section (10 Questions) */}
      <FAQSection
        onOpenConsultation={onOpenConsultation}
      />

      {/* 15. Contact CTA Section */}
      <ContactCTA
        onOpenConsultation={onOpenConsultation}
      />

      {/* 16. Request Application & Interactive Estimator Form */}
      <LeadFormSection
        initialData={initialLeadData}
      />
    </>
  );
};
