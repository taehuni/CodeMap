# CodeMap 프로젝트

## 프로젝트 소개
코드맵(CodeMap)은 "코드 + 로드맵"의 합성어로, 개발자 및 학생들에게 도움이 될 수 있는 종합 개발 플랫폼입니다.

## 기술 스택

### Frontend
- **React 18** (TypeScript/TSX)
- **Vite 6.3.5** (빌드 도구)
- **Tailwind CSS v4.1.3** (스타일링)
- **Radix UI** (컴포넌트 라이브러리)
- **SWC** (빠른 컴파일러)

### Backend
- **Node.js**
- **Express**
- **MySQL**

## 주요 기능 리스트

### 1. AI 기반 개발 로드맵
- AI를 활용한 개발 로드맵 제공
- 언어, 프레임워크 가이드라인
- 장단점 분석 및 학습 절차 제공

### 2. 프로젝트 관리
- 프로젝트 생성 및 관리 (포트폴리오 개념)
- 프로젝트 팀원 구인 및 등록
- 프로젝트 공동 작업

### 3. 코드 품질
- AI 기반 코드 피드백

### 4. 코딩 연습
- 코딩 테스트 문제 풀기
- 코딩 챌린지 (1일 1커밋, 출석 체크, 문제 풀기)

### 5. 커뮤니티
- 개발자 커뮤니티 기능

> **참고**: 기능은 지속적으로 추가될 수 있습니다.

## 프로젝트 구조
```
CodeMap/
├── Front/                  # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── styles/         # 글로벌 스타일
│   │   ├── guidelines/     # 개발 가이드라인
│   │   └── App.tsx         # 메인 앱
│   ├── package.json
│   └── vite.config.ts
├── Sever/                  # Node.js + Express 백엔드
└── claude.md              # 이 문서
```

---

## Claude Code 작업 시 주의사항

### ⚠️ 필수 규칙

1. **수정 전 반드시 확인**
   - 코드를 수정하기 전에 반드시 사용자에게 확인 요청
   - 변경 사항에 대한 설명과 함께 승인 받기
   - 큰 변경사항은 계획을 먼저 제시

2. **확장 가능한 구조**
   - 새로운 기능이 추가될 수 있음을 염두에 두고 설계
   - 모듈화된 구조 유지
   - 컴포넌트는 재사용 가능하게 작성

---

## Frontend 코딩 스타일 가이드

### 1. CSS 및 스타일링 규칙

#### 상대 단위 사용 (중요!)
- **절대 단위(px) 사용 금지**: 고정 크기가 필요한 경우를 제외하고 px 사용 지양
- **rem 단위 사용**:
  - 기본 폰트 크기: `--font-size: 16px`
  - 텍스트, 패딩, 마진 등에 rem 사용
- **vw/vh 단위**: 뷰포트 기준 크기에 사용
- **calc() 함수**: 동적 계산이 필요한 경우
- **반응형 패딩 예시**:
  ```css
  padding-left: max(5.5vw, 80px);   /* 최소 80px 보장 */
  padding-right: min(5.5vw, 120px); /* 최대 120px 제한 */
  ```

#### CSS 변수 시스템
- **색상**: CSS 변수로만 관리 (`--background`, `--foreground`, `--primary` 등)
- **간격**: CSS 변수 사용 (`--radius`, `--text-2xl` 등)
- **다크 모드**: `.dark` 클래스로 자동 전환
- **직접 색상 코드 금지**: Tailwind 클래스나 CSS 변수만 사용

#### Tailwind CSS 사용
- **유틸리티 클래스 우선**: 인라인 스타일 대신 Tailwind 클래스 사용
- **커스텀 클래스**: `@layer utilities`에 정의
- **색상**: `bg-background`, `text-foreground` 같은 시맨틱 클래스 사용

### 2. TypeScript 규칙

```typescript
// ✅ 좋은 예시
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

// ❌ 나쁜 예시
const [user, setUser] = useState(null); // 타입 명시 없음
```

- **명시적 타입 정의**: 모든 props, state, 함수 반환값에 타입 지정
- **interface 우선**: 객체 타입은 interface 사용
- **any 사용 금지**: 타입을 모르는 경우 unknown 사용

### 3. 컴포넌트 구조

```typescript
// ✅ 좋은 예시
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  onClick,
  children
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-lg ${
        variant === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

- **Props 인터페이스 정의**: 모든 컴포넌트에 Props 타입 정의
- **default props**: 구조 분해 할당에서 기본값 설정
- **명확한 네이밍**: 컴포넌트명은 PascalCase, 파일명도 동일

### 4. 폴더 구조 규칙

```
src/
├── components/       # 재사용 가능한 컴포넌트
│   ├── ui/          # Radix UI 기반 기본 컴포넌트
│   └── figma/       # Figma 디자인 컴포넌트
├── pages/           # 페이지 레벨 컴포넌트
├── styles/          # 글로벌 스타일
└── guidelines/      # 개발 가이드 문서
```

### 5. 스타일링 우선순위

1. **Tailwind 유틸리티 클래스** (1순위)
2. **CSS 변수** (2순위)
3. **globals.css의 커스텀 유틸리티** (3순위)
4. **인라인 style** (최후의 수단, 가급적 사용 금지)

---

## Backend 코딩 가이드 (작성 예정)

### API 설계 원칙
- RESTful API 원칙 준수
- 명확한 엔드포인트 네이밍
- 적절한 HTTP 메서드 사용 (GET, POST, PUT, DELETE)

### 보안
- SQL Injection 방지 (Prepared Statement 사용)
- XSS 방지 (입력값 검증 및 이스케이핑)
- 인증/인가 처리
- 환경 변수로 민감 정보 관리

### 에러 처리
- 적절한 에러 핸들링
- 사용자 친화적인 에러 메시지
- 에러 로깅

---

## 작업 프로세스

1. **파일 읽기 및 분석**
   - 기존 코드 스타일 파악
   - 관련 컴포넌트 구조 확인

2. **변경 사항 제안 및 사용자 확인**
   - 수정 내용 설명
   - 승인 대기

3. **승인 후 코드 수정**
   - 가이드라인 준수
   - 일관된 코딩 스타일 유지

4. **수정 내용 설명**
   - 변경된 부분 요약
   - 테스트 필요 여부 안내

---

## 개발 시작하기

### Frontend 실행
```bash
cd Front
npm install
npm run dev
```
- 개발 서버: http://localhost:3000

### Backend 실행 (작성 예정)
```bash
cd Sever
npm install
npm start
```

---

## 체크리스트

### Frontend 개발 시
- [ ] 상대 단위(rem, vw, vh) 사용했는가?
- [ ] CSS 변수를 사용했는가?
- [ ] TypeScript 타입을 명시했는가?
- [ ] 컴포넌트 Props 인터페이스를 정의했는가?
- [ ] Tailwind 클래스를 우선 사용했는가?
- [ ] 다크 모드를 고려했는가?
- [ ] 반응형 디자인을 고려했는가?

### Backend 개발 시
- [ ] SQL Injection 방지 처리를 했는가?
- [ ] 에러 핸들링을 적절히 했는가?
- [ ] API 응답 형식이 일관적인가?
- [ ] 인증/인가가 필요한 엔드포인트를 보호했는가?

---

**Last Updated**: 2025-12-29
**Author**: CodeMap Team
