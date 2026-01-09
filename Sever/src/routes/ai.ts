import { Router, Request, Response } from 'express';
import Groq from 'groq-sdk';

const router = Router();

// Groq 클라이언트 초기화 (빠르고 무료!)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

// AI 프로젝트 계획 생성
router.post('/generate-plan', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mode, data } = req.body;

    if (!process.env.GROQ_API_KEY) {
      res.status(500).json({ error: 'Groq API 키가 설정되지 않았습니다.' });
      return;
    }

    let prompt = '';

    if (mode === 'scratch') {
      // 처음부터 시작 모드
      prompt = `당신은 소프트웨어 프로젝트 기획 전문가입니다. 사용자의 아이디어를 바탕으로 완전한 프로젝트 계획을 생성해주세요.

중요: 반드시 유효한 JSON만 응답해야 합니다. 설명, 인사말 또는 JSON 외의 다른 텍스트를 포함하지 마세요.

사용자 아이디어:
${data.freeInput}

다음 JSON 구조로 응답하세요 (추가 텍스트 없이):
{
  "techStack": {
    "frontend": ["기술1", "기술2"],
    "backend": ["기술1", "기술2"],
    "database": ["데이터베이스"],
    "tools": ["도구1", "도구2"]
  },
  "features": [
    {
      "title": "기능 이름",
      "description": "설명",
      "priority": "high"
    }
  ],
  "roadmap": [
    {
      "phase": "1단계: 단계명",
      "duration": "2주",
      "tasks": [
        {
          "title": "작업 제목",
          "description": "상세 설명",
          "status": "pending"
        }
      ],
      "milestones": ["마일스톤1", "마일스톤2"]
    }
  ],
  "fileStructure": {
    "frontend": ["src/", "src/components/", "src/pages/", "public/"],
    "backend": ["server/", "server/routes/", "server/models/", "server/controllers/"],
    "database": ["database/", "database/schemas/", "database/migrations/"],
    "config": ["config/", ".env.example", "README.md"],
    "description": "전체 프로젝트 구조 설명"
  },
  "schedule": [
    {
      "week": "1주차",
      "tasks": ["세부 작업1", "세부 작업2"],
      "goal": "목표"
    }
  ],
  "recommendations": ["추천사항1", "추천사항2"]
}

중요 규칙:
1. JSON 객체만 출력하세요. {로 시작하고 }로 끝나야 합니다.
2. 모든 내용은 순수 한국어로만 작성하세요. 영어, 한자, 일본어 등 다른 언어를 절대 사용하지 마세요.
3. 기술 스택 이름(React, Node.js 등)은 영어 그대로 사용 가능하지만, 설명은 반드시 한국어로 작성하세요.
4. 파일 구조는 프론트엔드, 백엔드, 데이터베이스를 모두 포함해야 합니다.`;
    } else if (mode === 'guided') {
      // 가이드 모드
      const languagesStr = data.languages.join(', ');
      const frameworksStr = data.frameworks.length > 0 ? data.frameworks.join(', ') : '지정 안 됨';
      const coreFeatures = data.coreFeatures.filter((f: string) => f.trim()).join('\n- ');

      prompt = `당신은 소프트웨어 프로젝트 기획 전문가입니다. 다음 정보를 바탕으로 프로젝트 계획을 생성해주세요.

중요: 반드시 유효한 JSON만 응답해야 합니다. 설명, 인사말 또는 JSON 외의 다른 텍스트를 포함하지 마세요.

프로젝트 정보:
- 개발 환경: ${data.devEnvironment}
- 프로그래밍 언어: ${languagesStr}
- 프레임워크: ${frameworksStr}
- 주제: ${data.topic}
- 설명: ${data.description}
- 핵심 기능:
  - ${coreFeatures}
${data.targetUsers ? `- 대상 사용자: ${data.targetUsers}` : ''}
${data.projectGoal ? `- 프로젝트 목표: ${data.projectGoal}` : ''}

다음 JSON 구조로 응답하세요 (추가 텍스트 없이):
{
  "techStack": {
    "frontend": ["기술1", "기술2"],
    "backend": ["기술1", "기술2"],
    "database": ["데이터베이스"],
    "tools": ["도구1", "도구2"]
  },
  "features": [
    {
      "title": "기능 이름",
      "description": "설명",
      "priority": "high"
    }
  ],
  "roadmap": [
    {
      "phase": "1단계: 단계명",
      "duration": "2주",
      "tasks": [
        {
          "title": "작업 제목",
          "description": "상세 설명",
          "status": "pending"
        }
      ],
      "milestones": ["마일스톤1", "마일스톤2"]
    }
  ],
  "fileStructure": {
    "frontend": ["src/", "src/components/", "src/pages/", "public/"],
    "backend": ["server/", "server/routes/", "server/models/", "server/controllers/"],
    "database": ["database/", "database/schemas/", "database/migrations/"],
    "config": ["config/", ".env.example", "README.md"],
    "description": "전체 프로젝트 구조 설명"
  },
  "schedule": [
    {
      "week": "1주차",
      "tasks": ["세부 작업1", "세부 작업2"],
      "goal": "목표"
    }
  ],
  "recommendations": ["추천사항1", "추천사항2"]
}

중요 규칙:
1. JSON 객체만 출력하세요. {로 시작하고 }로 끝나야 합니다.
2. 모든 내용은 순수 한국어로만 작성하세요. 영어, 한자, 일본어 등 다른 언어를 절대 사용하지 마세요.
3. 기술 스택 이름(React, Node.js 등)은 영어 그대로 사용 가능하지만, 설명은 반드시 한국어로 작성하세요.
4. 파일 구조는 프론트엔드, 백엔드, 데이터베이스를 모두 포함해야 합니다.`;
    } else {
      res.status(400).json({ error: '잘못된 모드입니다.' });
      return;
    }

    // Groq API 호출 (무료, 빠름!)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '당신은 소프트웨어 프로젝트 기획 전문가입니다. 반드시 유효한 JSON만 응답해야 합니다. 다른 텍스트는 포함하지 마세요. 모든 내용은 한국어로 작성해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // 무료 고성능 모델
      temperature: 0.7,
      max_tokens: 4096,
    });

    const planText = chatCompletion.choices[0]?.message?.content || '';

    // 디버깅: AI 응답 로깅
    console.log('=== AI 응답 (처음 500자) ===');
    console.log(planText.substring(0, 500));
    console.log('=== 응답 끝 ===');

    // JSON 파싱 (마크다운 코드 블록 및 불필요한 텍스트 제거)
    let cleanedText = planText.trim();

    // 마크다운 코드 블록에서 JSON 추출
    if (cleanedText.includes('```json')) {
      const match = cleanedText.match(/```json\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        cleanedText = match[1].trim();
      }
    } else if (cleanedText.includes('```')) {
      const match = cleanedText.match(/```\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        cleanedText = match[1].trim();
      }
    }

    // 코드 블록이 없으면 첫 번째 { 부터 마지막 } 까지 추출
    if (!cleanedText.startsWith('{')) {
      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
      }
    }

    const plan = JSON.parse(cleanedText);

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error('AI 계획 생성 오류:', error);
    res.status(500).json({
      error: 'AI 계획 생성 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// AI 도움 요청 (범용)
router.post('/help', async (req: Request, res: Response): Promise<void> => {
  try {
    const { section, context, request } = req.body;

    if (!process.env.GROQ_API_KEY) {
      res.status(500).json({ error: 'Groq API 키가 설정되지 않았습니다.' });
      return;
    }

    // 섹션별 프롬프트 생성
    let systemPrompt = '';
    let userPrompt = '';

    switch (section) {
      case 'motivation':
        systemPrompt = '당신은 프로젝트 기획 전문가입니다. 프로젝트 동기를 명확하고 설득력 있게 작성하는 것을 도와줍니다.';
        userPrompt = `다음 프로젝트의 동기를 작성해주세요:\n\n${context}\n\n${request || '프로젝트를 시작하게 된 배경, 해결하고자 하는 문제, 프로젝트의 필요성을 포함해주세요.'}`;
        break;

      case 'goals':
        systemPrompt = '당신은 프로젝트 목표 설정 전문가입니다. SMART 원칙에 따라 구체적이고 측정 가능한 목표를 작성합니다.';
        userPrompt = `다음 프로젝트의 목표를 작성해주세요:\n\n${context}\n\n${request || '구체적이고 측정 가능한 목표를 작성해주세요.'}`;
        break;

      case 'requirements':
        systemPrompt = '당신은 요구사항 분석 전문가입니다. 기능적 요구사항과 비기능적 요구사항을 명확히 정의합니다.';
        userPrompt = `다음 프로젝트의 요구사항을 정의해주세요:\n\n${context}\n\n${request || '기능적 요구사항과 비기능적 요구사항으로 나누어 작성해주세요.'}`;
        break;

      case 'erd':
        systemPrompt = '당신은 데이터베이스 설계 전문가입니다. ERD와 테이블 구조를 설계합니다.';
        userPrompt = `다음 프로젝트의 데이터베이스 구조를 설계해주세요:\n\n${context}\n\n${request || '필요한 테이블과 관계를 설명해주세요.'}`;
        break;

      case 'usecase':
        systemPrompt = '당신은 소프트웨어 설계 전문가입니다. 유스케이스 다이어그램을 작성합니다.';
        userPrompt = `다음 프로젝트의 유스케이스를 정의해주세요:\n\n${context}\n\n${request || '주요 액터와 그들의 유스케이스를 설명해주세요.'}`;
        break;

      case 'sequence-diagram':
        systemPrompt = '당신은 시스템 설계 전문가입니다. 시퀀스 다이어그램을 설계합니다.';
        userPrompt = `다음 프로젝트의 주요 시나리오에 대한 시퀀스 다이어그램을 설명해주세요:\n\n${context}\n\n${request || '주요 기능의 실행 흐름을 단계별로 설명해주세요.'}`;
        break;

      case 'architecture':
        systemPrompt = '당신은 시스템 아키텍처 전문가입니다. 확장 가능하고 유지보수 가능한 아키텍처를 설계합니다.';
        userPrompt = `다음 프로젝트의 시스템 아키텍처를 설계해주세요:\n\n${context}\n\n${request || '시스템 구성 요소와 그들 간의 관계를 설명해주세요.'}`;
        break;

      case 'information-architecture':
        systemPrompt = '당신은 정보 구조 설계 전문가입니다. 사용자 경험과 정보 구조를 설계합니다.';
        userPrompt = `다음 프로젝트의 정보 구조를 설계해주세요:\n\n${context}\n\n${request || '콘텐츠 구조와 네비게이션 체계를 설명해주세요.'}`;
        break;

      case 'code-review':
        systemPrompt = '당신은 코드 리뷰 전문가입니다. 코드의 품질, 보안, 성능을 분석하고 개선 방안을 제시합니다.';
        userPrompt = `다음 코드를 리뷰해주세요:\n\n${context}\n\n${request || '코드의 문제점과 개선 방안을 알려주세요.'}`;
        break;

      default:
        systemPrompt = '당신은 소프트웨어 개발 전문가입니다. 프로젝트 진행에 필요한 다양한 도움을 제공합니다.';
        userPrompt = `${context}\n\n${request}`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt + '\n\n중요 규칙:\n1. 모든 응답은 한국어(한글)로만 작성하세요.\n2. 한자(漢字), 일본어, 중국어를 절대 사용하지 마세요.\n3. 영어는 기술 용어나 고유명사에만 사용 가능합니다 (예: React, API, JavaScript).\n4. 일반 단어는 반드시 한글로만 작성하세요 (예: "구조", "실시", "방법").'
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('AI 도움 요청 오류:', error);
    res.status(500).json({
      error: 'AI 도움 요청 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// AI 어시스턴트 채팅 (컨텍스트 인식)
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, context } = req.body;

    if (!process.env.GROQ_API_KEY) {
      res.status(500).json({ error: 'Groq API 키가 설정되지 않았습니다.' });
      return;
    }

    // 컨텍스트 기반 시스템 프롬프트 생성
    let systemPrompt = `당신은 CodeMap 프로젝트 관리 플랫폼의 AI 어시스턴트입니다.
사용자의 프로젝트 진행을 도와주는 친절하고 전문적인 조력자입니다.

현재 프로젝트 정보:
- 프로젝트명: ${context.projectName}
- 설명: ${context.projectDescription}
- 카테고리: ${context.projectCategory}
- 난이도: ${context.difficulty}
- 기술 스택: ${context.techStack?.join(', ') || '설정 안 됨'}

현재 위치:
- 카테고리: ${getCategoryName(context.currentCategory)}
- 섹션: ${context.currentSectionLabel}

당신의 역할:
1. 사용자가 현재 작업 중인 섹션을 인식하고 관련된 도움을 제공합니다.
2. 프로젝트 정보를 바탕으로 구체적이고 실용적인 조언을 제공합니다.
3. 사용자의 질문에 친절하고 명확하게 답변합니다.
4. 필요시 다음 단계나 추천 사항을 제안합니다.

중요 규칙:
1. 모든 응답은 한국어(한글)로만 작성하세요.
2. 한자(漢字), 일본어, 중국어를 절대 사용하지 마세요.
3. 영어는 기술 용어나 고유명사에만 사용 가능합니다.
4. 친근하고 도움이 되는 톤으로 대화하세요.`;

    // AI Plan이 있으면 추가
    if (context.aiPlan) {
      systemPrompt += `\n\nAI가 생성한 프로젝트 계획:
- 주요 기능: ${context.aiPlan.features?.map((f: any) => f.title).join(', ') || '없음'}
- 로드맵 단계: ${context.aiPlan.roadmap?.length || 0}개`;
    }

    // 일정 정보가 있으면 추가
    if (context.schedules && context.schedules.length > 0) {
      const inProgress = context.schedules.filter((s: any) => s.status === 'in-progress');
      systemPrompt += `\n\n현재 진행 중인 일정: ${inProgress.length}개`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 1024,
    });

    const response = chatCompletion.choices[0]?.message?.content || '';

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('AI 채팅 오류:', error);
    res.status(500).json({
      error: 'AI 채팅 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// 카테고리 이름 한글로 변환
function getCategoryName(categoryId: string): string {
  const categories: { [key: string]: string } = {
    'tasks': '일정 및 작업 관리',
    'planning': '기획',
    'design': '설계',
    'development': '개발',
    'testing': '테스트',
    'collaboration': '협업',
    'settings': '설정'
  };
  return categories[categoryId] || categoryId;
}

export default router;
