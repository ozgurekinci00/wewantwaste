import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 shadow-inner py-6 mt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} We Want Waste. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              Terms
            </a>
            <a href="/" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="/" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 