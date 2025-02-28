import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { GreetingHeader } from './Header/GreetingHeader';
import { ProgressBar } from './Header/GreetingHeader';
import { TeamStatus } from './Header/TeamStatus';
import { DemoButton } from './Header/DemoButon';

const Header: React.FC = () => {
  const { userData, toggleDemoStatus } = useUser();
  const [greeting, setGreeting] = useState<string>('');
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0,
    currentItems: [] as string[]
  });

  useEffect(() => {
    // Set greeting
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');

    // Calculate progress
    const completed = userData.scopeItems.filter(item => item.completed).length;
    const total = userData.scopeItems.length;
    const current = userData.scopeItems
      .filter(item => !item.completed)
      .slice(0, 2)
      .map(item => item.text);

    setProgress({
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      currentItems: current
    });
  }, [userData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <GreetingHeader greeting={greeting} userName={userData.name} />
          <TeamStatus currentItems={progress.currentItems} />
        </div>
        <ProgressBar percentage={progress.percentage} />
      </div>
      
      <DemoButton 
        status={userData.demoStatus} 
        onToggle={toggleDemoStatus} 
      />
    </div>
  );
};

export default Header;