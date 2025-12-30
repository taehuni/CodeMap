import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section 
      className="relative overflow-hidden px-[5.5vw] flex flex-col justify-center items-center"
      style={{
        height: 'clamp(350px, 30vw, 450px)',
        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        paddingLeft: 'max(5.5vw, 80px)',
        paddingRight: 'max(5.5vw, 80px)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px]">
        <h2 
          className="text-white mb-4"
          style={{ fontSize: 'clamp(2rem, 3.3vw, 3rem)' }}
        >
          오늘부터 시작하는 개발자 성장
        </h2>
        
        <p className="text-xl text-white/95 mb-2">
          AI 로드맵, 프로젝트 관리, 팀 협업, 코딩 테스트까지
        </p>
        
        <p className="text-white/85 mb-10">
          지금 가입하고 모든 기능을 무료로 사용하세요
        </p>
        
        <a href="#signup" className="px-14 py-6 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-2xl text-xl inline-flex items-center gap-3 h-16">
          무료로 시작하기
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}