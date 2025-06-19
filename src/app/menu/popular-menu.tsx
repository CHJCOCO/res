'use client'

import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'



// ============================================================================
// 🎨 디자인 설정 (여기서 쉽게 커스터마이징 가능)
// ============================================================================
const DESIGN_CONFIG = {
  // 색상 팔레트
  colors: {
    primary: 'yellow', // yellow, amber, orange, red 등으로 변경 가능
    accent: 'orange',
    background: {
      overlay: 'bg-black/70', // 배경 오버레이 투명도 (bg-black/40, bg-black/50, bg-black/60, bg-black/70 등)
    },
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      accent: 'text-[#d4a437]',
      gradient: 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent'
    },
    card: {
      priceColor: 'text-yellow-400'
    }
  },
  
  // 폰트 설정
  fonts: {
    section: {
      title: 'font-maruburi-bold',
      description: 'font-pretendard-semibold'
    },
    card: {
      title: 'font-pretendard-bold',
      description: 'font-pretendard',
      price: 'font-pretendard-semibold'
    }
  },
  
  // 텍스트 크기 설정
  textSizes: {
    section: {
      title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
      description: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
    },
    card: {
      titleCollapsed: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
      titleExpanded: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      description: 'text-sm sm:text-base md:text-lg',
      price: 'text-lg sm:text-xl md:text-2xl'
    }
  },
  
  // 레이아웃 설정
  layout: {
    sectionHeight: 'min-h-screen',
    padding: 'py-12 md:py-20',
    maxWidth: 'max-w-7xl',
    spacing: {
      header: 'mb-8 md:mb-12 lg:mb-16',
      headerTitle: 'mb-4 md:mb-6',
      cards: 'space-y-4 md:space-y-6 lg:space-y-8',
      cardPadding: 'px-4',
      cardContent: 'p-4 sm:p-6 md:p-8'
    }
  },
  
  // 카드 애니메이션 및 크기 설정
  card: {
    sizes: {
      collapsed: 'h-32 sm:h-40 md:h-44 lg:h-48',
      expanded: 'h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96',
      hoverExpanded: 'hover:h-48 sm:hover:h-56 md:hover:h-64 lg:hover:h-80 xl:hover:h-96'
    },
    scaling: {
      expanded: 'max-w-none sm:scale-105 md:scale-110 lg:scale-125',
      hover: 'hover:max-w-none sm:hover:scale-105 md:hover:scale-110 lg:hover:scale-125'
    },
    animations: {
      transition: 'transition-all duration-300 ease-out',
      opacityTransition: 'transition-opacity duration-300',
      contentTransition: 'transition-all duration-300'
    },
    styling: {
      borderRadius: 'rounded-xl md:rounded-2xl',
      zIndex: {
        expanded: 'z-30',
        hover: 'hover:z-20'
      }
    }
  },
  
  // 배경 이미지 설정
  backgroundImages: {
    section: '/images/bg8.png' // 원하는 배경 이미지로 변경 가능
  }
}

// ============================================================================
// 📋 페이지 콘텐츠 설정
// ============================================================================
const PAGE_CONTENT = {
  section: {
    titleText: "한 점의 고기, 그 너머의 시간", // 타이핑 애니메이션용 순수 텍스트
    title: (
      <>
        <span className={DESIGN_CONFIG.colors.text.accent}>한 점의 고기,</span> <br />
        <span className={DESIGN_CONFIG.colors.text.gradient}>
          그 너머의 시간
        </span>
      </>
    ),
    description: (
      <>
        접시에 담기는 건 단순한 음식이 아니라,<br />
        장인의 철학과 식탁 위의 품격입니다.
      </>
    )
  }
}

// ============================================================================
// 🍖 메뉴 데이터 설정
// ============================================================================
const MENU_DATA = {
  popularMenus: [
    {
      id: 1,
      name: '프라임 토마호크 스테이크',
      description: '뼈까지 통째로 구운 육즙 가득한 거대한 스테이크',
      price: 85000,
      rating: 4.9,
      reviewCount: 127,
      image: '/images/tm.png',
      bgColor: 'from-red-800 to-orange-700'
    },
    {
      id: 2,
      name: '트러플 채끝 스테이크',
      description: '트러플 향이 감도는 정갈한 채끝 플레이팅',
      price: 68000,
      rating: 4.8,
      reviewCount: 94,
      image: '/images/tr.png',
      bgColor: 'from-amber-800 to-yellow-700'
    },
    {
      id: 3,
      name: '와규 안심 구이',
      description: '붉은 속살에 육즙이 맺힌 부드러운 안심 단면',
      price: 95000,
      rating: 4.9,
      reviewCount: 156,
      image: '/images/wr.png',
      bgColor: 'from-rose-800 to-red-700'
    },
    {
      id: 4,
      name: '갈릭 버터 립아이',
      description: '버터와 마늘이 녹아든 지글지글한 립아이',
      price: 52000,
      rating: 4.7,
      reviewCount: 83,
      image: '/images/bt.png',
      bgColor: 'from-yellow-800 to-amber-700'
    },
    {
      id: 5,
      name: '숙성 티본 스테이크',
      description: '두 부위를 품은 묵직한 티본의 존재감',
      price: 72000,
      rating: 4.8,
      reviewCount: 108,
      image: '/images/tbon.png',
      bgColor: 'from-stone-800 to-gray-700'
    }
  ]
}

export function PopularMenu() {
  // ============================================================================
  // 🔄 상태 관리
  // ============================================================================
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  
  // 타이핑 애니메이션 상태
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  
  // 카드 애니메이션 상태
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [animatedCards, setAnimatedCards] = useState<number[]>([]) // 애니메이션 완료된 카드들

  // ============================================================================
  // 🎬 애니메이션 효과
  // ============================================================================
  useEffect(() => {
    // 타이핑 애니메이션 시작
    const fullText = PAGE_CONTENT.section.titleText
    let currentIndex = 0
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
        
        // 타이핑 완료 후 설명 페이드인
        setTimeout(() => {
          setShowDescription(true)
          
          // 설명 페이드인(transition 1초) 후 카드 등장
          setTimeout(() => {
            startCardAnimations()
          }, 1000) // 설명 애니메이션이 1초니까 1000ms로!
        }, 600)
      }
    }, 100) // 타이핑 속도

    return () => clearInterval(typingInterval)
  }, [])

  // 카드 즉시 등장 - 애니메이션은 CSS 애니메이션 클래스가 처리
  const startCardAnimations = () => {
    // 모든 카드를 즉시 보이게 함 (CSS 애니메이션의 delay로 순차 등장 효과)
    setVisibleCards(MENU_DATA.popularMenus.map((_, index) => index))
    
    // 애니메이션 완료 후 애니메이션 클래스 제거를 위한 타이머
    setTimeout(() => {
      setAnimatedCards(MENU_DATA.popularMenus.map((_, index) => index))
    }, 1200) // 애니메이션 시간(0.8s) + 최대 지연시간(0.4s) 고려
  }

  // ============================================================================
  // 🎬 이벤트 핸들러
  // ============================================================================
  const handleCardClick = (menuId: number) => {
    setExpandedCard(expandedCard === menuId ? null : menuId)
  }

  // ============================================================================
  // 🎨 UI 컴포넌트들
  // ============================================================================

  // 타이핑 제목 컴포넌트
  const TypingTitle = () => {
    const firstPart = "한 점의 고기,"
    const breakPoint = firstPart.length
    
    return (
      <h2 className={`${DESIGN_CONFIG.textSizes.section.title} ${DESIGN_CONFIG.fonts.section.title} tracking-tight ${DESIGN_CONFIG.layout.spacing.headerTitle}`}>
        {displayedText.length > 0 && (
          <>
            <span className={DESIGN_CONFIG.colors.text.accent}>
              {displayedText.slice(0, Math.min(displayedText.length, breakPoint))}
            </span>
            {displayedText.length > breakPoint && (
              <>
                {" "}<br />
                <span className={DESIGN_CONFIG.colors.text.gradient}>
                  {displayedText.slice(breakPoint).trim()}
                </span>
              </>
            )}
          </>
        )}
        {/* 타이핑 커서 효과 */}
        {!isTypingComplete && (
          <span className={`inline-block w-1 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 ${DESIGN_CONFIG.colors.text.accent} animate-pulse ml-1`}>|</span>
        )}
      </h2>
    )
  }

  // 섹션 헤더 컴포넌트
  const SectionHeader = () => (
    <div className={`text-center ${DESIGN_CONFIG.layout.spacing.header}`}>
      <TypingTitle />
      
      {/* 설명 텍스트 - 커스텀 페이드인 애니메이션 */}
      <div 
        className={`${DESIGN_CONFIG.layout.spacing.headerTitle} ${
          showDescription 
            ? 'animate-fade-in-up' 
            : 'opacity-0'
        }`}
      >
        <p className={`${DESIGN_CONFIG.textSizes.section.description} ${DESIGN_CONFIG.fonts.section.description} leading-relaxed max-w-3xl mx-auto ${DESIGN_CONFIG.colors.text.secondary} ${DESIGN_CONFIG.layout.spacing.cardPadding}`}>
          접시에 담기는 건 단순한 음식이 아니라,<br />
          장인의 철학과 식탁 위의 품격입니다.
        </p>
      </div>
    </div>
  )

    // 메뉴 카드 컴포넌트
  const MenuCard = ({ menu, index }: { menu: typeof MENU_DATA.popularMenus[0], index: number }) => {
    const isExpanded = expandedCard === menu.id
    const isEvenIndex = index % 2 === 0
    const isVisible = visibleCards.includes(index)
    const isAnimated = animatedCards.includes(index) // 애니메이션 완료 여부

    if (!isVisible) {
      // 아예 렌더 안 하거나, 완전 숨김
      return <div style={{opacity:0, height:'0px', pointerEvents:'none'}}></div>
      // 또는 return null;
    }

    // 애니메이션 완료 후에는 애니메이션 클래스 제거
    return (
      <div className={`flex w-full ${isEvenIndex ? 'justify-start' : 'justify-end'}`}>
        <div className="w-full max-w-6xl">
          <div 
            className={`
              relative cursor-pointer overflow-hidden group w-full max-w-6xl
              ${DESIGN_CONFIG.card.styling.borderRadius}
              ${DESIGN_CONFIG.card.animations.transition}
              ${!isAnimated 
                ? `${isEvenIndex ? 'animate-slide-in-left' : 'animate-slide-in-right'} animation-delay-${index * 100 + 100}`
                : ''
              }
              ${isExpanded 
                ? `${DESIGN_CONFIG.card.sizes.expanded} ${DESIGN_CONFIG.card.scaling.expanded} ${DESIGN_CONFIG.card.styling.zIndex.expanded}`
                : `${DESIGN_CONFIG.card.sizes.collapsed} ${DESIGN_CONFIG.card.sizes.hoverExpanded} ${DESIGN_CONFIG.card.scaling.hover} ${DESIGN_CONFIG.card.styling.zIndex.hover}`
              }
            `}
            onClick={() => handleCardClick(menu.id)}
          >
            {/* 배경 그라데이션 (이미지가 없을 때의 플레이스홀더) */}
            <div className={`absolute inset-0 bg-gradient-to-r ${menu.bgColor}`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-white" />
              </div>
            </div>

            {/* 배경 이미지 (있을 경우) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${menu.image})`
              }}
            />

            {/* 기본 상태 - 메뉴명만 표시 */}
            <div className={`absolute inset-0 flex items-center justify-center ${DESIGN_CONFIG.card.animations.opacityTransition}
              ${isExpanded ? 'opacity-0' : 'group-hover:opacity-0'}
            `}>
              <h3 className={`${DESIGN_CONFIG.textSizes.card.titleCollapsed} ${DESIGN_CONFIG.fonts.card.title} ${DESIGN_CONFIG.colors.text.primary} text-center tracking-wide drop-shadow-lg ${DESIGN_CONFIG.layout.spacing.cardPadding}`}>
                {menu.name}
              </h3>
            </div>

            {/* 확장 상태 - 상세 정보 표시 */}
            <div className={`absolute bottom-0 left-0 right-0 ${DESIGN_CONFIG.card.animations.contentTransition} ${DESIGN_CONFIG.layout.spacing.cardContent}
              ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0'}
            `}>
              {/* 콘텐츠 */}
              <div className={`text-center ${DESIGN_CONFIG.colors.text.primary}`}>
                <h3 className={`${DESIGN_CONFIG.textSizes.card.titleExpanded} ${DESIGN_CONFIG.fonts.card.title} mb-2 sm:mb-3 md:mb-4 tracking-wide`}>
                  {menu.name}
                </h3>
                <p className={`${DESIGN_CONFIG.textSizes.card.description} ${DESIGN_CONFIG.fonts.card.description} ${DESIGN_CONFIG.colors.text.secondary} mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2`}>
                  {menu.description}
                </p>
                
                {/* 가격 */}
                <div className="flex items-center justify-center">
                  <span className={`${DESIGN_CONFIG.textSizes.card.price} ${DESIGN_CONFIG.fonts.card.price} ${DESIGN_CONFIG.colors.card.priceColor}`}>
                    {menu.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    // 기존 복잡한 카드 코드는 임시로 주석 처리함
  }

  // ============================================================================
  // 🎯 메인 렌더링
  // ============================================================================
  return (
    <section 
        className={`${DESIGN_CONFIG.layout.sectionHeight} relative ${DESIGN_CONFIG.layout.padding}`}
        style={{
          backgroundImage: `url('${DESIGN_CONFIG.backgroundImages.section}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 배경 오버레이 */}
        <div className={`absolute inset-0 ${DESIGN_CONFIG.colors.background.overlay}`}></div>
        
        {/* 콘텐츠 래퍼 */}
        <div className="relative z-10">
          {/* 🎨 섹션 헤더 */}
          <SectionHeader />

          {/* 🍖 메뉴 카드 컨테이너 */}
          <div className={`${DESIGN_CONFIG.layout.maxWidth} mx-auto ${DESIGN_CONFIG.layout.spacing.cardPadding}`}>

            <div className={DESIGN_CONFIG.layout.spacing.cards}>
              {MENU_DATA.popularMenus.map((menu, index) => (
                <MenuCard key={menu.id} menu={menu} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Tailwind Purge 방지 - 커스텀 애니메이션 클래스 강제 포함 */}
        <div className="hidden">
          <div className="animate-slide-in-left animate-slide-in-right animate-fade-in-up animate-scale-in"></div>
          <div className="animation-delay-100 animation-delay-200 animation-delay-300 animation-delay-400 animation-delay-500 animation-delay-600"></div>
        </div>
      </section>
    )
} 