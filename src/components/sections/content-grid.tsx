'use client'

import Image from 'next/image'
import { useStaggerAnimation, useHoverAnimation } from '@/hooks/useAnimation'
import { createAnimationClasses } from '@/lib/animation-config'

// ============================================================================
// 🎨 디자인 설정 (여기서 쉽게 커스터마이징 가능)
// ============================================================================
const DESIGN_CONFIG = {
  // 색상 팔레트
  colors: {
    primary: 'amber', // amber, orange, red, blue 등으로 변경 가능
    accent: 'gold',
    background: {
      overlay: 'bg-black/30' // 배경 오버레이 투명도
    },
    text: {
      primary: '#d4a437', // 메인 텍스트 색상 (골드)
      gradient: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent', // 골드 그라디언트
      secondary: 'text-white', // 보조 텍스트 색상
      description: 'text-white' // 설명 텍스트 색상
    }
  },
  
  // 폰트 설정 (커스텀 폰트 사용)
  fonts: {
    title: 'font-pretendard-bold',
    description: 'font-pretendard' // Pretendard - 깔끔한 읽기용
  },
  
  // 텍스트 크기 설정
  textSizes: {
    title: {
      mobile: 'text-2xl', // 모바일 제목 크기
      tablet: 'lg:text-3xl', // 태블릿 제목 크기
      desktop: 'xl:text-4xl' // 데스크톱 제목 크기 (더 큰 화면)
    },
    description: {
      mobile: 'text-sm', // 모바일 설명 크기
      tablet: 'lg:text-base', // 태블릿 설명 크기
      desktop: 'xl:text-lg' // 데스크톱 설명 크기
    }
  },
  
  // 레이아웃 설정
  layout: {
    section: {
      padding: 'py-20 lg:py-32', // 섹션 상하 패딩
      maxWidth: 'max-w-7xl', // 최대 너비
      containerPadding: 'px-6' // 컨테이너 좌우 패딩
    },
    grid: {
      gap: 'gap-6 lg:gap-8', // 그리드 간격
      height: 'h-auto lg:h-[800px]', // 그리드 높이
      columns: 'grid-cols-1 lg:grid-cols-3' // 그리드 열 설정
    },
    card: {
      spacing: 'space-y-6 lg:space-y-8', // 카드 간 간격
      aspect: 'aspect-4/3 lg:aspect-square', // 카드 비율
      borderRadius: 'rounded-xl', // 모서리 둥글기
      padding: 'p-6 lg:p-8' // 카드 내부 패딩
    }
  },
  
  // 애니메이션 설정
  animations: {
    gradient: 'bg-linear-to-t from-black/40 via-transparent to-transparent' // 그라디언트 오버레이
  },
  
  // 이미지 효과 설정
  imageEffects: {
    brightness: 'brightness-75', // 밝기 조정
    contrast: 'contrast-125', // 대비 조정
    saturation: 'saturate-110' // 채도 조정
  }
}

// ============================================================================
// 📝 콘텐츠 설정 (텍스트 및 이미지 경로)
// ============================================================================
const CONTENT_CONFIG = {
  // 배경 이미지
  backgroundImage: '/images/bg3.png',
  
  // 카드 콘텐츠
  cards: [
    {
      image: '/images/sg5.png',
      title: '프리미엄 스테이크',
      description: '완벽하게 구워낸 미디엄 레어 스테이크,\n풍부한 마블링과 깊은 풍미가 일품',
      descriptionJSX: (
        <>
          완벽하게 구워낸 미디엄 레어 스테이크,<br />
          풍부한 마블링과 깊은 풍미가 일품
        </>
      )
    },
    {
      image: '/images/stst.png',
      title: '불 위의 예술',
      description: '단순한 요리를 넘어선\n정밀한 기술',
      descriptionJSX: (
        <>
          단순한 요리를 넘어선<br />
          정밀한 기술
        </>
      )
    },
    {
      image: '/images/sgb.png',
      title: '블랙그릴 토마호크 스테이크',
      description: '뼈까지 통째로 구운 육즙 가득한 거대한 스테이크\n압도적인 비주얼의 프라임 토마호크.\n겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.',
      descriptionJSX: (
        <>
          뼈까지 통째로 구운 육즙 가득한 거대한 스테이크<br />
          압도적인 비주얼의 프라임 토마호크.<br />
          겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.
        </>
      ),
      isLarge: true // 큰 카드 여부
    }
  ]
}

export function ContentGrid() {
  // 새로운 스테이거 애니메이션 시스템 사용
  const { elementRef, isItemVisible } = useStaggerAnimation({
    itemCount: 3, // 3개의 카드
    staggerDelay: 200, // 0.2초씩 지연
    baseDelay: 100 // 기본 지연 0.1초
  })

  // 각 카드의 호버 애니메이션
  const card1Hover = useHoverAnimation({ scale: 1.05, duration: 300 })
  const card2Hover = useHoverAnimation({ scale: 1.05, duration: 300 })
  const card3Hover = useHoverAnimation({ scale: 1.05, duration: 300 })

  return (
    <section ref={elementRef} className={`w-full relative ${DESIGN_CONFIG.layout.section.padding} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={CONTENT_CONFIG.backgroundImage}
          alt="레스토랑 배경"
          fill
          className={`object-cover ${DESIGN_CONFIG.imageEffects.brightness} ${DESIGN_CONFIG.imageEffects.contrast} ${DESIGN_CONFIG.imageEffects.saturation}`}
          priority
        />
        <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.background.overlay}`}></div>
      </div>
      
      <div className={`container mx-auto ${DESIGN_CONFIG.layout.section.containerPadding} ${DESIGN_CONFIG.layout.section.maxWidth} relative z-10`}>
        {/* Asymmetric Grid Container */}
        <div className={`grid ${DESIGN_CONFIG.layout.grid.columns} ${DESIGN_CONFIG.layout.grid.gap} ${DESIGN_CONFIG.layout.grid.height}`}>
          
          {/* Left Column - Two smaller images stacked */}
          <div className={`lg:col-span-1 ${DESIGN_CONFIG.layout.card.spacing}`}>
            
            {/* Upper Left - 첫 번째 요리 */}
            <div 
              ref={card1Hover.elementRef as React.RefObject<HTMLDivElement>}
              className={`group relative ${DESIGN_CONFIG.layout.card.aspect} overflow-hidden ${DESIGN_CONFIG.layout.card.borderRadius} ${
                isItemVisible(0) ? createAnimationClasses('fadeInUp', 200) : 'opacity-0'
              }`}
              style={card1Hover.hoverStyles}
            >
              <div className="w-full h-full relative bg-black">
                <Image 
                  src={CONTENT_CONFIG.cards[0].image}
                  alt={CONTENT_CONFIG.cards[0].title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 ${DESIGN_CONFIG.animations.gradient}`}></div>
              </div>
              {/* Text Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 ${DESIGN_CONFIG.layout.card.padding}`}>
                <h3 className={`${DESIGN_CONFIG.textSizes.title.mobile} ${DESIGN_CONFIG.textSizes.title.tablet} ${DESIGN_CONFIG.fonts.title} mb-2 ${DESIGN_CONFIG.colors.text.gradient}`}>
                  {CONTENT_CONFIG.cards[0].title}
                </h3>
                <p className={`${DESIGN_CONFIG.colors.text.description} ${DESIGN_CONFIG.textSizes.description.mobile} ${DESIGN_CONFIG.textSizes.description.tablet} leading-relaxed`}>
                  {CONTENT_CONFIG.cards[0].descriptionJSX}
                </p>
              </div>
            </div>

            {/* Lower Left - 두 번째 요리 */}
            <div 
              ref={card2Hover.elementRef as React.RefObject<HTMLDivElement>}
              className={`group relative ${DESIGN_CONFIG.layout.card.aspect} overflow-hidden ${DESIGN_CONFIG.layout.card.borderRadius} ${
                isItemVisible(1) ? createAnimationClasses('fadeInUp', 400) : 'opacity-0'
              }`}
              style={card2Hover.hoverStyles}
            >
              <div className="w-full h-full relative bg-black">
                <Image 
                  src={CONTENT_CONFIG.cards[1].image}
                  alt={CONTENT_CONFIG.cards[1].title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 ${DESIGN_CONFIG.animations.gradient}`}></div>
              </div>
              {/* Text Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 ${DESIGN_CONFIG.layout.card.padding}`}>
                <h3 className={`${DESIGN_CONFIG.textSizes.title.mobile} ${DESIGN_CONFIG.textSizes.title.tablet} ${DESIGN_CONFIG.fonts.title} mb-2 ${DESIGN_CONFIG.colors.text.gradient}`}>
                  {CONTENT_CONFIG.cards[1].title}
                </h3>
                <p className={`${DESIGN_CONFIG.colors.text.description} ${DESIGN_CONFIG.textSizes.description.mobile} ${DESIGN_CONFIG.textSizes.description.tablet} leading-relaxed`}>
                  {CONTENT_CONFIG.cards[1].descriptionJSX}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Large image */}
          <div className="lg:col-span-2">
            <div 
              ref={card3Hover.elementRef as React.RefObject<HTMLDivElement>}
              className={`group relative w-full h-full min-h-[400px] lg:min-h-full overflow-hidden ${DESIGN_CONFIG.layout.card.borderRadius} ${
                isItemVisible(2) ? createAnimationClasses('fadeInUp', 600) : 'opacity-0'
              }`}
              style={card3Hover.hoverStyles}
            >
              <div className="w-full h-full relative bg-black">
                <Image 
                  src={CONTENT_CONFIG.cards[2].image}
                  alt={CONTENT_CONFIG.cards[2].title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 ${DESIGN_CONFIG.animations.gradient}`}></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
                <h3 className={`text-xl sm:text-4xl lg:text-5xl xl:text-6xl ${DESIGN_CONFIG.fonts.title} mb-2 sm:mb-4 ${DESIGN_CONFIG.colors.text.gradient}`}>
                  {CONTENT_CONFIG.cards[2].title}
                </h3>
                <p className={`${DESIGN_CONFIG.colors.text.description} text-sm sm:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-2xl`}>
                  {CONTENT_CONFIG.cards[2].descriptionJSX}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
} 