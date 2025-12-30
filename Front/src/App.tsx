import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProcessSection from './components/ProcessSection';
import CommunitySection from './components/CommunitySection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'login' | 'dashboard'>('home');

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'signup') setCurrentPage('signup');
      else if (hash === 'login') setCurrentPage('login');
      else if (hash === 'dashboard') setCurrentPage('dashboard');
      else setCurrentPage('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'signup') {
    return <SignUp />;
  }

  if (currentPage === 'login') {
    return <Login />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <CommunitySection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}