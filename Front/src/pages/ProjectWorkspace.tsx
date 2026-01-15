import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Code, 
  CheckCircle2, 
  Circle, 
  Users, 
  Globe, 
  Lock,
  Send,
  Loader2,
  FileCode,
  MessageSquare,
  Play,
  Save,
  Lightbulb,
  Layers,
  Wrench,
  TestTube,
  Calendar,
  UserPlus,
  Target,
  FileText,
  Workflow,
  Palette,
  Database,
  GitBranch,
  Settings,
  List,
  Bell,
  Vote,
  MessageCircle,
  ClipboardList,
  BarChart3,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  X,
  User,
  LogOut,
  Replace,
  FilePlus
} from 'lucide-react';
import ScheduleDetailModal from '../components/ScheduleDetailModal';
import ScheduleTimeline from '../components/ScheduleTimeline';
import AiProjectSetup from '../components/AiProjectSetup';
import AiPlanView from '../components/AiPlanView';
import AiAssistModal from '../components/AiAssistModal';

interface ProjectWorkspaceProps {
  projectId?: string;
}

export default function ProjectWorkspace({ projectId }: ProjectWorkspaceProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // 프로젝트 생성 시 전달된 데이터 또는 기본값 사용
  const getInitialProject = () => {
    // location.state에서 프로젝트 데이터 확인
    const stateProject = location.state?.project;
    if (stateProject) {
      return {
        id: projectId || String(Date.now()),
        name: stateProject.name || '',
        description: stateProject.description || '',
        category: stateProject.category || '',
        difficulty: stateProject.difficulty || '',
        duration: stateProject.duration || '',
        techStack: stateProject.techStack || [],
        teamMembers: stateProject.teamMembers || [],
        teamSize: stateProject.teamSize || 1,
        aiAssisted: stateProject.aiAssisted ?? true,
        isRecruiting: stateProject.isRecruiting ?? false,
        isPublic: stateProject.isPublic ?? true
      };
    }

    // 기본값 (프로젝트 데이터가 전달되지 않은 경우)
    return {
      id: projectId || '1',
      name: '새 프로젝트',
      description: '',
      category: '',
      difficulty: '',
      duration: '',
      techStack: [],
      teamMembers: [],
      teamSize: 1,
      aiAssisted: true,
      isRecruiting: false,
      isPublic: true
    };
  };

  const [project, setProject] = useState(getInitialProject);

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [newTech, setNewTech] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('tasks');
  const [selectedItem, setSelectedItem] = useState<string>('schedule');
  const [showAiChat, setShowAiChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // AI Setup states - URL 파라미터와 연동
  const showAiSetup = searchParams.get('setup') === 'true';

  // showAiSetup 상태 변경 함수 (URL 업데이트)
  const setShowAiSetup = useCallback((show: boolean) => {
    if (show) {
      setSearchParams({ setup: 'true' });
    } else {
      setSearchParams({});
    }
  }, [setSearchParams]);

  // 초기 로드 시 aiAssisted 파라미터 체크
  useEffect(() => {
    const url = window.location.href;
    if (url.includes('aiAssisted=true') && !showAiSetup) {
      setSearchParams({ setup: 'true' });
    }
  }, []);
  const [aiSetupMode, setAiSetupMode] = useState<'scratch' | 'guided' | null>(null);
  const [aiSetupData, setAiSetupData] = useState({
    // For 'scratch' mode
    freeInput: '',
    // For 'guided' mode
    devEnvironment: '',
    language: '',
    framework: '',
    topic: '',
    description: '',
    coreFeatures: [''],
    targetUsers: '',
    projectGoal: ''
  });
  
  // AI Plan state - stores the generated plan after AI setup
  const [aiPlan, setAiPlan] = useState<any>(null);
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '안녕하세요! 프로젝트 기획을 도와드리겠습니다. 무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // selectedItem이 변경될 때마다 AI 어시스턴트 메시지 초기화
  useEffect(() => {
    const getSectionMessage = (itemId: string) => {
      const messages: Record<string, string> = {
        'schedule': '안녕하세요! 프로젝트 일정을 함께 계획해볼까요? 원하는 일정 구조나 마일스톤을 말씀해주세요.',
        'task-management': '작업 관리를 도와드리겠습니다. 어떤 작업을 추가하거나 관리하고 싶으신가요?',
        'ai-plan': 'AI 기반 프로젝트 계획을 생성해드립니다. 프로젝트에 대해 자유롭게 설명해주세요.',
        'motivation': '프로젝트 동기 작성을 도와드립니다. 이 프로젝트를 시작하게 된 계기나 해결하고 싶은 문제를 말씀해주세요.',
        'goals': '프로젝트 목표 설정을 도와드립니다. 달성하고자 하는 구체적인 목표를 말씀해주세요.',
        'requirements': '요구사항 정의를 도와드립니다. 기능적/비기능적 요구사항을 함께 정리해볼까요?',
        'erd': 'ERD(Entity Relationship Diagram) 작성을 도와드립니다. 필요한 데이터 구조를 설명해주세요.',
        'usecase': '유즈케이스 작성을 도와드립니다. 사용자 시나리오를 함께 정리해볼까요?',
        'sequence-diagram': '시퀀스 다이어그램 작성을 도와드립니다. 어떤 프로세스를 다이어그램으로 만들고 싶으신가요?',
        'architecture': '시스템 아키텍처 설계를 도와드립니다. 원하는 아키텍처 구조를 말씀해주세요.',
        'information-architecture': '정보 구조도 작성을 도와드립니다. 사이트맵이나 정보 계층을 함께 설계해볼까요?',
        'code-review': '코드 리뷰를 도와드립니다. 리뷰받고 싶은 코드를 공유해주세요.',
        'team-members': '팀원 관리를 도와드립니다. 팀 구성이나 역할 분담에 대해 조언해드릴 수 있습니다.',
        'project-info': '프로젝트 정보 관리를 도와드립니다. 수정하거나 개선할 부분을 말씀해주세요.',
        'tech-stack': '기술 스택 선정을 도와드립니다. 프로젝트에 적합한 기술을 함께 고민해볼까요?'
      };

      return messages[itemId] || '안녕하세요! 이 섹션에서 무엇을 도와드릴까요?';
    };

    setChatMessages([
      {
        id: 1,
        sender: 'ai',
        text: getSectionMessage(selectedItem),
        timestamp: new Date()
      }
    ]);
  }, [selectedItem]);

  // Schedule management state (AI 생성 시 채워짐)
  const [schedules, setSchedules] = useState<Array<{
    id: number;
    title: string;
    description: string;
    startWeek: number;
    duration: number;
    color: string;
    icon: string;
    progress: number;
    assignees: Array<{ id: number; name: string; avatar: string }>;
    status: string;
    notes: string;
  }>>([]); // AI 생성 시 채워짐

  // Tasks state (세부 작업 - scheduleId로 일정과 연결, AI 생성 시 채워짐)
  const [tasks, setTasks] = useState<Array<{
    id: number;
    scheduleId: number;
    title: string;
    description: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
  }>>([]); // AI 생성 시 채워짐

  // 색상 매핑 (inline style용 hex 코드)
  const getColorHex = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6',
      purple: '#a855f7',
      green: '#22c55e',
      orange: '#f97316',
      pink: '#ec4899',
      cyan: '#06b6d4',
      red: '#ef4444',
      yellow: '#eab308',
    };
    return colorMap[color] || '#6b7280';
  };

  // 일정별 진행도 계산 함수
  const calculateScheduleProgress = (scheduleId: number) => {
    const scheduleTasks = tasks.filter(t => t.scheduleId === scheduleId);
    if (scheduleTasks.length === 0) return 0;
    const completedTasks = scheduleTasks.filter(t => t.completed).length;
    return Math.round((completedTasks / scheduleTasks.length) * 100);
  };

  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);

  // AI Assist Modal states
  const [aiAssistModal, setAiAssistModal] = useState<{
    isOpen: boolean;
    title: string;
    itemId: string;
  }>({
    isOpen: false,
    title: '',
    itemId: ''
  });
  
  // Document content states
  const [documentContents, setDocumentContents] = useState<Record<string, string>>({
    motivation: '',
    goals: '',
    requirements: '',
    erd: '',
    usecase: '',
    'sequence-diagram': '',
    architecture: '',
    'information-architecture': '',
    'code-review': ''
  });
  
  // Project structure categories
  const categories = [
    {
      id: 'tasks',
      label: '일정 및 작업 관리',
      icon: CheckCircle2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      items: [
        { id: 'schedule', label: '일정 관리', icon: Calendar },
        { id: 'task-management', label: '작업 관리', icon: CheckCircle2 }
      ]
    },
    {
      id: 'planning',
      label: '기획',
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      items: [
        { id: 'ai-plan', label: 'AI 계획', icon: Sparkles },
        { id: 'motivation', label: '프로젝트 동기', icon: Target },
        { id: 'goals', label: '프로젝트 목표', icon: Target },
        { id: 'requirements', label: '요구사항 정의', icon: FileText },
        { id: 'information-architecture', label: '정보구조도', icon: Workflow },
        { id: 'storyboard', label: '스토리보드', icon: Layers }
      ]
    },
    {
      id: 'design',
      label: '설계',
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        { id: 'usecase', label: '유스케이스 다이어그램', icon: Users },
        { id: 'erd', label: 'ERD', icon: Database },
        { id: 'class-diagram', label: '클래스 다이어그램', icon: Layers },
        { id: 'sequence-diagram', label: '시퀀스 다이어그램', icon: Workflow },
        { id: 'ui-design', label: 'UI 디자인', icon: Palette },
        { id: 'table-spec', label: '테이블 명세서', icon: Database },
        { id: 'architecture', label: '시스템 아키텍처', icon: Layers }
      ]
    },
    {
      id: 'development',
      label: '개발',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        { id: 'dev-setup', label: '개발환경 설정', icon: Settings },
        { id: 'dev-order', label: '기능별 개발 순서', icon: List },
        { id: 'commit-rules', label: '커밋 메시지 규칙', icon: GitBranch },
        { id: 'code-editor', label: '코드 에디터', icon: FileCode }
      ]
    },
    {
      id: 'testing',
      label: '테스트',
      icon: TestTube,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        { id: 'unit-test', label: '단위 테스트', icon: TestTube },
        { id: 'integration-test', label: '통합 테스트', icon: TestTube }
      ]
    },
    {
      id: 'collaboration',
      label: '협업',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      items: [
        { id: 'team-members', label: '팀원 관리', icon: UserPlus },
        { id: 'announcements', label: '공지사항', icon: Bell },
        { id: 'voting', label: '투표', icon: Vote },
        { id: 'retrospective', label: '회상 회의', icon: MessageCircle },
        { id: 'meeting-notes', label: '회의록', icon: ClipboardList },
        { id: 'reports', label: '보고서', icon: BarChart3 }
      ]
    },
    {
      id: 'settings',
      label: '설정',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      items: [
        { id: 'project-info', label: '프로젝트 정보', icon: FileText },
        { id: 'tech-stack', label: '기술 스택', icon: GitBranch }
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, newMessage]);
    setInputMessage('');
    setIsAiTyping(true);

    try {
      // 현재 카테고리와 섹션 이름 찾기
      const currentCategory = categories.find(c => c.id === selectedCategory);
      const currentItem = currentCategory?.items.find(i => i.id === selectedItem);

      // AI API 호출
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: {
            projectName: project.name,
            projectDescription: project.description,
            projectCategory: project.category,
            difficulty: project.difficulty,
            techStack: project.techStack,
            currentCategory: selectedCategory,
            currentSection: selectedItem,
            currentSectionLabel: currentItem?.label || selectedItem,
            aiPlan: aiPlan,
            schedules: schedules,
            currentContent: documentContents[selectedItem] || ''
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiResponse = {
          id: chatMessages.length + 2,
          sender: 'ai',
          text: data.response,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(data.error || 'AI 응답 오류');
      }
    } catch (error) {
      console.error('AI 채팅 오류:', error);
      const errorMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        text: '죄송합니다. AI 응답 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const renderContent = () => {
    const currentCategory = categories.find(c => c.id === selectedCategory);
    const currentItem = currentCategory?.items.find(i => i.id === selectedItem);

    if (!currentItem) return null;

    // Render different content based on selected item
    switch (selectedItem) {
      case 'ai-plan':
        return <AiPlanView aiPlan={aiPlan} />;
      
      case 'motivation':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">프로젝트 동기</h3>
                <p className="text-sm text-gray-600 mb-4">
                  이 프로젝트를 시작하게 된 배경과 동기를 작성하세요.
                </p>
              </div>
              <button
                onClick={() => setAiAssistModal({ isOpen: true, title: '프로젝트 동기', itemId: 'motivation' })}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI 자동 생성
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="프로젝트를 시작하게 된 동기, 해결하고자 하는 문제, 프로젝트의 필요성 등을 자유롭게 작성해주세요..."
                value={documentContents.motivation}
                onChange={(e) => setDocumentContents({ ...documentContents, motivation: e.target.value })}
              />
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">프로젝트 목표</h3>
                <p className="text-sm text-gray-600 mb-4">
                  구체적이고 측정 가능한 프로젝트 목표를 설정하세요.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAiAssistModal({ isOpen: true, title: '프로젝트 목표', itemId: 'goals' })}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI 자동 생성
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="프로젝트 목표와 성공 지표를 작성하세요..."
                value={documentContents.goals}
                onChange={(e) => setDocumentContents({ ...documentContents, goals: e.target.value })}
              />
            </div>
          </div>
        );

      case 'requirements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">요구사항 정의</h3>
                <p className="text-sm text-gray-600 mb-4">
                  기능적 요구사항과 비기능적 요구사항을 명세하세요.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAiAssistModal({ isOpen: true, title: '요구사항 정의', itemId: 'requirements' })}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI 자동 생성
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="기능적 요구사항과 비기능적 요구사항을 작성하세요..."
                value={documentContents.requirements}
                onChange={(e) => setDocumentContents({ ...documentContents, requirements: e.target.value })}
              />
            </div>
          </div>
        );

      case 'team-members':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">팀원 관리</h3>
                <p className="text-sm text-gray-600">
                  프로젝트에 참여하는 팀원들을 관리하세요.
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                팀원 초대
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.teamMembers.map((member) => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                      프로필
                    </button>
                    <button className="flex-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                      메시지
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        // 작업 완료 기반으로 진행도 계산하여 전달
        const schedulesWithProgress = schedules.map(schedule => ({
          ...schedule,
          progress: calculateScheduleProgress(schedule.id),
          status: (() => {
            const progress = calculateScheduleProgress(schedule.id);
            if (progress === 100) return 'completed';
            if (progress > 0) return 'in-progress';
            return 'pending';
          })()
        }));

        return (
          <ScheduleTimeline
            schedules={schedulesWithProgress}
            onScheduleClick={(schedule) => {
              setSelectedSchedule(schedule);
              setIsScheduleModalOpen(true);
            }}
          />
        );

      case 'task-management':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">작업 관리</h3>
                <p className="text-sm text-gray-600">
                  프로젝트 작업을 단계별로 관리하세요. 완료된 작업은 일정 진행도에 반영됩니다.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  전체 진행률: <span className="font-medium text-blue-600">
                    {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
                  </span>
                </div>
                <button
                  onClick={() => {
                    const newTask = {
                      id: Date.now(),
                      scheduleId: schedules[0]?.id || 0,
                      title: '새 작업',
                      description: '',
                      completed: false,
                      priority: 'medium' as const
                    };
                    setTasks([...tasks, newTask]);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  작업 추가
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {schedules.map((schedule) => {
                const scheduleTasks = tasks.filter(t => t.scheduleId === schedule.id);
                const completedCount = scheduleTasks.filter(t => t.completed).length;
                const progress = scheduleTasks.length > 0
                  ? Math.round((completedCount / scheduleTasks.length) * 100)
                  : 0;

                return (
                  <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColorHex(schedule.color) }}></div>
                        <h4 className="text-sm font-medium text-gray-900">{schedule.title}</h4>
                        <span className="text-xs text-gray-500">({schedule.description})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{ width: `${progress}%`, backgroundColor: getColorHex(schedule.color) }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-12">{progress}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {scheduleTasks.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">이 일정에 작업이 없습니다.</p>
                      ) : (
                        scheduleTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                              task.completed
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                            }`}
                            onClick={() => {
                              setTasks(tasks.map(t =>
                                t.id === task.id ? { ...t, completed: !t.completed } : t
                              ));
                            }}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm block truncate ${
                                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                              }`}>
                                {task.title}
                              </span>
                              {task.description && (
                                <span className="text-xs text-gray-500 truncate block">{task.description}</span>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {task.priority === 'high' ? '높음' : task.priority === 'medium' ? '중간' : '낮음'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setTasks(tasks.filter(t => t.id !== task.id));
                              }}
                              className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const newTask = {
                          id: Date.now(),
                          scheduleId: schedule.id,
                          title: '새 작업',
                          description: '',
                          completed: false,
                          priority: 'medium' as const
                        };
                        setTasks([...tasks, newTask]);
                      }}
                      className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      이 일정에 작업 추가
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'code-editor':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-2">코드 에디터</h3>
              <p className="text-sm text-gray-600 mb-4">
                AI의 도움을 받아 코드를 작성하고 관리하세요.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 h-[500px] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">main.tsx</span>
              </div>
              <pre className="text-sm text-gray-300 font-mono">
                <code>{`// AI가 생성한 코드가 여기에 표시됩니다\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>Hello, ${project.name}!</h1>\n    </div>\n  );\n}\n\nexport default App;`}</code>
              </pre>
            </div>
          </div>
        );

      case 'project-info':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-2">프로젝트 정보</h3>
              <p className="text-sm text-gray-600 mb-4">
                프로젝트의 기본 정보를 수정하세요.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">프로젝트 이름</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedProject.name}
                    onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">프로젝트 설명</label>
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={editedProject.description}
                    onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">카테고리</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedProject.category}
                      onChange={(e) => setEditedProject({ ...editedProject, category: e.target.value })}
                    >
                      <option>웹 개발</option>
                      <option>모바일 앱</option>
                      <option>데이터 분석</option>
                      <option>AI/ML</option>
                      <option>게임 개발</option>
                      <option>기타</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">난이도</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedProject.difficulty}
                      onChange={(e) => setEditedProject({ ...editedProject, difficulty: e.target.value })}
                    >
                      <option>입문</option>
                      <option>초급</option>
                      <option>중급</option>
                      <option>고급</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">예상 기간</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editedProject.duration}
                    onChange={(e) => setEditedProject({ ...editedProject, duration: e.target.value })}
                    placeholder="예: 6주"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm text-gray-900 mb-4">공개 설정</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        checked={editedProject.isPublic}
                        onChange={() => setEditedProject({ ...editedProject, isPublic: true })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          공개 프로젝트
                        </div>
                        <p className="text-xs text-gray-500 ml-6">누구나 프로젝트를 볼 수 있습니</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        checked={!editedProject.isPublic}
                        onChange={() => setEditedProject({ ...editedProject, isPublic: false })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          비공개 프로젝트
                        </div>
                        <p className="text-xs text-gray-500 ml-6">팀원만 프로젝트를 볼 수 있습니다</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedProject.isRecruiting}
                      onChange={(e) => setEditedProject({ ...editedProject, isRecruiting: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        팀원 모집 중
                      </div>
                      <p className="text-xs text-gray-500 ml-6">다른 개발자들이 프로젝트에 참���할 수 있습니다</p>
                    </div>
                  </label>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedProject.aiAssisted}
                      onChange={(e) => setEditedProject({ ...editedProject, aiAssisted: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI 도움 받기
                      </div>
                      <p className="text-xs text-gray-500 ml-6">AI가 프로젝트 진행을 도와줍니다</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setEditedProject(project)}
                  className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setProject(editedProject);
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        );

      case 'tech-stack':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-2">기술 스택</h3>
              <p className="text-sm text-gray-600 mb-4">
                프로젝트에 사용되는 기술 스택을 관리하세요.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-gray-900 mb-3">현재 기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.length > 0 ? (
                      project.techStack.map((tech, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                        >
                          <span className="text-sm">{tech}</span>
                          <button
                            onClick={() => {
                              const newTechStack = project.techStack.filter((_, i) => i !== index);
                              setProject({ ...project, techStack: newTechStack });
                            }}
                            className="text-blue-700 hover:text-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">추가된 기술 스택이 없습니다</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm text-gray-900 mb-3">기술 스택 추가</h4>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTech.trim()) {
                          setProject({ ...project, techStack: [...project.techStack, newTech.trim()] });
                          setNewTech('');
                        }
                      }}
                      placeholder="예: React, Node.js, MongoDB..."
                    />
                    <button
                      onClick={() => {
                        if (newTech.trim()) {
                          setProject({ ...project, techStack: [...project.techStack, newTech.trim()] });
                          setNewTech('');
                        }
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      추가
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter 키를 눌러도 추가할 수 있습니다
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm text-gray-900 mb-3">추천 기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {['TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
                      <button
                        key={tech}
                        onClick={() => {
                          if (!project.techStack.includes(tech)) {
                            setProject({ ...project, techStack: [...project.techStack, tech] });
                          }
                        }}
                        disabled={project.techStack.includes(tech)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          project.techStack.includes(tech)
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">{currentItem.label}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  이 섹션의 내용을 작성하세요.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAiAssistModal({ isOpen: true, title: currentItem.label, itemId: selectedItem })}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI 자동 생성
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="내용을 입력하세요..."
                value={documentContents[selectedItem] || ''}
                onChange={(e) => setDocumentContents({ ...documentContents, [selectedItem]: e.target.value })}
              />
            </div>
          </div>
        );
    }
  };

  // Show AI Setup screen if needed
  if (showAiSetup) {
    return (
      <AiProjectSetup
        projectName={project.name}
        projectInfo={{
          description: project.description,
          category: project.category,
          difficulty: project.difficulty,
          techStack: project.techStack,
          duration: project.duration,
          teamSize: project.teamSize
        }}
        onComplete={async (data, mode) => {
          console.log('AI Setup completed:', { data, mode });

          // 먼저 설정 화면 닫고 로딩 화면 표시
          setShowAiSetup(false);
          setIsGeneratingPlan(true);
          setAiSetupData(data);
          setAiSetupMode(mode);

          try {
            // AI API 호출하여 계획 생성
            const response = await fetch('http://localhost:5000/api/ai/generate-plan', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mode,
                data,
                projectInfo: {
                  name: project.name,
                  description: project.description,
                  category: project.category,
                  difficulty: project.difficulty,
                  techStack: project.techStack,
                  duration: project.duration,
                  teamSize: project.teamSize,
                  isPublic: project.isPublic
                }
              }),
            });

            const result = await response.json();

            if (result.success && result.plan) {
              // API 응답으로 받은 계획 저장
              setAiPlan({
                ...result.plan,
                mode,
                inputData: data
              });

              // 일정과 작업을 분리해서 저장
              if (result.plan.schedule && result.plan.schedule.length > 0) {
                const baseScheduleId = Date.now();
                const baseTaskId = Date.now() + 1000;

                // 일정 생성 (대략적인 기간만)
                let cumulativeWeek = 1;
                const newSchedules = result.plan.schedule.map((s: any, index: number) => {
                  const startWeek = cumulativeWeek;
                  const duration = s.duration || 1;
                  cumulativeWeek += duration;

                  return {
                    id: baseScheduleId + index,
                    title: s.title || s.goal || `${s.phase || s.week}`,
                    description: s.goal || `${s.phase || index + 1}주차 일정`,
                    startWeek,
                    duration,
                    color: ['blue', 'purple', 'green', 'orange', 'pink', 'cyan'][index % 6],
                    icon: 'Calendar',
                    progress: 0,
                    assignees: [],
                    status: 'pending' as const,
                    notes: ''
                  };
                });

                // 세부 작업 생성 (각 일정에 연결)
                const newTasks: Array<{
                  id: number;
                  scheduleId: number;
                  title: string;
                  description: string;
                  completed: boolean;
                  priority: 'high' | 'medium' | 'low';
                }> = [];
                let taskIdCounter = 0;

                result.plan.schedule.forEach((s: any, scheduleIndex: number) => {
                  if (s.tasks && Array.isArray(s.tasks)) {
                    s.tasks.forEach((taskTitle: string) => {
                      newTasks.push({
                        id: baseTaskId + taskIdCounter,
                        scheduleId: baseScheduleId + scheduleIndex,
                        title: taskTitle,
                        description: '',
                        completed: false,
                        priority: taskIdCounter < 3 ? 'high' : 'medium'
                      });
                      taskIdCounter++;
                    });
                  }
                });

                // roadmap에서도 작업 추출
                if (result.plan.roadmap && Array.isArray(result.plan.roadmap)) {
                  result.plan.roadmap.forEach((phase: any, phaseIndex: number) => {
                    if (phase.tasks && Array.isArray(phase.tasks)) {
                      phase.tasks.forEach((task: any) => {
                        // 해당 phase에 맞는 schedule 찾기
                        const matchingScheduleIndex = Math.min(phaseIndex, newSchedules.length - 1);
                        newTasks.push({
                          id: baseTaskId + taskIdCounter,
                          scheduleId: baseScheduleId + matchingScheduleIndex,
                          title: typeof task === 'string' ? task : task.title,
                          description: typeof task === 'object' ? task.description || '' : '',
                          completed: false,
                          priority: task.priority === 'high' ? 'high' : 'medium'
                        });
                        taskIdCounter++;
                      });
                    }
                  });
                }

                // 기존 데이터 대체 (중복 방지)
                setSchedules(newSchedules);
                setTasks(newTasks);
              }
            } else {
              // API 실패 시 기본 데이터로 설정
              if (mode === 'guided') {
                setAiPlan({
                  description: data.description,
                  targetUsers: data.targetUsers,
                  projectGoal: data.projectGoal,
                  languages: data.languages || [],
                  frameworks: data.frameworks || [],
                  coreFeatures: data.coreFeatures.filter((f: string) => f.trim() !== ''),
                  mode: 'guided'
                });
              } else {
                setAiPlan({
                  freeInput: data.freeInput,
                  mode: 'scratch'
                });
              }
            }
          } catch (error) {
            console.error('AI 계획 생성 오류:', error);
            // 오류 시 기본 데이터로 설정
            if (mode === 'guided') {
              setAiPlan({
                description: data.description,
                targetUsers: data.targetUsers,
                projectGoal: data.projectGoal,
                languages: data.languages || [],
                frameworks: data.frameworks || [],
                coreFeatures: data.coreFeatures.filter((f: string) => f.trim() !== ''),
                mode: 'guided'
              });
            } else {
              setAiPlan({
                freeInput: data.freeInput,
                mode: 'scratch'
              });
            }
          } finally {
            // 로딩 종료 및 AI 계획 화면으로 이동
            setSelectedCategory('planning');
            setSelectedItem('ai-plan');
            setIsGeneratingPlan(false);
          }
        }}
        onBack={() => navigate(-1)}
      />
    );
  }

  // AI 계획 생성 중 로딩 화면
  if (isGeneratingPlan) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <Sparkles className="w-10 h-10 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI가 프로젝트 계획을 생성하고 있습니다</h2>
          <p className="text-gray-600 mb-4">잠시만 기다려주세요...</p>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl text-gray-900">{project.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {project.aiAssisted && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                      <Sparkles className="w-3 h-3" />
                      AI 지원
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {project.isPublic ? (
                      <span className="inline-flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        공개
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        비공개
                      </span>
                    )}
                  </span>
                  {project.isRecruiting && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                      <Users className="w-3 h-3" />
                      모집중
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2">
                <Save className="w-4 h-4" />
                저장
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <Play className="w-4 h-4" />
                실행
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button
                onClick={() => navigate('/mypage')}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                title="마이페이지"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Categories */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs text-gray-500 uppercase mb-3">프로젝트 단계</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        if (selectedCategory === category.id) {
                          // 이미 선택된 카테고리를 다시 클릭하면 접기
                          setSelectedCategory('');
                          setSelectedItem('');
                        } else {
                          // 새로운 카테고리 선택 시 펼치기
                          setSelectedCategory(category.id);
                          setSelectedItem(category.items[0].id);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        isActive
                          ? `${category.bgColor} ${category.color}`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm flex-1 text-left">{category.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isActive && (
                      <div className="ml-4 mt-2 space-y-1">
                        {category.items.map((item) => {
                          const ItemIcon = item.icon;
                          const isItemActive = selectedItem === item.id;
                          
                          return (
                            <button
                              key={item.id}
                              onClick={() => setSelectedItem(item.id)}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                isItemActive
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <ItemIcon className="w-3.5 h-3.5" />
                              <span className="text-xs">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

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
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto transition-all duration-300">
          <div className="p-6 max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>

        {/* AI Chat Sidebar */}
        <div
          className={`
            ${showAiChat ? 'w-96' : 'w-0'}
            bg-white border-l border-gray-200
            flex flex-col
            transition-all duration-300 ease-in-out
            overflow-hidden
            h-full
          `}
        >
          {showAiChat && (
            <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h3 className="text-sm text-white font-medium">AI 어시스턴트</h3>
              </div>
              <button
                onClick={() => setShowAiChat(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  } rounded-2xl px-4 py-3 shadow-sm`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    {message.sender === 'ai' && message.id !== 1 && documentContents.hasOwnProperty(selectedItem) && (
                      <div className="mt-3 flex gap-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => {
                            // 덮어쓰기: Replace current document content
                            if (selectedItem && documentContents.hasOwnProperty(selectedItem)) {
                              setDocumentContents({
                                ...documentContents,
                                [selectedItem]: message.text
                              });
                              const successMsg = {
                                id: chatMessages.length + 1,
                                sender: 'ai',
                                text: '✅ 내용을 덮어썼습니다!',
                                timestamp: new Date()
                              };
                              setChatMessages(prev => [...prev, successMsg]);
                            }
                          }}
                          className="
                            flex-1 px-3 py-2
                            bg-gradient-to-r from-purple-500 to-pink-500
                            hover:from-purple-600 hover:to-pink-600
                            text-white text-xs font-medium rounded-lg
                            inline-flex items-center justify-center gap-1.5
                            transition-all duration-200 shadow-sm hover:shadow
                          "
                        >
                          <Replace className="w-3.5 h-3.5" />
                          덮어쓰기
                        </button>
                        <button
                          onClick={() => {
                            // 추가하기: Append to current document content
                            if (selectedItem && documentContents.hasOwnProperty(selectedItem)) {
                              const currentContent = documentContents[selectedItem];
                              const newContent = currentContent
                                ? `${currentContent}\n\n${message.text}`
                                : message.text;
                              setDocumentContents({
                                ...documentContents,
                                [selectedItem]: newContent
                              });
                              const successMsg = {
                                id: chatMessages.length + 1,
                                sender: 'ai',
                                text: '✅ 내용을 추가했습니다!',
                                timestamp: new Date()
                              };
                              setChatMessages(prev => [...prev, successMsg]);
                            }
                          }}
                          className="
                            flex-1 px-3 py-2
                            bg-gradient-to-r from-blue-500 to-cyan-500
                            hover:from-blue-600 hover:to-cyan-600
                            text-white text-xs font-medium rounded-lg
                            inline-flex items-center justify-center gap-1.5
                            transition-all duration-200 shadow-sm hover:shadow
                          "
                        >
                          <FilePlus className="w-3.5 h-3.5" />
                          추가하기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
                  className="
                    flex-1 px-4 py-3
                    border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    text-sm placeholder-gray-400
                    transition-all duration-200
                  "
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="
                    px-5 py-3
                    bg-gradient-to-r from-blue-600 to-blue-500
                    hover:from-blue-700 hover:to-blue-600
                    text-white rounded-lg
                    transition-all duration-200
                    disabled:from-gray-300 disabled:to-gray-300
                    disabled:cursor-not-allowed
                    disabled:hover:shadow-none
                    shadow-sm hover:shadow
                    flex items-center justify-center
                  "
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating AI Button */}
      {!showAiChat && (
        <button
          onClick={() => setShowAiChat(true)}
          className="
            fixed bottom-6 right-6
            w-14 h-14 md:w-16 md:h-16
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:from-blue-700 hover:to-purple-700
            text-white rounded-full
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            flex items-center justify-center
            z-40
            hover:scale-110
            active:scale-95
          "
          aria-label="AI 어시스턴트 열기"
        >
          <Sparkles className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      )}

      {/* Schedule Detail Modal */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setSelectedSchedule(null);
        }}
        onUpdate={(updatedSchedule) => {
          setSchedules(schedules.map(s => 
            s.id === updatedSchedule.id ? updatedSchedule : s
          ));
          setSelectedSchedule(null);
        }}
        onDelete={(id) => {
          setSchedules(schedules.filter(s => s.id !== id));
        }}
        teamMembers={project.teamMembers}
      />

      {/* AI Assist Modal */}
      <AiAssistModal
        isOpen={aiAssistModal.isOpen}
        onClose={() => setAiAssistModal({ isOpen: false, title: '', itemId: '' })}
        title={aiAssistModal.title}
        userContent={documentContents[aiAssistModal.itemId] || ''}
        onApply={(content) => {
          setDocumentContents({
            ...documentContents,
            [aiAssistModal.itemId]: content
          });
        }}
      />
    </div>
  );
}