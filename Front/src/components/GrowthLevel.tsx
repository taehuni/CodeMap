import React from 'react';
import { Sprout, Award, Star } from 'lucide-react';

interface GrowthLevelProps {
  level: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
}

// CodeMap 로고 스타일의 성장 아이콘
function GrowthIcon({ level, size = 'md' }: { level: 1 | 2 | 3 | 4 | 5; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: { width: 64, height: 64, scale: 1.0 },
    md: { width: 96, height: 96, scale: 1.5 },
    lg: { width: 128, height: 128, scale: 2.0 }
  };
  
  const { width, height, scale } = sizeMap[size];
  
  // 레벨별 색상과 성장 상태
  const growthStages = {
    1: {
      bracketColor: '#3B82F6', // blue - 메인 로고 색상
      pathColor: '#10B981', // green - 메인 로고 색상
      leafColor: '#D1D5DB',
      hasLeaf: false,
      pathHeight: 12, // 메인 로고와 동일한 비율
      name: '씨앗',
      hasGlow: false
    },
    2: {
      bracketColor: '#3B82F6', // blue
      pathColor: '#10B981', // green
      leafColor: '#86EFAC',
      hasLeaf: true,
      leafSize: 'small',
      pathHeight: 14, // 길이 조금 자람
      name: '새싹',
      hasGlow: false
    },
    3: {
      bracketColor: '#3B82F6',
      pathColor: '#10B981',
      leafColor: '#22C55E',
      hasLeaf: true,
      leafSize: 'medium',
      pathHeight: 16, // 길이 더 자람
      name: '성장',
      hasGlow: false
    },
    4: {
      bracketColor: '#8B5CF6', // purple
      pathColor: '#10B981',
      leafColor: '#F472B6', // pink leaves (꽃봉오리)
      hasLeaf: true,
      leafSize: 'large',
      pathHeight: 18, // 길이 많이 자람
      name: '개화',
      hasGlow: false
    },
    5: {
      bracketColor: '#8B5CF6',
      pathColor: '#10B981',
      leafColor: '#FBBF24', // golden (만개)
      hasLeaf: true,
      leafSize: 'xlarge',
      pathHeight: 20, // 최대 높이
      name: '만개',
      hasGlow: true
    }
  };

  const stage = growthStages[level];
  const baseY = 28; // 시작점 Y 좌표 조정
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 44 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 발광 효과 (레벨 5) */}
      {stage.hasGlow && (
        <defs>
          <radialGradient id={`glow-${level}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stage.leafColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stage.leafColor} stopOpacity="0" />
          </radialGradient>
        </defs>
      )}
      {stage.hasGlow && (
        <circle cx="22" cy="20" r="18" fill={`url(#glow-${level})`} className="animate-pulse" />
      )}

      <g transform="translate(10, 4)">
        {/* 중괄호 {} - 메인 로고와 동일한 디자인 */}
        <path 
          d="M4 2C4 2 0 2 0 6V12C0 14 -2 14 -4 14C-2 14 0 14 0 16V22C0 26 4 26 4 26" 
          stroke={stage.bracketColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        <path 
          d="M20 2C20 2 24 2 24 6V12C24 14 26 14 28 14C26 14 24 14 24 16V22C24 26 20 26 20 26" 
          stroke={stage.bracketColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        
        {/* 레벨 1: 메인 로고와 동일한 디자인 */}
        {level === 1 && (
          <>
            {/* 수직 라인 */}
            <path 
              d={`M12 ${baseY}L12 ${baseY - 6}M12 ${baseY - 6}L12 ${baseY - 12}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 가지 */}
            <path 
              d={`M12 ${baseY - 12}L9 ${baseY - 15}M12 ${baseY - 12}L15 ${baseY - 15}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 점들 */}
            <circle cx="12" cy={baseY} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 6} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 12} r="2" fill={stage.pathColor} />
          </>
        )}

        {/* 레벨 2: 작은 새싹 */}
        {level === 2 && (
          <>
            <path 
              d={`M12 ${baseY}L12 ${baseY - stage.pathHeight}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <circle cx="12" cy={baseY} r="2.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 7} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 14} r="1.5" fill={stage.pathColor} />
            
            {/* 작은 잎 */}
            <path 
              d={`M12 ${baseY - 7}L9 ${baseY - 10}`}
              stroke={stage.leafColor} 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d={`M12 ${baseY - 7}L15 ${baseY - 10}`}
              stroke={stage.leafColor} 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </>
        )}
        
        {/* 레벨 3: 더 큰 성장 */}
        {level === 3 && (
          <>
            <path 
              d={`M12 ${baseY}L12 ${baseY - stage.pathHeight}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <circle cx="12" cy={baseY} r="2.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 6} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 12} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 16} r="1.5" fill={stage.pathColor} />
            
            {/* 여러 잎들 */}
            <path d={`M12 ${baseY - 6}L8 ${baseY - 10}`} stroke={stage.leafColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 6}L16 ${baseY - 10}`} stroke={stage.leafColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 12}L9 ${baseY - 15}`} stroke={stage.pathColor} strokeWidth="2" strokeLinecap="round" />
            <path d={`M12 ${baseY - 12}L15 ${baseY - 15}`} stroke={stage.pathColor} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        
        {/* 레벨 4: 꽃봉오리 */}
        {level === 4 && (
          <>
            <path 
              d={`M12 ${baseY}L12 ${baseY - stage.pathHeight}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <circle cx="12" cy={baseY} r="2.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 6} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 12} r="1.5" fill={stage.pathColor} />
            
            {/* 잎들 */}
            <path d={`M12 ${baseY - 6}L8 ${baseY - 9}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 6}L16 ${baseY - 9}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 12}L9 ${baseY - 15}`} stroke={stage.pathColor} strokeWidth="2" strokeLinecap="round" />
            <path d={`M12 ${baseY - 12}L15 ${baseY - 15}`} stroke={stage.pathColor} strokeWidth="2" strokeLinecap="round" />
            
            {/* 꽃봉오리 */}
            <circle cx="12" cy={baseY - 20} r="2.5" fill={stage.leafColor} opacity="0.8" />
            <circle cx="10" cy={baseY - 21} r="1.8" fill={stage.leafColor} />
            <circle cx="14" cy={baseY - 21} r="1.8" fill={stage.leafColor} />
            <circle cx="12" cy={baseY - 22} r="1.5" fill={stage.leafColor} />
          </>
        )}
        
        {/* 레벨 5: 만개한 꽃 */}
        {level === 5 && (
          <>
            <path 
              d={`M12 ${baseY}L12 ${baseY - stage.pathHeight}`}
              stroke={stage.pathColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <circle cx="12" cy={baseY} r="2.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 5} r="1.5" fill={stage.pathColor} />
            <circle cx="12" cy={baseY - 10} r="1.5" fill={stage.pathColor} />
            
            {/* 잎들 */}
            <path d={`M12 ${baseY - 5}L8 ${baseY - 8}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 5}L16 ${baseY - 8}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 10}L9 ${baseY - 13}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M12 ${baseY - 10}L15 ${baseY - 13}`} stroke={stage.pathColor} strokeWidth="2.5" strokeLinecap="round" />
            
            {/* 만개한 꽃잎들 (5개) */}
            <circle cx="12" cy={baseY - 25} r="2.5" fill={stage.leafColor} />
            <circle cx="17" cy={baseY - 22} r="2.5" fill={stage.leafColor} />
            <circle cx="15" cy={baseY - 17} r="2.5" fill={stage.leafColor} />
            <circle cx="9" cy={baseY - 17} r="2.5" fill={stage.leafColor} />
            <circle cx="7" cy={baseY - 22} r="2.5" fill={stage.leafColor} />
            
            {/* 꽃 중심 */}
            <circle cx="12" cy={baseY - 20} r="3.5" fill="#FBBF24" />
            <circle cx="12" cy={baseY - 20} r="2" fill="#F59E0B" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function GrowthLevel({ level, showLabel = true, size = 'md', layout = 'vertical' }: GrowthLevelProps) {
  const growthStages = {
    1: {
      name: '입문자',
      description: '개발 여정의 시작',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      textColor: 'text-gray-700',
      minExp: 0,
      maxExp: 100
    },
    2: {
      name: '초급 개발자',
      description: '첫 걸음을 내딛다',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
      minExp: 100,
      maxExp: 300
    },
    3: {
      name: '주니어 개발자',
      description: '탄탄히 자라는 중',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
      minExp: 300,
      maxExp: 600
    },
    4: {
      name: '시니어 개발자',
      description: '숙련된 실력을 갖춤',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700',
      minExp: 600,
      maxExp: 1000
    },
    5: {
      name: '마스터 개발자',
      description: '최고의 경지에 도달',
      bgColor: 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-700',
      minExp: 1000,
      maxExp: Infinity
    }
  };

  const stage = growthStages[level];

  const sizeClasses = {
    sm: {
      container: 'w-20 h-20',
      text: 'text-xs'
    },
    md: {
      container: 'w-28 h-28',
      text: 'text-sm'
    },
    lg: {
      container: 'w-36 h-36',
      text: 'text-base'
    }
  };

  // 가로 레이아웃
  if (layout === 'horizontal') {
    return (
      <div className="flex items-center gap-3">
        {/* Growth Visual */}
        <div className={`${sizeClasses[size].container} ${stage.bgColor} ${stage.borderColor} border-2 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all hover:scale-105 flex-shrink-0`}>
          <GrowthIcon level={level} size={size} />
        </div>

        {/* Label */}
        {showLabel && (
          <div>
            <div className={`${sizeClasses[size].text} ${stage.textColor} flex items-center gap-1 mb-1`}>
              <span>Lv.{level}</span>
              <span>{stage.name}</span>
            </div>
            <p className="text-xs text-gray-500">{stage.description}</p>
          </div>
        )}
      </div>
    );
  }

  // 세로 레이아웃 (기본)
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Growth Visual */}
      <div className={`${sizeClasses[size].container} ${stage.bgColor} ${stage.borderColor} border-2 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all hover:scale-105`}>
        <GrowthIcon level={level} size={size} />
      </div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <div className={`${sizeClasses[size].text} ${stage.textColor} flex items-center gap-1 justify-center mb-1`}>
            <span>Lv.{level}</span>
            <span>{stage.name}</span>
          </div>
          <p className="text-xs text-gray-500">{stage.description}</p>
        </div>
      )}
    </div>
  );
}

// Growth progress bar component
interface GrowthProgressProps {
  level: 1 | 2 | 3 | 4 | 5;
  currentExp: number;
  compact?: boolean;
}

export function GrowthProgress({ level, currentExp, compact = false }: GrowthProgressProps) {
  const growthStages = {
    1: { name: '입문자', emoji: '🌱', color: 'bg-gray-500', minExp: 0, maxExp: 100 },
    2: { name: '초급 개발자', emoji: '🌿', color: 'bg-green-500', minExp: 100, maxExp: 300 },
    3: { name: '주니어 개발자', emoji: '🪴', color: 'bg-emerald-600', minExp: 300, maxExp: 600 },
    4: { name: '시니어 개발자', emoji: '🌸', color: 'bg-pink-600', minExp: 600, maxExp: 1000 },
    5: { name: '마스터 개발자', emoji: '🌳', color: 'bg-gradient-to-r from-blue-600 to-purple-600', minExp: 1000, maxExp: Infinity }
  };

  const stage = growthStages[level];
  const expInCurrentLevel = currentExp - stage.minExp;
  const expNeededForNextLevel = stage.maxExp - stage.minExp;
  const progressPercent = level === 5 ? 100 : Math.min(100, (expInCurrentLevel / expNeededForNextLevel) * 100);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{stage.emoji}</span>
          <span className="text-sm text-gray-700">Lv.{level} {stage.name}</span>
        </div>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[200px]">
          <div className={`h-full ${stage.color}`} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Growth Level Icon */}
          <div className="flex-shrink-0">
            <GrowthLevel level={level} size="sm" showLabel={false} />
          </div>
          
          <div>
            <div className="text-lg text-gray-900">레벨 {level} - {stage.name}</div>
            <div className="text-sm text-gray-500">
              {level === 5 ? '최고 레벨 달성!' : `다음 레벨까지 ${expNeededForNextLevel - expInCurrentLevel} EXP`}
            </div>
          </div>
        </div>
        {level === 5 && (
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-5 h-5 fill-yellow-600" />
            <Award className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${stage.color} transition-all duration-500 relative`}
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 0 && (
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
            )}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{currentExp} EXP</span>
          {level < 5 && <span>{stage.maxExp} EXP</span>}
        </div>
      </div>
    </div>
  );
}

// All stages display component
export function GrowthStages() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg text-gray-900 mb-6 flex items-center gap-2">
        <Sprout className="w-5 h-5 text-green-600" />
        성장 단계
      </h3>
      
      <div className="space-y-3">
        {([1, 2, 3, 4, 5] as const).map((level) => (
          <GrowthLevel key={level} level={level} size="sm" layout="horizontal" />
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm text-gray-900 mb-3">경험치 획득 방법</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>• 프로젝트 완성</span>
            <span className="text-blue-600">+100 EXP</span>
          </div>
          <div className="flex justify-between">
            <span>• 코딩 테스트 통과</span>
            <span className="text-blue-600">+50 EXP</span>
          </div>
          <div className="flex justify-between">
            <span>• 챌린지 참여</span>
            <span className="text-blue-600">+30 EXP</span>
          </div>
          <div className="flex justify-between">
            <span>• 커뮤니티 활동</span>
            <span className="text-blue-600">+10 EXP</span>
          </div>
          <div className="flex justify-between">
            <span>• 일일 출석</span>
            <span className="text-blue-600">+5 EXP</span>
          </div>
        </div>
      </div>
    </div>
  );
}