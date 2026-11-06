import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CommunitySection } from './components/CommunitySection';
import { EventsSection } from './components/EventsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { FaqAssistant } from './components/FaqAssistant';
import { DashboardContainer } from './components/DashboardContainer';
import { ProjectDeliverablesHub } from './components/ProjectDeliverablesHub';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="flex-1">
        {activeView === 'home' && <Hero onOpenAuth={() => setIsAuthOpen(true)} />}
        {activeView === 'community' && <CommunitySection />}
        {activeView === 'events' && <EventsSection />}
        {activeView === 'resources' && <ResourcesSection />}
        {activeView === 'opportunities' && <OpportunitiesSection />}
        {activeView === 'analytics' && <AnalyticsSection />}
        {activeView === 'faq' && <FaqAssistant />}
        {activeView === 'dashboard' && <DashboardContainer />}
        {activeView === 'flask-deliverables' && <ProjectDeliverablesHub />}
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
