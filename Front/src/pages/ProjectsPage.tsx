import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Users,
  Clock,
  Star,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import CreateProjectModal from '../components/CreateProjectModal';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 구인 중인 프로젝트 (실제 사용자들이 올린 프로젝트)
  const recruitingProjects = [
    {
      id: 1,
      title: '실시간 협업 화이트보드 앱 개발',
      description: 'Canvas API와 WebSocket을 활용한 실시간 협업 드로잉 툴을 함께 만들어갈 팀원을 찾습니다.',
      author: '개발자A',
      authorAvatar: '🧑‍💻',
      recruiting: 3,
      currentMembers: 5,
      totalMembers: 8,
      tech: ['React', 'WebSocket', 'Canvas', 'Node.js'],
      difficulty: '중급-고급',
      duration: '8주 예상',
      location: '온라인',
      postedDate: '2일 전',
      views: 234
    },
    {
      id: 2,
      title: 'SNS 클론 코 프로젝트',
      description: 'Instagram 같은 소셜 네트워크를 처음부터 만들어봅니다. 백엔드 개발자 구합니다!',
      author: '프로젝트리더',
      authorAvatar: '👨‍💼',
      recruiting: 2,
      currentMembers: 10,
      totalMembers: 12,
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      difficulty: '중급',
      duration: '10주 예상',
      location: '온라인',
      postedDate: '1주 전',
      views: 456
    },
    {
      id: 3,
      title: '이커머스 플랫폼 개발팀 모집',
      description: '결제 시스템을 포함한 본격적인 쇼핑몰 서비스 개발. 장기 프로젝트입니다.',
      author: '스타트업러',
      authorAvatar: '🚀',
      recruiting: 5,
      currentMembers: 7,
      totalMembers: 12,
      tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      difficulty: '중급-고급',
      duration: '12주 예상',
      location: '서울 강남',
      postedDate: '3일 전',
      views: 678
    },
    {
      id: 4,
      title: 'AI 챗봇 서비스 팀원 모집',
      description: 'OpenAI API를 활용한 맞춤형 챗봇 서비스 개발. Python 개발자 환영!',
      author: 'AI매니아',
      authorAvatar: '🤖',
      recruiting: 2,
      currentMembers: 3,
      totalMembers: 5,
      tech: ['Python', 'FastAPI', 'OpenAI', 'Docker'],
      difficulty: '고급',
      duration: '6주 예상',
      location: '온라인',
      postedDate: '5일 전',
      views: 345
    },
    {
      id: 5,
      title: '모바일 날씨 앱 개발',
      description: 'React Native로 iOS/Android 날씨 앱 만들기. 디자이너도 구합니다!',
      author: '모바일러',
      authorAvatar: '📱',
      recruiting: 2,
      currentMembers: 2,
      totalMembers: 4,
      tech: ['React Native', 'API', 'TypeScript'],
      difficulty: '초급-중급',
      duration: '4주 예상',
      location: '온라인',
      postedDate: '1일 전',
      views: 123
    },
    {
      id: 6,
      title: '실시간 주식 트래커 개발',
      description: 'WebSocket으로 실시간 주식 데이터를 시각화하는 프로젝트',
      author: '트레이더',
      authorAvatar: '📈',
      recruiting: 3,
      currentMembers: 4,
      totalMembers: 7,
      tech: ['React', 'WebSocket', 'D3.js', 'Redis'],
      difficulty: '중급',
      duration: '7주 예상',
      location: '온라인',
      postedDate: '4일 전',
      views: 289
    }
  ];

  // 진행 중인 프로젝트 (팀원 모집 중이 아닌, 현재 개발 중인 프로젝트)
  const ongoingProjects = [
    {
      id: 201,
      title: '포트폴리오 웹사이트 제작',
      description: '개인 포트폴리오 사이트를 터랙티브하게 제작하고 있습니다',
      author: '프론트개발자',
      authorAvatar: '💻',
      teamSize: 1,
      progress: 75,
      tech: ['React', 'Framer Motion', 'Tailwind'],
      difficulty: '초급-중급',
      duration: '3주 진행 중',
      startedDate: '2주 전 시작',
      views: 156,
      status: 'in-progress'
    },
    {
      id: 202,
      title: '실시간 날씨 대시보드',
      description: 'OpenWeather API를 활용한 날씨 정보 시각화 프로젝트',
      author: '날씨매니아',
      authorAvatar: '🌤️',
      teamSize: 2,
      progress: 60,
      tech: ['JavaScript', 'Chart.js', 'API'],
      difficulty: '초급',
      duration: '2주 진행 중',
      startedDate: '1주 전 시작',
      views: 89,
      status: 'in-progress'
    },
    {
      id: 203,
      title: 'E-commerce 관리자 대시보드',
      description: '쇼핑몰 관리자를 위한 통계 및 주문 관리 시스템',
      author: '풀스택러',
      authorAvatar: '🛒',
      teamSize: 3,
      progress: 45,
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Recharts'],
      difficulty: '중급-고급',
      duration: '6주 진행 중',
      startedDate: '3주 전 시작',
      views: 267,
      status: 'in-progress'
    },
    {
      id: 204,
      title: '블로그 플랫폼',
      description: 'Markdown 지원하는 개인 블로그 서비스 개발',
      author: '작가개발자',
      authorAvatar: '✍️',
      teamSize: 2,
      progress: 85,
      tech: ['React', 'Node.js', 'MongoDB', 'Markdown'],
      difficulty: '중급',
      duration: '4주 진행 중',
      startedDate: '3주 전 시작',
      views: 198,
      status: 'in-progress'
    }
  ];

  // 진행 가능한 커리큘럼 프로젝트 (템플릿)
  const curriculumProjects = [
    {
      id: 101,
      title: 'To-Do 앱 만들기',
      description: '기본적인 CRUD 기능을 배우는 입문 프로젝트',
      difficulty: '초급',
      duration: '2주',
      tech: ['React', 'JavaScript', 'CSS'],
      participants: 523,
      rating: 4.8,
      completedCount: 412,
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 102,
      title: '날씨 대시보드',
      description: 'API 연동과 데이터 시각화 실습',
      difficulty: '초급',
      duration: '3주',
      tech: ['JavaScript', 'API', 'Chart.js'],
      participants: 342,
      rating: 4.5,
      completedCount: 256,
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 103,
      title: '포트폴리오 웹사이트',
      description: '나만의 개발자 포트폴리오 제작',
      difficulty: '초급-중급',
      duration: '4주',
      tech: ['HTML', 'CSS', 'JavaScript'],
      participants: 678,
      rating: 4.7,
      completedCount: 534,
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 104,
      title: '블로그 플랫폼',
      description: 'CRUD와 인증 시스템 구현',
      difficulty: '중급',
      duration: '6주',
      tech: ['React', 'Node.js', 'MongoDB'],
      participants: 445,
      rating: 4.6,
      completedCount: 289,
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 105,
      title: '실시간 채팅 앱',
      description: 'Socket.io로 실시간 통신 구현',
      difficulty: '중급',
      duration: '5주',
      tech: ['React', 'Socket.io', 'Express'],
      participants: 387,
      rating: 4.9,
      completedCount: 234,
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 106,
      title: '영화 추천 시스템',
      description: 'API 통합과 추천 알고리즘 구현',
      difficulty: '중급-고급',
      duration: '7주',
      tech: ['React', 'Python', 'Machine Learning'],
      participants: 298,
      rating: 4.8,
      completedCount: 167,
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 107,
      title: '이커머스 쇼핑몰',
      description: '결제 시스템 포함 풀스택 개발',
      difficulty: '고급',
      duration: '12주',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      participants: 234,
      rating: 4.9,
      completedCount: 89,
      image: 'https://images.unsplash.com/photo-1627634771121-fa3db5779f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzY2OTU5Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 108,
      title: 'AI 이미지 생성기',
      description: 'OpenAI DALL-E API 활용',
      difficulty: '고급',
      duration: '6주',
      tech: ['Next.js', 'OpenAI', 'TypeScript'],
      participants: 189,
      rating: 4.7,
      completedCount: 67,
      image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2Njk4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const difficulties = [
    { id: 'all', label: '전체 난이도' },
    { id: 'beginner', label: '초급' },
    { id: 'intermediate', label: '중급' },
    { id: 'advanced', label: '고급' }
  ];

  const techStack = [
    { id: 'all', label: '전체 기술' },
    { id: 'react', label: 'React' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'python', label: 'Python' },
    { id: 'nextjs', label: 'Next.js' }
  ];

  const handleCreateProject = (projectData: any) => {
    console.log('Creating project:', projectData);
    // TODO: API 호출로 프로젝트 생성
    // 프로젝트 생성 후 워크스페이스로 이동
    const projectId = Date.now().toString();

    // localStorage에 프로젝트 데이터 저장
    const projectWithId = {
      ...projectData,
      id: projectId,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`project_${projectId}`, JSON.stringify(projectWithId));

    // navigate에 state로 프로젝트 데이터 전달
    navigate(`/workspace/${projectId}${projectData.aiAssisted ? '?setup=true' : ''}`, {
      state: { project: projectWithId }
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl text-gray-900 mb-2">프로젝트</h2>
          <p className="text-gray-600">팀원을 구하거나 커리큘럼을 따라 프로젝트를 시작하세요</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
          새 프로젝트
        </button>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="프로젝트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {difficulties.map((diff) => (
              <option key={diff.id} value={diff.id}>{diff.label}</option>
            ))}
          </select>

          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {techStack.map((tech) => (
              <option key={tech.id} value={tech.id}>{tech.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 구인 중인 프로젝트 Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-gray-900">🤝 팀원을 구하는 프로젝트</h3>
            <p className="text-sm text-gray-600">함께 만들어갈 팀원을 찾고 있어요</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">더보기 →</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recruitingProjects.slice(0, 3).map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {project.authorAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm text-gray-900 truncate">{project.title}</h4>
                    <p className="text-xs text-gray-500">by {project.author}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap flex-shrink-0 ml-2">
                  모집중
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{project.currentMembers}/{project.totalMembers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                <div className="text-xs text-gray-500">
                  <span>{project.postedDate}</span>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs inline-flex items-center gap-1 whitespace-nowrap">
                  <Users className="w-3.5 h-3.5" />
                  참여 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 진행 중인 프로젝트 Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-gray-900">🚀 진행 중인 프로젝트</h3>
            <p className="text-sm text-gray-600">현재 개발이 활발히 진행되고 있는 프로젝트들</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">더보기 →</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {project.authorAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm text-gray-900 truncate">{project.title}</h4>
                    <p className="text-xs text-gray-500">by {project.author}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full whitespace-nowrap flex-shrink-0 ml-2">
                  진행중
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-600">진행률</span>
                  <span className="text-gray-900">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{project.teamSize}명</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                <div className="text-xs text-gray-500">
                  <span>조회 {project.views}</span>
                </div>
                <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-xs inline-flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" />
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 진행 가능한 커리큘럼 Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl text-gray-900">📚 진행 가능한 커리큘럼</h3>
            <p className="text-sm text-gray-600">단계별 가이드와 함께 프로젝트를 완성하세요</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">더보기 →</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {curriculumProjects.slice(0, 4).map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all group cursor-pointer flex flex-col">
              <div className="relative h-32 overflow-hidden flex-shrink-0">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {project.duration}
                </div>
              </div>
              
              <div className="p-3 flex flex-col flex-1">
                <h4 className="text-sm text-gray-900 mb-2 truncate">{project.title}</h4>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 2).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{project.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{project.rating}</span>
                  </div>
                </div>

                <button className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 text-xs mt-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                  시작하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}} />
    </DashboardLayout>
  );
}