import React, { useState } from 'react';
import { 
  CheckIcon, 
  XMarkIcon, 
  StarIcon, 
  CheckCircleIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid';
import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/24/outline';

const ComparisonView = ({ 
  filteredSkips, 
  selectedSize, 
  setSelectedSize, 
  setCompareMode, 
  setCurrentSlide, 
  skips,
  getColorScheme, 
  getSizeCategory,
  getPriceWithVAT
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (skipId) => {
    setExpandedRows(prev => ({
      ...prev,
      [skipId]: !prev[skipId]
    }));
  };
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compare All Skip Options</h2>
        <button 
          onClick={() => setCompareMode(false)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Back to Showcase
        </button>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
              <th className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Size</th>
              <th className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Price (inc. VAT)</th>
              <th className="hidden md:table-cell py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Hire Period</th>
              <th className="hidden md:table-cell py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Road Legal</th>
              <th className="hidden md:table-cell py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Heavy Waste</th>
              <th className="hidden md:table-cell py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Best For</th>
              <th className="py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {filteredSkips.map((skip) => {
              const scheme = getColorScheme(skip.size);
              const isSelected = skip.size === selectedSize;
              const isExpanded = expandedRows[skip.id];
              const bestFor = getSizeCategory(skip.size) === 'small' 
                ? 'Small projects, Garden' 
                : getSizeCategory(skip.size) === 'medium'
                  ? 'Medium projects' 
                  : getSizeCategory(skip.size) === 'large'
                    ? 'Large construction'
                    : 'Major industrial projects';
              
              return (
                <React.Fragment key={skip.id}>
                  <tr 
                    className={`${isSelected ? scheme.light : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'} transition-colors cursor-pointer`}
                    onClick={() => toggleRowExpansion(skip.id)}
                  >
                    <td className="py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{skip.size} Yard</span>
                        {skip.size === 8 && (
                          <span className="inline-flex items-center ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full shadow-sm">
                            <StarIcon className="h-3 w-3 mr-1 text-yellow-500 dark:text-yellow-400" />
                            Popular
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 dark:border-gray-700 font-medium">
                      £{getPriceWithVAT(skip).toFixed(0)}
                    </td>
                    <td className="hidden md:table-cell py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                      {skip.hire_period_days} days
                    </td>
                    <td className="hidden md:table-cell py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                      {skip.allowed_on_road ? (
                        <span className="inline-flex items-center text-green-600 dark:text-green-400">
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-600 dark:text-red-400">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          No
                        </span>
                      )}
                    </td>
                    <td className="hidden md:table-cell py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                      {skip.allows_heavy_waste ? (
                        <span className="inline-flex items-center text-green-600 dark:text-green-400">
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-600 dark:text-red-400">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          No
                        </span>
                      )}
                    </td>
                    <td className="hidden md:table-cell py-4 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                      {bestFor}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpansion(skip.id);
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded row with additional details */}
                  {isExpanded && (
                    <tr className={`${scheme.light} bg-opacity-50`}>
                      <td colSpan="7" className="p-0 border-b border-gray-200 dark:border-gray-700">
                        {/* Mobile-only summary of hidden columns */}
                        <div className="block md:hidden p-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Hire Period</p>
                              <p className="text-sm font-medium">{skip.hire_period_days} days</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Road Legal</p>
                              <p className="text-sm font-medium">
                                {skip.allowed_on_road ? (
                                  <span className="inline-flex items-center text-green-600 dark:text-green-400">
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    Yes
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-red-600 dark:text-red-400">
                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                    No
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Heavy Waste</p>
                              <p className="text-sm font-medium">
                                {skip.allows_heavy_waste ? (
                                  <span className="inline-flex items-center text-green-600 dark:text-green-400">
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    Yes
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-red-600 dark:text-red-400">
                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                    No
                                  </span>
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Best For</p>
                              <p className="text-sm font-medium">{bestFor}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 grid md:grid-cols-3 gap-6 animate-fadeIn">
                          {/* Skip Details */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <InformationCircleIcon className="h-4 w-4 mr-1.5" />
                              Skip Details
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1.5 mt-0.5" />
                                <span>Capacity: {skip.volume.imperial} ({skip.volume.metric})</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1.5 mt-0.5" />
                                <span>Dimensions: {skip.length.imperial} × {skip.width.imperial} × {skip.height.imperial} ({skip.length.metric} × {skip.width.metric} × {skip.height.metric})</span>
                              </li>
                            </ul>
                          </div>
                          
                          {/* Suitable For */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <CheckOutlineIcon className="h-4 w-4 mr-1.5" />
                              Suitable For
                            </h4>
                            <ul className="space-y-2 text-sm">
                              {getSizeCategory(skip.size) === 'small' && (
                                <>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Small renovations</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Garden waste clearance</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Small home clear-outs</span>
                                  </li>
                                </>
                              )}
                              {getSizeCategory(skip.size) === 'medium' && (
                                <>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Medium building projects</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Home renovations</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Office clearance</span>
                                  </li>
                                </>
                              )}
                              {getSizeCategory(skip.size) === 'large' && (
                                <>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Large construction jobs</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Commercial clearance</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Industrial waste</span>
                                  </li>
                                </>
                              )}
                              {getSizeCategory(skip.size) === 'xlarge' && (
                                <>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Major construction sites</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Industrial waste disposal</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Large-scale demolition</span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                    <span>Commercial site clearance</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          
                          {/* Additional Information */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <InformationCircleIcon className="h-4 w-4 mr-1.5" />
                              Additional Information
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                {skip.allowed_on_road ? (
                                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                ) : (
                                  <XMarkIcon className="h-4 w-4 text-red-500 mr-1.5 mt-0.5" />
                                )}
                                <span>
                                  {skip.allowed_on_road ? 'Can be placed on public roads' : 'Off-road placement only'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                <span>Next-day delivery available</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" />
                                <span>Free collection included</span>
                              </li>
                            </ul>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSize(skip.size);
                                setCurrentSlide(skips.findIndex(s => s.size === skip.size));
                                setCompareMode(false);
                              }}
                              className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonView; 