const API_URL = 'http://localhost:5000/api';

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    userId: number;
    email: string;
    username: string;
    level: number;
    experiencePoints?: number;
  };
}

// 회원가입 API
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '회원가입에 실패했습니다');
  }

  return response.json();
}

// 로그인 API
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '아이디 또는 비밀번호를 확인하세요');
    }

    return response.json();
  } catch (error) {
    // 네트워크 오류인 경우
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    // 기타 오류는 그대로 전달
    throw error;
  }
}

// 로그아웃 (로컬 토큰 삭제)
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// 토큰 저장
export function saveAuth(token: string, user: AuthResponse['user']) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

// 토큰 가져오기
export function getToken(): string | null {
  return localStorage.getItem('token');
}

// 사용자 정보 가져오기
export function getUser(): AuthResponse['user'] | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
  return !!getToken();
}
