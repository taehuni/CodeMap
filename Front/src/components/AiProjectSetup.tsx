import React, { useState } from 'react';
import { 
  ArrowLeft,
  Sparkles,
  Target,
  ChevronRight,
  Plus,
  Trash2,
  X
} from 'lucide-react';

interface AiProjectSetupProps {
  projectName: string;
  onComplete: (data: any, mode: 'scratch' | 'guided') => void;
  onBack: () => void;
}

export default function AiProjectSetup({ projectName, onComplete, onBack }: AiProjectSetupProps) {
  const [aiSetupMode, setAiSetupMode] = useState<'scratch' | 'guided' | null>(null);
  const [aiSetupData, setAiSetupData] = useState({
    // For 'scratch' mode
    freeInput: '',
    // For 'guided' mode
    devEnvironment: '',
    languages: [] as string[],
    frameworks: [] as string[],
    topic: '',
    description: '',
    coreFeatures: [''],
    targetUsers: '',
    projectGoal: ''
  });

  // For input fields
  const [languageInput, setLanguageInput] = useState('');
  const [frameworkInput, setFrameworkInput] = useState('');

  const addCoreFeature = () => {
    setAiSetupData({
      ...aiSetupData,
      coreFeatures: [...aiSetupData.coreFeatures, '']
    });
  };

  const updateCoreFeature = (index: number, value: string) => {
    const newFeatures = [...aiSetupData.coreFeatures];
    newFeatures[index] = value;
    setAiSetupData({
      ...aiSetupData,
      coreFeatures: newFeatures
    });
  };

  const removeCoreFeature = (index: number) => {
    setAiSetupData({
      ...aiSetupData,
      coreFeatures: aiSetupData.coreFeatures.filter((_, i) => i !== index)
    });
  };

  const handleComplete = () => {
    if (aiSetupMode) {
      onComplete(aiSetupData, aiSetupMode);
    }
  };

  const resetAndGoBack = () => {
    setAiSetupMode(null);
    setAiSetupData({
      freeInput: '',
      devEnvironment: '',
      languages: [],
      frameworks: [],
      topic: '',
      description: '',
      coreFeatures: [''],
      targetUsers: '',
      projectGoal: ''
    });
    setLanguageInput('');
    setFrameworkInput('');
  };

  const addLanguage = () => {
    if (languageInput.trim() && !aiSetupData.languages.includes(languageInput.trim())) {
      setAiSetupData({
        ...aiSetupData,
        languages: [...aiSetupData.languages, languageInput.trim()]
      });
      setLanguageInput('');
    }
  };

  const removeLanguage = (index: number) => {
    setAiSetupData({
      ...aiSetupData,
      languages: aiSetupData.languages.filter((_, i) => i !== index)
    });
  };

  const addFramework = () => {
    if (frameworkInput.trim() && !aiSetupData.frameworks.includes(frameworkInput.trim())) {
      setAiSetupData({
        ...aiSetupData,
        frameworks: [...aiSetupData.frameworks, frameworkInput.trim()]
      });
      setFrameworkInput('');
    }
  };

  const removeFramework = (index: number) => {
    setAiSetupData({
      ...aiSetupData,
      frameworks: aiSetupData.frameworks.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl text-gray-900">{projectName}</h1>
                <p className="text-sm text-gray-500">AI 도움 설정</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Setup Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {!aiSetupMode ? (
            /* Mode Selection */
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">AI 프로젝트 도우미</span>
              </div>
              <h2 className="text-3xl text-gray-900 mb-3">프로젝트를 어떻게 시작하시겠어요?</h2>
              <p className="text-gray-600 mb-12">AI가 프로젝트 전체 과정을 도와드립니다</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scratch Mode */}
                <button
                  onClick={() => setAiSetupMode('scratch')}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">완전히 처음부터 시작</h3>
                  <p className="text-gray-600 mb-4">
                    아이디어만 있으신가요? AI가 기획부터 개발까지 모든 과정을 함께합니다.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <span className="text-sm">시작하기</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Guided Mode */}
                <button
                  onClick={() => setAiSetupMode('guided')}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">구체적인 계획으로 시작</h3>
                  <p className="text-gray-600 mb-4">
                    개발 환경, 기술 스택, 핵심 기능이 정해져 있다면 빠르게 시작하세요.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <span className="text-sm">시작하기</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          ) : aiSetupMode === 'scratch' ? (
            /* Scratch Mode - Free Input */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <button
                onClick={resetAndGoBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">돌아가기</span>
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-gray-900">완전히 처음부터 시작</h3>
                  <p className="text-sm text-gray-600">AI가 여러분의 아이디어를 프로젝트로 만들어드립니다</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-3">
                    프로젝트 아이디어를 자유롭게 설명해주세요
                  </label>
                  <textarea
                    value={aiSetupData.freeInput}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, freeInput: e.target.value })}
                    className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={`예시:\n\n학생들이 서로 스터디 그룹을 만들고 공부 자료를 공유할 수 있는 플랫폼을 만들고 싶어요.\n\n- 사용자들이 관심 주제별로 스터디 그룹을 만들 수 있어야 해요\n- 그룹 내에서 파일을 공유하고 일정을 관리할 수 있었으면 좋겠어요\n- 모바일에서도 사용하기 편했으면 해요\n\n아직 기술 스택은 정하지 못했는데, 빠르게 개발할 수 있는 방법을 추천해주세요!`}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 팁: 만들고 싶은 서비스, 주요 기능, 목표 사용자, 제약사항 등을 자유롭게 작성해주세요.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={resetAndGoBack}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!aiSetupData.freeInput.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    AI에게 맡기기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Guided Mode - Structured Form */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <button
                onClick={resetAndGoBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">돌아가기</span>
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-gray-900">구체적인 계획으로 시작</h3>
                  <p className="text-sm text-gray-600">필요한 정보를 입력하면 AI가 최적의 프로젝트 구조를 제안합니다</p>
                </div>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {/* Development Environment */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">개발 환경 *</label>
                  <select
                    value={aiSetupData.devEnvironment}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, devEnvironment: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">선택하세요</option>
                    <option value="web">웹 (Web)</option>
                    <option value="mobile">모바일 (iOS/Android)</option>
                    <option value="desktop">데스크톱</option>
                    <option value="fullstack">풀스택</option>
                  </select>
                </div>

                {/* Programming Languages - Tag Input */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">주 프로그래밍 언어 *</label>
                  <div className="space-y-2">
                    {aiSetupData.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[3rem]">
                        {aiSetupData.languages.map((language, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                          >
                            <span className="text-sm">{language}</span>
                            <button
                              onClick={() => removeLanguage(index)}
                              className="text-blue-700 hover:text-red-600 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="언어를 입력하고 Enter를 누르세요..."
                      />
                      <button
                        onClick={addLanguage}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      예: JavaScript, TypeScript, Python 등 (여러 개 추가 가능)
                    </p>
                  </div>
                </div>

                {/* Frameworks - Tag Input */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">프레임워크/라이브러리</label>
                  <div className="space-y-2">
                    {aiSetupData.frameworks.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[3rem]">
                        {aiSetupData.frameworks.map((framework, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-200"
                          >
                            <span className="text-sm">{framework}</span>
                            <button
                              onClick={() => removeFramework(index)}
                              className="text-purple-700 hover:text-red-600 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={frameworkInput}
                        onChange={(e) => setFrameworkInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addFramework();
                          }
                        }}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="프레임워크를 입력하고 Enter를 누르세요..."
                      />
                      <button
                        onClick={addFramework}
                        className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      예: React, Vue, Django, Spring Boot 등 (여러 개 추가 가능)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">프로젝트 주제 *</label>
                  <input
                    type="text"
                    value={aiSetupData.topic}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, topic: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 실시간 채팅 애플리케이션, SNS 플랫폼, 쇼핑몰..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">프로젝트 설명 *</label>
                  <textarea
                    value={aiSetupData.description}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, description: e.target.value })}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="프로젝트에 대한 간단한 설명을 작성하세요..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">핵심 기능 *</label>
                  <div className="space-y-2 mb-3">
                    {aiSetupData.coreFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateCoreFeature(index, e.target.value)}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`기능 ${index + 1}`}
                        />
                        {aiSetupData.coreFeatures.length > 1 && (
                          <button
                            onClick={() => removeCoreFeature(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addCoreFeature}
                    className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    기능 추가
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">목표 사용자</label>
                  <input
                    type="text"
                    value={aiSetupData.targetUsers}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, targetUsers: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 대학생, 직장인, 개발자..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">프로젝트 목표</label>
                  <textarea
                    value={aiSetupData.projectGoal}
                    onChange={(e) => setAiSetupData({ ...aiSetupData, projectGoal: e.target.value })}
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="이 프로젝트를 통해 달성하고 싶은 목표를 작성하세요..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={resetAndGoBack}
                  className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleComplete}
                  disabled={
                    !aiSetupData.devEnvironment || 
                    !aiSetupData.languages.length || 
                    !aiSetupData.topic || 
                    !aiSetupData.description ||
                    !aiSetupData.coreFeatures.some(f => f.trim())
                  }
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  프로젝트 생성
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
