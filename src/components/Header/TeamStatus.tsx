import React from 'react';
import { Users, Activity } from 'lucide-react';

interface TeamStatusProps {
  currentItems: string[];
}

export const TeamStatus: React.FC<TeamStatusProps> = ({ currentItems }) => (
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
        <span className="font-medium text-green-600 dark:text-green-400">
          completing final tasks
        </span>
      )}
    </p>
  </div>
);