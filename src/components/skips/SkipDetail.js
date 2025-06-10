import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/solid';
import Tooltip from '../ui/Tooltip';

const SkipDetail = ({ 
  selectedSkip, 
  getSkipImageSrc, 
  getColorScheme,
  getSizeCategory,
  getPriceWithVAT,
  itemVariants,
  imageVariants 
}) => {
  const scheme = getColorScheme(selectedSkip.size);

  return (
    <div className={`bg-gradient-to-br ${scheme.bg} rounded-2xl shadow-lg overflow-hidden border ${scheme.border}`}>
      <div className="flex flex-col md:flex-row">
        {/* Skip Image */}
        <div className="md:w-2/5 p-6 flex items-center justify-center">
          <motion.div
            variants={imageVariants} 
            className="relative"
          >
            <div className="h-64 w-64 relative flex items-center justify-center">
              <img 
                src={getSkipImageSrc(selectedSkip.size)} 
                alt={`${selectedSkip.size} Yard Skip`} 
                className="max-h-full max-w-full object-contain drop-shadow-xl rounded-xl"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Skip Details */}
        <div className="md:w-3/5 p-6 md:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <motion.div variants={itemVariants} className="flex justify-between items-start mb-4">
            <div className="flex items-center flex-wrap">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mr-2">
                {selectedSkip.size} Yard Skip
              </h2>
              {selectedSkip.size === 8 && (
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full shadow-sm">
                  <StarIcon className="h-3 w-3 mr-1 text-yellow-500 dark:text-yellow-400" />
                  Most popular
                </span>
              )}
            </div>
            
            {/* Info Tooltip */}
            <Tooltip skip={selectedSkip} />
          </motion.div>
          
          <div className="space-y-6">
            {/* Key Features */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                    <CheckIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{selectedSkip.hire_period_days} day hire period</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                    {selectedSkip.allows_heavy_waste ? (
                      <CheckIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <XMarkIcon className="h-3 w-3 text-red-600 dark:text-red-400" />
                    )}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedSkip.allows_heavy_waste ? 'Suitable for heavy waste' : 'Light waste only'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                    {selectedSkip.allowed_on_road ? (
                      <CheckIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                    ) : (
                      <XMarkIcon className="h-3 w-3 text-red-600 dark:text-red-400" />
                    )}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedSkip.allowed_on_road ? 'Can be placed on road with permit' : 'Off-road placement only'}
                  </span>
                </li>
              </ul>
            </motion.div>
            
            {/* Perfect For */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Perfect For</h3>
              <div className="flex flex-wrap gap-2">
                {getSizeCategory(selectedSkip.size) === 'small' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Small home renovations</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Garden clearance</span>
                  </>
                )}
                {getSizeCategory(selectedSkip.size) === 'medium' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Medium building projects</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Home renovations</span>
                  </>
                )}
                {getSizeCategory(selectedSkip.size) === 'large' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Large construction</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Commercial projects</span>
                  </>
                )}
                {getSizeCategory(selectedSkip.size) === 'xlarge' && (
                  <>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Industrial use</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">Major construction</span>
                  </>
                )}
              </div>
            </motion.div>
            
            {/* Price and CTA */}
            <motion.div variants={itemVariants} className="flex items-end justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Price (inc. VAT)</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">£{getPriceWithVAT(selectedSkip).toFixed(0)}</p>
              </div>
              
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg transition-colors">
                Select
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipDetail; 