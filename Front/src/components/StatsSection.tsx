import React from 'react';

const stats = [
  { value: '8,000+', label: '활성 개발자' },
  { value: '15,000+', label: '생성된 로드맵' },
  { value: '3,500+', label: '진행 중인 프로젝트' },
  { value: '50,000+', label: '해결된 문제' }
];

export default function StatsSection() {
  return (
    <section 
      className="px-[5.5vw] py-[6.9vw] bg-white"
      style={{ 
        paddingLeft: 'max(5.5vw, 80px)', 
        paddingRight: 'max(5.5vw, 80px)',
        paddingTop: 'max(6.9vw, 100px)',
        paddingBottom: 'max(6.9vw, 100px)'
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)' }}>
            코드맵과 함께하는 개발자들
          </h2>
        </div>

        {/* Stats Grid */}
        <div 
          className="grid gap-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                style={{ 
                  fontSize: 'clamp(2.5rem, 3.9vw, 3.5rem)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1'
                }}
              >
                {stat.value}
              </div>
              <p className="text-lg text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
