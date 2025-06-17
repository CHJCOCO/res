'use client'

import { useEffect, useState } from 'react'
import { NaverMap } from './naver-map'
import { FallbackMap } from './fallback-map'

interface SmartMapProps {
  className?: string
  width?: string
  height?: string
}

export function SmartMap({ className = '', width = '100%', height = '100%' }: SmartMapProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'blackberry', 'windows phone']
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth <= 768
      
      setIsMobile(isMobileDevice)
      setIsLoaded(true)
      
      console.log('스마트 지도 - 디바이스 감지:', isMobileDevice ? '모바일 (구글 지도)' : '데스크탑 (네이버 지도)')
    }

    checkDevice()
    
    // 윈도우 리사이즈 시 재검사
    const handleResize = () => {
      const wasMobile = isMobile
      const nowMobile = window.innerWidth <= 768
      if (wasMobile !== nowMobile) {
        setIsMobile(nowMobile)
        console.log('스마트 지도 - 화면 크기 변경:', nowMobile ? '모바일' : '데스크탑')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  if (!isLoaded) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c89b3c] mx-auto mb-3"></div>
            <p className="text-[#bbbbbb] text-sm">디바이스 감지 중...</p>
          </div>
        </div>
      </div>
    )
  }

  // 모바일에서는 구글 지도, 데스크탑에서는 네이버 지도
  return isMobile ? (
    <FallbackMap 
      className={className}
      width={width}
      height={height}
    />
  ) : (
    <NaverMap 
      className={className}
      width={width}
      height={height}
    />
  )
} 