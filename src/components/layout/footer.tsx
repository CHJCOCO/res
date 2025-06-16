import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white border-t-2 border-[#d4a437]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 레스토랑 정보 */}
          <div>
            <h3 className="text-xl font-bold text-[#d4a437] mb-4 tracking-wider uppercase">BISTRO</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              정성과 품격이 담긴 특별한 요리를 선사하는 프리미엄 비스트로입니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-[#d4a437]" />
                <span className="tracking-wide">02-1234-5678</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-[#d4a437]" />
                <span className="tracking-wide">info@bistro.com</span>
              </div>
            </div>
          </div>

          {/* 영업시간 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 tracking-wider uppercase">Business Hours</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between items-center">
                <span className="tracking-wide">MON - FRI</span>
                <span className="text-[#d4a437] font-medium">11:00 - 22:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="tracking-wide">SAT - SUN</span>
                <span className="text-[#d4a437] font-medium">11:00 - 23:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="tracking-wide">CLOSED</span>
                <span className="text-gray-400 text-sm">2nd Monday</span>
              </div>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 tracking-wider uppercase">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/menu" className="block text-gray-300 hover:text-[#d4a437] transition-all duration-300 tracking-wide uppercase text-sm font-medium hover:translate-x-1">
                MENU
              </Link>
              <Link href="/reservation" className="block text-gray-300 hover:text-[#d4a437] transition-all duration-300 tracking-wide uppercase text-sm font-medium hover:translate-x-1">
                RESERVATIONS
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-[#d4a437] transition-all duration-300 tracking-wide uppercase text-sm font-medium hover:translate-x-1">
                SNS REVIEW
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-[#d4a437] transition-all duration-300 tracking-wide uppercase text-sm font-medium hover:translate-x-1">
                CONTACT
              </Link>
            </div>
          </div>

          {/* 위치 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 tracking-wider uppercase">Location</h3>
            <div className="text-gray-300">
              <div className="flex items-start mb-3">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0 text-[#d4a437]" />
                <div className="leading-relaxed">
                  <span className="tracking-wide">123 TEHERAN-RO, GANGNAM-GU<br />SEOUL, ABC BUILDING 1F</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 tracking-wide">5 MIN WALK FROM GANGNAM STN. EXIT 3</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm tracking-wide">
              © 2024 BISTRO. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-[#d4a437] text-sm transition-colors duration-300 tracking-wide uppercase">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#d4a437] text-sm transition-colors duration-300 tracking-wide uppercase">
                TERMS OF SERVICE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 