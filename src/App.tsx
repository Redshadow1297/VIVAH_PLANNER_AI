import React, { useState } from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNavigation } from './components/common/MobileNavigation';
import { ToastContainer } from './components/common/Toast';
import { AuthScreens } from './components/auth/AuthScreens';

// All Feature Module Screens
import { WeddingDashboard } from './components/dashboard/WeddingDashboard';
import { WeddingPlanning } from './components/planning/WeddingPlanning';
import { EventManagement } from './components/events/EventManagement';
import { FamilyManagement } from './components/family/FamilyManagement';
import { GuestManagement } from './components/guests/GuestManagement';
import { InvitationManagement } from './components/invitations/InvitationManagement';
import { RsvpManagement } from './components/rsvp/RsvpManagement';
import { AccommodationManagement } from './components/logistics/AccommodationManagement';
import { TransportManagement } from './components/logistics/TransportManagement';
import { MealManagement } from './components/catering/MealManagement';
import { VendorManagement } from './components/vendors/VendorManagement';
import { BudgetManagement } from './components/budget/BudgetManagement';
import { TaskManager } from './components/tasks/TaskManager';
import { DocumentVault } from './components/documents/DocumentVault';
import { CommandCenter } from './components/command/CommandCenter';
import { ReportsAnalytics } from './components/reports/ReportsAnalytics';
import { NotificationsManagement } from './components/notifications/NotificationsManagement';
import { WeddingSettings } from './components/settings/WeddingSettings';

const WeddingAppContent: React.FC = () => {
  const { authScreen, activeTab, viewMode, setViewMode } = useWedding();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If user is in authentication / onboarding flow, render Auth screens
  if (authScreen !== 'authenticated') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#2C1810]">
        <AuthScreens />
        <ToastContainer />
      </div>
    );
  }

  // Render the selected tab's view
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WeddingDashboard />;
      case 'planning':
        return <WeddingPlanning />;
      case 'events':
        return <EventManagement />;
      case 'family':
        return <FamilyManagement />;
      case 'guests':
        return <GuestManagement />;
      case 'invitations':
        return <InvitationManagement />;
      case 'rsvp':
        return <RsvpManagement />;
      case 'accommodation':
        return <AccommodationManagement />;
      case 'transport':
        return <TransportManagement />;
      case 'meals':
        return <MealManagement />;
      case 'vendors':
        return <VendorManagement />;
      case 'budget':
        return <BudgetManagement />;
      case 'tasks':
        return <TaskManager />;
      case 'documents':
        return <DocumentVault />;
      case 'command-center':
        return <CommandCenter />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'settings':
        return <WeddingSettings />;
      default:
        return <WeddingDashboard />;
    }
  };

  // Mobile App Device Simulator View Mode
  if (viewMode === 'mobile') {
    return (
      <div className="min-h-screen bg-[#2A1318] flex flex-col items-center justify-center p-2 sm:p-6 font-sans antialiased">
        {/* Device Switcher Ribbon */}
        <div className="mb-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-400/30 flex items-center gap-4 text-xs text-amber-200">
          <span>📱 Viewing in Mobile App UI Simulation Mode</span>
          <button
            onClick={() => setViewMode('web')}
            className="px-3 py-1 bg-white text-[#7A1C2E] rounded-lg font-bold hover:bg-amber-100 transition-colors"
          >
            Switch to Full Web App
          </button>
        </div>

        {/* Mobile Device Frame */}
        <div className="w-full max-w-md h-[880px] max-h-[92vh] bg-[#FAF7F2] rounded-[42px] border-[10px] border-stone-800 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/20">
          {/* iOS / Android Camera Island */}
          <div className="bg-[#FAF7F2] pt-3 px-6 flex items-center justify-between z-40">
            <span className="text-[11px] font-bold text-stone-800">9:41</span>
            <div className="w-20 h-4 bg-stone-900 rounded-full" />
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-800">
              <span>5G</span>
              <div className="w-4 h-2 border border-stone-800 rounded-xs p-0.5">
                <div className="h-full bg-stone-800 w-full" />
              </div>
            </div>
          </div>

          {/* Sticky Header */}
          <Header onToggleSidebar={() => setIsSidebarOpen(true)} isSidebarOpen={isSidebarOpen} />

          {/* Main Scrollable Canvas inside Phone */}
          <main className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none">
            {renderTabContent()}
          </main>

          {/* Mobile Bottom Bar Navigation */}
          <MobileNavigation />
        </div>

        <ToastContainer />
      </div>
    );
  }

  // Responsive Web SaaS Layout
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans antialiased text-[#2C1810]">
      {/* Left Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(true)} isSidebarOpen={isSidebarOpen} />

        {/* Main Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <WeddingProvider>
      <WeddingAppContent />
    </WeddingProvider>
  );
}
