import React from 'react';
import { Github, MessageCircle, Twitter } from 'lucide-react';
import CodeMapLogo from './CodeMapLogo';

const footerLinks = {
  features: [
    'AI 로드맵',
    '프로젝트 관리',
    '팀 협업',
    '코딩 테스트',
    '챌린지'
  ],
  community: [
    '공지사항',
    '이용 가이드',
    'FAQ',
    '이벤트'
  ],
  support: [
    '문의하기',
    '버그 리포트',
    '기능 제안',
    '이용약관',
    '개인정보처리방침'
  ]
};

export default function Footer() {
  return (
    <footer 
      className="bg-gray-900 text-white px-[5.5vw] py-[5.5vw]"
      style={{ 
        paddingLeft: 'max(5.5vw, 80px)', 
        paddingRight: 'max(5.5vw, 80px)',
        paddingTop: 'max(5.5vw, 80px)',
        paddingBottom: 'max(5.5vw, 80px)'
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <CodeMapLogo variant="white" />
            <p className="text-gray-400 mt-4 max-w-md">
              AI와 함께하는 개발자 성장 플랫폼
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-lg mb-6">기능</h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-lg mb-6">커뮤니티</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support - Full Width Row */}
        <div className="mb-12">
          <h3 className="text-lg mb-6">지원</h3>
          <ul className="grid md:grid-cols-5 grid-cols-2 gap-3">
            {footerLinks.support.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 CodeMap. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <button className="hover:text-white transition-colors">한국어</button>
              <span>|</span>
              <button className="hover:text-white transition-colors">English</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
