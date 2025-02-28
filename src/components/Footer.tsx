import React from 'react';
import { Heart, ShoppingBag, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-900/20 dark:to-purple-900/20 py-8 mt-8 border-t border-gray-200 dark:border-gray-700 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400 animate-bounce" />
              Track-Pro
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering your journey through technology
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {['About Us', 'Services', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">Connect With Us</h4>
            <div className="flex items-center justify-center md:justify-end space-x-4">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Mail, href: '#' }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 group"
                >
                  <Icon className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-pink-500 animate-pulse" /> by Ian & Sly
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            &copy; {currentYear} Track-Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;