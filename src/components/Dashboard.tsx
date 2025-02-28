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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-8">
            <ScopeOfWork />
            <DocumentManager />
            <TeamSection />
          </div>
          <div className="space-y-8">
            <InvestmentCalculator />
            <NextStepsTracker />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NotesSection />
              <ScheduleMeeting />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;