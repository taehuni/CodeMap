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
  Sparkles,
  Play,
  GitBranch,
  Calendar,
  MoreVertical
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function MyPage() {
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

  const stats = [
    { label: '완료한 문제', value: '127', change: '+12', color: 'text-blue-600' },
    { label: '진행 중 프로젝트', value: '3', change: '+1', color: 'text-green-600' },
    { label: '획득한 뱃지', value: '18', change: '+3', color: 'text-purple-600' },
    { label: '연속 학습일', value: '23일', change: '+1', color: 'text-orange-600' }
  ];

  const myProjects = [
    {
      id: 1,
      title: '실시간 채팅 앱',
      description: 'Socket.io를 활용한 실시간 메시징 플랫폼',
      progress: 78,
      teamSize: 4,
      myRole: 'Frontend Lead',
      dueDate: '7일 남음',
      status: 'active',
      tech: ['React', 'Socket.io', 'Node.js'],
      lastUpdated: '2시간 전',
      aiAssisted: true
    },
    {
      id: 2,
      title: 'AI 이미지 생성기',
      description: 'DALL-E API를 이용한 이미지 생성 서비스',
      progress: 35,
      teamSize: 2,
      myRole: 'Full Stack',
      dueDate: '14일 남음',
      status: 'active',
      tech: ['Next.js', 'OpenAI', 'Tailwind'],
      lastUpdated: '1일 전',
      aiAssisted: true
    },
    {
      id: 3,
      title: '개인 포트폴리오',
      description: '인터랙티브한 개발자 포트폴리오 웹사이트',
      progress: 90,
      teamSize: 1,
      myRole: 'Solo Developer',
      dueDate: '3일 남음',
      status: 'review',
      tech: ['React', 'Framer Motion', 'CSS'],
      lastUpdated: '5시간 전',
      aiAssisted: false
    }
  ];

  const recentActivities = [
    {
      icon: CheckCircle2,
      text: '실시간 채팅 앱 - 메시지 전송 기능 완료',
      time: '2시간 전'
    },
    {
      icon: Code,
      text: '알고리즘 문제 3개 해결',
      time: '5시간 전'
    },
    {
      icon: Trophy,
      text: '"빠른 학습자" 뱃지 획득',
      time: '1일 전'
    },
    {
      icon: Users,
      text: 'React 스터디 그룹에 참여',
      time: '1일 전'
    },
    {
      icon: MessageSquare,
      text: '커뮤니티 질문에 답변',
      time: '2일 전'
    }
  ];

  return (
    <DashboardLayout>
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

            <div className="space-y-4">
              {myProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg text-gray-900">{project.title}</h4>
                        {project.aiAssisted && (
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs rounded-full inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI 도움
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          project.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {project.status === 'active' ? '진행중' : '리뷰중'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{project.teamSize}명</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          <span>{project.myRole}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{project.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{project.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">진행률</span>
                      <span className="text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      계속하기
                    </button>
                    {project.aiAssisted && (
                      <button className="text-purple-600 hover:text-purple-700 text-sm inline-flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        AI 피드백 보기
                      </button>
                    )}
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
    </DashboardLayout>
  );
}