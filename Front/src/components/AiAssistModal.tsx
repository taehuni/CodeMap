import React, { useState } from 'react';
import { X, Sparkles, Send, Check, Loader2 } from 'lucide-react';

interface AiAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  userContent: string;
  onApply: (content: string) => void;
  placeholder?: string;
}

export default function AiAssistModal({
  isOpen,
  onClose,
  title,
  userContent,
  onApply,
  placeholder = 'AI가 생성할 내용을 설명해주세요...'
}: AiAssistModalProps) {
  const [prompt, setPrompt] = useState('');
  const [aiContent, setAiContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim() && !hasGenerated) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      // Mock AI response based on the title
      let mockResponse = '';
      
      if (title.includes('동기')) {
        mockResponse = `## 프로젝트 배경
최근 원격 근무가 증가하면서 효율적인 실시간 소통 도구의 필요성이 대두되고 있습니다. 기존 메신저 도구들은 개발자 친화적이지 않거나, 코드 공유 기능이 부족한 경우가 많았습니다.

## 해결하고자 하는 문제
- 개발팀 간 실시간 소통의 어려움
- 코드 스니펫 공유 시 포맷 손실
- 프로젝트별 채팅방 관리의 불편함

## 프로젝트의 필요성
개발자를 위한 특화된 채팅 도구를 만들어 팀 협업의 효율성을 높이고, 코드 리뷰와 기술 논의를 더욱 원활하게 할 수 있습니다.`;
      } else if (title.includes('목표')) {
        mockResponse = `## 주요 목표
- 100명 이상의 동시 접속자 지원
- 1초 이내의 메시지 전송 속도
- 99.9% 이상의 서비스 가용성

## 성공 지표
1. **사용자 경험**: 평균 응답 시간 1초 이내
2. **확장성**: 최소 1000명 동시 접속 지원
3. **안정성**: 월간 다운타임 0.1% 이하
4. **사용자 만족도**: 4.5/5.0 이상의 평가`;
      } else if (title.includes('요구사항')) {
        mockResponse = `## 기능적 요구사항
1. 사용자는 회원가입 및 로그인을 할 수 있어야 한다
2. 사용자는 채팅방을 생성하고 초대할 수 있어야 한다
3. 사용자는 실시간으로 메시지를 송수신할 수 있어야 한다
4. 사용자는 코드 스니펫을 포맷을 유지하며 공유할 수 있어야 한다
5. 사용자는 파일을 첨부하여 전송할 수 있어야 한다

## 비기능적 요구사항
1. **성능**: 메시지 전송 지연 시간 1초 이내
2. **보안**: 모든 메시지는 암호화되어 전송되어야 함
3. **확장성**: 최소 1000명의 동시 사용자 지원
4. **가용성**: 99.9% 이상의 서비스 가용성
5. **호환성**: Chrome, Safari, Firefox 최신 버전 지원`;
      } else if (title.includes('ERD')) {
        mockResponse = `## 주요 엔티티

### User (사용자)
- id (PK)
- username
- email
- password_hash
- created_at
- updated_at

### Room (채팅방)
- id (PK)
- name
- description
- created_by (FK → User)
- created_at
- updated_at

### Message (메시지)
- id (PK)
- room_id (FK → Room)
- user_id (FK → User)
- content
- message_type
- created_at

### RoomMember (채팅방 멤버)
- id (PK)
- room_id (FK → Room)
- user_id (FK → User)
- role
- joined_at

## 관계
- User : Room = 1 : N (생성자)
- User : Message = 1 : N
- Room : Message = 1 : N
- User : RoomMember = 1 : N
- Room : RoomMember = 1 : N`;
      } else if (title.includes('유스케이스')) {
        mockResponse = `## 액터
- 사용자
- 관리자
- 시스템

## 주요 유스케이스

### 사용자
1. 회원가입
2. 로그인/로그아웃
3. 채팅방 생성
4. 채팅방 참여
5. 메시지 전송
6. 파일 전송
7. 프로필 수정

### 관리자
1. 사용자 관리
2. 채팅방 모니터링
3. 부적절한 콘텐츠 삭제

### 시스템
1. 메시지 전송 알림
2. 읽음 상태 표시
3. 자동 백업`;
      } else if (title.includes('시퀀스')) {
        mockResponse = `## 메시지 전송 시퀀스

1. 사용자 → 클라이언트: 메시지 입력
2. 클라이언트 → WebSocket 서버: 메시지 전송 요청
3. WebSocket 서버 → DB: 메시지 저장
4. DB → WebSocket 서버: 저장 완료
5. WebSocket 서버 → 채팅방 참여자들: 메시지 브로드캐스트
6. 채팅방 참여자들 → 클라이언트: 메시지 수신 및 화면 표시

## 사용자 인증 시퀀스

1. 사용자 → 클라이언트: 로그인 정보 입력
2. 클라이언트 → API 서버: 인증 요청
3. API 서버 → DB: 사용자 정보 조회
4. DB → API 서버: 사용자 정보 반환
5. API 서버: JWT 토큰 생성
6. API 서버 → 클라이언트: 토큰 발급
7. 클라이언트: 로컬 스토리지에 토큰 저장`;
      } else if (title.includes('아키텍처')) {
        mockResponse = `## 시스템 구성

### 프론트엔드
- React.js
- Socket.io Client
- Tailwind CSS

### 백엔드
- Node.js + Express
- Socket.io Server
- JWT 인증

### 데이터베이스
- MongoDB (메시지, 사용자 정보)
- Redis (세션, 캐시)

### 인프라
- AWS EC2 (애플리케이션 서버)
- AWS S3 (파일 저장)
- AWS CloudFront (CDN)
- Nginx (리버스 프록시)

## 통신 흐름
1. 클라이언트 ↔ Nginx ↔ Node.js 서버
2. Node.js 서버 ↔ MongoDB
3. Node.js 서버 ↔ Redis
4. WebSocket 서버 ↔ 클라이언트 (실시간 통신)`;
      } else if (title.includes('정보구조')) {
        mockResponse = `## 페이지 구조

### 1. 인증 페이지
- 로그인
- 회원가입
- 비밀번호 찾기

### 2. 메인 페이지
- 채팅방 목록
- 사이드바
  - 내 프로필
  - 채팅방 검색
  - 설정

### 3. 채팅방 페이지
- 헤더 (채팅방 정보, 설정)
- 메시지 영역
- 입력창
- 사이드바 (참여자 목록)

### 4. 설정 페이지
- 프로필 설정
- 알림 설정
- 테마 설정
- 개인정보 설정

## 네비게이션
홈 → 채팅방 목록 → 채팅방 → [메시지, 파일, 설정]`;
      } else if (title.includes('코드 리뷰')) {
        mockResponse = `## 코드 리뷰 체크리스트

### 코드 품질
✓ 코드가 명확하고 읽기 쉬운가?
✓ 변수명과 함수명이 의미를 잘 전달하는가?
✓ 중복 코드가 없는가?
✓ 함수가 단일 책임 원칙을 따르는가?

### 성능
✓ 불필요한 렌더링이 없는가?
✓ 메모리 누수 가능성은 없는가?
✓ 비동기 처리가 적절한가?

### 보안
✓ XSS 공격에 대한 방어가 되어있는가?
✓ 사용자 입력값 검증이 이루어지는가?
✓ 민감한 정보가 노출되지 않는가?

### 테스트
✓ 단위 테스트가 작성되었는가?
✓ 엣지 케이스가 고려되었는가?`;
      } else {
        mockResponse = `AI가 생성한 ${title} 내용입니다.\n\n사용자의 요청: "${prompt}"\n\n이 내용은 프로젝트의 맥락에 맞게 생성되었습니다. 필요에 따라 수정하거나 추가 요청을 할 수 있습니다.`;
      }

      setAiContent(mockResponse);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const handleApply = () => {
    onApply(aiContent);
    onClose();
    // Reset state
    setPrompt('');
    setAiContent('');
    setHasGenerated(false);
  };

  const handleRegenerate = () => {
    setPrompt('');
    setAiContent('');
    setHasGenerated(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg text-gray-900">{title} - AI 도움</h3>
              <p className="text-sm text-gray-600">AI가 내용을 생성해드립니다</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!hasGenerated ? (
            /* Initial State - Prompt Input */
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  AI에게 어떤 내용을 생성할지 설명해주세요
                </label>
                <textarea
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={placeholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {userContent && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm text-blue-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    현재 작성된 내용
                  </h4>
                  <div className="text-sm text-blue-800 whitespace-pre-wrap bg-white p-3 rounded border border-blue-200 max-h-48 overflow-y-auto">
                    {userContent || '작성된 내용이 없습니다'}
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI가 생성 중입니다...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    AI 생성하기
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Generated State - Show Comparison */
            <div className="space-y-6">
              {/* User Content */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  내가 작성한 내용
                </h4>
                <div className="bg-white p-4 rounded-lg border border-blue-200 max-h-64 overflow-y-auto">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {userContent || '작성된 내용이 없습니다'}
                  </div>
                </div>
              </div>

              {/* AI Generated Content */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-sm text-purple-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  AI가 생성한 내용
                </h4>
                <div className="bg-white p-4 rounded-lg border border-purple-200 max-h-64 overflow-y-auto">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {aiContent}
                  </div>
                </div>
              </div>

              {/* Regenerate Prompt */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-2">마음에 들지 않으신가요?</h4>
                <p className="text-xs text-gray-600 mb-3">다시 생성하거나 수정 요청을 입력하세요</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="예: 더 구체적으로 작성해줘, 기술적인 내용 추가해줘..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleGenerate();
                      }
                    }}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition-colors"
          >
            취소
          </button>
          <div className="flex gap-3">
            {hasGenerated && (
              <>
                <button
                  onClick={handleRegenerate}
                  className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  다시 생성
                </button>
                <button
                  onClick={handleApply}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  적용하기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}