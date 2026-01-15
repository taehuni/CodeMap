import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, CheckCircle2, Edit2, Trash2, UserPlus, Plus, Circle, Check, Clock, AlertCircle } from 'lucide-react';

interface ScheduleDetailModalProps {
  schedule: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (schedule: any) => void;
  onDelete: (id: number) => void;
  teamMembers: any[];
  tasks?: any[];
  onAddTask?: () => void;
}

export default function ScheduleDetailModal({
  schedule,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  teamMembers,
  tasks,
  onAddTask
}: ScheduleDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(schedule);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  // Update editedSchedule when schedule changes
  useEffect(() => {
    if (schedule) {
      // Initialize tasks array if it doesn't exist
      const updatedSchedule = {
        ...schedule,
        tasks: schedule.tasks || []
      };
      setEditedSchedule(updatedSchedule);
      setIsEditing(false);
      setNewTaskTitle('');
      setEditingTaskId(null);
      setEditingTaskTitle('');
    }
  }, [schedule]);

  if (!isOpen || !schedule || !editedSchedule) return null;

  const getIconColor = (color: string) => {
    const colors: any = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      'completed': { label: '완료', color: 'bg-green-100 text-green-700' },
      'in-progress': { label: '진행 중', color: 'bg-blue-100 text-blue-700' },
      'pending': { label: '대기', color: 'bg-gray-100 text-gray-700' }
    };
    const badge = badges[status] || badges['pending'];
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const handleSave = () => {
    onUpdate(editedSchedule);
    setIsEditing(false);
  };

  const handleAddAssignee = (member: any) => {
    const isAlreadyAssigned = editedSchedule.assignees.some((a: any) => a.id === member.id);
    if (!isAlreadyAssigned) {
      setEditedSchedule({
        ...editedSchedule,
        assignees: [...editedSchedule.assignees, member]
      });
    }
    setShowAssigneeDropdown(false);
  };

  const handleRemoveAssignee = (memberId: number) => {
    setEditedSchedule({
      ...editedSchedule,
      assignees: editedSchedule.assignees.filter((a: any) => a.id !== memberId)
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setEditedSchedule({
        ...editedSchedule,
        tasks: [...editedSchedule.tasks, { id: Date.now(), title: newTaskTitle.trim(), completed: false }]
      });
      setNewTaskTitle('');
    }
  };

  const handleRemoveTask = (taskId: number) => {
    setEditedSchedule({
      ...editedSchedule,
      tasks: editedSchedule.tasks.filter((task: any) => task.id !== taskId)
    });
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    setEditedSchedule({
      ...editedSchedule,
      tasks: editedSchedule.tasks.map((task: any) => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  const handleStartEditTask = (taskId: number, title: string) => {
    setEditingTaskId(taskId);
    setEditingTaskTitle(title);
  };

  const handleSaveTaskEdit = () => {
    if (editingTaskId !== null && editingTaskTitle.trim()) {
      setEditedSchedule({
        ...editedSchedule,
        tasks: editedSchedule.tasks.map((task: any) => 
          task.id === editingTaskId ? { ...task, title: editingTaskTitle.trim() } : task
        )
      });
    }
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  const handleCancelEditTask = () => {
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  const completedTasks = editedSchedule.tasks?.filter((task: any) => task.completed).length || 0;
  const totalTasks = editedSchedule.tasks?.length || 0;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="text-xl text-gray-900 w-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                value={editedSchedule.title}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, title: e.target.value })}
              />
            ) : (
              <h2 className="text-xl text-gray-900">{editedSchedule.title}</h2>
            )}
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(editedSchedule.status)}
              <span className="text-xs text-gray-500">
                {editedSchedule.startWeek}주차 시작 · {editedSchedule.duration}주 소요
              </span>
              {totalTasks > 0 && (
                <span className="text-xs text-gray-500">
                  · 작업 {completedTasks}/{totalTasks}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">설명</label>
            {isEditing ? (
              <textarea
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={editedSchedule.description}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, description: e.target.value })}
              />
            ) : (
              <p className="text-sm text-gray-900">{editedSchedule.description}</p>
            )}
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-700">진행률</label>
              <span className="text-sm text-blue-600">{editedSchedule.progress}%</span>
            </div>
            {isEditing ? (
              <input
                type="range"
                min="0"
                max="100"
                value={editedSchedule.progress}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, progress: parseInt(e.target.value) })}
                className="w-full"
              />
            ) : (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${schedule.color}-600 h-2 rounded-full transition-all`}
                  style={{ width: `${editedSchedule.progress}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Assignees */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm text-gray-700">담당자</label>
              {isEditing && (
                <div className="relative">
                  <button
                    onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                    className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    담당자 추가
                  </button>
                  
                  {showAssigneeDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {teamMembers.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => handleAddAssignee(member)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-left"
                        >
                          <span className="text-lg">{member.avatar}</span>
                          <span className="text-sm text-gray-900">{member.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {editedSchedule.assignees.length > 0 ? (
                editedSchedule.assignees.map((assignee: any) => (
                  <div
                    key={assignee.id}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                  >
                    <span className="text-lg">{assignee.avatar}</span>
                    <span className="text-sm text-gray-900">{assignee.name}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveAssignee(assignee.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">담당자가 지정되지 않았습니다</p>
              )}
            </div>
          </div>

          {/* Timeline */}
          {isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">시작 주차</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedSchedule.startWeek}
                  onChange={(e) => setEditedSchedule({ ...editedSchedule, startWeek: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">기간 (주)</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedSchedule.duration}
                  onChange={(e) => setEditedSchedule({ ...editedSchedule, duration: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}

          {/* Status */}
          {isEditing && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">상태</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedSchedule.status}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, status: e.target.value })}
              >
                <option value="pending">대기</option>
                <option value="in-progress">진행 중</option>
                <option value="completed">완료</option>
              </select>
            </div>
          )}

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm text-gray-700">작업 목록</label>
              {totalTasks > 0 && (
                <span className="text-xs text-gray-500">
                  {completedTasks}/{totalTasks} 완료
                </span>
              )}
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {editedSchedule.tasks && editedSchedule.tasks.length > 0 ? (
                editedSchedule.tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <button
                      onClick={() => isEditing && handleToggleTaskCompletion(task.id)}
                      disabled={!isEditing}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    {editingTaskId === task.id ? (
                      <>
                        <input
                          type="text"
                          className="flex-1 px-3 py-1.5 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          value={editingTaskTitle}
                          onChange={(e) => setEditingTaskTitle(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveTaskEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEditTask();
                            }
                          }}
                          autoFocus
                        />
                        <button
                          onClick={handleSaveTaskEdit}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEditTask}
                          className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          className={`flex-1 text-sm ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        {isEditing && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditTask(task.id, task.title)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveTask(task.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">작업이 없습니다</p>
              )}
            </div>

            {/* Add Task Input (only in edit mode) */}
            {isEditing && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTask();
                    }
                  }}
                  placeholder="새 작업 추가..."
                />
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </button>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">진행 상황 노트</label>
            {isEditing ? (
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={editedSchedule.notes}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, notes: e.target.value })}
                placeholder="진행 상황, 이슈, 다음 단계 등을 기록하세요..."
              />
            ) : (
              <div className="min-h-[100px] p-3 bg-gray-50 rounded-lg">
                {editedSchedule.notes ? (
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{editedSchedule.notes}</p>
                ) : (
                  <p className="text-sm text-gray-500">작성된 노트가 없습니다</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between">
          <div>
            {isEditing ? (
              <button
                onClick={() => {
                  if (window.confirm('이 일정을 삭제하시겠습니까?')) {
                    onDelete(schedule.id);
                    onClose();
                  }
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setEditedSchedule({...schedule, tasks: schedule.tasks || []});
                    setIsEditing(false);
                    setNewTaskTitle('');
                    setEditingTaskId(null);
                    setEditingTaskTitle('');
                  }}
                  className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  저장
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                수정
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}