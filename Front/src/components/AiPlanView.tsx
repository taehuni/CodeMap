import React from 'react';
import { Sparkles, CheckCircle2, Clock, Lightbulb, Code, Target, Users, Layers } from 'lucide-react';

interface AiPlanViewProps {
  aiPlan: any;
}

export default function AiPlanView({ aiPlan }: AiPlanViewProps) {
  if (!aiPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-gray-900 mb-2">AI 계획이 아직 생성되지 않았습니다</h3>
        <p className="text-sm text-gray-500">프로젝트 생성 시 "구체적인 계획으로 시작"을 선택하면 AI가 초기 계획을 생성합니다.</p>
      </div>
    );
  }

  // Handle "scratch" mode (완전히 처음부터 시작)
  if (aiPlan.mode === 'scratch') {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-gray-900 mb-2">AI와 함께 프로젝트 시작하기</h2>
              <p className="text-sm text-gray-600">
                아이디어를 구체화하고, AI와 대화하며 프로젝트를 만들어가세요.
              </p>
            </div>
          </div>
        </div>

        {/* User Input */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-gray-900">당신의 아이디어</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {aiPlan.freeInput || '입력된 내용이 없습니다.'}
            </p>
          </div>
        </section>

        {/* Next Steps for Scratch Mode */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-gray-900">다음 단계</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">✅ 우측 하단의 AI 챗봇과 대화하며 아이디어를 구체화하세요</p>
            <p className="text-sm text-gray-700">✅ 프로젝트 동기와 목표를 문서로 정리하세요</p>
            <p className="text-sm text-gray-700">✅ 요구사항을 정의하고 핵심 기능을 선정하세요</p>
            <p className="text-sm text-gray-700">✅ 일정 관리에서 프로젝트 일정을 계획하세요</p>
            <p className="text-sm text-gray-700">✅ 팀원들과 함께 프로젝트를 진행하세요</p>
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-gray-900">AI 추천 사항</h3>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm text-gray-900 mb-2">프로젝트를 성공적으로 진행하려면</h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li>• 명확한 목표와 요구사항을 정의하세요</li>
                  <li>• 작은 단위로 나누어 점진적으로 개발하세요</li>
                  <li>• 정기적으로 팀원들과 소통하고 피드백을 받으세요</li>
                  <li>• Git을 활용한 버전 관리를 철저히 하세요</li>
                  <li>• 코드 리뷰와 테스트를 습관화하세요</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Handle "guided" mode (구체적인 계획으로 시작)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-gray-900 mb-2">AI 생성 프로젝트 계획</h2>
            <p className="text-sm text-gray-600">
              입력하신 정보를 바탕으로 AI가 프로젝트의 초기 계획을 생성했습니다. 
              필요에 따라 수정하고 발전시켜 나가세요.
            </p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-gray-900">프로젝트 개요</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">프로젝트 설명</label>
            <p className="text-sm text-gray-900">{aiPlan.description || '설명이 없습니다.'}</p>
          </div>
          {aiPlan.targetUsers && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">목표 사용자</label>
              <p className="text-sm text-gray-900">{aiPlan.targetUsers}</p>
            </div>
          )}
          {aiPlan.projectGoal && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">프로젝트 목표</label>
              <p className="text-sm text-gray-900">{aiPlan.projectGoal}</p>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      {(aiPlan.languages?.length > 0 || aiPlan.frameworks?.length > 0) && (
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-gray-900">기술 스택</h3>
          </div>
          <div className="space-y-4">
            {aiPlan.languages?.length > 0 && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">언어</label>
                <div className="flex flex-wrap gap-2">
                  {aiPlan.languages.map((lang: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {aiPlan.frameworks?.length > 0 && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">프레임워크</label>
                <div className="flex flex-wrap gap-2">
                  {aiPlan.frameworks.map((framework: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Core Features */}
      {aiPlan.coreFeatures?.length > 0 && aiPlan.coreFeatures[0] !== '' && (
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-900">핵심 기능</h3>
          </div>
          <ul className="space-y-2">
            {aiPlan.coreFeatures.map((feature: string, idx: number) => (
              feature && (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-900">{feature}</span>
                </li>
              )
            ))}
          </ul>
        </section>
      )}

      {/* AI Recommendations */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-gray-900">AI 추천 개발 계획</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <h4 className="text-sm text-gray-900 mb-3">단계별 개발 순서</h4>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">프로젝트 기획 및 설계</p>
                  <p className="text-xs text-gray-600">요구사항 분석, DB 설계, UI/UX 디자인</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">개발 환경 구축</p>
                  <p className="text-xs text-gray-600">프로젝트 초기화, 의존성 설치, 개발 도구 설정</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">핵심 기능 개발</p>
                  <p className="text-xs text-gray-600">백엔드 API, 프론트엔드 UI, 데이터베이스 연동</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">테스트 및 최적화</p>
                  <p className="text-xs text-gray-600">단위 테스트, 통합 테스트, 성능 최적화</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">5</span>
                <div>
                  <p className="text-sm text-gray-900 mb-1">배포 및 운영</p>
                  <p className="text-xs text-gray-600">서버 배포, CI/CD 구축, 모니터링 설정</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm text-gray-900 mb-2">AI 추천 사항</h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li>• 프로젝트 초기에는 MVP(Minimum Viable Product) 개발에 집중하세요</li>
                  <li>• Git을 활용한 버전 관리를 철저히 하세요</li>
                  <li>• 코드 리뷰를 통해 코드 품질을 높이세요</li>
                  <li>• 문서화를 꾸준히 진행하여 유지보수성을 높이세요</li>
                  <li>• 정기적인 백업과 보안 점검을 잊지 마세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estimated Timeline */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-gray-900">예상 일정</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">기획 및 설계</span>
            <span className="text-sm text-gray-900">1-2주</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">개발 환경 구축</span>
            <span className="text-sm text-gray-900">1주</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">핵심 기능 개발</span>
            <span className="text-sm text-gray-900">3-4주</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">테스트 및 최적화</span>
            <span className="text-sm text-gray-900">1-2주</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">배포 및 운영 준비</span>
            <span className="text-sm text-gray-900">1주</span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">총 예상 기간</span>
              <span className="text-blue-600">7-10주</span>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-900">다음 단계</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">✅ AI가 생성한 계획을 검토하세요</p>
          <p className="text-sm text-gray-700">✅ 필요한 부분을 수정하고 보완하세요</p>
          <p className="text-sm text-gray-700">✅ 팀원들과 계획을 공유하고 피드백을 받으세요</p>
          <p className="text-sm text-gray-700">✅ 일정 관리에서 상세 일정을 설정하세요</p>
          <p className="text-sm text-gray-700">✅ 각 기획 문서를 작성하며 구체화하세요</p>
        </div>
      </section>
    </div>
  );
}
