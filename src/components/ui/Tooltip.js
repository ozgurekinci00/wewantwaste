import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const Tooltip = ({ skip }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button 
        className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors focus:outline-none"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-label="Skip information"
      >
        <InformationCircleIcon className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-72 p-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 text-left transform -translate-x-1/2 left-1/2 md:left-auto md:transform-none md:right-0">
          <div className="text-sm">
            <p className="text-gray-700 dark:text-gray-300 mb-3 font-normal">{skip.description}</p>
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dimensions</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skip.volume.imperial} ({skip.volume.metric})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Length</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skip.length.imperial} ({skip.length.metric})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Width</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skip.width.imperial} ({skip.width.metric})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skip.height.imperial} ({skip.height.metric})
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 md:left-auto md:right-5 transform -translate-x-1/2 md:translate-x-0 w-4 h-4 rotate-45 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip; 