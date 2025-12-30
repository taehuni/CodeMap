import React from 'react';
import { Map, FolderKanban, Sparkles, Users, Code, Trophy } from 'lucide-react';

const features = [
  {
    icon: Map,
    iconBg: '#3B82F6',
    title: 'AI 개발 로드맵',
    description: 'AI와 대화하며 맞춤형 학습 경로를 설계하세요. 언어, 프레임워크 선택부터 장단점 분석, 학습 절차까지 체계적인 가이드라인을 제공합니다',
    badge: '인기'
  },
  {
    icon: FolderKanban,
    iconBg: '#10B981',
    title: '프로젝트 허브',
    description: '프로젝트를 생성하고 진행 상황을 관리하세요. 포트폴리오로 활용 가능한 프로젝트 페이지에서 당신의 개발 여정을 기록합니다',
    badge: null
  },
  {
    icon: Sparkles,
    iconBg: '#8B5CF6',
    title: 'AI 코드 피드백',
    description: '작성한 코드를 AI에게 리뷰받으세요. 개선점, 베스트 프랙티스, 잠재적 버그까지 상세한 피드백을 실시간으로 받을 수 있습니다',
    badge: null
  },
  {
    icon: Users,
    iconBg: '#F59E0B',
    title: '팀원 구인 & 협업',
    description: '프로젝트 팀원을 모집하고 함께 작업하세요. 실시간 공동 작업 도구로 원격에서도 효율적인 팀 프로젝트가 가능합니다',
    badge: null,
    extra: '팀 관리 · 역할 배정 · 실시간 협업'
  },
  {
    icon: Code,
    iconBg: '#EF4444',
    title: '실전 코딩 테스트',
    description: '난이도별 알고리즘 문제를 풀며 실력을 향상시키세요. 다양한 언어 지원과 AI 힌트로 효과적인 학습이 가능합니다',
    badge: null,
    extra: '1,000+ 문제 · 언어별 풀이 · 자동 채점'
  },
  {
    icon: Trophy,
    iconBg: '#06B6D4',
    title: '코딩 챌린지',
    description: '주간/월간 챌린지에 참여하고 다른 개발자들과 경쟁하세요. 랭킹 시스템과 보상으로 동기부여를 받으며 성장합니다',
    badge: '이벤트'
  }
];

export default function FeaturesSection() {
  return (
    <section 
      className="px-[5.5vw] py-[8.3vw]"
      style={{ 
        paddingLeft: 'max(5.5vw, 80px)', 
        paddingRight: 'max(5.5vw, 80px)',
        paddingTop: 'max(8.3vw, 120px)',
        paddingBottom: 'max(8.3vw, 120px)'
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 
            className="mb-4"
            style={{ fontSize: 'clamp(2rem, 3.3vw, 3rem)' }}
          >
            코드맵의 핵심 기능
          </h2>
          <p className="text-lg text-gray-600">
            프로젝트 시작부터 완성까지, 개발자의 모든 여정을 지원합니다
          </p>
        </div>

        {/* Features Grid */}
        <div 
          className="grid gap-8"
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(1.5rem, 2vw, 2rem)'
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {feature.badge}
                  </div>
                )}

                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: feature.iconBg }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-5">
                  {feature.description}
                </p>

                {/* Extra Info */}
                {feature.extra && (
                  <p className="text-sm text-gray-500 mb-5 pb-5 border-b border-gray-100">
                    {feature.extra}
                  </p>
                )}

                {/* Link */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-[15px]"
                >
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
