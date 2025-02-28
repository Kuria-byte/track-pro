import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Sun, Moon, Coffee, Activity, Users, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const { userData, toggleDemoStatus } = useUser();
  const [greeting, setGreeting] = useState<string>('');
  const [completedItems, setCompletedItems] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<string[]>([]);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Calculate progress
    const completed = userData.scopeItems.filter(item => item.completed).length;
    setCompletedItems(completed);
    setTotalItems(userData.scopeItems.length);

    // Get current scope items (not completed)
    const current = userData.scopeItems
      .filter(item => !item.completed)
      .slice(0, 2)
      .map(item => item.text);
    setCurrentItems(current);
  }, [userData]);

  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return <Sun className="ml-2 h-6 w-6 text-yellow-400 animate-spin-slow" />;
    } else if (hour < 18) {
      return <Coffee className="ml-2 h-6 w-6 text-orange-400 animate-bounce" />;
    } else {
      return <Moon className="ml-2 h-6 w-6 text-blue-400 animate-pulse" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center group">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {greeting}, {userData.name}
            </h1>
            {getGreetingIcon()}
            <Sparkles className="ml-2 h-5 w-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <Users className="h-4 w-4 text-gray-400 animate-pulse" />
            <p className="text-gray-600 dark:text-gray-300">
              Team is focusing on{' '}
              {currentItems.length > 0 ? (
                <span className="font-medium text-indigo-600 dark:text-indigo-400 inline-flex items-center">
                  {currentItems.join(' and ')}
                  <Activity className="ml-2 h-4 w-4 animate-pulse" />
                </span>
              ) : (
                <span className="font-medium text-green-600 dark:text-green-400 inline-flex items-center">
                  completing final tasks
                  <span className="ml-2 text-xs">🎉</span>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Project Progress:</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={toggleDemoStatus}
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
        >
          <span>View Demo</span>
          <span className="ml-2 flex items-center">
            <span className={`h-2 w-2 rounded-full ${userData.demoStatus === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-500 animate-pulse'}`}></span>
            <span className="ml-1">{userData.demoStatus === 'online' ? 'Online' : 'Offline'}</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;