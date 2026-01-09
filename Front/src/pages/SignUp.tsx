import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Github, Mail } from 'lucide-react';
import CodeMapLogo from '../components/CodeMapLogo';
import { register, saveAuth } from '../api/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        username: formData.username
      });

      // 회원가입 성공 시 로그인 페이지로 이동
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="mb-8">
            <CodeMapLogo className="mb-6" />
            <h1 className="text-3xl mb-2">회원가입</h1>
            <p className="text-gray-600">
              코드맵과 함께 개발자로 성장하세요
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
              disabled
            >
              <Github className="w-5 h-5" />
              <span>GitHub으로 계속하기 (준비 중)</span>
            </button>
            <button
              type="button"
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
              disabled
            >
              <Mail className="w-5 h-5" />
              <span>Google로 계속하기 (준비 중)</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">또는 이메일로 가입</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm mb-2 text-gray-700">
                사용자 이름
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="codemap_user"
                required
              />
            </div>

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
                  placeholder="8자 이상 입력해주세요"
                  required
                  minLength={8}
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="space-y-3 pt-2 pb-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  <span className="text-blue-500">(필수)</span> 이용약관에 동의합니다
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  <span className="text-blue-500">(필수)</span> 개인정보 처리방침에 동의합니다
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  <span className="text-gray-500">(선택)</span> 마케팅 정보 수신에 동의합니다
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '가입 중...' : '가입하기'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              로그인
            </Link>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          가입하시면 코드맵의{' '}
          <a href="/terms" className="text-blue-500 hover:text-blue-600">이용약관</a>과{' '}
          <a href="/privacy" className="text-blue-500 hover:text-blue-600">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}