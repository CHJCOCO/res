'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('예약 데이터:', formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'partySize' ? parseInt(value) : value
    }))
  }

  // 가능한 예약 시간
  const availableTimes = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00'
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 bg-[url('/images/bg10.png')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-2xl w-full">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl border border-white/10">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-[#c89b3c] mx-auto mb-4 sm:mb-6 md:mb-8" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-wide">
              예약이 완료되었습니다
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#bbbbbb] mb-6 sm:mb-8 md:mb-10">
              예약 확인 문자를 곧 받으실 수 있습니다.
            </p>
            <div className="bg-white/5 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border border-white/10">
              <h3 className="font-semibold text-white mb-4 sm:mb-5 md:mb-6 tracking-wide text-base sm:text-lg">예약 정보</h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#bbbbbb]">
                <div className="flex justify-between">
                  <span>예약자:</span>
                  <span className="text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>날짜:</span>
                  <span className="text-white">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>시간:</span>
                  <span className="text-white">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>인원:</span>
                  <span className="text-white">{formData.partySize}명</span>
                </div>
                <div className="flex justify-between">
                  <span>연락처:</span>
                  <span className="text-white">{formData.phone}</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  date: '',
                  time: '',
                  partySize: 2,
                  specialRequests: ''
                })
              }}
              className="bg-[#8b1f2f] hover:bg-[#6d1623] text-white border-2 border-[#c89b3c] px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold tracking-wider transition-all duration-300 hover:border-[#e4b456] hover:shadow-lg hover:shadow-[#c89b3c]/20 text-sm sm:text-base"
            >
              새 예약하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative py-8 sm:py-10 md:py-12 px-4">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 bg-[url('/images/bg10.png')] bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-wider">RESERVATION</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#bbbbbb] max-w-2xl mx-auto leading-relaxed px-4">
            온라인으로 간편하게 예약하세요. 예약 확인 문자를 보내드립니다.
          </p>
        </div>

        {/* 메인 예약 박스 */}
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 왼쪽 - 예약 폼 */}
            <div className="p-6 sm:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 md:space-y-8">
                {/* 예약자 이름 */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white placeholder-[#666] focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                    placeholder="예약자 이름을 입력하세요"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white placeholder-[#666] focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                    placeholder="010-1234-5678"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                    EMAIL <span className="text-[#666]">(OPTIONAL)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white placeholder-[#666] focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>

                {/* 날짜와 시간 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                      DATE
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                      TIME
                    </label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                    >
                      <option value="" className="bg-[#2a1811] text-[#bbbbbb]">시간 선택</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time} className="bg-[#2a1811] text-white">{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 인원수 */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                    GUESTS
                  </label>
                  <select
                    name="partySize"
                    required
                    value={formData.partySize}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num} className="bg-[#2a1811] text-white">{num}명</option>
                    ))}
                  </select>
                </div>

                {/* 특별 요청사항 */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#bbbbbb] mb-2 sm:mb-3 tracking-wider uppercase">
                    SPECIAL REQUESTS <span className="text-[#666]">(OPTIONAL)</span>
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border border-white/20 rounded-lg text-base sm:text-lg text-white placeholder-[#666] focus:outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/50 transition-all duration-300 resize-none"
                    placeholder="알레르기, 특별한 요청사항 등을 적어주세요"
                  />
                </div>

                {/* 예약 버튼 */}
                <Button 
                  type="submit" 
                  className="w-full bg-[#8b1f2f] hover:bg-[#6d1623] text-white border-2 border-[#c89b3c] px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6 rounded-lg font-semibold tracking-[0.05em] text-lg sm:text-xl transition-all duration-300 hover:border-[#e4b456] hover:shadow-lg hover:shadow-[#c89b3c]/20"
                >
                  예약하기
                </Button>
              </form>
            </div>

            {/* 오른쪽 - 배경 이미지 및 정보 */}
            <div className="relative bg-gradient-to-br from-[#2a1811] to-[#1a0f0a] p-6 sm:p-8 lg:p-12">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/bg7.png')] bg-cover bg-center filter blur-sm"></div>
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              
              <div className="relative z-10 space-y-6 sm:space-y-7 md:space-y-8">
                {/* 영업시간 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">HOURS</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between text-[#bbbbbb]">
                      <span>월 - 금</span>
                      <span className="text-white">11:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between text-[#bbbbbb]">
                      <span>토 - 일</span>
                      <span className="text-white">11:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bbbbbb]">휴무일</span>
                      <span className="text-[#e74c3c]">매월 둘째 월요일</span>
                    </div>
                  </div>
                </div>

                {/* 연락처 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">CONTACT</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center text-sm sm:text-base">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-[#bbbbbb]" />
                      <span className="text-white">02-1234-5678</span>
                    </div>
                    <div className="flex items-center text-sm sm:text-base">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-[#bbbbbb]" />
                      <span className="text-white">info@restaurant.com</span>
                    </div>
                  </div>
                </div>

                {/* 예약 안내 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#c89b3c] mr-2 sm:mr-3" />
                    <h3 className="text-white font-semibold tracking-wider uppercase text-sm sm:text-base">POLICY</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[#bbbbbb] leading-relaxed">
                    <p>• 예약은 최대 7일 전까지 가능합니다</p>
                    <p>• 4명 이상 예약 시 사전 연락 부탁드립니다</p>
                    <p>• 예약 변경/취소는 당일 2시간 전까지 가능합니다</p>
                    <p>• 노쇼 시 향후 예약이 제한될 수 있습니다</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 