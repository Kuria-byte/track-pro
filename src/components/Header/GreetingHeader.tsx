// src/components/Header/GreetingHeader.tsx
import { Sun, Moon, Coffee, Sparkles } from 'lucide-react';

interface GreetingHeaderProps {
  greeting: string;
  userName: string;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ greeting, userName }) => {
  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return <Sun className="ml-2 h-6 w-6 text-yellow-400 animate-spin-slow" />;
    if (hour < 18) return <Coffee className="ml-2 h-6 w-6 text-orange-400 animate-bounce" />;
    return <Moon className="ml-2 h-6 w-6 text-blue-400 animate-pulse" />;
  };

  return (
    <div className="flex items-center group">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
        {greeting}, {userName}
      </h1>
      {getGreetingIcon()}
      <Sparkles className="ml-2 h-5 w-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

// src/components/Header/ProgressBar.tsx
interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => (
  <div className="mt-4 md:mt-0">
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Project Progress:
      </span>
      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
        {percentage}%
      </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
      <div
        className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);