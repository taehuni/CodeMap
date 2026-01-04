-- ============================================================================
-- CodeMap 데이터베이스 스키마
-- ============================================================================
-- 작성일: 2026-01-03
-- 설명: CodeMap 프로젝트의 전체 데이터베이스 구조
--       - 사용자 관리, 프로젝트 관리, AI 기능, 코딩 연습, 커뮤니티 기능 포함
-- ============================================================================

-- 데이터베이스 생성 (존재하지 않는 경우)
CREATE DATABASE IF NOT EXISTS codemap
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE codemap;

-- ============================================================================
-- 1. 사용자 & 인증 도메인
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 사용자 테이블
-- ----------------------------------------------------------------------------
-- 설명: 모든 사용자 정보를 저장하는 핵심 테이블
-- 특징:
--   - 이메일, 사용자명 고유 제약
--   - SNS 링크 (Github, LinkedIn, Portfolio)
--   - 챌린지 관련 통계 (커밋, 출석 streak)
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '사용자 고유 ID',

  -- 인증 정보
  email VARCHAR(255) UNIQUE NOT NULL COMMENT '이메일 (로그인 ID)',
  password_hash VARCHAR(255) NOT NULL COMMENT '암호화된 비밀번호 (bcrypt)',
  username VARCHAR(50) UNIQUE NOT NULL COMMENT '사용자명 (고유)',

  -- 프로필 정보
  full_name VARCHAR(100) COMMENT '실명',
  avatar_url VARCHAR(500) COMMENT '프로필 이미지 URL',
  bio TEXT COMMENT '자기소개',

  -- SNS 링크
  github_url VARCHAR(255) COMMENT 'Github 프로필 URL',
  linkedin_url VARCHAR(255) COMMENT 'LinkedIn 프로필 URL',
  portfolio_url VARCHAR(255) COMMENT '포트폴리오 URL',

  -- 챌린지 통계
  total_commits INT DEFAULT 0 COMMENT '총 커밋 수',
  current_streak INT DEFAULT 0 COMMENT '현재 연속 출석일',
  max_streak INT DEFAULT 0 COMMENT '최대 연속 출석일',

  -- 레벨 시스템
  level INT DEFAULT 1 COMMENT '현재 레벨 (1부터 시작)',
  experience_points INT DEFAULT 0 COMMENT '현재 경험치 (EXP)',
  total_experience INT DEFAULT 0 COMMENT '누적 총 경험치',

  -- 계정 상태
  is_verified BOOLEAN DEFAULT FALSE COMMENT '이메일 인증 여부',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '가입일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '최종 수정일',
  last_login_at TIMESTAMP COMMENT '마지막 로그인 시간',

  -- 인덱스
  INDEX idx_email (email),
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='사용자 정보';

-- ----------------------------------------------------------------------------
-- 사용자 기술 스택 테이블
-- ----------------------------------------------------------------------------
-- 설명: 사용자가 보유한 기술과 숙련도를 저장
-- 특징:
--   - 한 사용자가 여러 기술 보유 가능
--   - 숙련도 4단계 (초급, 중급, 고급, 전문가)
-- ----------------------------------------------------------------------------
CREATE TABLE user_skills (
  skill_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '기술 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',
  skill_name VARCHAR(50) NOT NULL COMMENT '기술명 (예: JavaScript, React)',
  proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'beginner' COMMENT '숙련도',
  years_of_experience DECIMAL(3,1) COMMENT '경력 년수',

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_skill (user_id, skill_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='사용자 기술 스택';

-- ----------------------------------------------------------------------------
-- 사용자 세션 테이블
-- ----------------------------------------------------------------------------
-- 설명: 로그인 세션 관리 (JWT 또는 세션 기반 인증)
-- 특징:
--   - 만료 시간 자동 체크
--   - IP 주소 및 User Agent 추적 (보안)
-- ----------------------------------------------------------------------------
CREATE TABLE user_sessions (
  session_id VARCHAR(255) PRIMARY KEY COMMENT '세션 ID (UUID 또는 JWT 토큰)',
  user_id INT NOT NULL COMMENT '사용자 ID',
  ip_address VARCHAR(45) COMMENT '접속 IP 주소 (IPv6 지원)',
  user_agent TEXT COMMENT '브라우저 정보',
  expires_at TIMESTAMP NOT NULL COMMENT '세션 만료 시간',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '세션 생성 시간',

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_expires (user_id, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='로그인 세션';

-- ----------------------------------------------------------------------------
-- 사용자 레벨 설정 테이블
-- ----------------------------------------------------------------------------
-- 설명: 각 레벨별 아이콘, 칭호, 필요 경험치 정의
-- 특징:
--   - 레벨별 아이콘 이모지 설정
--   - 레벨업에 필요한 경험치
--
-- 경험치 획득 예시:
--   - 1일 1커밋: +10 EXP
--   - 코딩 문제 풀기: +20 EXP
--   - 프로젝트 완료: +100 EXP
-- ----------------------------------------------------------------------------
CREATE TABLE user_level_configs (
  level INT PRIMARY KEY COMMENT '레벨 (1, 2, 3, 4, 5)',
  level_name VARCHAR(50) NOT NULL COMMENT '레벨 칭호',
  required_exp INT NOT NULL COMMENT '이 레벨에 도달하기 위한 필요 경험치',
  icon_emoji VARCHAR(10) COMMENT '레벨 아이콘 이모지'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='레벨별 설정 정보';

-- 기본 레벨 데이터 삽입 (5단계)
INSERT INTO user_level_configs (level, level_name, required_exp, icon_emoji) VALUES
(1, '새싹 개발자', 0, '🌱'),
(2, '주니어 개발자', 100, '🌿'),
(3, '시니어 개발자', 500, '🌳'),
(4, '전문가', 1500, '🏆'),
(5, '마스터', 3000, '👑');

-- ============================================================================
-- 2. 프로젝트 관리 도메인
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 프로젝트 테이블 (핵심)
-- ----------------------------------------------------------------------------
-- 설명: 모든 프로젝트의 기본 정보를 저장하는 가장 중요한 테이블
-- 특징:
--   - 프로젝트 소유자 (owner_id)
--   - AI 설정 모드 (scratch/guided)
--   - 팀원 모집 여부, 공개 여부 설정
--   - 프로젝트 진행률 추적
-- ----------------------------------------------------------------------------
CREATE TABLE projects (
  project_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '프로젝트 고유 ID',
  owner_id INT NOT NULL COMMENT '프로젝트 소유자 (생성자)',

  -- 기본 정보
  project_name VARCHAR(200) NOT NULL COMMENT '프로젝트명',
  description TEXT COMMENT '프로젝트 설명',
  category VARCHAR(50) COMMENT '카테고리 (웹 개발, 모바일, AI/ML, 게임, 기타)',
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner' COMMENT '난이도',

  -- 일정
  duration_weeks INT COMMENT '예상 기간 (주 단위)',
  start_date DATE COMMENT '시작일',
  end_date DATE COMMENT '종료일',

  -- 프로젝트 설정
  is_recruiting BOOLEAN DEFAULT FALSE COMMENT '팀원 모집 중 여부',
  is_public BOOLEAN DEFAULT TRUE COMMENT '공개 프로젝트 여부',
  ai_assisted BOOLEAN DEFAULT FALSE COMMENT 'AI 도움 사용 여부',

  -- AI 설정 정보 (AiProjectSetup 컴포넌트에서 수집)
  ai_setup_mode ENUM('scratch', 'guided', NULL) COMMENT 'AI 설정 모드 (자유 입력/가이드 모드)',
  ai_free_input TEXT COMMENT 'Scratch 모드 자유 입력 내용',
  dev_environment VARCHAR(100) COMMENT '개발 환경 (Web, Mobile, Desktop 등)',
  topic VARCHAR(200) COMMENT '프로젝트 주제',
  target_users TEXT COMMENT '목표 사용자',
  project_goal TEXT COMMENT '프로젝트 목표',

  -- 통계
  view_count INT DEFAULT 0 COMMENT '조회 수',
  like_count INT DEFAULT 0 COMMENT '좋아요 수',
  team_size_current INT DEFAULT 1 COMMENT '현재 팀원 수',
  team_size_max INT DEFAULT 10 COMMENT '최대 팀원 수',
  progress_percentage DECIMAL(5,2) DEFAULT 0.00 COMMENT '진행률 (%)',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

  FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_category (category),
  INDEX idx_difficulty (difficulty),
  INDEX idx_recruiting (is_recruiting),
  FULLTEXT idx_search (project_name, description) COMMENT '프로젝트 검색용 인덱스'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 정보';

-- ----------------------------------------------------------------------------
-- 프로젝트 기술 스택 테이블
-- ----------------------------------------------------------------------------
-- 설명: 프로젝트에 사용되는 언어, 프레임워크, 도구 등을 저장
-- 특징:
--   - 다대다 관계 (한 프로젝트가 여러 기술 사용)
--   - 기술 타입별 분류 (언어, 프레임워크, DB 등)
-- ----------------------------------------------------------------------------
CREATE TABLE project_tech_stacks (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '기술 스택 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  tech_type ENUM('language', 'framework', 'tool', 'database', 'other') NOT NULL COMMENT '기술 분류',
  tech_name VARCHAR(50) NOT NULL COMMENT '기술명 (예: React, Node.js, MySQL)',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  UNIQUE KEY unique_project_tech (project_id, tech_name) COMMENT '중복 방지'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 기술 스택';

-- ----------------------------------------------------------------------------
-- 프로젝트 팀원 테이블
-- ----------------------------------------------------------------------------
-- 설명: 프로젝트에 참여하는 팀원과 역할을 관리
-- 특징:
--   - 역할 (Frontend, Backend, Designer, PM 등)
--   - 권한 (owner, admin, editor, viewer)
-- ----------------------------------------------------------------------------
CREATE TABLE project_members (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '팀원 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',
  role VARCHAR(50) NOT NULL COMMENT '역할 (Frontend, Backend, Designer, PM 등)',
  permissions ENUM('owner', 'admin', 'editor', 'viewer') DEFAULT 'editor' COMMENT '권한 레벨',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '참여일',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_project_user (project_id, user_id) COMMENT '중복 참여 방지'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 팀원';

-- ----------------------------------------------------------------------------
-- 프로젝트 일정 테이블 (타임라인)
-- ----------------------------------------------------------------------------
-- 설명: 프로젝트의 주차별 일정을 관리 (ScheduleTimeline 컴포넌트)
-- 특징:
--   - 주(week) 단위 타임라인
--   - 진행 상태 (대기, 진행 중, 완료)
--   - UI 색상 및 아이콘 저장
-- ----------------------------------------------------------------------------
CREATE TABLE project_schedules (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '일정 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',

  -- 일정 정보
  title VARCHAR(200) NOT NULL COMMENT '일정 제목',
  description TEXT COMMENT '일정 설명',

  -- 타임라인 (주차 기반)
  start_week INT NOT NULL COMMENT '시작 주차',
  duration_weeks INT NOT NULL COMMENT '소요 기간 (주 단위)',

  -- UI 설정
  color VARCHAR(20) COMMENT 'UI 색상 (예: blue, green, purple)',
  icon VARCHAR(50) COMMENT 'Lucide 아이콘 이름 (예: Calendar, Code)',

  -- 진행 상태
  progress_percentage DECIMAL(5,2) DEFAULT 0.00 COMMENT '진행률 (%)',
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending' COMMENT '상태',
  notes TEXT COMMENT '메모',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  INDEX idx_project_week (project_id, start_week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 일정 (타임라인)';

-- ----------------------------------------------------------------------------
-- 일정 담당자 테이블
-- ----------------------------------------------------------------------------
-- 설명: 각 일정에 배정된 팀원을 관리
-- 특징: 일정과 사용자의 다대다 관계
-- ----------------------------------------------------------------------------
CREATE TABLE schedule_assignees (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '담당자 배정 ID',
  schedule_id INT NOT NULL COMMENT '일정 ID',
  user_id INT NOT NULL COMMENT '담당자 ID',

  FOREIGN KEY (schedule_id) REFERENCES project_schedules(schedule_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_schedule_user (schedule_id, user_id) COMMENT '중복 배정 방지'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='일정 담당자';

-- ----------------------------------------------------------------------------
-- 프로젝트 문서 테이블
-- ----------------------------------------------------------------------------
-- 설명: 프로젝트의 각종 문서를 저장 (기획서, ERD, 요구사항 등)
-- 특징:
--   - 문서 타입별 분류 (motivation, goals, requirements, erd 등)
--   - 버전 관리
-- ----------------------------------------------------------------------------
CREATE TABLE project_documents (
  document_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '문서 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  document_type VARCHAR(50) NOT NULL COMMENT '문서 타입 (motivation, goals, requirements, erd, usecase 등)',
  title VARCHAR(200) COMMENT '문서 제목',
  content LONGTEXT COMMENT '문서 내용 (Markdown)',
  author_id INT NOT NULL COMMENT '작성자 ID',
  version INT DEFAULT 1 COMMENT '버전',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_project_type (project_id, document_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 문서';

-- ----------------------------------------------------------------------------
-- 프로젝트 핵심 기능 테이블
-- ----------------------------------------------------------------------------
-- 설명: AI 설정 시 입력한 핵심 기능 목록 (AiProjectSetup - Guided 모드)
-- 특징: 순서 보장 (display_order)
-- ----------------------------------------------------------------------------
CREATE TABLE project_core_features (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '기능 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  feature_description VARCHAR(500) NOT NULL COMMENT '기능 설명',
  display_order INT DEFAULT 0 COMMENT '표시 순서',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='프로젝트 핵심 기능';

-- ============================================================================
-- 3. AI 기능 도메인
-- ============================================================================

-- ----------------------------------------------------------------------------
-- AI 초기 제안 테이블 (프로젝트 시작 시)
-- ----------------------------------------------------------------------------
-- 설명: 프로젝트 생성 시 AI가 제공하는 초기 가이드라인 (1-2번만 생성)
-- 특징:
--   - 프로젝트당 1개 행 (간단한 구조)
--   - 모든 제안을 한 번에 조회 가능
--   - 버전 관리로 재생성 지원
--
-- 사용 시나리오:
--   1. Guided 모드: 사용자가 기술스택/기능 입력 → AI가 일정/계획 생성
--   2. Scratch 모드: 사용자가 아이디어만 입력 → AI가 모든 것 추천
--
-- JSON 데이터 구조 예시:
--   - motivation_data: {"title": "프로젝트 동기", "content": "..."}
--   - goals_data: {"goals": [{"goal": "...", "description": "..."}, ...]}
--   - schedule_data: {"schedules": [{"title": "기획", "start_week": 1, "duration": 2, "description": "..."}, ...]}
--   - tech_stack_data: {"languages": ["JavaScript"], "frameworks": ["React"], "databases": ["MySQL"], "tools": ["Git"]}
--   - features_data: {"features": [{"name": "사용자 인증", "description": "...", "priority": "high"}, ...]}
--   - plan_data: {"steps": [{"phase": "기획", "description": "...", "duration": "1-2주"}, ...]}
-- ----------------------------------------------------------------------------
CREATE TABLE ai_suggestions (
  suggestion_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '제안 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',

  -- 버전 관리 (재생성 대비)
  version INT DEFAULT 1 COMMENT '제안 버전 (1, 2, 3... 재생성 시 증가)',

  -- 각 제안 데이터 (JSON 형식)
  motivation_data JSON COMMENT '동기 문서 {"title": "...", "content": "..."}',
  goals_data JSON COMMENT '목표 {"goals": [{"goal": "...", "description": "..."}, ...]}',
  requirements_data JSON COMMENT '요구사항 문서 {"content": "..."}',
  schedule_data JSON COMMENT '일정 {"schedules": [{"title": "...", "start_week": 1, "duration": 2, "description": "...", "color": "blue", "icon": "Calendar"}, ...]}',
  tech_stack_data JSON COMMENT '기술 스택 {"languages": [...], "frameworks": [...], "databases": [...], "tools": [...]}',
  features_data JSON COMMENT '핵심 기능 {"features": [{"name": "...", "description": "...", "priority": "high"}, ...]}',
  plan_data JSON COMMENT '개발 계획 {"steps": [{"phase": "기획", "description": "...", "duration": "1-2주"}, ...]}',
  erd_data JSON COMMENT 'ERD 설계 {"tables": [...], "relationships": [...]}',

  -- 전체 상태
  status ENUM('pending', 'applied', 'rejected') DEFAULT 'pending' COMMENT '
    pending: AI가 생성했지만 워크스페이스 미적용
    applied: 워크스페이스에 적용 완료
    rejected: 사용자가 거부
  ',

  -- AI 메타데이터
  ai_model VARCHAR(50) COMMENT '사용한 AI 모델 (gpt-4, claude-3.5-sonnet 등)',
  ai_mode ENUM('scratch', 'guided') COMMENT 'AI 설정 모드 (처음부터/계획 잡힌 상태)',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  applied_at TIMESTAMP COMMENT '워크스페이스 적용 시간',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  INDEX idx_project_version (project_id, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='AI 초기 제안 (프로젝트 시작 시 1-2번)';

-- ----------------------------------------------------------------------------
-- AI 채팅 메시지 테이블 (워크스페이스 개별 AI)
-- ----------------------------------------------------------------------------
-- 설명:
--   1. 우측 하단 AI 어시스턴트 대화
--   2. 워크스페이스 각 섹션에서 개별 AI 사용 (무제한)
--
-- 특징:
--   - 사용자 메시지와 AI 응답 구분 (role)
--   - context_type으로 어느 섹션에서 사용했는지 추적
--   - 대화 이력 보관
--
-- 사용 예시:
--   - "일정 관리"에서 [AI Task 추천]: context_type='schedule'
--   - "기획 > 요구사항"에서 [AI 작성]: context_type='requirements'
--   - "설계 > ERD"에서 [AI ERD 설계]: context_type='erd'
--   - "개발"에서 [AI 코드 리뷰]: context_type='code_review'
-- ----------------------------------------------------------------------------
CREATE TABLE ai_chat_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '메시지 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',

  -- 메시지 정보
  role ENUM('user', 'assistant') NOT NULL COMMENT '메시지 발신자 (user: 사용자, assistant: AI)',
  message_content TEXT NOT NULL COMMENT '메시지 내용',

  -- 워크스페이스 컨텍스트 (추가됨!)
  context_type VARCHAR(50) COMMENT '어느 워크스페이스 섹션에서 사용했는지 (schedule, requirements, erd, code_review, general 등)',
  context_id INT COMMENT '관련 데이터 ID (schedule_id, document_id 등)',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '전송 시간',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_project_created (project_id, created_at),
  INDEX idx_context (context_type, context_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='AI 채팅 메시지 (워크스페이스 개별 AI 포함)';

-- ----------------------------------------------------------------------------
-- AI 코드 리뷰 테이블
-- ----------------------------------------------------------------------------
-- 설명: AI가 분석한 코드 리뷰 결과를 저장
-- 특징:
--   - 코드 품질 분석
--   - 이슈 및 개선 사항 제안
--   - 종합 점수 제공
--
-- 사용 시나리오:
--   워크스페이스 "개발" 섹션에서 [AI 코드 리뷰] 클릭
--   → 코드 제출 → AI 분석 → 결과 저장
-- ----------------------------------------------------------------------------
CREATE TABLE ai_code_reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '리뷰 ID',
  project_id INT NOT NULL COMMENT '프로젝트 ID',
  user_id INT NOT NULL COMMENT '리뷰 요청자 ID',

  -- 코드 정보
  file_path VARCHAR(500) COMMENT '파일 경로',
  code_content LONGTEXT NOT NULL COMMENT '리뷰 대상 코드',
  language VARCHAR(50) COMMENT '프로그래밍 언어 (javascript, python, java 등)',

  -- AI 리뷰 결과
  ai_feedback TEXT NOT NULL COMMENT 'AI 종합 피드백',
  issues_found JSON COMMENT '발견된 이슈 배열 [{"severity": "high", "line": 15, "type": "security", "message": "...", "suggestion": "..."}, ...]',
  strengths JSON COMMENT '코드의 강점 ["명확한 변수명", "적절한 에러 핸들링", ...]',
  improvements JSON COMMENT '개선 사항 제안 ["성능 최적화 필요", "테스트 코드 추가", ...]',
  overall_score DECIMAL(3,1) COMMENT '종합 점수 (0.0 - 10.0)',

  -- AI 메타데이터
  ai_model VARCHAR(50) COMMENT '사용한 AI 모델',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '리뷰 시간',

  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_project_user (project_id, user_id),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='AI 코드 리뷰 결과';

-- ============================================================================
-- 4. 코딩 연습 도메인
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 코딩 테스트 문제 테이블
-- ----------------------------------------------------------------------------
-- 설명: 코딩 테스트 문제 은행
-- 특징:
--   - 난이도 3단계 (쉬움, 보통, 어려움)
--   - 테스트 케이스 JSON 저장
--   - 제출 통계 (정답률, 제출 수)
-- ----------------------------------------------------------------------------
CREATE TABLE coding_problems (
  problem_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '문제 ID',
  title VARCHAR(200) NOT NULL COMMENT '문제 제목',
  description TEXT NOT NULL COMMENT '문제 설명',
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium' COMMENT '난이도',
  category VARCHAR(50) COMMENT '카테고리 (알고리즘, 자료구조, SQL 등)',

  -- 테스트 케이스 및 제한사항
  test_cases JSON COMMENT '테스트 케이스 배열 (입력/출력 쌍)',
  time_limit INT COMMENT '시간 제한 (초)',
  memory_limit INT COMMENT '메모리 제한 (MB)',

  -- 메타데이터
  tags JSON COMMENT '태그 배열 (해시테이블, 정렬, DFS 등)',

  -- 통계
  acceptance_rate DECIMAL(5,2) DEFAULT 0.00 COMMENT '정답률 (%)',
  submission_count INT DEFAULT 0 COMMENT '총 제출 수',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',

  FULLTEXT idx_search (title, description) COMMENT '문제 검색용 인덱스'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='코딩 테스트 문제';

-- ----------------------------------------------------------------------------
-- 코드 제출 기록 테이블
-- ----------------------------------------------------------------------------
-- 설명: 사용자가 제출한 코드와 채점 결과
-- 특징:
--   - 제출 상태 (대기, 정답, 오답, 런타임 에러 등)
--   - 실행 시간 및 메모리 사용량 기록
-- ----------------------------------------------------------------------------
CREATE TABLE coding_submissions (
  submission_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '제출 ID',
  problem_id INT NOT NULL COMMENT '문제 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',

  -- 제출 코드
  code TEXT NOT NULL COMMENT '제출한 코드',
  language VARCHAR(20) NOT NULL COMMENT '프로그래밍 언어 (python, javascript, java 등)',

  -- 채점 결과
  status ENUM('pending', 'accepted', 'wrong_answer', 'runtime_error', 'time_limit') DEFAULT 'pending' COMMENT '제출 상태',
  execution_time INT COMMENT '실행 시간 (ms)',
  memory_used INT COMMENT '사용 메모리 (KB)',

  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '제출 시간',

  FOREIGN KEY (problem_id) REFERENCES coding_problems(problem_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user_problem (user_id, problem_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='코드 제출 기록';

-- ----------------------------------------------------------------------------
-- 챌린지 테이블
-- ----------------------------------------------------------------------------
-- 설명: 1일 1커밋, 출석 체크, 문제 풀기 챌린지 기록
-- 특징:
--   - 일자별 중복 방지 (unique key)
--   - 챌린지 타입별 분류
-- ----------------------------------------------------------------------------
CREATE TABLE challenges (
  challenge_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '챌린지 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',
  challenge_type ENUM('daily_commit', 'attendance', 'problem_solving') NOT NULL COMMENT '챌린지 타입',
  completion_date DATE NOT NULL COMMENT '완료 날짜',
  description VARCHAR(500) COMMENT '챌린지 설명',

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_challenge_date (user_id, challenge_type, completion_date) COMMENT '일자별 중복 방지',
  INDEX idx_user_type (user_id, challenge_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='챌린지 (1일 1커밋, 출석 체크 등)';

-- ============================================================================
-- 5. 커뮤니티 도메인
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 커뮤니티 게시글 테이블
-- ----------------------------------------------------------------------------
-- 설명: 커뮤니티 게시판의 게시글
-- 특징:
--   - 카테고리별 분류 (Q&A, 프로젝트 소개, 스터디 모집 등)
--   - 고정 게시글 (공지) 지원
--   - Soft Delete (is_deleted)
-- ----------------------------------------------------------------------------
CREATE TABLE community_posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '게시글 ID',
  author_id INT NOT NULL COMMENT '작성자 ID',

  -- 게시글 정보
  title VARCHAR(300) NOT NULL COMMENT '제목',
  content LONGTEXT NOT NULL COMMENT '내용 (Markdown)',
  category VARCHAR(50) COMMENT '카테고리 (Q&A, 프로젝트 소개, 스터디 모집, 자유게시판 등)',

  -- 통계
  view_count INT DEFAULT 0 COMMENT '조회 수',
  like_count INT DEFAULT 0 COMMENT '좋아요 수',
  comment_count INT DEFAULT 0 COMMENT '댓글 수',

  -- 게시글 상태
  is_pinned BOOLEAN DEFAULT FALSE COMMENT '고정 게시글 여부 (공지)',
  is_deleted BOOLEAN DEFAULT FALSE COMMENT '삭제 여부 (Soft Delete)',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

  FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_category_created (category, created_at DESC),
  FULLTEXT idx_search (title, content) COMMENT '게시글 검색용 인덱스'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='커뮤니티 게시글';

-- ----------------------------------------------------------------------------
-- 커뮤니티 댓글 테이블
-- ----------------------------------------------------------------------------
-- 설명: 게시글에 달린 댓글 및 대댓글
-- 특징:
--   - 대댓글 지원 (parent_comment_id)
--   - Soft Delete
-- ----------------------------------------------------------------------------
CREATE TABLE community_comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '댓글 ID',
  post_id INT NOT NULL COMMENT '게시글 ID',
  author_id INT NOT NULL COMMENT '작성자 ID',
  parent_comment_id INT COMMENT '부모 댓글 ID (대댓글인 경우)',
  content TEXT NOT NULL COMMENT '댓글 내용',

  -- 통계
  like_count INT DEFAULT 0 COMMENT '좋아요 수',

  -- 상태
  is_deleted BOOLEAN DEFAULT FALSE COMMENT '삭제 여부 (Soft Delete)',

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

  FOREIGN KEY (post_id) REFERENCES community_posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES community_comments(comment_id) ON DELETE CASCADE,
  INDEX idx_post_created (post_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='커뮤니티 댓글';

-- ----------------------------------------------------------------------------
-- 커뮤니티 좋아요 테이블
-- ----------------------------------------------------------------------------
-- 설명: 게시글 및 댓글의 좋아요 기록
-- 특징:
--   - 중복 좋아요 방지
--   - 게시글/댓글 모두 지원 (polymorphic association)
-- ----------------------------------------------------------------------------
CREATE TABLE community_likes (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '좋아요 ID',
  user_id INT NOT NULL COMMENT '사용자 ID',
  target_type ENUM('post', 'comment') NOT NULL COMMENT '대상 타입 (게시글/댓글)',
  target_id INT NOT NULL COMMENT '대상 ID (post_id 또는 comment_id)',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '좋아요 시간',

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_like (user_id, target_type, target_id) COMMENT '중복 좋아요 방지',
  INDEX idx_target (target_type, target_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='커뮤니티 좋아요';

-- ============================================================================
-- 초기 데이터 삽입 (선택 사항)
-- ============================================================================

-- 테스트용 사용자 생성 (비밀번호: password123 - bcrypt 해시)
-- 실제 운영 환경에서는 삭제해야 합니다
INSERT INTO users (email, password_hash, username, full_name, bio) VALUES
('test@codemap.com', '$2b$10$example_hash_here', 'testuser', '테스트 사용자', 'CodeMap 개발자입니다.');

-- ============================================================================
-- 유용한 쿼리 예시 (주석으로 보관)
-- ============================================================================

-- 1. 특정 사용자의 모든 프로젝트 조회
-- SELECT p.*, COUNT(pm.user_id) as team_count
-- FROM projects p
-- LEFT JOIN project_members pm ON p.project_id = pm.project_id
-- WHERE p.owner_id = 1
-- GROUP BY p.project_id;

-- 2. 팀원 모집 중인 프로젝트 검색 (난이도 필터)
-- SELECT p.*, GROUP_CONCAT(pts.tech_name) as tech_stack
-- FROM projects p
-- LEFT JOIN project_tech_stacks pts ON p.project_id = pts.project_id
-- WHERE p.is_recruiting = TRUE AND p.difficulty = 'intermediate'
-- GROUP BY p.project_id;

-- 3. 프로젝트 진행률 업데이트 (완료된 일정 기준)
-- UPDATE projects p
-- SET progress_percentage = (
--   SELECT (SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) * 100.0 / COUNT(*))
--   FROM project_schedules
--   WHERE project_id = p.project_id
-- )
-- WHERE p.project_id = 1;

-- 4. 사용자 출석 streak 계산
-- SELECT user_id,
--   COUNT(*) as streak_days,
--   MIN(completion_date) as streak_start,
--   MAX(completion_date) as streak_end
-- FROM challenges
-- WHERE challenge_type = 'attendance'
-- AND user_id = 1
-- GROUP BY user_id;

-- 5. AI 제안을 워크스페이스에 적용하기
-- 예시: 일정 제안을 project_schedules에 적용
-- INSERT INTO project_schedules (project_id, title, description, start_week, duration_weeks, status)
-- SELECT
--   suggestion.project_id,
--   schedule_item->>'$.title',
--   schedule_item->>'$.description',
--   schedule_item->>'$.start_week',
--   schedule_item->>'$.duration',
--   'pending'
-- FROM ai_suggestions suggestion,
-- JSON_TABLE(
--   suggestion.suggestion_data,
--   '$.schedules[*]' COLUMNS (
--     schedule_item JSON PATH '$'
--   )
-- ) AS schedules
-- WHERE suggestion.suggestion_id = 1 AND suggestion.suggestion_type = 'schedule';

-- 6. 특정 프로젝트의 대기 중인 AI 제안 조회
-- SELECT
--   suggestion_id,
--   suggestion_type,
--   suggestion_data,
--   created_at
-- FROM ai_suggestions
-- WHERE project_id = 1 AND status = 'pending'
-- ORDER BY created_at ASC;

-- ============================================================================
-- 스키마 작성 완료
-- ============================================================================
