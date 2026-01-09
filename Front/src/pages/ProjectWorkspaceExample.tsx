import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { generateProjectPlan, requestAiHelp, sendChatMessage } from '../api/ai';

interface ProjectWorkspaceProps {
  projectId?: string;
}

export default function ProjectWorkspace({ projectId }: ProjectWorkspaceProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // localStorage에서 프로젝트 데이터 가져오기
  const getProjectData = () => {
    const id = projectId || window.location.pathname.split('/').pop();
    const storedProject = localStorage.getItem(`project_${id}`);

    if (storedProject) {
      return JSON.parse(storedProject);
    }

    // Fallback to mock data
    return {
      id: id || '1',
      name: '실시간 채팅 애플리케이션',
      description: 'WebSocket을 활용한 실시간 채팅 서비스',
      category: '웹 개발',
      difficulty: '중급',
      duration: '6주',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      teamMembers: [
        { id: 1, role: '프론트엔드 개발자', name: '김철수', avatar: '👨‍💻' },
        { id: 2, role: '백엔드 발자', name: '이영희', avatar: '👩‍💻' }
      ],
      aiAssisted: true,
      isRecruiting: true,
      isPublic: true
    };
  };

  const [project, setProject] = useState(getProjectData());

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [newTech, setNewTech] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('tasks');
  const [selectedItem, setSelectedItem] = useState<string>('schedule');
  const [showAiChat, setShowAiChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // AI Setup states
  const [showAiSetup, setShowAiSetup] = useState(() => {
    // URL에서 aiAssisted 파라미터 확인 (React Router 방식)
    return searchParams.get('aiAssisted') === 'true';
  });
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
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // AI Help state - for section-specific AI assistance
  const [aiHelpContent, setAiHelpContent] = useState<{ [key: string]: string }>({});
  const [isAiHelping, setIsAiHelping] = useState<{ [key: string]: boolean }>({});
  
  const [chatMessages, setChatMessages] = useState(() => {
    const projectData = getProjectData();
    return [
      {
        id: 1,
        sender: 'ai',
        text: `안녕하세요! "${projectData.name}" 프로젝트를 함께 진행하게 되어 기쁩니다! 🎉\n\n현재 ${projectData.aiAssisted ? 'AI 지원이 활성화되어 있어 더욱 효과적으로 도와드릴 수 있습니다' : '프로젝트가 시작되었습니다'}. 무엇을 도와드릴까요?`,
        timestamp: new Date()
      }
    ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Schedule management state
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: '프로젝트 기획 및 설계',
      description: '프로젝트의 전반적인 기획과 설계를 진행합니다.',
      startWeek: 1,
      duration: 3,
      color: 'blue',
      icon: 'Lightbulb',
      progress: 100,
      assignees: [
        { id: 1, name: '김철수', avatar: '👨‍💻' },
        { id: 2, name: '이영희', avatar: '👩‍💻' }
      ],
      status: 'completed',
      notes: '기획 및 설계 완료. 모든 문서 작성 완료.'
    },
    {
      id: 2,
      title: '기본 UI 및 기능 개발',
      description: '기본적인 UI 컴포넌트와 핵심 기능을 개발합니다.',
      startWeek: 3,
      duration: 4,
      color: 'purple',
      icon: 'Code',
      progress: 60,
      assignees: [
        { id: 1, name: '김철수', avatar: '👨‍💻' }
      ],
      status: 'in-progress',
      notes: '현재 UI 컴포넌트 개발 중. 약 60% 진행.'
    },
    {
      id: 3,
      title: '핵심 기능 구현',
      description: '백엔드 API와 핵심 비즈니스 로직을 구현합니다.',
      startWeek: 6,
      duration: 3,
      color: 'green',
      icon: 'Wrench',
      progress: 30,
      assignees: [
        { id: 2, name: '이영희', avatar: '👩‍💻' }
      ],
      status: 'in-progress',
      notes: 'API 설계 완료. 구현 시작.'
    },
    {
      id: 4,
      title: '테스트 및 배포',
      description: '전체 시스템 테스트 및 프로덕션 배포를 진행합니다.',
      startWeek: 8,
      duration: 2,
      color: 'orange',
      icon: 'TestTube',
      progress: 0,
      assignees: [],
      status: 'pending',
      notes: ''
    }
  ]);

  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
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

    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    setIsAiTyping(true);

    try {
      // 현재 섹션 정보 가져오기
      const currentCategory = categories.find(c => c.id === selectedCategory);
      const currentItem = currentCategory?.items.find(i => i.id === selectedItem);

      // 컨텍스트 생성
      const context = {
        projectName: project.name,
        projectDescription: project.description,
        projectCategory: project.category,
        difficulty: project.difficulty,
        techStack: project.techStack,
        currentCategory: selectedCategory,
        currentSectionLabel: currentItem?.label || '알 수 없음',
        aiPlan: aiPlan,
        schedules: schedules
      };

      // AI API 호출
      const aiResponseText = await sendChatMessage(messageToSend, context);

      const aiResponse = {
        id: chatMessages.length + 2,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI 채팅 오류:', error);
      const errorMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        text: '죄송합니다. 응답 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // AI 도움 요청 함수
  const handleAiHelp = async (sectionId: string, customRequest?: string) => {
    setIsAiHelping({ ...isAiHelping, [sectionId]: true });

    try {
      const context = `프로젝트명: ${project.name}\n설명: ${project.description}\n카테고리: ${project.category}`;
      const response = await requestAiHelp(sectionId, context, customRequest);

      setAiHelpContent({ ...aiHelpContent, [sectionId]: response });
    } catch (error) {
      console.error('AI 도움 요청 실패:', error);
      alert(error instanceof Error ? error.message : 'AI 도움 요청에 실패했습니다.');
    } finally {
      setIsAiHelping({ ...isAiHelping, [sectionId]: false });
    }
  };

  const renderContent = () => {
    const currentCategory = categories.find(c => c.id === selectedCategory);
    const currentItem = currentCategory?.items.find(i => i.id === selectedItem);

    if (!currentItem) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-20">
          <Lightbulb className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg text-gray-400 mb-2">항목을 선택하세요</h3>
          <p className="text-sm text-gray-500">왼쪽 메뉴에서 작업할 항목을 선택해주세요.</p>
        </div>
      );
    }

    // Render different content based on selected item
    switch (selectedItem) {
      case 'ai-plan':
        if (isGeneratingPlan) {
          return (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">AI가 프로젝트 계획을 생성하고 있습니다...</h3>
              <p className="text-sm text-gray-600">잠시만 기다려주세요.</p>
            </div>
          );
        }
        return <AiPlanView aiPlan={aiPlan} />;
      
      case 'motivation':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">프로젝트 동기</h3>
                <p className="text-sm text-gray-600">
                  이 프로젝트를 시작하게 된 배경과 동기를 작성하세요.
                </p>
              </div>
              <button
                onClick={() => handleAiHelp('motivation')}
                disabled={isAiHelping['motivation']}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isAiHelping['motivation'] ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI 도움 요청
                  </>
                )}
              </button>
            </div>

            {aiHelpContent['motivation'] && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm text-purple-900 mb-2">AI 제안</h4>
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">{aiHelpContent['motivation']}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="프로젝트를 시작하게 된 동기, 해결하고자 하는 문제, 프로젝트의 필요성 등을 자유롭게 작성해주세요..."
                defaultValue={aiHelpContent['motivation'] || ''}
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
                <p className="text-sm text-gray-600">
                  구체적이고 측정 가능한 프로젝트 목표를 설정하세요.
                </p>
              </div>
              <button
                onClick={() => handleAiHelp('goals')}
                disabled={isAiHelping['goals']}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isAiHelping['goals'] ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI 도움 요청
                  </>
                )}
              </button>
            </div>

            {aiHelpContent['goals'] && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm text-purple-900 mb-2">AI 제안</h4>
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">{aiHelpContent['goals']}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="block text-sm text-gray-700 mb-2">주요 목표</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 100명 이상의 동시 접속 지원"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="block text-sm text-gray-700 mb-2">성공 지표</label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="프로젝트 성공을 측정할 수 있는 지표를 작성하세요..."
                />
              </div>
            </div>
          </div>
        );

      case 'requirements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">요구사항 정의</h3>
                <p className="text-sm text-gray-600">
                  기능적 요구사항과 비기능적 요구사항을 명세하세요.
                </p>
              </div>
              <button
                onClick={() => handleAiHelp('requirements')}
                disabled={isAiHelping['requirements']}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isAiHelping['requirements'] ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI 도움 요청
                  </>
                )}
              </button>
            </div>

            {aiHelpContent['requirements'] && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm text-purple-900 mb-2">AI 제안</h4>
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">{aiHelpContent['requirements']}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-3">기능적 요구사항</h4>
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full bg-transparent border-none focus:outline-none text-sm"
                        placeholder="요구사항을 입력하세요..."
                      />
                    </div>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  요구사항 추가
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-3">비기능적 요구사항</h4>
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full bg-transparent border-none focus:outline-none text-sm"
                        placeholder="성능, 보안, 확장성 등의 요구사항..."
                      />
                    </div>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  요구사항 추가
                </button>
              </div>
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
              {project.teamMembers.map((member: any) => (
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
        if (isGeneratingPlan) {
          return (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">AI가 프로젝트 일정을 생성하고 있습니다...</h3>
              <p className="text-sm text-gray-600">잠시만 기다려주세요.</p>
            </div>
          );
        }
        return (
          <ScheduleTimeline
            schedules={schedules}
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
                  프로젝트 작업을 단계별로 관리하세요.
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                작업 추가
              </button>
            </div>

            <div className="space-y-4">
              {['기획', '설계', '개발', '테스트'].map((category) => (
                <div key={category} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm text-gray-900 mb-3">{category}</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((task) => (
                      <div key={task} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <Circle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 flex-1">작업 항목 {task}</span>
                        <span className="text-xs text-gray-500">담당자 미정</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                      <p className="text-xs text-gray-500 ml-6">다른 개발자들이 프로젝트에 참여할 수 있습니다</p>
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
                      project.techStack.map((tech: string, index: number) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                        >
                          <span className="text-sm">{tech}</span>
                          <button
                            onClick={() => {
                              const newTechStack = project.techStack.filter((_: string, i: number) => i !== index);
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
                <p className="text-sm text-gray-600">
                  이 섹션의 내용을 작성하세요.
                </p>
              </div>
              {/* ERD, 시퀀스 다이어그램 등 특정 섹션에만 AI 도움 제공 */}
              {(selectedItem === 'erd' || selectedItem === 'usecase' || selectedItem === 'sequence-diagram' ||
                selectedItem === 'architecture' || selectedItem === 'information-architecture') && (
                <button
                  onClick={() => handleAiHelp(selectedItem)}
                  disabled={isAiHelping[selectedItem]}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isAiHelping[selectedItem] ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI 생성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      AI 도움 요청
                    </>
                  )}
                </button>
              )}
            </div>

            {aiHelpContent[selectedItem] && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm text-purple-900 mb-2">AI 제안</h4>
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">{aiHelpContent[selectedItem]}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="내용을 입력하세요..."
                defaultValue={aiHelpContent[selectedItem] || ''}
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
        projectInfo={project}
        onComplete={async (data, mode) => {
          console.log('AI Setup completed:', { data, mode });

          setIsGeneratingPlan(true);
          setShowAiSetup(false);

          try {
            // Call AI API to generate project plan
            const plan = await generateProjectPlan({
              mode,
              data
            });

            // Store the generated plan with mode and user data
            setAiPlan({
              ...plan,
              ...data,
              mode
            });
            setAiSetupData(data);
            setAiSetupMode(mode);

            // AI 계획을 워크스페이스 일정/작업으로 변환
            if (plan.roadmap && plan.roadmap.length > 0) {
              let cumulativeWeeks = 1;
              const newSchedules = plan.roadmap.map((phase: any, index: number) => {
                // duration에서 숫자 추출 (예: "2주" -> 2, "2-3주" -> 2)
                const durationMatch = phase.duration?.match(/(\d+)/);
                const weeks = durationMatch ? parseInt(durationMatch[1]) : 2;

                // tasks 상세 정보 생성
                let description = '';
                if (phase.tasks && phase.tasks.length > 0) {
                  if (typeof phase.tasks[0] === 'string') {
                    description = phase.tasks.join('\n• ');
                  } else {
                    description = phase.tasks.map((t: any) => `${t.title}: ${t.description || ''}`).join('\n• ');
                  }
                }

                // 마일스톤 추가
                if (phase.milestones && phase.milestones.length > 0) {
                  description += '\n\n🎯 마일스톤:\n• ' + phase.milestones.join('\n• ');
                }

                const schedule = {
                  id: Date.now() + index,
                  title: phase.phase,
                  description: description || `${phase.phase}의 세부 작업을 진행합니다.`,
                  startWeek: cumulativeWeeks,
                  duration: weeks,
                  color: ['blue', 'purple', 'green', 'orange', 'red'][index % 5],
                  icon: ['Lightbulb', 'Code', 'TestTube', 'Wrench', 'CheckCircle2'][index % 5],
                  progress: index === 0 ? 10 : 0,
                  assignees: project.teamMembers || [],
                  status: index === 0 ? 'in-progress' : 'pending',
                  notes: `AI가 생성한 일정입니다. 필요에 따라 수정하세요.`,
                  milestones: phase.milestones || []
                };

                cumulativeWeeks += weeks;
                return schedule;
              });

              setSchedules(newSchedules);

              // 일정 관리 탭으로 이동 (사용자가 바로 시작할 수 있도록)
              setSelectedCategory('tasks');
              setSelectedItem('schedule');
            } else {
              // roadmap이 없으면 AI 계획 탭으로 이동
              setSelectedCategory('planning');
              setSelectedItem('ai-plan');
            }
          } catch (error) {
            console.error('AI 계획 생성 실패:', error);
            alert(error instanceof Error ? error.message : 'AI 계획 생성에 실패했습니다.');
            // Revert to setup screen on error
            setShowAiSetup(true);
          } finally {
            setIsGeneratingPlan(false);
          }
        }}
        onBack={() => navigate('/projects')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.hash = '#projects'}
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
                onClick={() => window.location.hash = '#mypage'}
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

        {/* 모바일 오버레이 */}
        {showAiChat && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300"
            onClick={() => setShowAiChat(false)}
            aria-hidden="true"
          />
        )}

        {/* AI Chat Sidebar - 반응형 */}
        <div
          className={`
            ${showAiChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            ${showAiChat ? 'w-full md:w-96' : 'w-0'}
            fixed md:relative
            right-0 top-0 h-full
            z-30 md:z-auto
            bg-white border-l border-gray-200
            flex flex-col
            transition-all duration-300 ease-in-out
            shadow-2xl md:shadow-none
            ${!showAiChat && 'md:hidden'}
          `}
        >
          {showAiChat && (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm text-gray-900">AI 어시스턴트</h3>
                </div>
                <button
                  onClick={() => setShowAiChat(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] rounded-2xl px-4 py-3 shadow-sm
                      ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                      }
                    `}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    {message.sender === 'ai' && message.id !== 1 && documentContents.hasOwnProperty(selectedItem) && (
                      <div className="mt-3 flex gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            // 덮어쓰기: Replace current document content
                            if (selectedItem && documentContents.hasOwnProperty(selectedItem)) {
                              setDocumentContents({
                                ...documentContents,
                                [selectedItem]: message.text
                              });
                              // Show success feedback
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
                              // Show success feedback
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
            </>
          )}
        </div>
      </div>

      {/* Floating AI Button - 모바일 & 닫혔을 때만 표시 */}
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
    </div>
  );
}