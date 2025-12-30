import React from 'react';
import { MessageSquare, Rocket, BookOpen, Target } from 'lucide-react';

const features = [
  {
    icon: '💬',
    text: '질문 & 답변 - 막힌 부분을 함께 해결'
  },
  {
    icon: '🚀',
    text: '프로젝트 쇼케이스 - 완성작 자랑하기'
  },
  {
    icon: '📚',
    text: '스터디 모집 - 함께 공부할 동료 찾기'
  },
  {
    icon: '🎯',
    text: '기술 토론 - 최신 트렌드와 베스트 프랙티스'
  }
];

export default function CommunitySection() {
  return (
    <section 
      className="px-[5.5vw] py-[8.3vw]"
      style={{ 
        paddingLeft: 'max(5.5vw, 80px)', 
        paddingRight: 'max(5.5vw, 80px)',
        paddingTop: 'max(8.3vw, 120px)',
        paddingBottom: 'max(8.3vw, 120px)',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-[5vw] items-center">
          {/* Left Content */}
          <div>
            <div className="text-xs text-blue-600 uppercase tracking-wider mb-4">
              COMMUNITY
            </div>
            
            <h2 
              className="mb-6"
              style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)' }}
            >
              함께 성장하는 개발자 커뮤니티
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              질문하고, 공유하고, 배우세요. 코드맵 커뮤니티에서 같은 목표를 가진 개발자들과 함께 성장합니다
            </p>

            {/* Features List */}
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <p className="text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-lg">
              커뮤니티 둘러보기
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc2NjkwNTg4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Community"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
              <div className="text-3xl mb-1">5,000+</div>
              <p className="text-gray-600 text-sm">활성 멤버</p>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6">
              <div className="text-3xl mb-1">10,000+</div>
              <p className="text-gray-600 text-sm">월간 게시글</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
