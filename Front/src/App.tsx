import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// 홈 페이지 컴포넌트
function HomePage() {
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

// 임시 페이지 컴포넌트 (나중에 실제 페이지로 대체)
function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">🚧 {title}</h1>
        <p className="text-gray-600 mb-6">곧 만나보실 수 있습니다!</p>
        <a href="/main" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          메인으로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/workspace/:projectId" element={<ProjectWorkspace />} />

        {/* 임시 페이지 - 나중에 구현 예정 */}
        <Route path="/challenge" element={<ComingSoonPage title="챌린지" />} />
        <Route path="/coding-test" element={<ComingSoonPage title="코딩 테스트" />} />
        <Route path="/community" element={<ComingSoonPage title="커뮤니티" />} />
        <Route path="/settings" element={<ComingSoonPage title="설정" />} />
      </Routes>
    </BrowserRouter>
  );
}