import React, { createContext, useContext, useState, useEffect } from 'react';

// Available layout types
export const LAYOUTS = {
  MAGAZINE: 'MAGAZINE',
  SHOWCASE: 'SHOWCASE'
};

// Context setup
const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // State for the current layout - initialize to SHOWCASE instead of MAGAZINE
  const [layout, setLayout] = useState(LAYOUTS.SHOWCASE);

  // Update theme in localStorage and document when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Update layout in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('layout', layout);
  }, [layout]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Function to set layout by type
  const setLayoutType = (layoutType) => {
    if (Object.values(LAYOUTS).includes(layoutType)) {
      setLayout(layoutType);
    }
  };

  // Function to toggle between layouts
  const toggleLayout = () => {
    setLayout(prevLayout => 
      prevLayout === LAYOUTS.MAGAZINE ? LAYOUTS.SHOWCASE : LAYOUTS.MAGAZINE
    );
  };

  const value = {
    darkMode,
    toggleDarkMode,
    layout,
    setLayoutType,
    toggleLayout,
    LAYOUTS,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

// Custom hook for using the preferences context
export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
} 