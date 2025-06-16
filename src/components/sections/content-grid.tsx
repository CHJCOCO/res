'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function ContentGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

      return (
    <section ref={sectionRef} className="w-full relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/bg3.png" 
          alt="레스토랑 배경"
          fill
          className="object-cover brightness-75 contrast-125 saturate-110"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Asymmetric Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-auto lg:h-[800px]">
          
          {/* Left Column - Two smaller images stacked */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            
            {/* Upper Left - 첫 번째 요리 */}
            <div className={`group relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-xl ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              <div className="w-full h-full relative bg-black">
                <Image 
                  src="/images/sg5.png" 
                  alt="시그니처 요리 1"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#d4a437' }}>
                  프리미엄 스테이크
                </h3>
                <p className="text-white text-sm lg:text-base leading-relaxed">
                  완벽하게 구워낸 미디엄 레어 스테이크,<br />
                  풍부한 마블링과 깊은 풍미가 일품
                </p>
              </div>
            </div>

            {/* Lower Left - 두 번째 요리 */}
            <div className={`group relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-xl ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
              <div className="w-full h-full relative bg-black">
                <Image 
                  src="/images/pp2.png" 
                  alt="시그니처 요리 2"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#d4a437' }}>
                고기 위의 장인정신
                </h3>
                <p className="text-white text-sm lg:text-base leading-relaxed">
                단순한 요리를 넘어선 정밀한 기술
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Large image */}
          <div className="lg:col-span-2">
            <div className={`group relative w-full h-full min-h-[400px] lg:min-h-full overflow-hidden rounded-xl ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
              <div className="w-full h-full relative bg-black">
                <Image 
                  src="/images/sgb.png" 
                  alt="메인 시그니처 요리"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
                <h3 className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4" style={{ color: '#d4a437' }}>
                블랙그릴 토마호크 스테이크
                </h3>
                <p className="text-white text-sm sm:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-2xl">
                뼈까지 통째로 구운 육즙 가득한 거대한 스테이크<br />
                압도적인 비주얼의 프라임 토마호크. 겉은 바삭, 속은 촉촉하게 구워져 육즙이 풍성하게 터져 나옵니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
} 