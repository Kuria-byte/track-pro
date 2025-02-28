import React from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

const NextStepsTracker: React.FC = () => {
  const { userData } = useUser();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complete':
        return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400 animate-pulse" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'In Progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Next Steps</h2>

      <div className="space-y-4">
        {userData.milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-start">
            <div className="flex-shrink-0 mt-1">{getStatusIcon(milestone.status)}</div>
            <div className="ml-3 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{milestone.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusClass(milestone.status)}`}
                >
                  {milestone.status}
                </span>
              </div>
              {index < userData.milestones.length - 1 && (
                <div className="ml-2 h-6 border-l border-dashed border-gray-300 dark:border-gray-600"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
          <span>View Detailed Timeline</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NextStepsTracker;