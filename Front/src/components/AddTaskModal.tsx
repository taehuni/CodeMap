import React, { useState } from 'react';
import { X, CheckCircle2, Circle, User } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: any) => void;
  scheduleId: number;
  scheduleName: string;
  teamMembers: any[];
  existingTasks: any[];
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
  scheduleId,
  scheduleName,
  teamMembers,
  existingTasks
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: null as any,
    dueDate: '',
    estimatedHours: 0
  });

  const priorityOptions = [
    { value: 'low', label: '낮음', color: 'text-gray-600', bg: 'bg-gray-100' },
    { value: 'medium', label: '보통', color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: 'high', label: '높음', color: 'text-red-600', bg: 'bg-red-100' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('작업 제목을 입력하세요.');
      return;
    }

    const newTask = {
      id: Math.max(...existingTasks.map(t => t.id), 0) + 1,
      scheduleId: scheduleId,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'todo',
      assignee: formData.assignee,
      dueDate: formData.dueDate,
      estimatedHours: formData.estimatedHours,
      actualHours: 0,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    onAdd(newTask);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      assignee: null,
      dueDate: '',
      estimatedHours: 0
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg text-gray-900">새 작업 추가</h2>
            <p className="text-xs text-gray-500 mt-1">
              일정: <span className="text-blue-600">{scheduleName}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                작업 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 로그인 API 구현"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                작업 설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="작업에 대한 상세 설명을 입력하세요..."
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                우선순위
              </label>
              <div className="grid grid-cols-3 gap-3">
                {priorityOptions.map((option) => {
                  const isSelected = formData.priority === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: option.value as any })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-center ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                        <span className="text-sm">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                담당자
              </label>
              <div className="space-y-2">
                {teamMembers.map((member) => {
                  const isSelected = formData.assignee?.id === member.id;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, assignee: isSelected ? null : member })}
                      className={`w-full flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                        isSelected ? 'bg-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`text-sm ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                          {member.name}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                          {member.role}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
                {teamMembers.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    팀원이 없습니다.
                  </p>
                )}
              </div>
            </div>

            {/* Due Date and Estimated Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  마감일
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  예상 시간 (시간)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            작업 추가
          </button>
        </div>
      </div>
    </div>
  );
}
