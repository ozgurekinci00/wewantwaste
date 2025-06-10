import React, { useMemo, useState } from 'react';
import SkipCardMagazine from './SkipCardMagazine';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const GridView = ({ filteredSkips, filters, setFilters, toggleFilter }) => {
  // State to track if filter section is expanded
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Create array of available skip sizes for the filter UI
  const availableSizes = useMemo(() => [4, 6, 8, 10, 12, 14, 16, 20, 40], []);
  
  // Find the nearest available size that's not larger than the current max
  const findNearestSize = (currentSize) => {
    return availableSizes.reduce((prev, curr) => 
      (curr <= currentSize && curr > prev) ? curr : prev, 0);
  };

  // Toggle filter expansion
  const toggleFilterExpansion = () => {
    setIsFilterExpanded(prev => !prev);
  };
  
  return (
    <div>
      {/* Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Filter Header - Always visible */}
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleFilterExpansion}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Options</h3>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {filteredSkips.length} {filteredSkips.length === 1 ? 'option' : 'options'} available
            </span>
          </div>
          
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {isFilterExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
        
        {/* Filter Content - Collapsible */}
        {isFilterExpanded && (
          <div className="p-5 pt-0 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-4">
              {/* Toggle Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => toggleFilter('allowedOnRoad')}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors border ${
                    filters.allowedOnRoad 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600' 
                      : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  Road Allowed
                </button>
                
                <button
                  onClick={() => toggleFilter('allowsHeavyWaste')}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors border ${
                    filters.allowsHeavyWaste 
                      ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600' 
                      : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  Heavy Waste
                </button>
              </div>
              
              {/* Size Selector */}
              <div className="md:ml-auto md:w-64 lg:w-80">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Maximum Skip Size
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Up to {filters.sizeRange[1]} yards
                  </span>
                </div>
                
                <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={availableSizes.indexOf(findNearestSize(filters.sizeRange[1]))}
                    onChange={(e) => {
                      const sizeIndex = parseInt(e.target.value);
                      const newMaxSize = availableSizes[sizeIndex];
                      setFilters(prev => ({ 
                        ...prev, 
                        sizeRange: [prev.sizeRange[0], newMaxSize] 
                      }));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setFilters({
                  allowedOnRoad: false,
                  allowsHeavyWaste: false,
                  sizeRange: [0, 40]
                })}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Skip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkips.map(skip => (
          <SkipCardMagazine key={skip.id} skip={skip} />
        ))}
      </div>
    </div>
  );
};

export default GridView; 