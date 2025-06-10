import React from 'react';
import { usePreferences, LAYOUTS } from '../../context/PreferencesContext';
import { SunIcon, MoonIcon, ViewColumnsIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ProgressTracker } from '../ui/ProgressTracker';

// Steps for the progress tracker
const steps = [
  { id: 'step-1', label: 'Postcode' },
  { id: 'step-2', label: 'Waste Type' },
  { id: 'step-3', label: 'Select Skip' },
  { id: 'step-4', label: 'Permit Check' },
  { id: 'step-5', label: 'Choose Date' },
  { id: 'step-6', label: 'Payment' }
];

const Header = () => {
  const { darkMode, toggleDarkMode, layout, toggleLayout } = usePreferences();

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <div className="mr-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              <path d="M8 12L20 4L32 12V28L20 36L8 28V12Z" fill={darkMode ? '#38bdf8' : '#0284c7'} />
              <path d="M14 20L20 16L26 20V28L20 32L14 28V20Z" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-blue-700 dark:text-blue-300">
              WeWantWaste
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Skip Hire Services</p>
          </div>
        </div>
        
        {/* Progress Tracker - only visible on md+ screens */}
        <div className="hidden md:flex flex-grow justify-center mx-4">
          <ProgressTracker steps={steps} currentStep="step-3" />
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-3 shrink-0 mb-2">
          {/* Layout Toggle */}
          <button 
            onClick={toggleLayout}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
            aria-label={layout === LAYOUTS.MAGAZINE ? "Switch to showcase layout" : "Switch to grid layout"}
            title={layout === LAYOUTS.MAGAZINE ? "Switch to showcase layout" : "Switch to grid layout"}
          >
            {layout === LAYOUTS.MAGAZINE ? (
              <ViewColumnsIcon className="h-5 w-5" />
            ) : (
              <Squares2X2Icon className="h-5 w-5" />
            )}
          </button>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 