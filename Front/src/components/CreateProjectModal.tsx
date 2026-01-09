import React, { useState } from 'react';
import { X, Sparkles, Code, Users, Clock, Zap, Globe, Lock, Plus, Trash2, Pencil, Check } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: any) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [step, setStep] = useState(1);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [editingRole, setEditingRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    techStack: [] as string[],
    teamMembers: [] as { id: number; role: string }[],
    aiAssisted: true,
    isRecruiting: false,
    isPublic: true
  });

  const categories = [
    { id: 'web', label: '웹 개발', icon: Code },
    { id: 'mobile', label: '모바일 앱', icon: Code },
    { id: 'ai', label: 'AI/ML', icon: Sparkles },
    { id: 'game', label: '게임', icon: Code },
    { id: 'other', label: '기타', icon: Code }
  ];

  const difficulties = ['초급', '중급', '고급'];
  const durations = ['2주', '4주', '6주', '8주', '12주', '직접 설정'];

  const teamRoles = [
    '프론트엔드 개발자',
    '백엔드 개발자',
    '풀스택 개발자',
    'UI/UX 디자이너',
    'PM/기획자',
    'DevOps 엔지니어',
    'QA 엔지니어',
    'Data Scientist',
    '기타'
  ];

  const techOptions = [
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 
    'Express', 'Python', 'Django', 'FastAPI', 'TypeScript',
    'JavaScript', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Firebase', 'Tailwind CSS'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1에서 Enter를 누른 경우, 다음 단계로 이동
    if (step === 1) {
      if (formData.name && formData.category) {
        setStep(2);
      }
      return;
    }

    // Step 2에서만 실제 제출
    if (step === 2) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        difficulty: '',
        duration: '',
        techStack: [],
        teamMembers: [],
        aiAssisted: true,
        isRecruiting: false,
        isPublic: true
      });
      setStep(1);
    }
  };

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const addTeamMember = (role: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { id: Date.now(), role }]
    }));
  };

  const removeTeamMember = (id: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };

  const startEditingMember = (id: number, role: string) => {
    setEditingMemberId(id);
    setEditingRole(role);
  };

  const updateTeamMemberRole = (id: number, newRole: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(member => 
        member.id === id ? { ...member, role: newRole } : member
      )
    }));
    setEditingMemberId(null);
    setEditingRole('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">새 프로젝트 생성</h2>
            <p className="text-sm text-gray-600">AI와 함께 프로젝트를 시작해보세요</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className={`text-sm ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                기본 정보
              </span>
            </div>
            <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className={`text-sm ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                세부 설정
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="p-6 space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  프로젝트 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: 실시간 채팅 애플리케이션"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  프로젝트 설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="프로젝트에 대해 간단히 설명해주세요"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: category.id })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          formData.category === category.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${
                          formData.category === category.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm ${
                          formData.category === category.id ? 'text-blue-900' : 'text-gray-700'
                        }`}>
                          {category.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Assisted */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="aiAssisted"
                    checked={formData.aiAssisted}
                    onChange={(e) => setFormData({ ...formData, aiAssisted: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="aiAssisted" className="flex items-center gap-2 text-gray-900 cursor-pointer mb-1">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <span>AI 도움 받기</span>
                    </label>
                    <p className="text-sm text-gray-600">
                      프로젝트 진행 중 AI가 코드 리뷰, 개선 제안, 버그 해결을 도와드립니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="p-6 space-y-6">
              {/* Difficulty */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  난이도 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() => setFormData({ ...formData, difficulty })}
                      className={`px-4 py-3 border-2 rounded-lg transition-all ${
                        formData.difficulty === difficulty
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  예상 기간 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration })}
                      className={`px-4 py-3 border-2 rounded-lg transition-all ${
                        formData.duration === duration
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm">{duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm text-gray-700">
                    프로젝트 팀 구성
                  </label>
                  <span className="text-sm text-gray-900">
                    총 {formData.teamMembers.length}명
                  </span>
                </div>
                
                {/* Role Selection Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {teamRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => addTeamMember(role)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-400 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {role}
                    </button>
                  ))}
                </div>

                {/* Added Team Members List */}
                {formData.teamMembers.length > 0 && (
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <p className="text-xs text-gray-600 mb-2">팀 구성원</p>
                    <div className="space-y-2">
                      {formData.teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200"
                        >
                          {editingMemberId === member.id ? (
                            <>
                              <div className="flex items-center gap-2 flex-1">
                                <Users className="w-4 h-4 text-blue-600" />
                                <input
                                  type="text"
                                  value={editingRole}
                                  onChange={(e) => setEditingRole(e.target.value)}
                                  className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  autoFocus
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => updateTeamMemberRole(member.id, editingRole)}
                                  className="p-1 hover:bg-green-50 rounded transition-colors"
                                >
                                  <Check className="w-4 h-4 text-green-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingMemberId(null);
                                    setEditingRole('');
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <X className="w-4 h-4 text-gray-500" />
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-900">{member.role}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => startEditingMember(member.id, member.role)}
                                  className="p-1 hover:bg-blue-50 rounded transition-colors"
                                >
                                  <Pencil className="w-4 h-4 text-blue-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeTeamMember(member.id)}
                                  className="p-1 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  기술 스택 (선택)
                </label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 border border-gray-200 rounded-lg">
                  {techOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        formData.techStack.includes(tech)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                {formData.techStack.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.techStack.length}개 선택됨
                  </p>
                )}
              </div>

              {/* Recruiting */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="isRecruiting"
                    checked={formData.isRecruiting}
                    onChange={(e) => setFormData({ ...formData, isRecruiting: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="isRecruiting" className="flex items-center gap-2 text-gray-900 cursor-pointer mb-1">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>팀원 모집 중</span>
                    </label>
                    <p className="text-sm text-gray-600">
                      팀원을 모집하고 있는지 여부를 선택하세요
                    </p>
                  </div>
                </div>
              </div>

              {/* Public/Private */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="isPublic" className="flex items-center gap-2 text-gray-900 cursor-pointer mb-1">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span>공개 프로젝트</span>
                    </label>
                    <p className="text-sm text-gray-600">
                      프로젝트를 공개할지 비공개로 유지할지 선택하세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
            {step === 1 ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.category}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={!formData.difficulty || !formData.duration}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  프로젝트 생성하기
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}