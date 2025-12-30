import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CodeMapLogo from './CodeMapLogo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    'AI 로드맵',
    '프로젝트',
    '코딩 테스트',
    '챌린지',
    '커뮤니티'
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
      style={{ minHeight: '80px' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5.5vw] min-px-[80px] max-px-[120px]">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0" style={{ width: 'clamp(120px, 10.4vw, 150px)' }}>
            <CodeMapLogo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-grow justify-center items-center gap-[clamp(24px,2.5vw,36px)]">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#login" className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors">
              로그인
            </a>
            <a href="#signup" className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5">
              회원가입
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-500 py-2"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <a href="#login" className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors text-left">
                  로그인
                </a>
                <a href="#signup" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                  회원가입
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}