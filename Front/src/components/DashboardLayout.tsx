import React, { useState } from 'react';
import { 
  FolderKanban, 
  Code, 
  Trophy, 
  MessageSquare, 
  Bell, 
  Search,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  User
} from 'lucide-react';
import CodeMapLogo from './CodeMapLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigationItems = [
    { icon: Home, label: '홈', href: '#main', badge: null },
    { icon: FolderKanban, label: '프로젝트', href: '#projects', badge: null },
    { icon: Code, label: '코딩 테스트', href: '#coding-test', badge: null },
    { icon: Trophy, label: '챌린지', href: '#challenge', badge: 'New' },
    { icon: MessageSquare, label: '커뮤니티', href: '#community', badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <CodeMapLogo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  <span className="text-gray-700 group-hover:text-gray-900">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.badge === 'New' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
          
          {/* Divider */}
          <div className="h-px bg-gray-200 my-2"></div>
          
          {/* My Page Link */}
          <a
            href="#mypage"
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <span className="text-gray-700 group-hover:text-gray-900">마이페이지</span>
            </div>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white">개</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-900">개발자123</p>
              <p className="text-xs text-gray-500">developer@email.com</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="#mypage" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">마이페이지</span>
              </a>
              <a href="#settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">설정</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                <LogOut className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">로그아웃</span>
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}