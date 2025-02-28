import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Check, X, DollarSign } from 'lucide-react';
import { formatPrice, conversionRates } from '../utils/storage';
import { Currency } from '../types';
import PaymentModal from './PaymentModal';

const InvestmentCalculator: React.FC = () => {
  const { userData, toggleFeatureSelection, calculateTotalInvestment, setCurrency } = useUser();
  const totalInvestment = calculateTotalInvestment();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  const formatPriceWithCurrency = (price: number) => {
    const rate = conversionRates[userData.selectedCurrency];
    const convertedPrice = Math.round(price * rate);
    return formatPrice(convertedPrice, userData.selectedCurrency);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Investment Calculator</h2>
        <div className="flex items-center">
          <select
            value={userData.selectedCurrency}
            onChange={handleCurrencyChange}
            className="mr-2 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="USD">USD ($)</option>
            <option value="KES">KES (KSh)</option>
            <option value="GHS">GHS (₵)</option>
          </select>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatPriceWithCurrency(totalInvestment)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {userData.features.map((feature) => (
          <div
            key={feature.id}
            className={`border rounded-lg p-4 transition-all ${
              feature.selected
                ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <button
                  onClick={() => !feature.mandatory && toggleFeatureSelection(feature.id)}
                  disabled={feature.mandatory}
                  className={`h-5 w-5 rounded flex items-center justify-center ${
                    feature.selected
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } ${feature.mandatory ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {feature.selected && <Check className="h-3 w-3" />}
                </button>
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {feature.name}
                    {feature.mandatory && (
                      <span className="ml-2 text-xs font-normal text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                    {feature.recurring && (
                      <span className="ml-2 text-xs font-normal text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">
                        Monthly
                      </span>
                    )}
                  </h3>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatPriceWithCurrency(feature.price)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Investment</span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {formatPriceWithCurrency(totalInvestment)}
          </span>
        </div>
        
        <button 
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          <span>Commit 40% Now ({formatPriceWithCurrency(totalInvestment * 0.4)})</span>
        </button>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={totalInvestment * 0.4}
          currency={userData.selectedCurrency}
        />
      </div>
    </div>
  );
};

export default InvestmentCalculator;