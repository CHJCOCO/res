'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const leftNavigation = [
    { name: 'BRAND', href: '/' },
    { name: 'MENU', href: '/menu' },
    { name: 'RESERVATIONS', href: '/reservation' },
  ]

  const rightNavigation = [
    { name: 'SNS REVIEW', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ]

  return (
    <header className="bg-[#1a1a1a] border-b-2 border-[#d4a437] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-[75px]">
          {/* 왼쪽 메뉴 */}
          <nav className="hidden lg:flex items-center space-x-10">
            {leftNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-semibold tracking-wider uppercase transition-all duration-300 ease-in-out bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 가운데 로고 */}
          <div className="flex-1 flex justify-center lg:flex-initial">
            <Link 
              href="/" 
              className="text-[#d4a437] text-3xl font-bold tracking-wider uppercase"
            >
              BISTRO
            </Link>
          </div>

          {/* 오른쪽 메뉴 + 영업시간 */}
          <div className="hidden lg:flex items-center space-x-10">
            <nav className="flex items-center space-x-10">
              {rightNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-semibold tracking-wider uppercase transition-all duration-300 ease-in-out bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 hover:scale-105"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="text-white text-sm tracking-wide ml-6">
              OPEN 11:00 - 22:00
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#d4a437] transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700">
            <div className="py-4 space-y-4">
              {[...leftNavigation, ...rightNavigation].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-semibold tracking-wider uppercase py-2 transition-all duration-300 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent hover:from-gray-100 hover:via-gray-200 hover:to-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <div className="text-white text-sm tracking-wide">
                  OPEN 11:00 - 22:00
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 