import React from 'react';
import { Sparkles, FolderPlus, Users, Award } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'AI로 로드맵 설계',
    description: '아이디어를 AI와 공유하고 실행 가능한 개발 로드맵을 받으세요',
    icon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1582138825658-fb952c08b282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBjb2RpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY2OTA1ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageLeft: true
  },
  {
    number: 2,
    title: '프로젝트 시작 & 팀 구성',
    description: '프로젝트를 생성하고 필요한 팀원을 모집해보세요',
    icon: FolderPlus,
    imageUrl: 'https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzY2ODgzNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageLeft: false
  },
  {
    number: 3,
    title: '협업 & 코드 개선',
    description: '팀원들과 실시간 협업하며 AI 피드백으로 코드 품질을 높이세요',
    icon: Users,
    imageUrl: 'https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc2NjkwNTg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageLeft: true
  },
  {
    number: 4,
    title: '포트폴리오 완성',
    description: '완성된 프로젝트를 포트폴리오로 공유하고 커리어를 성장시키세요',
    icon: Award,
    imageUrl: 'https://images.unsplash.com/photo-1763627556370-aad570fe025b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBzdWNjZXNzJTIwam91cm5leXxlbnwxfHx8fDE3NjY5MDU4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageLeft: false
  }
];

export default function ProcessSection() {
  return (
    <section 
      className="px-[5.5vw] py-[8.3vw] bg-gray-50"
      style={{ 
        paddingLeft: 'max(5.5vw, 80px)', 
        paddingRight: 'max(5.5vw, 80px)',
        paddingTop: 'max(8.3vw, 120px)',
        paddingBottom: 'max(8.3vw, 120px)'
      }}
    >
      <div className="w-full max-w-[1000px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 style={{ fontSize: 'clamp(2rem, 3.3vw, 3rem)' }}>
            코드맵으로 프로젝트 완성하기
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-24">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`grid md:grid-cols-2 gap-16 items-center ${
                  !step.imageLeft ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={step.imageLeft ? 'md:order-1' : 'md:order-2'}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={step.imageLeft ? 'md:order-2' : 'md:order-1'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl text-gray-200">
                      {step.number.toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl mb-4">
                    Step {step.number}. {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
