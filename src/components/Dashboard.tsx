import React from 'react';
import { useUser } from '../context/UserContext';
import Navbar from './Navbar';
import Header from './Header';
import ScopeOfWork from './ScopeOfWork';
import InvestmentCalculator from './InvestmentCalculator';
import NextStepsTracker from './NextStepsTracker';
import DocumentManager from './DocumentManager';
import TeamSection from './TeamSection';
import NotesSection from './NotesSection';
import ScheduleMeeting from './ScheduleMeeting';
import Footer from './Footer';

const Dashboard: React.FC = () => {
  const { isDarkMode } = useUser();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-8">
              <ScopeOfWork />
              <DocumentManager />
              <TeamSection />
            </div>
            
            {/* Notes and Schedule - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block space-y-8">
              <NotesSection />
              <ScheduleMeeting />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <InvestmentCalculator />
            <NextStepsTracker />
          </div>

          {/* Notes and Schedule - Shown on mobile, hidden on desktop */}
          <div className="lg:hidden space-y-8">
            <NotesSection />
            <ScheduleMeeting />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;