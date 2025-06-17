import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResumeBuilder } from './components/ResumeBuilder';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'builder'>('landing');

  const navigateToBuilder = () => {
    setCurrentPage('builder');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' ? (
        <LandingPage onGetStarted={navigateToBuilder} />
      ) : (
        <ResumeBuilder onBackToHome={navigateToLanding} />
      )}
    </div>
  );
}

export default App;