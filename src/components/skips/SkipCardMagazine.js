import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, TruckIcon, CalendarIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import Tooltip from '../ui/Tooltip';

const SkipCardMagazine = ({ skip }) => {
  const {
    size,
    hire_period_days,
    price_before_vat,
    allowed_on_road,
    allows_heavy_waste,
    vat
  } = skip;

  // Calculate total price with VAT
  const totalPrice = price_before_vat * (1 + vat / 100);
  
  // Determine size category for visual styling
  const sizeCategory = size <= 6 ? 'small' : size <= 10 ? 'medium' : size <= 16 ? 'large' : 'xlarge';
  
  // Color scheme based on size category
  const colorScheme = {
    small: {
      bg: 'from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30',
      accent: 'bg-green-500',
      text: 'text-green-700 dark:text-green-400',
      skipColor: '#22c55e',
      border: 'border-green-200 dark:border-green-800',
      badge: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400',
      lightBg: 'bg-green-50 dark:bg-green-900/20'
    },
    medium: {
      bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30',
      accent: 'bg-blue-500',
      text: 'text-blue-700 dark:text-blue-400',
      skipColor: '#3b82f6',
      border: 'border-blue-200 dark:border-blue-800',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    large: {
      bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30',
      accent: 'bg-purple-500',
      text: 'text-purple-700 dark:text-purple-400',
      skipColor: '#8b5cf6',
      border: 'border-purple-200 dark:border-purple-800',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400',
      lightBg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    xlarge: {
      bg: 'from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30',
      accent: 'bg-amber-500',
      text: 'text-amber-700 dark:text-amber-400',
      skipColor: '#f59e0b',
      border: 'border-amber-200 dark:border-amber-800',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400',
      lightBg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  };
  
  const scheme = colorScheme[sizeCategory];

  // Get the correct image file name based on skip size
  const getSkipImageSrc = (size) => {
    // For sizes that don't have images, map to closest available image
    let imageSize = size;
    
    // Use 12 Yard image for 14 and 16 yard skips
    if (size === 14 || size === 16) {
      imageSize = 12;
    }
    
    // For sizes 20 and 40, use .png extension, otherwise use .jpg
    const extension = (imageSize === 20 || imageSize === 40) ? '.png' : '.jpg';
    return `/images/${imageSize}-Yard-skip${extension}`;
  };

  return (
    <motion.div 
      className="col-span-1 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`overflow-hidden rounded-xl shadow-lg h-full flex flex-col bg-gradient-to-br ${scheme.bg} border border-gray-200 dark:border-gray-700`}>
        {/* Header Section */}
        <div className="relative pt-6 px-6 flex justify-between items-start">          
          {/* Title */}
          <div className="flex items-center flex-wrap">
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mr-2">
              {size} Yard Skip
            </h3>
            {size === 8 && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-full shadow-sm">
                <StarIcon className="h-3 w-3 mr-1 text-yellow-500 dark:text-yellow-400" />
                Popular
              </span>
            )}
          </div>
          
          {/* Info Tooltip */}
          <Tooltip skip={skip} />
        </div>
        
        {/* Skip Illustration */}
        <div className="flex justify-center items-center p-5 relative">
          {/* Skip Image */}
          <div className="relative w-full h-32 flex items-center justify-center">
            <img 
              src={getSkipImageSrc(size)}
              alt={`${size} Yard Skip`}
              className="max-h-full max-w-full object-contain drop-shadow-xl rounded-lg"
            />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="px-6 py-4 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-y-2 mb-4">
            <div className="w-full flex items-center">
              <CalendarIcon className={`h-4 w-4 mr-2 ${scheme.text}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{hire_period_days} day hire period</span>
            </div>
            <div className="w-full flex items-center">
              <TruckIcon className={`h-4 w-4 mr-2 ${scheme.text}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {allows_heavy_waste ? 'Suitable for heavy waste' : 'Light waste only'}
              </span>
            </div>
            <div className="w-full flex items-center">
              <MapPinIcon className={`h-4 w-4 mr-2 ${scheme.text}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {allowed_on_road ? 'Can be placed on road with permit' : 'Off-road placement only'}
              </span>
            </div>
          </div>
          
          {/* Perfect For Section */}
          <div className="mb-5 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 flex-grow">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2">Perfect for:</h4>
            <ul className="space-y-1">
              {size <= 6 && (
                <>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Small home renovations
                  </li>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Garden clearance
                  </li>
                </>
              )}
              
              {size > 6 && size <= 10 && (
                <>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Medium building projects
                  </li>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Home renovations
                  </li>
                </>
              )}
              
              {size > 10 && (
                <>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Large construction jobs
                  </li>
                  <li className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Commercial clearance
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="px-6 pb-6">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Total Price</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">£{totalPrice.toFixed(0)}</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Inc. VAT</p>
          </div>
          
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            Select
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkipCardMagazine; 