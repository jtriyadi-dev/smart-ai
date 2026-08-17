import React from 'react';
import { FAQSection } from '../components/FAQSection';

interface FAQPageProps {
  onOpenConsultation: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="py-16 bg-[#06090e]">
      <FAQSection onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
