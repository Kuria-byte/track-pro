import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.length !== 4) {
      setError('Access code must be 4 digits');
      setIsShaking(true);
      toast.error('Please enter a 4-digit code');
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    const success = login(accessCode);
    if (!success) {
      setError('Invalid access code');
      setIsShaking(true);
      toast.error('Invalid access code');
      setTimeout(() => setIsShaking(false), 600);
    } else {
      setIsSuccess(true);
      toast.success('Welcome back!');
      // Allow animation to complete before redirecting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-200 
          ${isShaking ? 'animate-shake' : ''} 
          ${isSuccess ? 'animate-success' : ''}`}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {isSuccess ? (
                <div className="animate-scale-up">
                  <Check className="h-12 w-12 text-green-500" />
                </div>
              ) : (
                <ShoppingBag className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300">Enter your 4-digit access code to view your e-commerce project</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access Code
              </label>
              <input
                type="text"
                id="accessCode"
                placeholder="Enter 4-digit code"
                value={accessCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value.length <= 4) {
                    setAccessCode(value);
                    setError('');
                  }
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-2xl tracking-widest bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                maxLength={4}
              />
              {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
            >
              Access Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;