import React from 'react';
import { PreferencesProvider } from './context/PreferencesContext';
import Layout from './components/layout/Layout';
import SkipShowcase from './components/skips/SkipShowcase';
import skipData from './skipData.json';

function App() {
  return (
    <PreferencesProvider>
      <Layout>
        <div className="max-w-7xl mx-auto mb-12">
          {/* Enhanced Page header */}
          <div className="relative text-center mb-12 py-12 px-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-blue-200/30 dark:bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-blue-300/30 dark:bg-blue-500/10 rounded-full translate-x-1/4 translate-y-1/4 blur-xl"></div>
            
            {/* Content container with z-index to appear above the decorative elements */}
            <div className="relative z-10">
              <div className="inline-block animate-fadeIn">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                  Find the Perfect <span className="text-blue-600 dark:text-blue-400 relative inline-block animate-float">
                    Skip
                    <svg className="absolute inset-x-0 bottom-0 sm:-bottom-1 md:-bottom-2 h-2 sm:h-3 md:h-4 text-blue-400 dark:text-blue-700" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M0,0 Q50,12 100,0" fill="currentColor" />
                    </svg>
                  </span> for You
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We offer a range of skip sizes to suit any job, from small garden clearance to large construction projects.
              </p>
            </div>
          </div>
          
          {/* Main content - Using new showcase component */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
            <SkipShowcase skips={skipData} />
          </div>
        </div>
      </Layout>
    </PreferencesProvider>
  );
}

export default App;
