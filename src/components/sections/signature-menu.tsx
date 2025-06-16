'use client'

import { useEffect } from 'react'
import { useSlider } from '@/hooks/useSlider'
import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { 
    name: '프라임 토마호크 스테이크', 
    image: '/images/tm.png', 
    cardDescription: '뼈까지 통째로 구운 육즙 가득한 거대한 스테이크',
    fullDescription: '압도적인 비주얼의 프라임 토마호크. 겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.' 
  },
  { 
    name: '트러플 채끝 스테이크', 
    image: '/images/tr.png', 
    cardDescription: '트러플 향이 감도는 정갈한 채끝 플레이팅',
    fullDescription: '고소한 채끝살 위에 트러플 향을 더해 깊은 여운을 남깁니다. 부드러운 육질과 고급 향의 완벽한 조화.' 
  },
  { 
    name: '와규 안심 구이', 
    image: '/images/wr.png', 
    cardDescription: '붉은 속살에 육즙이 맺힌 부드러운 안심 단면',
    fullDescription: '한 점 한 점 부드럽게 녹아드는 와규 안심. 입안에서 사르르 퍼지는 마블링의 풍미를 느껴보세요.' 
  },
  { 
    name: '갈릭 버터 립아이', 
    image: '/images/bt.png', 
    cardDescription: '버터와 마늘이 녹아든 지글지글한 립아이',
    fullDescription: '고소한 갈릭 버터가 입안 가득 풍미를 더해줍니다. 육향이 진한 립아이에 부드러운 풍성함이 더해진 인기 메뉴.' 
  },
  { 
    name: '숙성 티본 스테이크', 
    image: '/images/tbon.png', 
    cardDescription: '두 부위를 품은 묵직한 티본의 존재감',
    fullDescription: '21일간 숙성시킨 깊은 풍미의 티본 스테이크. 부드러운 안심과 진한 채끝을 한 번에 즐기는 밸런스의 정점.' 
  }
]

// 무한 슬라이드를 위해 카드를 복제
const extendedMenuItems = [...menuItems, ...menuItems, ...menuItems]

export function SignatureMenu() {
  // 배경 이미지 설정 - 원하는 이미지로 변경하세요
  const backgroundImage = '/images/bg4.png' // 이 경로를 원하는 이미지로 변경
  const backgroundOpacity = 'bg-black/60' // 배경 오버레이 투명도 조정 (bg-black/40, bg-black/50, bg-black/60, bg-black/70 등)

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
  const currentMenu = menuItems[activeIndex]

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
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .signature-title {
          background: linear-gradient(
            45deg,
            #ffffff,
            #f8f8f8,
            #d4a437,
            #f5f5f5,
            #ffffff,
            #e5e5e5,
            #d4a437,
            #f8f8f8
          );
          background-size: 400% 400%;
          animation: gradientFlow 4s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <section 
        className="pt-16 lg:pt-24 pb-32 lg:pb-48 relative overflow-hidden bg-gray-900 min-h-[900px] lg:min-h-[1200px]"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 배경 오버레이 */}
        <div className={`absolute inset-0 ${backgroundOpacity}`}></div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative h-full">
          {/* 전체 상단 제목 */}
          <div className="text-center mb-36 lg:mb-48">
            <h2 className="signature-title text-7xl md:text-8xl lg:text-9xl italic" style={{ 
              fontFamily: 'serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(212,164,55,0.3)',
              letterSpacing: '0.02em',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}>
              Signature Collection
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-20">
            
            {/* 왼쪽 텍스트 영역 (55%) */}
            <div className="w-full lg:w-[55%] text-white flex flex-col justify-between h-auto lg:h-[800px]">
              {/* 상단 텍스트 그룹 */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 max-w-4xl transition-all duration-500 leading-tight" style={{ color: '#d4a437' }}>
                  {currentMenu.name}
                </div>
                <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-3xl transition-all duration-500">
                  {currentMenu.fullDescription}
                </p>
              </div>
              
              {/* 하단 버튼 */}
              <div className="mt-12 lg:mt-16">
                <Link href="/menu">
                  <button className="border-2 border-white bg-transparent text-white px-12 py-6 lg:px-16 lg:py-8 rounded-xl text-xl lg:text-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold">
                    메뉴안내
                  </button>
                </Link>
              </div>
            </div>

            {/* 오른쪽 메뉴 카드 슬라이더 (45%) */}
            <div className="w-full lg:w-[45%] flex items-center h-auto lg:h-[800px]">
              <div className="relative w-full">
                <div 
                  ref={sliderRef}
                  className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-16 overflow-x-auto scrollbar-hide pb-8 px-2 sm:px-0"
                  style={{ scrollSnapType: 'x mandatory' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {extendedMenuItems.map((menu, index) => (
                    <div 
                      key={index}
                      className="flex-none w-[280px] sm:w-[320px] md:w-[360px] lg:w-[450px] bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div className="relative aspect-[9/16] overflow-hidden">
                        <Image 
                          src={menu.image}
                          alt={menu.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      </div>
                      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 leading-tight" style={{ color: '#d4a437' }}>{menu.name}</h3>
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                          {menuItems[index % 5].cardDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 슬라이드 컨트롤 버튼 */}
                <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                  <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 backdrop-blur-sm ${
                      canScrollLeft 
                        ? 'border-white/30 bg-black/20 hover:border-white/60 hover:bg-black/40 text-white hover:scale-105' 
                        : 'border-white/10 bg-black/10 text-white/30 cursor-not-allowed'
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
                    className={`group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300 backdrop-blur-sm ${
                      canScrollRight 
                        ? 'border-white/30 bg-black/20 hover:border-white/60 hover:bg-black/40 text-white hover:scale-105' 
                        : 'border-white/10 bg-black/10 text-white/30 cursor-not-allowed'
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