'use client'

import { useAdvancedSlider } from './useAnimation'

// ============================================================================
// 🔄 레거시 useSlider 훅 (하위 호환성 유지)
// ============================================================================

// 기존 SignatureMenu에서 사용하던 useSlider 훅을 새로운 useAdvancedSlider로 마이그레이션
// 기존 코드와의 호환성을 위해 동일한 인터페이스를 유지합니다.

export function useSlider() {
  const {
    sliderRef,
    currentIndex,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    handleMouseEnter,
    handleMouseLeave,
    checkScrollability
  } = useAdvancedSlider({
    itemCount: 5, // SignatureMenu의 메뉴 아이템 개수
    autoPlay: true,
    autoPlayInterval: 4000,
    infinite: true,
    itemWidth: 450,
    gap: 64,
    mobileItemWidth: 280,
    mobileGap: 16
  })

  // 기존 인터페이스와 호환성을 위해 activeIndex로 변경
  return {
    sliderRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScrollability,
    handleMouseEnter,
    handleMouseLeave,
    activeIndex: currentIndex // 기존 코드에서 사용하던 activeIndex 명칭 유지
  }
} 