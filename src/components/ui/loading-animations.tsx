'use client'

import { shouldReduceMotion } from '@/lib/animation-config'

// ============================================================================
// 🔄 로딩 애니메이션 컴포넌트들
// ============================================================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white' | 'gold'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'border-orange-500 border-t-transparent',
    secondary: 'border-gray-300 border-t-transparent',
    white: 'border-white border-t-transparent',
    gold: 'border-yellow-500 border-t-transparent'
  }

  if (shouldReduceMotion()) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div className={`w-full h-full rounded-full border-2 ${colorClasses[color]} opacity-50`} />
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className={`w-full h-full rounded-full border-2 ${colorClasses[color]} animate-spin`} />
    </div>
  )
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white' | 'gold'
  className?: string
}

export function LoadingDots({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const colorClasses = {
    primary: 'bg-orange-500',
    secondary: 'bg-gray-400',
    white: 'bg-white',
    gold: 'bg-yellow-500'
  }

  if (shouldReduceMotion()) {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full opacity-50`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse-soft`}
          style={{
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  height?: string
  animate?: boolean
}

export function LoadingSkeleton({ 
  className = '',
  lines = 3,
  height = 'h-4',
  animate = true
}: LoadingSkeletonProps) {
  const animationClass = animate && !shouldReduceMotion() ? 'animate-pulse' : ''

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className={`${height} bg-gray-300 rounded ${animationClass}`}
          style={{
            width: i === lines - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// 📱 풀스크린 로딩 오버레이
// ============================================================================

interface LoadingOverlayProps {
  message?: string
  type?: 'spinner' | 'dots'
  className?: string
}

export function LoadingOverlay({ 
  message = '로딩 중...',
  type = 'spinner',
  className = ''
}: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 ${className}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-sm mx-4 text-center">
        <div className="flex justify-center mb-4">
          {type === 'spinner' ? (
            <LoadingSpinner size="lg" color="white" />
          ) : (
            <LoadingDots size="lg" color="white" />
          )}
        </div>
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}

// ============================================================================
// ⚠️ 에러 상태 애니메이션
// ============================================================================

interface ErrorAnimationProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorAnimation({ 
  message = '오류가 발생했습니다',
  onRetry,
  className = ''
}: ErrorAnimationProps) {
  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center animate-bounce">
          <svg 
            className="w-8 h-8 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">문제가 발생했습니다</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 animate-fade-in-up"
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

// ============================================================================
// 🎯 특별한 상황을 위한 애니메이션들
// ============================================================================

interface PulseProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function Pulse({ children, className = '', intensity = 'medium' }: PulseProps) {
  const intensityClasses = {
    low: 'animate-pulse-soft',
    medium: 'animate-pulse',
    high: 'animate-bounce'
  }

  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`${intensityClasses[intensity]} ${className}`}>
      {children}
    </div>
  )
}

interface GlowProps {
  children: React.ReactNode
  className?: string
  color?: 'gold' | 'orange' | 'red' | 'blue'
}

export function Glow({ children, className = '', color = 'gold' }: GlowProps) {
  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>
  }

  const glowClasses = {
    gold: 'animate-glow',
    orange: 'animate-glow',
    red: 'animate-glow',
    blue: 'animate-glow'
  }

  return (
    <div className={`${glowClasses[color]} ${className}`}>
      {children}
    </div>
  )
}

// ============================================================================
// 🎪 인터랙티브 애니메이션들
// ============================================================================

interface ClickAnimationProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  effect?: 'scale' | 'bounce' | 'wave'
}

export function ClickAnimation({ 
  children, 
  onClick, 
  className = '',
  effect = 'scale'
}: ClickAnimationProps) {
  if (shouldReduceMotion()) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    )
  }

  const effectClasses = {
    scale: 'active:scale-95 transition-transform duration-100',
    bounce: 'active:animate-bounce',
    wave: 'active:animate-wave'
  }

  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer ${effectClasses[effect]} ${className}`}
    >
      {children}
    </div>
  )
}

interface HoverGlowProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function HoverGlow({ 
  children, 
  className = '',
  intensity = 'medium'
}: HoverGlowProps) {
  const intensityClasses = {
    subtle: 'hover:shadow-lg hover:shadow-yellow-500/20',
    medium: 'hover:shadow-xl hover:shadow-yellow-500/30',
    strong: 'hover:shadow-2xl hover:shadow-yellow-500/40'
  }

  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`transition-all duration-300 ${intensityClasses[intensity]} ${className}`}>
      {children}
    </div>
  )
} 