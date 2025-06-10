import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, Bars3Icon } from '@heroicons/react/24/solid';
import Tooltip from '../ui/Tooltip';

const CarouselView = ({ 
  skips, 
  selectedSkip, 
  currentSlide, 
  setCurrentSlide, 
  selectedSize, 
  setSelectedSize, 
  setCompareMode,
  getColorScheme,
  getSizeCategory,
  getPriceWithVAT
}) => {
  // Handle slide navigation
  const handleNext = () => {
    if (currentSlide < skips.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setSelectedSize(skips[currentSlide + 1].size);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setSelectedSize(skips[currentSlide - 1].size);
    }
  };

  if (!selectedSkip) return null;
  
  const scheme = getColorScheme(selectedSkip.size);
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.25,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.25 }
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: { duration: 0.15 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };
  
  return (
    <div className="relative pb-16">
      {/* Skip Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="overflow-x-auto max-w-full pb-1 hide-scrollbar">
          <div className="bg-gray-50 dark:bg-gray-800 p-1 md:p-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 inline-flex">
            <div className="flex relative">
              {skips.map((skip, index) => {
                const isSelected = skip.size === selectedSize;
                const skipScheme = getColorScheme(skip.size);
                const category = getSizeCategory(skip.size);
                const isFirst = index === 0;
                const isLast = index === skips.length - 1;
                
                return (
                  <button
                    key={skip.id}
                    onClick={() => {
                      setSelectedSize(skip.size);
                      setCurrentSlide(index);
                    }}
                    className={`
                      relative z-10 px-2 sm:px-4 py-2 mx-0.5 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                      ${isSelected 
                        ? `text-white` 
                        : `text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300`}
                      ${isFirst ? 'rounded-l-lg' : ''}
                      ${isLast ? 'rounded-r-lg' : ''}
                      ${!isSelected && 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                  >
                    {/* Size Category Indicator */}
                    {!isSelected && (
                      <span 
                        className={`
                          absolute inset-x-0 bottom-0 h-0.5 opacity-40
                          ${category === 'small' ? 'bg-green-500' : 
                            category === 'medium' ? 'bg-blue-500' : 
                            category === 'large' ? 'bg-purple-500' : 'bg-amber-500'}
                        `}
                      ></span>
                    )}
                    
                    {/* Selection Background */}
                    {isSelected && (
                      <motion.span
                        layoutId="sizeSelectionBackground"
                        className={`absolute inset-0 rounded-lg ${skipScheme.accent}`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Button Text */}
                    <span className="relative">
                      {skip.size} Yard
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add styles to hide scrollbar but allow scrolling */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
      
      {/* Main Showcase Section */}
      <div className="relative">
        {/* Navigation Arrows - Previous */}
        {currentSlide > 0 && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 z-10">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              aria-label="Previous skip"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Navigation Arrows - Next */}
        {currentSlide < skips.length - 1 && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 z-10">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              aria-label="Next skip"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Main Content */}
        <div className="mx-auto max-w-4xl relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedSkip.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`bg-gradient-to-br ${scheme.bg} rounded-2xl shadow-lg overflow-hidden border ${scheme.border}`}
            >
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
                    <div>
                      <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                        {selectedSkip.size} Yard Skip
                      </h2>
                      {selectedSkip.size === 8 && (
                        <span className="inline-flex items-center mt-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-full shadow-sm">
                          <StarIcon className="h-4 w-4 mr-1 text-yellow-500 dark:text-yellow-400" />
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Button Row */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4">
        <button 
          onClick={() => setCompareMode(true)}
          className="px-5 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium flex items-center"
        >
          Compare All Options
          <Bars3Icon className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CarouselView; 