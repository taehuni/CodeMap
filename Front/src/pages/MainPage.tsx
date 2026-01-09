import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Star,
  ChevronRight,
  Filter,
  Play,
  Code,
  Award,
  MessageSquare,
  ThumbsUp,
  Eye,
  Zap
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'project', label: '프로젝트' },
    { id: 'challenge', label: '챌린지' },
    { id: 'test', label: '코딩 테스트' },
    { id: 'community', label: '커뮤니티' }
  ];

  const featuredProject = {
    title: 'AI 코드 리뷰어와 함께하는 SNS 플랫폼 만들기',
    description: '실시간 채팅, 피드, 알림 시스템까지. AI가 매 단계마다 코드 리뷰와 개선 방안을 제시해드립니다',
    participants: 247,
    difficulty: '중급',
    duration: '8주 추천',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const projects = [
    {
      title: '실시간 협업 화이트보드',
      description: 'WebSocket과 Canvas API를 활용한 실시간 협업 툴',
      participants: 156,
      recruiting: 8,
      difficulty: '중급-고급',
      tags: ['React', 'WebSocket', 'Canvas'],
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'HOT'
    },
    {
      title: 'AI 챗봇 서비스',
      description: 'OpenAI API를 활용한 맞춤형 챗봇 개발',
      participants: 203,
      recruiting: 5,
      difficulty: '고급',
      tags: ['Python', 'FastAPI', 'OpenAI'],
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'NEW'
    },
    {
      title: '날씨 대시보드 앱',
      description: 'API 연동과 데이터 시각화 실습 프로젝트',
      participants: 342,
      recruiting: 0,
      difficulty: '초급',
      tags: ['JavaScript', 'API', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: null
    },
    {
      title: '이커머스 플랫폼',
      description: '결제 시스템을 포함한 실전 쇼핑몰 개발',
      participants: 189,
      recruiting: 12,
      difficulty: '중급-고급',
      tags: ['Next.js', 'Stripe', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: null
    },
    {
      title: '포트폴리오 웹사이트',
      description: '나만의 개발자 포트폴리오 사이트 제작',
      participants: 523,
      recruiting: 0,
      difficulty: '초급-중급',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: null
    },
    {
      title: '실시간 주식 트래커',
      description: 'WebSocket으로 실시간 데이터 스트리밍',
      participants: 167,
      recruiting: 6,
      difficulty: '중급',
      tags: ['React', 'WebSocket', 'D3.js'],
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: null
    }
  ];

  const challenges = [
    {
      title: '주간 알고리즘 챌린지',
      description: '이번 주 주제: 동적 프로그래밍',
      participants: 342,
      endDate: '3일 남음',
      prize: '🏆 1등 상금 100,000원',
      difficulty: '중급'
    },
    {
      title: '프론트엔드 UI 챌린지',
      description: 'Figma 디자인을 완벽하게 구현하기',
      participants: 189,
      endDate: '5일 남음',
      prize: '🎁 베스트 포트폴리오 선정',
      difficulty: '초급-중급'
    },
    {
      title: '백엔드 API 설계 챌린지',
      description: 'RESTful API 최적화 경진대회',
      participants: 127,
      endDate: '7일 남음',
      prize: '💼 현직자 멘토링 기회',
      difficulty: '고급'
    }
  ];

  const codingTests = [
    {
      title: '두 수의 합',
      description: '배열에서 타겟 값을 만드는 두 수의 인덱스 찾기',
      difficulty: '쉬움',
      solved: 2847,
      acceptance: 87,
      tags: ['배열', '해시테이블']
    },
    {
      title: '이진 트리의 최대 깊이',
      description: '이진 트리의 루트부터 가장 먼 리프까지의 거리',
      difficulty: '중간',
      solved: 1653,
      acceptance: 72,
      tags: ['트리', 'DFS', '재귀']
    },
    {
      title: '문자열 압축',
      description: '연속된 문자를 개수와 함께 압축하기',
      difficulty: '쉬움',
      solved: 3124,
      acceptance: 91,
      tags: ['문자열', '구현']
    },
    {
      title: '최장 증가 부분 수열',
      description: 'LIS 문제의 길이를 구하기',
      difficulty: '어려움',
      solved: 892,
      acceptance: 45,
      tags: ['동적계획법', '이진탐색']
    }
  ];

  const communityPosts = [
    {
      title: 'React 18의 Concurrent Features 정리',
      author: '개발자A',
      category: '기술 토론',
      likes: 234,
      comments: 45,
      views: 1847,
      time: '2시간 전'
    },
    {
      title: '신입 개발자 면접 후기 공유합니다',
      author: '취준생B',
      category: '커리어',
      likes: 189,
      comments: 67,
      views: 2341,
      time: '5시간 전'
    },
    {
      title: 'TypeScript 타입 가드 패턴 모음',
      author: '타입마스터',
      category: '지식 공유',
      likes: 312,
      comments: 28,
      views: 1523,
      time: '1일 전'
    },
    {
      title: '프로젝트 팀원 구합니다 (Next.js)',
      author: '프로젝트리더',
      category: '팀원 모집',
      likes: 67,
      comments: 23,
      views: 856,
      time: '1일 전'
    }
  ];

  return (
    <DashboardLayout>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden mb-8">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="text-white z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI와 함께하는 프로젝트</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-4">{featuredProject.title}</h2>
            <p className="text-white/90 mb-6 text-lg">{featuredProject.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredProject.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{featuredProject.participants}명 참여중</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{featuredProject.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>{featuredProject.difficulty}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              프로젝트 시작하기
            </button>
          </div>

          <div className="hidden md:block">
            <div className="relative h-full">
              <img 
                src={featuredProject.image}
                alt="Featured Project"
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
        <button className="px-6 py-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap flex items-center gap-2">
          <Filter className="w-4 h-4" />
          필터
        </button>
      </div>

      {/* 프로젝트 Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-gray-900 mb-1">진행 가능한 프로젝트</h3>
            <p className="text-gray-600">AI와 함께 실전 프로젝트를 완성해보세요</p>
          </div>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            전체보기
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => navigate(`/workspace/${index + 1}`)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.badge && (
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${
                    project.badge === 'NEW' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {project.badge}
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <h4 className="text-lg text-gray-900 mb-2 line-clamp-1">{project.title}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.participants}</span>
                    </div>
                    {project.recruiting > 0 && (
                      <span className="text-green-600">
                        +{project.recruiting}명
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {project.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 챌린지 Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-gray-900 mb-1">이번 주 챌린지</h3>
            <p className="text-gray-600">실력을 겨루고 성장하세요</p>
          </div>
          <Link to="/challenge" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            전체보기
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              onClick={() => navigate('/challenge')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-10 h-10 text-yellow-500" />
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {challenge.endDate}
                </span>
              </div>

              <h4 className="text-lg text-gray-900 mb-2">{challenge.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-900">{challenge.prize}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants}명 참여중</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  참여하기 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 코딩 테스트 Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-gray-900 mb-1">인기 코딩 테스트</h3>
            <p className="text-gray-600">알고리즘 실력을 키워보세요</p>
          </div>
          <Link to="/coding-test" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            전체보기
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {codingTests.map((test, index) => (
            <div
              key={index}
              onClick={() => navigate('/coding-test')}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg text-gray-900 mb-1">{test.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {test.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ml-4 ${
                  test.difficulty === '쉬움' 
                    ? 'bg-green-100 text-green-700'
                    : test.difficulty === '중간'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {test.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{test.solved.toLocaleString()}명 해결</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>정답률 {test.acceptance}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 커뮤니티 Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-gray-900 mb-1">인기 커뮤니티 글</h3>
            <p className="text-gray-600">개발자들의 지식과 경험을 나눠보세요</p>
          </div>
          <Link to="/community" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            전체보기
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {communityPosts.map((post, index) => (
            <div
              key={index}
              onClick={() => navigate('/community')}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <h4 className="text-lg text-gray-900 mb-1">{post.title}</h4>
                  <p className="text-sm text-gray-600">by {post.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
