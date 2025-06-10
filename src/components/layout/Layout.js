import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow mx-auto w-full px-4 sm:px-6 py-6 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 