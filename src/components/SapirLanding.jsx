import React from 'react';
import HeroSection from './HeroSection';
import AboutAndServices from './AboutAndServices';
import WhySapir from './WhySapir';
import ProjectsGallery from './ProjectsGallery';
import FAQSection from './FAQSection';
import LeadForm from './LeadForm';
import StickyContactBar from './StickyContactBar';

const SapirLanding = () => {
  return (
    <div className="font-hebrew bg-sapir-bg text-white min-h-screen relative overflow-hidden" dir="rtl">
      {/* 3D Spatial Interface Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sapir-blue-light/10 to-transparent"></div>
        {/* Floating holographic grids could go here */}
      </div>

      <div className="relative z-10">
        <HeroSection />
        <AboutAndServices />
        <WhySapir />
        <ProjectsGallery />
        <FAQSection />
        <LeadForm />
      </div>

      <StickyContactBar />
    </div>
  );
};

export default SapirLanding;
