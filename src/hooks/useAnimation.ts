'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ANIMATION_CONFIG, shouldReduceMotion } from '@/lib/animation-config'

// ============================================================================
// 🎯 Intersection Observer를 활용한 뷰포트 애니메이션
// ============================================================================

interface UseViewportAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useViewportAnimation(options: UseViewportAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // 모션 감소 설정 확인
    if (shouldReduceMotion()) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) setHasTriggered(true)
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) setHasTriggered(true)
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { elementRef, isVisible }
}

// ============================================================================
// 🎨 스테이거 애니메이션 훅
// ============================================================================

interface UseStaggerAnimationOptions {
  itemCount: number
  staggerDelay?: number
  baseDelay?: number
}

export function useStaggerAnimation(options: UseStaggerAnimationOptions) {
  const { itemCount, staggerDelay = 200, baseDelay = 0 } = options
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  // elementRef가 필요하지 않으므로 제거

  const triggerAnimation = useCallback(() => {
    if (shouldReduceMotion()) {
      setVisibleItems(Array.from({ length: itemCount }, (_, i) => i))
      return
    }

    // 스테이거 애니메이션 시작
    Array.from({ length: itemCount }, (_, i) => i).forEach((index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index])
      }, baseDelay + (index * staggerDelay))
    })
  }, [itemCount, staggerDelay, baseDelay])

  const { elementRef: viewportRef, isVisible } = useViewportAnimation({
    threshold: 0.1,
    rootMargin: '100px'
  })

  useEffect(() => {
    if (isVisible && visibleItems.length === 0) {
      triggerAnimation()
    }
  }, [isVisible, visibleItems.length, triggerAnimation])

  const isItemVisible = useCallback((index: number) => {
    return visibleItems.includes(index)
  }, [visibleItems])

  return { 
    elementRef: viewportRef, 
    isItemVisible,
    allItemsVisible: visibleItems.length === itemCount
  }
}

// ============================================================================
// 🔄 향상된 슬라이더 훅
// ============================================================================

interface UseAdvancedSliderOptions {
  itemCount: number
  autoPlay?: boolean
  autoPlayInterval?: number
  infinite?: boolean
  itemWidth?: number
  gap?: number
  mobileItemWidth?: number
  mobileGap?: number
}

export function useAdvancedSlider(options: UseAdvancedSliderOptions) {
  const {
    itemCount,
    autoPlay = true,
    autoPlayInterval = 4000,
    infinite = true,
    itemWidth = 450,
    gap = 64,
    mobileItemWidth = 280,
    mobileGap = 16
  } = options

  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // 현재 슬라이드 설정값 계산
  const getCurrentSettings = useCallback(() => {
    return {
      itemWidth: isMobile ? mobileItemWidth : itemWidth,
      gap: isMobile ? mobileGap : gap
    }
  }, [isMobile, itemWidth, gap, mobileItemWidth, mobileGap])

  // 스크롤 가능 여부 확인
  const checkScrollability = useCallback(() => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth)

    // 현재 인덱스 계산
    const { itemWidth: currentItemWidth, gap: currentGap } = getCurrentSettings()
    const itemWidthWithGap = currentItemWidth + currentGap
    const viewportCenter = scrollLeft + (clientWidth / 2)
    const firstItemCenter = currentItemWidth / 2
    const calculatedIndex = Math.round((viewportCenter - firstItemCenter) / itemWidthWithGap)
    
    const actualIndex = infinite 
      ? calculatedIndex % itemCount 
      : Math.max(0, Math.min(calculatedIndex, itemCount - 1))
    
    if (actualIndex !== currentIndex) {
      setCurrentIndex(actualIndex >= 0 ? actualIndex : 0)
    }
  }, [getCurrentSettings, currentIndex, itemCount, infinite])

  // 슬라이드 이동 함수
  const scrollToIndex = useCallback((index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (!sliderRef.current) return

    const { itemWidth: currentItemWidth, gap: currentGap } = getCurrentSettings()
    const itemWidthWithGap = currentItemWidth + currentGap
    const targetScrollLeft = index * itemWidthWithGap

    sliderRef.current.scrollTo({ 
      left: targetScrollLeft, 
      behavior 
    })
  }, [getCurrentSettings])

  const scrollLeft = useCallback(() => {
    const newIndex = infinite 
      ? (currentIndex - 1 + itemCount) % itemCount 
      : Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }, [currentIndex, itemCount, infinite, scrollToIndex])

  const scrollRight = useCallback(() => {
    const newIndex = infinite 
      ? (currentIndex + 1) % itemCount 
      : Math.min(itemCount - 1, currentIndex + 1)
    scrollToIndex(newIndex)
  }, [currentIndex, itemCount, infinite, scrollToIndex])

  // 자동 재생
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isMobile || shouldReduceMotion()) return

    const interval = setInterval(() => {
      scrollRight()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, isMobile, autoPlayInterval, scrollRight])

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      checkScrollability()
    }

    slider.addEventListener('scroll', handleScroll)
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [checkScrollability])

  // 초기 설정
  useEffect(() => {
    if (infinite && sliderRef.current) {
      // 무한 슬라이드를 위해 중간 지점으로 초기화
      scrollToIndex(itemCount, 'auto') // 두 번째 세트로 시작
    }
  }, [infinite, itemCount, scrollToIndex])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

  return {
    sliderRef,
    currentIndex,
    canScrollLeft,
    canScrollRight,
    isHovered,
    isAutoPlaying,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    handleMouseEnter,
    handleMouseLeave,
    toggleAutoPlay,
    checkScrollability
  }
}

// ============================================================================
// 🎪 호버 애니메이션 훅
// ============================================================================

interface UseHoverAnimationOptions {
  scale?: number
  duration?: number
  disabled?: boolean
}

export function useHoverAnimation(options: UseHoverAnimationOptions = {}) {
  const {
    scale = ANIMATION_CONFIG.transform.scale.medium,
    duration = ANIMATION_CONFIG.duration.fast,
    disabled = false
  } = options

  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || disabled || shouldReduceMotion()) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [disabled])

  const hoverStyles = {
    transform: isHovered ? `scale(${scale})` : 'scale(1)',
    transition: `transform ${duration}ms ease-out`
  }

  return { elementRef, isHovered, hoverStyles }
}

// ============================================================================
// 🌊 파도 효과 애니메이션 훅
// ============================================================================

export function useWaveAnimation() {
  const [isActive, setIsActive] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const triggerWave = useCallback(() => {
    if (shouldReduceMotion()) return
    
    setIsActive(true)
    setTimeout(() => setIsActive(false), 600)
  }, [])

  const waveClasses = isActive ? 'animate-wave' : ''

  return { elementRef, triggerWave, waveClasses }
}

// ============================================================================
// ⌨️ 타이핑 효과 훅
// ============================================================================

interface UseTypingEffectOptions {
  text: string
  speed?: number
  delay?: number
  showCursor?: boolean
  cursorChar?: string
  onComplete?: () => void
}

export function useTypingEffect(options: UseTypingEffectOptions) {
  const {
    text,
    speed = 50,
    delay = 0,
    showCursor = true,
    cursorChar = '|',
    onComplete
  } = options

  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursorState, setShowCursorState] = useState(true)

  // 타이핑 효과 시작
  useEffect(() => {
    if (shouldReduceMotion()) {
      setDisplayText(text)
      setCurrentIndex(text.length)
      setIsTyping(false)
      onComplete?.()
      return
    }

    const startTyping = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTyping)
  }, [text, delay, onComplete])

  // 타이핑 진행
  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) {
      if (currentIndex >= text.length && isTyping) {
        setIsTyping(false)
        onComplete?.()
      }
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1))
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [isTyping, currentIndex, text, speed, onComplete])

  // 커서 깜빡임 효과
  useEffect(() => {
    if (!showCursor) return

    const interval = setInterval(() => {
      setShowCursorState(prev => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [showCursor])

  const cursor = showCursor && (isTyping || showCursorState) ? cursorChar : ''
  
  return {
    displayText: displayText + cursor,
    isTyping,
    isComplete: currentIndex >= text.length && !isTyping
  }
} 