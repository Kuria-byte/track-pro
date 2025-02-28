import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Trash2, Check } from 'lucide-react';

const ScopeOfWork: React.FC = () => {
  const { userData, addScopeItem, removeScopeItem, toggleScopeItemCompletion } = useUser();
  const [newItemText, setNewItemText] = useState('');
  const [newItemMonth, setNewItemMonth] = useState(1);
  const [activeMonth, setActiveMonth] = useState(1);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      addScopeItem({
        text: newItemText.trim(),
        completed: false,
        month: newItemMonth,
      });
      setNewItemText('');
    }
  };

  const monthNames = ['Month 1', 'Month 2', 'Month 3'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Scope of Work</h2>

      <div className="flex space-x-2 mb-6">
        {monthNames.map((month, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeMonth === index + 1
                ? 'bg-indigo-600 dark:bg-indigo-700 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveMonth(index + 1)}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {userData.scopeItems
          .filter(item => item.month === activeMonth)
          .map(item => (
            <div
              key={item.id}
              className={`flex items-center p-3 rounded-md border ${
                item.completed 
                  ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => toggleScopeItemCompletion(item.id)}
                className={`flex-shrink-0 h-5 w-5 rounded border ${
                  item.completed
                    ? 'bg-green-500 border-green-500 flex items-center justify-center'
                    : 'border-gray-300 dark:border-gray-600'
                } mr-3`}
              >
                {item.completed && <Check className="h-3 w-3 text-white" />}
              </button>
              <span
                className={`flex-grow text-sm ${
                  item.completed 
                    ? 'text-gray-500 dark:text-gray-400 line-through' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {item.text}
              </span>
              <button
                onClick={() => removeScopeItem(item.id)}
                className="ml-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
      </div>

      <form onSubmit={handleAddItem} className="mt-4">
        <div className="flex items-center space-x-2">
          <select
            value={newItemMonth}
            onChange={(e) => setNewItemMonth(Number(e.target.value))}
            className="rounded-md border-gray-300 dark:border-gray-600 text-sm py-2 px-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new scope item..."
            className="flex-grow rounded-md border-gray-300 dark:border-gray-600 text-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-150"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScopeOfWork;