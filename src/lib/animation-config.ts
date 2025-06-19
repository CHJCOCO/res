// ============================================================================
// 🎬 통합 애니메이션 설정 시스템
// ============================================================================

export interface AnimationConfig {
  duration: {
    fast: number
    medium: number
    slow: number
    verySlow: number
  }
  easing: {
    linear: string
    easeIn: string
    easeOut: string
    easeInOut: string
    bounce: string
    spring: string
  }
  delay: {
    none: number
    short: number
    medium: number
    long: number
    veryLong: number
  }
  transform: {
    scale: {
      small: number
      medium: number
      large: number
    }
    translate: {
      small: number
      medium: number
      large: number
    }
  }
  opacity: {
    hidden: number
    visible: number
    semitransparent: number
  }
}

// 기본 애니메이션 설정
export const ANIMATION_CONFIG: AnimationConfig = {
  duration: {
    fast: 200,
    medium: 300,
    slow: 500,
    verySlow: 800
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  delay: {
    none: 0,
    short: 200,
    medium: 400,
    long: 600,
    veryLong: 800
  },
  transform: {
    scale: {
      small: 1.02,
      medium: 1.05,
      large: 1.1
    },
    translate: {
      small: 10,
      medium: 30,
      large: 50
    }
  },
  opacity: {
    hidden: 0,
    visible: 1,
    semitransparent: 0.5
  }
}

// ============================================================================
// 🎨 애니메이션 프리셋 정의
// ============================================================================

export const ANIMATION_PRESETS = {
  // 페이드 인/아웃 애니메이션
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: ANIMATION_CONFIG.duration.medium / 1000 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: ANIMATION_CONFIG.transform.translate.medium },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.duration.slow / 1000,
      ease: ANIMATION_CONFIG.easing.easeOut
    }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -ANIMATION_CONFIG.transform.translate.medium },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.duration.slow / 1000,
      ease: ANIMATION_CONFIG.easing.easeOut
    }
  },

  // 슬라이드 애니메이션
  slideInLeft: {
    initial: { opacity: 0, x: -ANIMATION_CONFIG.transform.translate.large },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.duration.slow / 1000,
      ease: ANIMATION_CONFIG.easing.easeOut
    }
  },

  slideInRight: {
    initial: { opacity: 0, x: ANIMATION_CONFIG.transform.translate.large },
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.duration.slow / 1000,
      ease: ANIMATION_CONFIG.easing.easeOut
    }
  },

  // 스케일 애니메이션
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: ANIMATION_CONFIG.duration.medium / 1000,
      ease: ANIMATION_CONFIG.easing.spring
    }
  },

  // 호버 효과
  hoverScale: {
    whileHover: { 
      scale: ANIMATION_CONFIG.transform.scale.medium,
      transition: { duration: ANIMATION_CONFIG.duration.fast / 1000 }
    }
  },

  hoverLift: {
    whileHover: { 
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: ANIMATION_CONFIG.duration.fast / 1000 }
    }
  },

  // 펄스 효과
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: ANIMATION_CONFIG.easing.easeInOut
    }
  },

  // 로딩 스피너
  spin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: ANIMATION_CONFIG.easing.linear
    }
  }
}

// ============================================================================
// 🎯 스테이거 애니메이션 설정
// ============================================================================

export const createStaggerAnimation = (
  baseAnimation: Record<string, unknown>,
  staggerDelay: number = 0.1
) => ({
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  },
  item: baseAnimation
})

// 미리 정의된 스테이거 애니메이션
export const STAGGER_PRESETS = {
  fadeInUpStagger: createStaggerAnimation(ANIMATION_PRESETS.fadeInUp, 0.2),
  scaleInStagger: createStaggerAnimation(ANIMATION_PRESETS.scaleIn, 0.15),
  slideInLeftStagger: createStaggerAnimation(ANIMATION_PRESETS.slideInLeft, 0.1)
}

// ============================================================================
// 🛠️ CSS 클래스 생성 유틸리티
// ============================================================================

export const createAnimationClasses = (preset: string, delay?: number) => {
  const baseClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeIn: 'animate-fade-in',
    scaleIn: 'animate-scale-in',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right'
  }

  let classes = baseClasses[preset as keyof typeof baseClasses] || 'animate-fade-in-up'
  
  if (delay) {
    classes += ` animation-delay-${delay}`
  }

  return classes
}

// ============================================================================
// 🎮 접근성 고려 설정
// ============================================================================

export const ACCESSIBILITY_CONFIG = {
  // 사용자가 모션을 줄이기를 원할 때 적용할 설정
  reducedMotion: {
    duration: {
      fast: 50,
      medium: 100,
      slow: 150,
      verySlow: 200
    },
    disableAnimations: [
      'pulse',
      'spin',
      'bounce'
    ]
  }
}

// prefers-reduced-motion 체크 유틸리티
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 모션 감소가 필요한 경우 애니메이션 설정 조정
export const getAccessibleAnimationConfig = () => {
  if (shouldReduceMotion()) {
    return {
      ...ANIMATION_CONFIG,
      duration: ACCESSIBILITY_CONFIG.reducedMotion.duration
    }
  }
  return ANIMATION_CONFIG
} 