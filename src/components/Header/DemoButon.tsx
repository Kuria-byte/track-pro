import React from 'react';

interface DemoButtonProps {
  status: 'online' | 'offline';
  onToggle: () => void;
}

export const DemoButton: React.FC<DemoButtonProps> = ({ status, onToggle }) => (
  <button
    onClick={onToggle}
    className="mt-4 flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
  >
    <span>View Demo</span>
    <span className="ml-2 flex items-center">
      <span className={`h-2 w-2 rounded-full ${
        status === 'online' ? 'bg-green-400' : 'bg-red-500'
      } animate-pulse`} />
      <span className="ml-1">{status}</span>
    </span>
  </button>
);