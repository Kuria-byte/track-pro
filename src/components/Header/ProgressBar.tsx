import React from 'react';

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