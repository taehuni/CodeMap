import React, { useState } from 'react';
import { 
  Map, 
  FolderKanban, 
  Code, 
  Trophy, 
  MessageSquare, 
  Bell, 
  Search,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Sparkles
} from 'lucide-react';
import CodeMapLogo from '../components/CodeMapLogo';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigationItems = [
    { icon: Map, label: 'AI 로드맵', href: '#roadmap', badge: null },
    { icon: FolderKanban, label: '내 프로젝트', href: '#projects', badge: '3' },
    { icon: Code, label: '코딩 테스트', href: '#coding-test', badge: null },
    { icon: Trophy, label: '챌린지', href: '#challenge', badge: 'New' },
    { icon: MessageSquare, label: '커뮤니티', href: '#community', badge: null },
  ];

  const roadmaps = [
    {
      title: 'React 풀스택 개발자',
      progress: 67,
      currentStep: '3주 차 - Redux 상태 관리',
      totalSteps: 12,
      completedSteps: 8,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Node.js 백엔드 마스터',
      progress: 42,
      currentStep: '2주 차 - Express.js 심화',
      totalSteps: 10,
      completedSteps: 4,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'TypeScript 완벽 가이드',
      progress: 85,
      currentStep: '5주 차 - 고급 타입 패턴',
      totalSteps: 6,
      completedSteps: 5,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const projects = [
    {
      title: '실시간 채팅 앱',
      team: 4,
      progress: 78,
      dueDate: '7일 남음',
      status: 'active'
    },
    {
      title: 'AI 이미지 생성기',
      team: 2,
      progress: 35,
      dueDate: '14일 남음',
      status: 'active'
    },
    {
      title: '개인 포트폴리오',
      team: 1,
      progress: 90,
      dueDate: '3일 남음',
      status: 'review'
    }
  ];

  const recentActivities = [
    {
      type: 'challenge',
      text: '주간 알고리즘 챌린지에서 5위를 기록했습니다',
      time: '2시간 전',
      icon: Trophy
    },
    {
      type: 'roadmap',
      text: 'React 로드맵의 Redux 단계를 완료했습니다',
      time: '5시간 전',
      icon: CheckCircle2
    },
    {
      type: 'project',
      text: '실시간 채팅 앱에 새로운 기능을 추가했습니다',
      time: '1일 전',
      icon: FolderKanban
    },
    {
      type: 'community',
      text: '커뮤니티 게시글에 10개의 좋아요를 받았습니다',
      time: '2일 전',
      icon: MessageSquare
    }
  ];

  const stats = [
    { label: '완료한 문제', value: '127', change: '+12', color: 'text-blue-600' },
    { label: '진행 중 프로젝트', value: '3', change: '+1', color: 'text-green-600' },
    { label: '획득한 뱃지', value: '18', change: '+3', color: 'text-purple-600' },
    { label: '연속 학습일', value: '23일', change: '+1', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <CodeMapLogo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
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
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-900">대시보드</h1>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>

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
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl text-gray-900 mb-2">안녕하세요, 개발자123님! 👋</h2>
            <p className="text-gray-600">오늘도 성장하는 하루 되세요</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl text-gray-900">{stat.value}</p>
                  <span className={`text-sm ${stat.color} flex items-center gap-1`}>
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl mb-2">새로운 로드맵을 시작해보세요</h3>
                <p className="text-white/90 mb-4">AI가 맞춤형 학습 경로를 추천해드립니다</p>
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI 로드맵 생성하기
                </button>
              </div>
              <div className="hidden lg:block">
                <Map className="w-32 h-32 text-white/20" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Roadmaps & Projects */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Roadmaps */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-gray-900">진행 중인 로드맵</h3>
                  <a href="#roadmap" className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                    모두 보기
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="space-y-4">
                  {roadmaps.map((roadmap, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg text-gray-900 mb-1">{roadmap.title}</h4>
                          <p className="text-sm text-gray-600">{roadmap.currentStep}</p>
                        </div>
                        <span className="text-2xl">{roadmap.progress}%</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${roadmap.color} rounded-full transition-all`}
                            style={{ width: `${roadmap.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{roadmap.completedSteps} / {roadmap.totalSteps} 단계 완료</span>
                        <button className="text-blue-500 hover:text-blue-600">계속하기 →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Projects */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-gray-900">진행 중인 프로젝트</h3>
                  <a href="#projects" className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                    모두 보기
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg text-gray-900 mb-2">{project.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.team}명
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {project.dueDate}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          project.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {project.status === 'active' ? '진행중' : '리뷰중'}
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="lg:col-span-1">
              <h3 className="text-xl text-gray-900 mb-4">최근 활동</h3>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 mb-1">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendations */}
              <div className="mt-6">
                <h3 className="text-xl text-gray-900 mb-4">추천</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-900 mb-2">💡 오늘의 챌린지</p>
                    <p className="text-xs text-blue-700 mb-3">두 포인터 알고리즘 문제를 풀어보세요</p>
                    <button className="text-xs text-blue-600 hover:text-blue-700">시작하기 →</button>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <p className="text-sm text-purple-900 mb-2">🎯 인기 스터디</p>
                    <p className="text-xs text-purple-700 mb-3">클린 코드 함께 읽기 - 5명 모집중</p>
                    <button className="text-xs text-purple-600 hover:text-purple-700">참여하기 →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
