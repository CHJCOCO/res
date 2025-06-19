'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useState } from 'react'

// ============================================================================
// 🎨 디자인 설정 (여기서 쉽게 커스터마이징 가능)
// ============================================================================
const DESIGN_CONFIG = {
  // 색상 팔레트
  colors: {
    primary: 'red', // red, orange, amber, blue 등으로 변경 가능
    accent: 'orange',
    background: {
      gradient: 'bg-linear-to-b from-black via-gray-900 to-black',
      overlay: 'bg-linear-to-br from-black/80 via-transparent to-black/60'
    },
    text: {
      primary: 'text-white',
      gradient: 'bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent',
      secondary: 'text-gray-300'
    },
    effects: {
      leftSmoke: 'bg-linear-to-t from-red-900/20 to-transparent',
      rightSmoke: 'bg-linear-to-b from-orange-900/20 to-transparent',
      videoOverlay: 'bg-linear-to-t from-red-600/20 via-transparent to-black/20',
      videoHover: 'bg-red-500/10',
      circleGradient: 'bg-linear-to-t from-amber-400/20 to-transparent',
      pulse: 'bg-amber-400/20'
    }
  },
  
  // 폰트 설정 (커스텀 폰트 사용)
  fonts: {
    title: 'font-dancingscript',  // DancingScript 테스트 (영문 전용)
    subtitle: 'font-pretendard', // Pretendard - 깔끔한 읽기용
    tracking: 'tracking-tight' // tracking-tighter, tracking-tight, tracking-normal, tracking-wide 등
  },
  
  // 텍스트 크기 설정
  textSizes: {
    title: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl', // 메인 타이틀 크기
    subtitle: 'text-lg md:text-xl lg:text-2xl' // 부제목 크기
  },
  
  // 레이아웃 설정
  layout: {
    section: {
      height: 'min-h-screen',
      padding: 'py-20 lg:py-24 pt-32'
    },
    container: {
      maxWidth: 'max-w-6xl',
      padding: 'px-6'
    },
    spacing: {
      titleBottom: 'mb-6',
      subtitleBottom: 'mb-8 lg:mb-12',
      descriptionBottom: 'mb-16 lg:mb-20'
    },
    video: {
      maxWidth: 'max-w-5xl',
      padding: 'px-4 sm:px-6 lg:px-8',
      aspect: 'aspect-video',
      borderRadius: 'rounded-2xl'
    },
    circle: {
      position: 'absolute -bottom-4 -right-8 sm:-bottom-6 sm:-right-12 md:-bottom-8 md:-right-16 lg:-bottom-12 lg:-right-20 xl:-right-24',
      sizes: 'w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72'
    }
  },
  
  // 애니메이션 설정
  animations: {
    transition: 'transition-opacity duration-300',
    pulse: 'animate-pulse',
    shadow: 'shadow-2xl'
  },
  
  // 배경 이미지 설정
  backgroundImage: {
    url: '/images/bg5.png', // 배경 이미지 경로
    opacity: 'opacity-30' // 배경 이미지 투명도 (opacity-10 ~ opacity-90)
  }
}

// ============================================================================
// 📝 콘텐츠 설정 (텍스트 및 미디어 경로)
// ============================================================================
const CONTENT_CONFIG = {
  // 텍스트 콘텐츠
  hero: {
    title: {
      main: 'Premium Steak Experience',  // 영문으로 변경하여 DancingScript 테스트
      accent: '그 이상의 경험'  // 한글로 복원하여 폰트 차이 확인
    },
    subtitle: '최상의 숙성, 정교한 그릴링.',
    description: '오직 진짜 스테이크만이 선사할 수 있는 깊은 풍미를 만끽하세요.'
  },
  
  // 미디어 파일 경로
  media: {
    heroVideo: '/videos/st2.mp4', // Hero 비디오 경로
    circleImage: '/images/st11.png' // 원형 이미지 경로
  },
  
  // 모달 설정
  modal: {
    backgroundOpacity: 'bg-black/95', // 모달 배경 투명도
    contentBackground: 'bg-black', // 모달 콘텐츠 배경
    closeButton: {
      background: 'bg-black/70',
      hoverBackground: 'hover:bg-black/90'
    }
  }
}

export function Hero() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)

  return (
    <>
      <section className={`relative ${DESIGN_CONFIG.layout.section.height} ${DESIGN_CONFIG.colors.background.gradient} overflow-hidden`}>
        {/* 배경 이미지 */}
        <div 
          className={`absolute inset-0 bg-cover bg-center ${DESIGN_CONFIG.backgroundImage.opacity}`}
          style={{
            backgroundImage: `url('${DESIGN_CONFIG.backgroundImage.url}')`
          }}
        ></div>
        
        {/* 그라디언트 오버레이 */}
        <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.background.overlay}`}></div>

        {/* Hero 메인 콘텐츠 */}
        <div className={DESIGN_CONFIG.layout.section.padding}>
          <div className={`container mx-auto ${DESIGN_CONFIG.layout.container.padding} ${DESIGN_CONFIG.layout.container.maxWidth}`}>
            
            {/* 메인 타이틀 */}
            <div className={`text-center ${DESIGN_CONFIG.layout.spacing.titleBottom}`}>
              <h1 className={`${DESIGN_CONFIG.textSizes.title} ${DESIGN_CONFIG.fonts.tracking} ${DESIGN_CONFIG.colors.text.primary} ${DESIGN_CONFIG.layout.spacing.titleBottom}`}>
                {/* 영문은 DancingScript, 한글은 다른 폰트 */}
                <span className="font-dancingscript">{CONTENT_CONFIG.hero.title.main}</span> <br />
                <span className={`${DESIGN_CONFIG.colors.text.gradient} font-maruburi-bold`}>
                  {CONTENT_CONFIG.hero.title.accent}
                </span>
              </h1>
            </div>
            
            {/* 부연 설명 */}
            <div className={`text-center ${DESIGN_CONFIG.layout.spacing.subtitleBottom}`}>
              <p className={`${DESIGN_CONFIG.textSizes.subtitle} ${DESIGN_CONFIG.fonts.subtitle} leading-relaxed max-w-3xl mx-auto ${DESIGN_CONFIG.colors.text.secondary}`}>
                {CONTENT_CONFIG.hero.subtitle}<br />
                {CONTENT_CONFIG.hero.description}
              </p>
            </div>
            
            {/* 영상 + 스테이크 겹치는 레이아웃 */}
            <div className={`relative mx-auto ${DESIGN_CONFIG.layout.video.maxWidth} ${DESIGN_CONFIG.layout.video.padding}`}>
              
              {/* 메인 영상 박스 */}
              <div className="relative group cursor-pointer" onClick={() => setIsVideoExpanded(true)}>
                <div className={`w-full ${DESIGN_CONFIG.layout.video.aspect} bg-linear-to-br from-gray-900 to-black ${DESIGN_CONFIG.layout.video.borderRadius} ${DESIGN_CONFIG.animations.shadow} overflow-hidden`}>
                  {/* 영상 배경 */}
                  <div className="w-full h-full bg-linear-to-br from-red-900/20 to-black relative">
                    {/* 실제 영상 */}
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      webkit-playsinline="true"
                      className="w-full h-full object-cover"
                    >
                      <source src={CONTENT_CONFIG.media.heroVideo} type="video/mp4" />
                    </video>
                    
                    {/* 그리드 오버레이 효과 */}
                    <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.effects.videoOverlay}`}></div>
                    
                    {/* 호버 효과 */}
                    <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.effects.videoHover} opacity-0 group-hover:opacity-100 ${DESIGN_CONFIG.animations.transition}`}></div>
                  </div>
                </div>
              </div>

              {/* 겹치는 원형 스테이크 이미지 - 오른쪽 하단 */}
              <div className={`${DESIGN_CONFIG.layout.circle.position} group`}>
                <div className="relative">
                  {/* 스테이크 이미지 영역 */}
                  <div className={`${DESIGN_CONFIG.layout.circle.sizes} rounded-full overflow-hidden relative ${DESIGN_CONFIG.animations.shadow}`}>
                    {/* 이미지 삽입 */}
                    <Image 
                      src={CONTENT_CONFIG.media.circleImage}
                      alt="스테이크 이미지"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
                
                {/* 호버 효과 */}
                <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.effects.circleGradient} rounded-full opacity-0 group-hover:opacity-100 ${DESIGN_CONFIG.animations.transition}`}></div>
                
                {/* 펄스 효과 (선택사항) */}
                <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.effects.pulse} rounded-full ${DESIGN_CONFIG.animations.pulse} opacity-40`}></div>
              </div>
              
            </div>
            
          </div>
        </div>

        {/* 좌측 연기 효과 */}
        <div className={`absolute bottom-0 left-0 w-1/3 h-1/2 ${DESIGN_CONFIG.colors.effects.leftSmoke} blur-3xl`}></div>
        
        {/* 우측 연기 효과 */}
        <div className={`absolute top-0 right-0 w-1/3 h-1/2 ${DESIGN_CONFIG.colors.effects.rightSmoke} blur-3xl`}></div>
      </section>

      {/* 영상 확대 모달 */}
      {isVideoExpanded && (
        <div className={`fixed inset-0 z-100 ${CONTENT_CONFIG.modal.backgroundOpacity} flex items-center justify-center p-4`}>
          {/* 모달 배경 */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsVideoExpanded(false)}
          ></div>
          
          {/* 모달 콘텐츠 */}
          <div className={`relative w-full max-w-6xl aspect-video ${CONTENT_CONFIG.modal.contentBackground} rounded-lg overflow-hidden ${DESIGN_CONFIG.animations.shadow}`}>
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setIsVideoExpanded(false)}
              className={`absolute top-4 right-4 z-10 w-12 h-12 ${CONTENT_CONFIG.modal.closeButton.background} ${CONTENT_CONFIG.modal.closeButton.hoverBackground} text-white rounded-full flex items-center justify-center transition-colors`}
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* 영상 영역 */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <video 
                controls 
                autoPlay 
                playsInline
                webkit-playsinline="true"
                className="w-full h-full"
              >
                <source src={CONTENT_CONFIG.media.heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 