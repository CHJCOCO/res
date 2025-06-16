'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

export function useSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024) // 1024px 미만을 모바일로 간주
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const checkScrollability = () => {
    if (!sliderRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    
    // 현재 보이는 카드의 인덱스 계산 (더 정확한 방법)
    const cardWidth = isMobile ? 280 : 450 // 모바일에 맞는 카드 너비
    const gap = isMobile ? 16 : 64 // 모바일에 맞는 간격
    const totalCardWidth = cardWidth + gap
    
    // 현재 스크롤 위치에서 가장 중앙에 가까운 카드 찾기
    const viewportCenter = scrollLeft + (clientWidth / 2)
    
    // 첫 번째 카드의 중앙 위치부터 계산
    const firstCardCenter = cardWidth / 2
    const cardIndex = Math.round((viewportCenter - firstCardCenter) / totalCardWidth)
    
    // 음수 인덱스 처리 및 5개 카드로 순환
    let actualIndex = cardIndex % 5
    if (actualIndex < 0) actualIndex += 5
    
    setActiveIndex(actualIndex)
  }

  const scrollLeft = () => {
    if (!sliderRef.current) return
    const cardWidth = isMobile ? 280 : 450 // 모바일에 맞는 카드 너비
    const gap = isMobile ? 16 : 64 // 모바일에 맞는 간격
    const totalCardWidth = cardWidth + gap
    sliderRef.current.scrollBy({ left: -totalCardWidth, behavior: 'smooth' })
    setTimeout(checkScrollability, 300)
  }

  const scrollRight = () => {
    if (!sliderRef.current) return
    const cardWidth = isMobile ? 280 : 450 // 모바일에 맞는 카드 너비
    const gap = isMobile ? 16 : 64 // 모바일에 맞는 간격
    const totalCardWidth = cardWidth + gap
    sliderRef.current.scrollBy({ left: totalCardWidth, behavior: 'smooth' })
    setTimeout(checkScrollability, 300)
  }

  const autoScroll = useCallback(() => {
    // 모바일에서는 자동 슬라이드 비활성화
    if (!sliderRef.current || isHovered || isMobile) return
    
    const cardWidth = 450 // 데스크톱 카드 너비
    const gap = 64 // 데스크톱 간격
    const totalCardWidth = cardWidth + gap
    
    // 계속 오른쪽으로 스크롤
    sliderRef.current.scrollBy({ left: totalCardWidth, behavior: 'smooth' })
    
    // 스크롤 완료 후 위치 확인 및 인덱스 업데이트
    setTimeout(() => {
      if (!sliderRef.current) return
      
      const { scrollLeft } = sliderRef.current
      
      // 더 정확한 리셋 지점 계산 (11번째 카드 이후에 리셋)
      const resetPoint = (totalCardWidth * 11) // 11번째 카드 위치
      
      if (scrollLeft >= resetPoint) {
        // 6번째 카드 위치로 리셋 (두 번째 세트의 첫 번째 카드)
        sliderRef.current.scrollTo({ 
          left: totalCardWidth * 5, 
          behavior: 'auto' 
        })
      }
      
      // 인덱스 업데이트
      checkScrollability()
    }, 600) // 스크롤 완료 시간을 조금 더 여유롭게
    
    // 즉시 인덱스 업데이트 (스크롤 시작과 함께)
    setTimeout(checkScrollability, 200) // 조금 더 여유롭게
  }, [isHovered, isMobile])

  // 초기 설정
  useEffect(() => {
    if (sliderRef.current) {
      // 두 번째 세트의 첫 번째 카드로 시작 (인덱스 5)
      const cardWidth = isMobile ? 280 : 450 // 모바일에 맞는 카드 너비
      const gap = isMobile ? 16 : 64 // 모바일에 맞는 간격
      const totalCardWidth = cardWidth + gap
      sliderRef.current.scrollTo({ left: 5 * totalCardWidth, behavior: 'auto' })
      setTimeout(() => {
        setActiveIndex(0) // 첫 번째 메뉴로 설정
      }, 100)
    }
  }, [isMobile])

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      checkScrollability()
    }

    slider.addEventListener('scroll', handleScroll)
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [])

  // 자동 슬라이드 효과 (모바일에서는 비활성화)
  useEffect(() => {
    // 모바일에서는 자동 슬라이드 비활성화
    if (isMobile) return

    const interval = setInterval(autoScroll, 4000) // 4초마다 자동 슬라이드 (더 여유롭게)
    
    return () => clearInterval(interval)
  }, [autoScroll, isMobile])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return {
    sliderRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScrollability,
    handleMouseEnter,
    handleMouseLeave,
    activeIndex
  }
} 