import React from 'react';
import { useUser } from '../context/UserContext';
import { LogOut, Moon, Sun, ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  const { logout, isDarkMode, toggleDarkMode } = useUser();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Track-Pro</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={logout}
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;