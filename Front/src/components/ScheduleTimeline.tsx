import React from 'react';
import { ChevronRight, Lightbulb, Code, Wrench, TestTube, Plus, Users } from 'lucide-react';

interface ScheduleTimelineProps {
  schedules: any[];
  onScheduleClick: (schedule: any) => void;
}

export default function ScheduleTimeline({ schedules, onScheduleClick }: ScheduleTimelineProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg text-gray-900 mb-2">일정 관리</h3>
          <p className="text-sm text-gray-600">
            프로젝트 타임라인과 마일스톤을 관리하세요.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          일정 추가
        </button>
      </div>

      {/* Timeline Header */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5 rotate-180 text-gray-600" />
              </button>
              <h4 className="text-sm text-gray-900">2025년 1월 - 3월</h4>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                오늘
              </button>
              <button className="px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                주간
              </button>
              <button className="px-3 py-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-300 rounded-lg">
                월간
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Month Headers */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {[
                { month: '1월', weeks: 4 },
                { month: '2월', weeks: 4 },
                { month: '3월', weeks: 4 }
              ].map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 border-r border-gray-200 last:border-r-0"
                >
                  <div className="px-4 py-2 text-center">
                    <span className="text-xs text-gray-700">{month.month}</span>
                  </div>
                  <div className="flex">
                    {Array.from({ length: month.weeks }).map((_, weekIndex) => (
                      <div 
                        key={weekIndex}
                        className="flex-1 border-r border-gray-200 last:border-r-0 px-2 py-1 text-center"
                      >
                        <span className="text-xs text-gray-500">{weekIndex + 1}주</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Items */}
            <div className="relative p-4 space-y-3">
              {/* Today Indicator */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                style={{ left: '20%' }}
              >
                <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>

              {schedules.map((schedule) => {
                const leftPosition = ((schedule.startWeek - 1) / 12) * 100;
                const width = (schedule.duration / 12) * 100;
                
                return (
                  <div key={schedule.id} className="relative h-12">
                    <div 
                      onClick={() => onScheduleClick(schedule)}
                      className={`absolute top-0 h-12 bg-gradient-to-r from-${schedule.color}-500 to-${schedule.color}-600 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                      style={{ left: `${leftPosition}%`, width: `${width}%` }}
                    >
                      <div className="px-3 py-2 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          {schedule.icon === 'Lightbulb' && <Lightbulb className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                          {schedule.icon === 'Code' && <Code className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                          {schedule.icon === 'Wrench' && <Wrench className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                          {schedule.icon === 'TestTube' && <TestTube className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                          <span className="text-xs text-white truncate">{schedule.title}</span>
                        </div>
                        <span className={`text-xs text-${schedule.color}-100 mt-0.5`}>
                          {schedule.startWeek}주 - {schedule.startWeek + schedule.duration - 1}주
                        </span>
                      </div>
                      {/* Resize handles */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${schedule.color}-700 opacity-0 group-hover:opacity-100 cursor-ew-resize`}></div>
                      <div className={`absolute right-0 top-0 bottom-0 w-1 bg-${schedule.color}-700 opacity-0 group-hover:opacity-100 cursor-ew-resize`}></div>
                    </div>
                  </div>
                );
              })}

              {/* Milestone markers */}
              <div className="relative h-8 border-t border-gray-200 mt-6 pt-3">
                <div className="absolute" style={{ left: '8.33%' }}>
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">프로젝트 시작</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: '41.67%' }}>
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">중간 점검</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: '83.33%' }}>
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">최종 배포</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List View */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm text-gray-900 mb-4">작업 목록</h4>
        <div className="space-y-2">
          {schedules.map((schedule) => {
            const Icon = schedule.icon === 'Lightbulb' ? Lightbulb :
                         schedule.icon === 'Code' ? Code :
                         schedule.icon === 'Wrench' ? Wrench : TestTube;
            
            const assigneeText = schedule.assignees.length > 0 
              ? schedule.assignees.map((a: any) => a.name).join(', ')
              : '담당자 미정';
            
            return (
              <div 
                key={schedule.id}
                onClick={() => onScheduleClick(schedule)}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-8 h-8 bg-${schedule.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 text-${schedule.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{schedule.title}</span>
                    <span className="text-xs text-gray-500">
                      {schedule.startWeek}주 - {schedule.startWeek + schedule.duration - 1}주
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-${schedule.color}-600 h-1.5 rounded-full transition-all`}
                        style={{ width: `${schedule.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{schedule.progress}%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="max-w-[100px] truncate">{assigneeText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
