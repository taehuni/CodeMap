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
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectWorkspace from './pages/ProjectWorkspace';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'login' | 'main' | 'mypage' | 'projects' | 'workspace'>('home');
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'signup') setCurrentPage('signup');
      else if (hash === 'login') setCurrentPage('login');
      else if (hash === 'main') setCurrentPage('main');
      else if (hash === 'mypage') setCurrentPage('mypage');
      else if (hash === 'projects') setCurrentPage('projects');
      else if (hash.startsWith('workspace')) {
        setCurrentPage('workspace');
        const projectId = hash.split('=')[1];
        setCurrentProject(projectId);
      }
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

  if (currentPage === 'main') {
    return <MainPage />;
  }

  if (currentPage === 'mypage') {
    return <MyPage />;
  }

  if (currentPage === 'projects') {
    return <ProjectsPage />;
  }

  if (currentPage === 'workspace') {
    return <ProjectWorkspace projectId={currentProject} />;
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