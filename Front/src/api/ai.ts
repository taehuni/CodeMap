const API_URL = 'http://localhost:5000/api';

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
}

export interface Feature {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface FileStructure {
  folders: string[];
  description: string;
}

export interface ProjectPlan {
  techStack: TechStack;
  features: Feature[];
  roadmap: RoadmapPhase[];
  fileStructure: FileStructure;
  recommendations: string[];
}

export interface GeneratePlanRequest {
  mode: 'scratch' | 'guided';
  data: any;
}

export interface GeneratePlanResponse {
  success: boolean;
  plan: ProjectPlan;
}

/**
 * AI를 사용하여 프로젝트 계획 생성
 */
export const generateProjectPlan = async (request: GeneratePlanRequest): Promise<ProjectPlan> => {
  const response = await fetch(`${API_URL}/ai/generate-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'AI 계획 생성에 실패했습니다.');
  }

  const data: GeneratePlanResponse = await response.json();
  return data.plan;
};

/**
 * AI 도움 요청
 */
export const requestAiHelp = async (
  section: string,
  context: string,
  request?: string
): Promise<string> => {
  const response = await fetch(`${API_URL}/ai/help`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ section, context, request }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'AI 도움 요청에 실패했습니다.');
  }

  const data = await response.json();
  return data.response;
};

/**
 * AI 어시스턴트 채팅 (컨텍스트 인식)
 */
export interface ChatContext {
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  difficulty: string;
  techStack: string[];
  currentCategory: string;
  currentSectionLabel: string;
  aiPlan?: any;
  schedules?: any[];
}

export const sendChatMessage = async (
  message: string,
  context: ChatContext
): Promise<string> => {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, context }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'AI 채팅에 실패했습니다.');
  }

  const data = await response.json();
  return data.response;
};
