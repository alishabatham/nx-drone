import React, { useState, useEffect } from 'react';
import { AdminProvider } from './context/AdminContext';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCRMModal } from './components/AdminCRMModal';
import { SectionEditModal } from './components/SectionEditModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeLayersStrategy } from './components/ThreeLayersStrategy';
import { WhatWeDo } from './components/WhatWeDo';
import { WorkflowSection } from './components/WorkflowSection';
import { ServicesCatalog } from './components/ServicesCatalog';
import { IndustriesSection } from './components/IndustriesSection';
import { PartnerSection } from './components/PartnerSection';
import { TrustQualitySection } from './components/TrustQualitySection';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';

import {
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_PROJECTS
} from './data/content';
import { LanguageMode, ServiceCategory, IndustryItem, ShowcaseProject } from './types';

function AppContent() {
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [categories, setCategories] = useState<ServiceCategory[]>(INITIAL_SERVICES);
  const [industries, setIndustries] = useState<IndustryItem[]>(INITIAL_INDUSTRIES);
  const [projects, setProjects] = useState<ShowcaseProject[]>(INITIAL_PROJECTS);
  const [inquiryInitialTab, setInquiryInitialTab] = useState<'project' | 'partner'>('project');
  const [inquiryServiceName, setInquiryServiceName] = useState<string>('');
  const [selectedServiceCatId, setSelectedServiceCatId] = useState<string>('all');

  // Load live data from Express backend if available
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const [servicesRes, industriesRes, projectsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/industries'),
          fetch('/api/projects')
        ]);

        if (servicesRes.ok) {
          const sJson = await servicesRes.json();
          if (sJson.data) setCategories(sJson.data);
        }
        if (industriesRes.ok) {
          const iJson = await industriesRes.json();
          if (iJson.data) setIndustries(iJson.data);
        }
        if (projectsRes.ok) {
          const pJson = await projectsRes.json();
          if (pJson.data) setProjects(pJson.data);
        }
      } catch (e) {
        // Fallback to initial seed content
        console.log('Using static initial datasets:', e);
      }
    };

    loadBackendData();
  }, []);

  const handleOpenInquiry = (tab: 'project' | 'partner' = 'project', serviceName: string = '') => {
    setInquiryInitialTab(tab);
    setInquiryServiceName(serviceName);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceCategory = (catId: string) => {
    setSelectedServiceCatId(catId);
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Top Admin Status & Action Bar (Visible when Admin is Logged In) */}
      <AdminBar />

      {/* Sticky Global Top Bar (No shopping bag or user icons!) */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenInquiry={handleOpenInquiry}
        onOpenAdmin={() => {}}
      />

      {/* Main Sections Flow - Entire Website visible as is */}
      <main className="flex-1">
        {/* Section 1: Hero with Master Blueprint Copy & 3D Terrain */}
        <Hero
          language={language}
          onOpenInquiry={handleOpenInquiry}
          onSelectService={(s) => handleOpenInquiry('project', s)}
        />

        {/* Section 1.5: 3 Pillars Architecture */}
        <ThreeLayersStrategy
          language={language}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Section 2: What We Do (Photo Cards Slider) */}
        <WhatWeDo
          language={language}
          onSelectCategory={handleSelectServiceCategory}
        />

        {/* Section 3: Process Pipeline */}
        <WorkflowSection
          language={language}
        />

        {/* Section 4: Complete 9-Category Service Catalogue */}
        <ServicesCatalog
          categories={categories}
          language={language}
          onOpenInquiry={handleOpenInquiry}
          selectedCategoryId={selectedServiceCatId}
        />

        {/* Section 5: Industries We Serve Slider */}
        <IndustriesSection
          industries={industries}
          language={language}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Section 6: Partner With NX */}
        <PartnerSection
          language={language}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Section 7: Quality & Trust Architecture */}
        <TrustQualitySection
          language={language}
        />

        {/* Section 8: Lead Capture Inquiry Form */}
        <InquiryForm
          language={language}
          initialTab={inquiryInitialTab}
          initialServiceName={inquiryServiceName}
        />
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onOpenInquiry={handleOpenInquiry}
        onOpenAdmin={() => {}}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal />

      {/* Admin Lead Management CRM Modal */}
      <AdminCRMModal />

      {/* Visual Live Section Editor Modal */}
      <SectionEditModal />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
