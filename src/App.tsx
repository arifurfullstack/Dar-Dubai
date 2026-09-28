import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/ui/Toast';
import { ViewingModal } from './components/property/ViewingModal';
import { AuthModal } from './components/views/AuthModal';

import { HomeView } from './components/views/HomeView';
import { BrowsePropertiesView } from './components/views/BrowsePropertiesView';
import { BrowseRoomsView } from './components/views/BrowseRoomsView';
import { PropertyDetailView } from './components/views/PropertyDetailView';
import { RoomDetailView } from './components/views/RoomDetailView';
import { AreasView } from './components/views/AreasView';
import { AreaDetailView } from './components/views/AreaDetailView';
import { AgentsView } from './components/views/AgentsView';
import { AgentDetailView } from './components/views/AgentDetailView';
import { NewProjectsView } from './components/views/NewProjectsView';
import { SavedView } from './components/views/SavedView';
import { ListPropertyWizard } from './components/views/ListPropertyWizard';
import { ProfileView } from './components/views/ProfileView';

const AppContent: React.FC = () => {
  const { currentRoute, routeParams } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'rent':
        return <BrowsePropertiesView purpose="rent" />;
      case 'buy':
        return <BrowsePropertiesView purpose="sale" />;
      case 'rooms':
        return <BrowseRoomsView />;
      case 'property-detail':
        return <PropertyDetailView slug={routeParams.slug || ''} />;
      case 'room-detail':
        return <RoomDetailView slug={routeParams.slug || ''} />;
      case 'areas':
        return <AreasView />;
      case 'area-detail':
        return <AreaDetailView slug={routeParams.slug || ''} />;
      case 'agents':
        return <AgentsView />;
      case 'agent-detail':
        return <AgentDetailView slug={routeParams.slug || ''} />;
      case 'new-projects':
        return <NewProjectsView />;
      case 'saved':
        return <SavedView />;
      case 'list-property':
        return <ListPropertyWizard />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-950">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <MobileNav />
      <ToastContainer />
      <ViewingModal />
      <AuthModal />
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
