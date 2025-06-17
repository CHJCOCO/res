'use client'

import { useEffect } from 'react'
import { useSlider } from '@/hooks/useSlider'
import Link from 'next/link'
import Image from 'next/image'

// ============================================================================
// 🎨 디자인 설정 (여기서 쉽게 커스터마이징 가능)
// ============================================================================
const DESIGN_CONFIG = {
  // 색상 팔레트
  colors: {
    primary: 'amber', // amber, orange, red, blue 등으로 변경 가능
    accent: 'gold',
    background: {
      main: 'bg-gray-900',
      overlay: 'bg-black/60' // 배경 오버레이 투명도 (bg-black/40, bg-black/50, bg-black/60, bg-black/70 등)
    },
    text: {
      primary: '#d4a437', // 메인 텍스트 색상 (골드)
      secondary: 'text-white',
      description: 'text-gray-300'
    },
    button: {
      border: 'border-white',
      background: 'bg-transparent',
      text: 'text-white',
      hover: {
        background: 'hover:bg-white',
        text: 'hover:text-gray-900'
      }
    },
    card: {
      background: 'bg-black/20',
      border: 'border-white/10',
      borderHover: 'hover:border-white/30'
    },
    slider: {
      buttonActive: 'border-white/30 bg-black/20 hover:border-white/60 hover:bg-black/40 text-white hover:scale-105',
      buttonInactive: 'border-white/10 bg-black/10 text-white/30 cursor-not-allowed'
    }
  },
  
  // 폰트 설정 (커스텀 폰트 사용)
  fonts: {
    title: {
      main: 'font-dancingscript',  // DancingScript 영문 필기체 폰트
      card: 'font-pretendard-bold'           
    },
    description: 'font-pretendard', 
    button: 'font-nanum-barun'     // 버튼은 나눔바른고딕
  },
  
  // 텍스트 크기 설정
  textSizes: {
    mainTitle: 'text-7xl md:text-8xl lg:text-9xl', // 메인 타이틀 크기 (약간 줄임)
    menuTitle: 'text-3xl md:text-4xl lg:text-5xl', // 메뉴 타이틀 크기
    description: 'text-base sm:text-lg lg:text-xl', // 설명 텍스트 크기
    button: 'text-xl lg:text-2xl', // 버튼 텍스트 크기
    card: {
      title: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
      description: 'text-xs sm:text-sm lg:text-base xl:text-lg'
    }
  },
  
  // 레이아웃 설정
  layout: {
    section: {
      padding: 'pt-16 lg:pt-24 pb-32 lg:pb-48',
      minHeight: 'min-h-[900px] lg:min-h-[1200px]',
      maxWidth: 'max-w-7xl',
      containerPadding: 'px-2 sm:px-4 lg:px-8'
    },
    titleSection: {
      marginBottom: 'mb-36 lg:mb-48',
      padding: 'py-8 px-4'  // 제목 영역에 패딩 추가
    },
    content: {
      gap: 'gap-16 lg:gap-20',
      leftWidth: 'w-full lg:w-[55%]',
      rightWidth: 'w-full lg:w-[45%]',
      leftHeight: 'h-auto lg:h-[800px]',
      rightHeight: 'h-auto lg:h-[800px]'
    },
    button: {
      padding: 'px-12 py-6 lg:px-16 lg:py-8',
      borderRadius: 'rounded-xl',
      margin: 'mt-12 lg:mt-8'
    },
    card: {
      width: 'w-[280px] sm:w-[320px] md:w-[360px] lg:w-[450px]',
      spacing: 'space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-16',
      borderRadius: 'rounded-2xl',
      padding: 'p-6 sm:p-8 md:p-10 lg:p-12',
      aspect: 'aspect-[3/5]'
    },
    sliderControls: {
      gap: 'gap-4 sm:gap-6',
      margin: 'mt-8 sm:mt-12',
      buttonSize: 'w-12 h-12 sm:w-16 sm:h-16'
    }
  },
  
  // 애니메이션 설정
  animations: {
    transition: 'transition-all duration-300',
    hoverScale: 'group-hover:scale-105',
    imageTransition: 'transition-transform duration-500',
    backdropBlur: 'backdrop-blur-sm'
  },
  
  // 배경 이미지 설정
  backgroundImage: {
    url: '/images/bg4.png' // 배경 이미지 경로
  },
  
  // CSS 애니메이션 설정
  gradientAnimation: {
    keyframes: `
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `,
    gradient: `
      background: linear-gradient(
        45deg,
        #ffffff, #f8f8f8, #d4a437, #f5f5f5,
        #ffffff, #e5e5e5, #d4a437, #f8f8f8
      );
      background-size: 400% 400%;
      animation: gradientFlow 4s ease-in-out infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `,
    textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(212,164,55,0.3)',
    letterSpacing: '0.02em',
    transform: 'perspective(1000px) rotateX(5deg)'
  }
}

// ============================================================================
// 📝 콘텐츠 설정 (메뉴 데이터 및 텍스트)
// ============================================================================
const CONTENT_CONFIG = {
  // 메인 타이틀
  mainTitle: 'Signature Collection',
  
  // 메뉴 아이템 데이터
  menuItems: [
    { 
      name: '프라임 토마호크 스테이크', 
      image: '/images/tm.png', 
      cardDescription: '뼈까지 통째로 구운 육즙 가득한 거대한 스테이크',
      fullDescription: '압도적인 비주얼의 프라임 토마호크. 겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.',
      fullDescriptionJSX: (
        <>
          압도적인 비주얼의 프라임 토마호크.<br />
          겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.
        </>
      )
    },
    { 
      name: '트러플 채끝 스테이크', 
      image: '/images/tr.png', 
      cardDescription: '트러플 향이 감도는 정갈한 채끝 플레이팅',
      fullDescription: '고소한 채끝살 위에 트러플 향을 더해 깊은 여운을 남깁니다. 부드러운 육질과 고급 향의 완벽한 조화.',
      fullDescriptionJSX: (
        <>
          고소한 채끝살 위에 트러플 향을 더해 깊은 여운을 남깁니다.<br />
          부드러운 육질과 고급 향의 완벽한 조화.
        </>
      )
    },
    { 
      name: '와규 안심 구이', 
      image: '/images/wr.png', 
      cardDescription: '붉은 속살에 육즙이 맺힌 부드러운 안심 단면',
      fullDescription: '한 점 한 점 부드럽게 녹아드는 와규 안심. 입안에서 사르르 퍼지는 마블링의 풍미를 느껴보세요.',
      fullDescriptionJSX: (
        <>
          한 점 한 점 부드럽게 녹아드는 와규 안심.<br />
          입안에서 사르르 퍼지는 마블링의 풍미를 느껴보세요.
        </>
      )
    },
    { 
      name: '갈릭 버터 립아이', 
      image: '/images/bt.png', 
      cardDescription: '버터와 마늘이 녹아든 지글지글한 립아이',
      fullDescription: '고소한 갈릭 버터가 입안 가득 풍미를 더해줍니다. 육향이 진한 립아이에 부드러운 풍성함이 더해진 인기 메뉴.',
      fullDescriptionJSX: (
        <>
          고소한 갈릭 버터가 입안 가득 풍미를 더해줍니다.<br />
          육향이 진한 립아이에 부드러운 풍성함이 더해진 인기 메뉴.
        </>
      )
    },
    { 
      name: '숙성 티본 스테이크', 
      image: '/images/tbon.png', 
      cardDescription: '두 부위를 품은 묵직한 티본의 존재감',
      fullDescription: '21일간 숙성시킨 깊은 풍미의 티본 스테이크. 부드러운 안심과 진한 채끝을 한 번에 즐기는 밸런스의 정점.',
      fullDescriptionJSX: (
        <>
          21일간 숙성시킨 깊은 풍미의 티본 스테이크.<br />
          부드러운 안심과 진한 채끝을 한 번에 즐기는 밸런스의 정점.
        </>
      )
    }
  ],
  
  // 버튼 텍스트
  buttonText: '메뉴안내',
  
  // 링크 경로
  menuLink: '/menu'
}

// 무한 슬라이드를 위해 카드를 복제
const extendedMenuItems = [...CONTENT_CONFIG.menuItems, ...CONTENT_CONFIG.menuItems, ...CONTENT_CONFIG.menuItems]

export function SignatureMenu() {
  const {
    sliderRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    checkScrollability,
    handleMouseEnter,
    handleMouseLeave,
    activeIndex
  } = useSlider()

  // 현재 활성 메뉴 정보
  const currentMenu = CONTENT_CONFIG.menuItems[activeIndex]

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    checkScrollability()
    
    const handleScroll = () => {
      checkScrollability()
    }
    
    slider.addEventListener('scroll', handleScroll)
    
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [sliderRef, checkScrollability])

  return (
    <>
      <style jsx>{`
        ${DESIGN_CONFIG.gradientAnimation.keyframes}
        
        .signature-title {
          ${DESIGN_CONFIG.gradientAnimation.gradient}
        }

        .card-slider {
          padding-left: calc(50vw - 140px);
          padding-right: calc(50vw - 140px);
        }

        @media (min-width: 640px) {
          .card-slider {
            padding-left: calc(50vw - 160px);
            padding-right: calc(50vw - 160px);
          }
        }

        @media (min-width: 768px) {
          .card-slider {
            padding-left: calc(50vw - 180px);
            padding-right: calc(50vw - 180px);
          }
        }

        @media (min-width: 1024px) {
          .card-slider {
            padding-left: 0;
            padding-right: 0;
          }
        }
      `}</style>
      
      <section 
        className={`${DESIGN_CONFIG.layout.section.padding} relative overflow-hidden ${DESIGN_CONFIG.colors.background.main} ${DESIGN_CONFIG.layout.section.minHeight}`}
        style={{
          backgroundImage: `url('${DESIGN_CONFIG.backgroundImage.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 배경 오버레이 */}
        <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.background.overlay}`}></div>
        
        <div className={`${DESIGN_CONFIG.layout.section.maxWidth} mx-auto ${DESIGN_CONFIG.layout.section.containerPadding} relative h-full`}>
          {/* 전체 상단 제목 */}
          <div className={`text-center ${DESIGN_CONFIG.layout.titleSection.marginBottom} ${DESIGN_CONFIG.layout.titleSection.padding} overflow-visible`}>
            <h2 
              className={`signature-title ${DESIGN_CONFIG.textSizes.mainTitle} ${DESIGN_CONFIG.fonts.title.main} leading-relaxed`} 
              style={{ 
                textShadow: DESIGN_CONFIG.gradientAnimation.textShadow,
                letterSpacing: DESIGN_CONFIG.gradientAnimation.letterSpacing,
                transform: DESIGN_CONFIG.gradientAnimation.transform,
                lineHeight: '1.3'  // 줄 높이 증가로 잘림 방지
              }}
            >
              {CONTENT_CONFIG.mainTitle}
            </h2>
          </div>

          <div className={`flex flex-col lg:flex-row items-start justify-between ${DESIGN_CONFIG.layout.content.gap}`}>
            
            {/* 왼쪽 텍스트 영역 (55%) */}
            <div className={`${DESIGN_CONFIG.layout.content.leftWidth} ${DESIGN_CONFIG.colors.text.secondary} flex flex-col justify-center lg:justify-start ${DESIGN_CONFIG.layout.content.leftHeight}`}>
              {/* 상단 텍스트 그룹 */}
              <div className="flex-1 lg:flex-none flex flex-col justify-center lg:justify-start text-center lg:text-left">
                <div className={`${DESIGN_CONFIG.textSizes.menuTitle} ${DESIGN_CONFIG.fonts.title.card} mb-8 lg:mb-12 max-w-4xl ${DESIGN_CONFIG.animations.transition} leading-tight`} style={{ color: DESIGN_CONFIG.colors.text.primary }}>
                  {currentMenu.name}
                </div>
                <p className={`${DESIGN_CONFIG.colors.text.description} ${DESIGN_CONFIG.textSizes.description} leading-loose sm:leading-relaxed max-w-full sm:max-w-3xl ${DESIGN_CONFIG.animations.transition} break-keep hyphens-auto`}>
                  {currentMenu.fullDescriptionJSX || currentMenu.fullDescription}
                </p>
              </div>
              
              {/* 하단 버튼 */}
              <div className={`${DESIGN_CONFIG.layout.button.margin} text-center lg:text-left`}>
                <Link href={CONTENT_CONFIG.menuLink}>
                  <button className={`border-2 ${DESIGN_CONFIG.colors.button.border} ${DESIGN_CONFIG.colors.button.background} ${DESIGN_CONFIG.colors.button.text} ${DESIGN_CONFIG.layout.button.padding} ${DESIGN_CONFIG.layout.button.borderRadius} ${DESIGN_CONFIG.textSizes.button} ${DESIGN_CONFIG.colors.button.hover.background} ${DESIGN_CONFIG.colors.button.hover.text} ${DESIGN_CONFIG.animations.transition} ${DESIGN_CONFIG.fonts.button}`}>
                    {CONTENT_CONFIG.buttonText}
                  </button>
                </Link>
              </div>
            </div>

            {/* 오른쪽 메뉴 카드 슬라이더 (45%) */}
            <div className={`${DESIGN_CONFIG.layout.content.rightWidth} flex items-center ${DESIGN_CONFIG.layout.content.rightHeight}`}>
              <div className="relative w-full">
                <div 
                  ref={sliderRef}
                  className={`card-slider flex ${DESIGN_CONFIG.layout.card.spacing} overflow-x-auto scrollbar-hide pb-8`}
                  style={{ 
                    scrollSnapType: 'x mandatory'
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {extendedMenuItems.map((menu, index) => (
                    <div 
                      key={index}
                      className={`flex-none ${DESIGN_CONFIG.layout.card.width} ${DESIGN_CONFIG.colors.card.background} ${DESIGN_CONFIG.layout.card.borderRadius} overflow-hidden ${DESIGN_CONFIG.animations.backdropBlur} border ${DESIGN_CONFIG.colors.card.border} ${DESIGN_CONFIG.colors.card.borderHover} ${DESIGN_CONFIG.animations.transition} group`}
                      style={{ scrollSnapAlign: 'center' }}
                    >
                      <div className={`relative ${DESIGN_CONFIG.layout.card.aspect} overflow-hidden`}>
                        <Image 
                          src={menu.image}
                          alt={menu.name}
                          fill
                          className={`object-cover ${DESIGN_CONFIG.animations.hoverScale} ${DESIGN_CONFIG.animations.imageTransition}`}
                        />
                        <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 ${DESIGN_CONFIG.animations.transition}`}></div>
                      </div>
                      <div className={DESIGN_CONFIG.layout.card.padding}>
                        <h3 className={`${DESIGN_CONFIG.textSizes.card.title} ${DESIGN_CONFIG.fonts.title.card} mb-3 sm:mb-4 leading-tight`} style={{ color: DESIGN_CONFIG.colors.text.primary }}>{menu.name}</h3>
                        <p className={`${DESIGN_CONFIG.colors.text.description} ${DESIGN_CONFIG.textSizes.card.description} leading-loose sm:leading-relaxed break-keep hyphens-auto`}>
                          {CONTENT_CONFIG.menuItems[index % 5].cardDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 슬라이드 컨트롤 버튼 */}
                <div className={`flex justify-center items-center ${DESIGN_CONFIG.layout.sliderControls.gap} ${DESIGN_CONFIG.layout.sliderControls.margin}`}>
                  <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`group relative ${DESIGN_CONFIG.layout.sliderControls.buttonSize} rounded-full border-2 ${DESIGN_CONFIG.animations.transition} ${DESIGN_CONFIG.animations.backdropBlur} ${
                      canScrollLeft 
                        ? DESIGN_CONFIG.colors.slider.buttonActive
                        : DESIGN_CONFIG.colors.slider.buttonInactive
                    }`}
                  >
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 mx-auto transition-transform group-hover:-translate-x-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`group relative ${DESIGN_CONFIG.layout.sliderControls.buttonSize} rounded-full border-2 ${DESIGN_CONFIG.animations.transition} ${DESIGN_CONFIG.animations.backdropBlur} ${
                      canScrollRight 
                        ? DESIGN_CONFIG.colors.slider.buttonActive
                        : DESIGN_CONFIG.colors.slider.buttonInactive
                    }`}
                  >
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 mx-auto transition-transform group-hover:translate-x-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
} 