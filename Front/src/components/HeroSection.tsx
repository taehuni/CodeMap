import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[700px] max-h-[900px] h-[90vh] px-[5.5vw] py-12 flex items-center"
      style={{ paddingLeft: 'max(5.5vw, 80px)', paddingRight: 'max(5.5vw, 80px)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-[5vw] items-center">
          {/* Left Content */}
          <div className="max-w-[600px]">
            <div className="flex items-center gap-2 mb-2 text-blue-500">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">AI와 함께 설계하는</span>
            </div>
            
            <h1 
              className="mb-6"
              style={{ 
                fontSize: 'clamp(2.5rem, 4.2vw, 3.75rem)',
                lineHeight: '1.2'
              }}
            >
              개발자 커리어 로드맵
            </h1>
            
            <p 
              className="text-gray-600 mb-10"
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                lineHeight: '1.6'
              }}
            >
              프로젝트 기획부터 팀 빌딩, 코드 리뷰, 실전 테스트까지. 개발자 성장의 모든 단계를 한 곳에서
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <Link to="/register" className="px-12 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg h-14 flex items-center gap-2">
                나만의 로드맵 만들기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-10 py-5 border-2 border-blue-500 text-blue-500 bg-transparent rounded-lg hover:bg-blue-50 transition-all h-14 flex items-center text-lg">
                기능 둘러보기
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              회원가입만으로 모든 기능 무료 이용
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative w-full max-w-[650px] mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1582138825658-fb952c08b282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2RpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY2OTA1ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="CodeMap Dashboard"
                className="w-full h-full object-cover"
              />
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI 로드맵 생성</p>
                    <p className="text-sm">React 풀스택 개발자 되기</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">진행률 67% • 3주 차</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}