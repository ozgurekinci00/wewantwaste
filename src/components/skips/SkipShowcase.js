import React, { useState, useEffect } from 'react';
import { usePreferences, LAYOUTS } from '../../context/PreferencesContext';
import GridView from './GridView';
import CarouselView from './CarouselView';
import ComparisonView from './ComparisonView';

const SkipShowcase = ({ skips }) => {
  // Add the animation styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const { layout } = usePreferences();
  const [selectedSize, setSelectedSize] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    allowedOnRoad: false,
    allowsHeavyWaste: false,
    sizeRange: [0, 40]
  });
  const [filteredSkips, setFilteredSkips] = useState(skips);

  // Set the 8 yard skip as default selected
  useEffect(() => {
    if (skips.length > 0 && !selectedSize) {
      // Find the 8 yard skip
      const eightYardSkip = skips.find(skip => skip.size === 8);
      if (eightYardSkip) {
        setSelectedSize(8);
        // Find the index of the 8 yard skip to set the current slide
        const skipIndex = skips.findIndex(skip => skip.size === 8);
        if (skipIndex !== -1) {
          setCurrentSlide(skipIndex);
        }
      } else {
        // Fallback to the first skip if 8 yard skip is not found
        setSelectedSize(skips[0].size);
      }
    }
    setFilteredSkips(skips);
  }, [skips, selectedSize]);

  // Update filtered skips when filters change
  useEffect(() => {
    const filtered = skips.filter(skip => {
      // If filter is enabled, skip must match the condition
      if (filters.allowedOnRoad && !skip.allowed_on_road) {
        return false;
      }
      if (filters.allowsHeavyWaste && !skip.allows_heavy_waste) {
        return false;
      }
      // Check if skip size is within the selected range
      if (skip.size < filters.sizeRange[0] || skip.size > filters.sizeRange[1]) {
        return false;
      }
      return true;
    });
    
    setFilteredSkips(filtered);
  }, [skips, filters]);

  // Toggle filter function
  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Selected skip object
  const selectedSkip = skips.find(skip => skip.size === selectedSize);

  // Size category helpers
  const getSizeCategory = (size) => {
    if (size <= 6) return 'small';
    if (size <= 10) return 'medium'; 
    if (size <= 16) return 'large';
    return 'xlarge'; // 20 and 40 yard skips
  };
  
  const getColorScheme = (size) => {
    const category = getSizeCategory(size);
    return {
      small: {
        bg: 'from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30',
        accent: 'bg-green-500',
        text: 'text-green-700 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        skipColor: '#22c55e',
        light: 'bg-green-50 dark:bg-green-900/20'
      },
      medium: {
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30',
        accent: 'bg-blue-500',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        skipColor: '#3b82f6',
        light: 'bg-blue-50 dark:bg-blue-900/20'
      },
      large: {
        bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30',
        accent: 'bg-purple-500',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        skipColor: '#8b5cf6',
        light: 'bg-purple-50 dark:bg-purple-900/20'
      },
      xlarge: {
        bg: 'from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30',
        accent: 'bg-amber-500',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        skipColor: '#f59e0b',
        light: 'bg-amber-50 dark:bg-amber-900/20'
      }
    }[category];
  };

  // Calculate prices with VAT
  const getPriceWithVAT = (skip) => skip.price_before_vat * (1 + skip.vat / 100);

  return (
    <div>
      {layout === LAYOUTS.MAGAZINE && (
        <GridView 
          filteredSkips={filteredSkips}
          filters={filters}
          setFilters={setFilters}
          toggleFilter={toggleFilter}
        />
      )}
      
      {layout === LAYOUTS.SHOWCASE && (
        compareMode ? (
          <ComparisonView
            filteredSkips={filteredSkips}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setCompareMode={setCompareMode}
            setCurrentSlide={setCurrentSlide}
            skips={skips}
            getColorScheme={getColorScheme}
            getSizeCategory={getSizeCategory}
            getPriceWithVAT={getPriceWithVAT}
          />
        ) : (
          <CarouselView
            skips={skips}
            selectedSkip={selectedSkip}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setCompareMode={setCompareMode}
            getColorScheme={getColorScheme}
            getSizeCategory={getSizeCategory}
            getPriceWithVAT={getPriceWithVAT}
          />
        )
      )}
    </div>
  );
};

export default SkipShowcase; 