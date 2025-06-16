'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useState } from 'react'

export function Hero() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)
  
  // 배경 이미지 설정 - 원하는 이미지로 변경하세요
  const backgroundImage = '/images/bg5.png' // 이 경로를 원하는 이미지로 변경
  const backgroundOpacity = 'opacity-30' // 투명도 조정 (opacity-10, opacity-20, opacity-30, opacity-40, opacity-50 등)

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* 배경 이미지 */}
        <div 
          className={`absolute inset-0 bg-cover bg-center ${backgroundOpacity}`}
          style={{
            backgroundImage: `url('${backgroundImage}')`
          }}
        ></div>
        
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60"></div>

        {/* Hero 메인 콘텐츠 */}
        <div className="py-20 lg:py-24 pt-32">
          <div className="container mx-auto px-6 max-w-6xl">
            
            {/* 메인 타이틀 */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6">
              단 하나의 스테이크, <br />
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                그 이상의 경험
                </span>
              </h1>
            </div>
            
            {/* 부연 설명 */}
            <div className="text-center mb-16 lg:mb-20">
              <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl mx-auto text-gray-300">
              최상의 숙성, 정교한 그릴링.<br />
              오직 진짜 스테이크만이 선사할 수 있는 깊은 풍미를 만끽하세요.
              </p>
            </div>
            
            {/* 영상 + 스테이크 겹치는 레이아웃 */}
            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              
              {/* 메인 영상 박스 */}
              <div className="relative group cursor-pointer" onClick={() => setIsVideoExpanded(true)}>
                <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
                  {/* 영상 배경 */}
                  <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-black relative">
                    {/* 실제 영상 */}
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/st2.mp4" type="video/mp4" />
                    </video>
                    
                    {/* 그리드 오버레이 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-black/20"></div>
                    
                    {/* 호버 효과 */}
                    <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* 겹치는 원형 스테이크 이미지 - 오른쪽 하단 */}
              <div className="absolute -bottom-4 -right-8 sm:-bottom-6 sm:-right-12 md:-bottom-8 md:-right-16 lg:-bottom-12 lg:-right-20 xl:-right-24 group">
                <div className="relative">
                  {/* 스테이크 이미지 영역 */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden relative shadow-2xl">
                    {/* 이미지 삽입 */}
                    <Image 
                      src="/images/st11.png" 
                      alt="스테이크 이미지"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
                
                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 펄스 효과 (선택사항) */}
                <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-pulse opacity-40"></div>
              </div>
              
            </div>
            
          </div>
        </div>

        {/* 좌측 연기 효과 */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-red-900/20 to-transparent blur-3xl"></div>
        
        {/* 우측 연기 효과 */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-b from-orange-900/20 to-transparent blur-3xl"></div>
      </section>

      {/* 영상 확대 모달 */}
      {isVideoExpanded && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* 모달 배경 */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsVideoExpanded(false)}
          ></div>
          
          {/* 모달 콘텐츠 */}
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setIsVideoExpanded(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* 영상 영역 */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                  <video controls autoPlay className="w-full h-full">
                    <source src="/videos/st2.mp4" type="video/mp4" />
                  </video>
              
            </div>
          </div>
        </div>
      )}
    </>
  )
} 