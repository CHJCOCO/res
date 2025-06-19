'use client'

import { MapPin, Clock, Phone, Car, Train, Wifi, Baby, Accessibility, Zap } from 'lucide-react'
import { SmartMap } from '@/components/ui/smart-map'

export default function ContactPage() {
  return (
    <div className="min-h-screen relative py-8 sm:py-10 md:py-12 px-4">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 bg-[url('/images/bg12.png')] bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-wider">CONTACT</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#bbbbbb] max-w-2xl mx-auto leading-relaxed px-4">
            최고의 스테이크를 경험하러 오세요. 언제든 문의해 주시기 바랍니다.
          </p>
        </div>

        {/* 지도 및 매장 정보 섹션 */}
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xs rounded-xl md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[500px]">
            {/* 스마트 지도 (데스크탑: 네이버 지도, 모바일: 구글 지도) */}
            <div className="w-full lg:h-full">
              <SmartMap 
                className="h-64 sm:h-80 lg:h-full"
                width="100%"
                height="100%"
              />
            </div>

            {/* 매장 정보 카드 */}
            <div className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 tracking-wider uppercase">
                Store Info
              </h2>
              
              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                {/* 주소 */}
                <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">Address</h3>
                  </div>
                  <p className="text-[#bbbbbb] leading-relaxed text-sm sm:text-base">
                    서울시 강남구 테헤란로 123<br />
                    BISTRO 빌딩 1층
                  </p>
                </div>

                {/* 영업시간 */}
                <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">Hours</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between text-[#bbbbbb]">
                      <span>월 - 토</span>
                      <span className="text-white">17:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bbbbbb]">일요일</span>
                      <span className="text-[#e74c3c]">휴무</span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs sm:text-sm text-[#bbbbbb]">라스트 오더: 22:00</p>
                    </div>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">Contact</h3>
                  </div>
                  <a 
                    href="tel:02-1234-5678" 
                    className="text-[#c89b3c] hover:text-[#e4b456] transition-colors text-base sm:text-lg font-semibold"
                  >
                    02-1234-5678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 교통 및 주차 안내 섹션 */}
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xs rounded-xl md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden mb-8 sm:mb-10 md:mb-12">
          <div className="p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12 tracking-wider uppercase">
              Transportation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* 자동차 이용 */}
              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Car className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] mr-2 sm:mr-3" />
                  <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">By Car</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#bbbbbb]">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>건물 지하 주차장 1시간 무료</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>이후 10분당 1,000원</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>발렛파킹 서비스 제공 (저녁 시간대)</p>
                  </div>
                </div>
              </div>

              {/* 대중교통 이용 */}
              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Train className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] mr-2 sm:mr-3" />
                  <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">Public Transport</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#bbbbbb]">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>2호선 강남역 3번 출구에서 도보 5분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>신분당선 강남역 1번 출구에서 도보 3분</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#c89b3c] rounded-full mt-2 shrink-0" />
                    <p>버스 정류장: 강남역.강남역사거리 하차</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 편의시설 안내 섹션 */}
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xs rounded-xl md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden mb-8 sm:mb-10 md:mb-12">
          <div className="p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12 tracking-wider uppercase">
              Facilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* 편의시설 항목들 */}
              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Baby className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] shrink-0" />
                  <span className="text-[#bbbbbb] text-sm sm:text-base">유아용 의자 제공됨</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] shrink-0" />
                  <span className="text-[#bbbbbb] text-sm sm:text-base">무료 Wi-Fi 사용 가능</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] shrink-0" />
                  <span className="text-[#bbbbbb] text-sm sm:text-base">콘센트 일부 테이블에서 사용 가능</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Accessibility className="h-5 w-5 sm:h-6 sm:w-6 text-[#c89b3c] shrink-0" />
                  <span className="text-[#bbbbbb] text-sm sm:text-base">휠체어 진입 가능 (입구 경사로 있음)</span>
                </div>
              </div>
            </div>

            {/* 추가 안내사항 */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <div className="bg-white/5 backdrop-blur-xs rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base mb-4">Additional Info</h3>
                <div className="text-[#bbbbbb] space-y-2 sm:space-y-3 text-sm sm:text-base leading-relaxed">
                  <p>• 단체 예약 시 사전 문의 부탁드립니다</p>
                  <p>• 반려동물 동반은 테라스석에서만 가능합니다</p>
                  <p>• 드레스코드: 스마트 캐주얼 권장</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 마무리 */}
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xs rounded-xl md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 tracking-wider uppercase">
              Contact Us
            </h3>
            <p className="text-[#bbbbbb] mb-6 sm:mb-8 text-sm sm:text-base">
              문의사항이 있으시면 언제든 연락주세요
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 text-[#bbbbbb]">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c]" />
                <span className="text-sm sm:text-base">02-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c]" />
                <span className="text-sm sm:text-base">예약 가능 시간: 11:00 - 22:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 