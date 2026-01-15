import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';

interface AiSplitViewProps {
  title: string;
  userContent: string;
  aiContent: string;
  onApply: () => void;
  onClose: () => void;
}

export default function AiSplitView({
  title,
  userContent,
  aiContent,
  onApply,
  onClose
}: AiSplitViewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h2 className="text-lg text-white font-medium">{title} - AI 생성 결과</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Split Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left: User Content */}
          <div className="flex-1 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                현재 작성된 내용
              </h3>
              <p className="text-xs text-gray-500 mt-1">{userContent.length} 자</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {userContent ? (
                <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{userContent}</p>
              ) : (
                <p className="text-sm text-gray-400 italic">작성된 내용이 없습니다</p>
              )}
            </div>
          </div>

          {/* Right: AI Generated Content */}
          <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50/50 to-purple-50/50">
            <div className="p-4 border-b border-purple-200 bg-gradient-to-r from-blue-100/80 to-purple-100/80">
              <h3 className="text-sm text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI가 생성한 내용
              </h3>
              <p className="text-xs text-gray-500 mt-1">{aiContent.length} 자</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{aiContent}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            AI가 생성한 내용을 검토한 후 적용하세요
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onApply();
                onClose();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              내용 적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
