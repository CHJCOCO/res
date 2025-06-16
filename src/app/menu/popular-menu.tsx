'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

const popularMenus = [
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

export function PopularMenu() {
  // 배경 이미지 설정 - 원하는 이미지 경로로 변경하세요
  const backgroundImage = '/images/bg8.png' // 이 경로를 원하는 이미지로 변경
  const backgroundOpacity = 'bg-black/70' // 배경 오버레이 투명도 조정 (bg-black/40, bg-black/50, bg-black/60, bg-black/70 등)

  // 각 카드의 클릭 상태를 관리하는 state
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  // 카드 클릭 핸들러
  const handleCardClick = (menuId: number) => {
    setExpandedCard(expandedCard === menuId ? null : menuId)
  }

  return (
    <section 
      className="min-h-screen relative py-12 md:py-20"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 배경 오버레이 */}
      <div className={`absolute inset-0 ${backgroundOpacity}`}></div>
      
      {/* 콘텐츠 래퍼 */}
      <div className="relative z-10">
      {/* 섹션 헤더 */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight mb-4 md:mb-6">
        <span className="text-[#d4a437]">한 점의 고기,</span> <br />
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
          그 너머의 시간
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal leading-relaxed max-w-3xl mx-auto text-gray-300 px-4">
        접시에 담기는 건 단순한 음식이 아니라,<br />
        장인의 철학과 식탁 위의 품격입니다.
        </p>
      </div>

      {/* 메뉴 카드 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {popularMenus.map((menu, index) => {
            const isExpanded = expandedCard === menu.id
            return (
              <div key={menu.id} className={`flex w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`relative transition-all duration-300 ease-out cursor-pointer overflow-hidden rounded-xl md:rounded-2xl group w-full max-w-6xl
                    ${isExpanded 
                      ? 'h-48 sm:h-56 md:h-64 lg:h-80 xl:h-192 max-w-none sm:scale-x-102 md:scale-x-105 lg:scale-x-110 z-10' 
                      : 'h-32 sm:h-40 md:h-44 lg:h-48 hover:h-48 hover:sm:h-56 hover:md:h-64 hover:lg:h-80 hover:xl:h-192 hover:max-w-none hover:sm:scale-x-102 hover:md:scale-x-105 hover:lg:scale-x-110'
                    }
                    hover:z-10
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
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                    ${isExpanded ? 'opacity-0' : 'group-hover:opacity-0'}
                  `}>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center tracking-wide drop-shadow-lg px-4">
                      {menu.name}
                    </h3>
                  </div>

                  {/* 확장 상태 - 상세 정보 표시 */}
                  <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 p-4 sm:p-6 md:p-8
                    ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0'}
                  `}>
                    {/* 콘텐츠 */}
                    <div className="text-center text-white">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-wide">
                        {menu.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2">
                        {menu.description}
                      </p>
                      
                      {/* 가격 */}
                      <div className="flex items-center justify-center">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                          {menu.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      </div>
    </section>
  )
} 