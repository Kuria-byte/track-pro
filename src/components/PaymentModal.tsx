import React, { useState } from 'react';
import { Copy, X, Check, Users } from 'lucide-react';
import { Currency } from '../types';

interface PaymentRecipient {
  name: string;
  phone: string;
  role: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: Currency;
}

const PAYMENT_RECIPIENTS: PaymentRecipient[] = [
  {
    name: "Ian Kuria",
    phone: "+254769912227",
    role: "Technical Services"
  },
  {
    name: "Sylvia",
    phone: "+254700042818",
    role: "Social Media Marketing"
  }
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, currency }) => {
  const [copied, setCopied] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<PaymentRecipient>(PAYMENT_RECIPIENTS[0]);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedRecipient.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatCurrency = (amount: number, currency: Currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        {/* Close button overlay */}
        <div 
          className="fixed inset-0 -z-10"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal panel */}
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Details
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-lg p-4">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount Due</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
            </div>

            {/* Recipient Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Select Recipient
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_RECIPIENTS.map((recipient) => (
                  <button
                    key={recipient.phone}
                    onClick={() => setSelectedRecipient(recipient)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedRecipient.phone === recipient.phone
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-400'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {recipient.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {recipient.role}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mpesa Number
                </label>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="font-mono text-gray-900 dark:text-white">
                    {selectedRecipient.phone}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className={`ml-2 p-2 rounded-md transition-colors duration-200 ${
                      copied 
                        ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Please make your payment using Mpesa to complete the transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;