import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Github, Mail } from 'lucide-react';
import CodeMapLogo from '../components/CodeMapLogo';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Simulate login success - redirect to main page
    window.location.hash = 'main';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8">
          <a href="#" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </a>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="mb-8">
            <CodeMapLogo className="mb-6" />
            <h1 className="text-3xl mb-2">로그인</h1>
            <p className="text-gray-600">
              코드맵에 오신 것을 환영합니다
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={() => window.location.hash = 'main'}
              type="button"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <Github className="w-5 h-5" />
              <span>GitHub으로 로그인</span>
            </button>
            <button 
              onClick={() => window.location.hash = 'main'}
              type="button"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              <span>Google로 로그인</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">또는 이메일로 로그인</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  로그인 유지
                </span>
              </label>

              <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                비밀번호 찾기
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              로그인
            </button>

            {/* Demo Button */}
            <button
              type="button"
              onClick={() => window.location.hash = 'main'}
              className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              데모 계정으로 체험하기
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            계정이 없으신가요?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600">
              회원가입
            </a>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          로그인하시면 코드맵의{' '}
          <a href="/terms" className="text-blue-500 hover:text-blue-600">이용약관</a>과{' '}
          <a href="/privacy" className="text-blue-500 hover:text-blue-600">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}