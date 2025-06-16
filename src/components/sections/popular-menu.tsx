import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Heart } from 'lucide-react'

const popularMenus = [
  {
    id: 1,
    name: '김치찌개',
    description: '3년 숙성 김치로 끓인 진짜 김치찌개',
    price: 9000,
    rating: 4.9,
    reviewCount: 87,
    isPopular: true,
    image: '/images/kimchi-jjigae.jpg'
  },
  {
    id: 2,
    name: '불고기',
    description: '한우 불고기, 달콤한 양념이 일품',
    price: 18000,
    rating: 4.8,
    reviewCount: 64,
    isPopular: true,
    image: '/images/bulgogi.jpg'
  },
  {
    id: 3,
    name: '된장찌개',
    description: '집에서 직접 담근 된장으로 만든 구수한 맛',
    price: 8000,
    rating: 4.7,
    reviewCount: 45,
    isPopular: true,
    image: '/images/doenjang-jjigae.jpg'
  },
  {
    id: 4,
    name: '비빔밥',
    description: '8가지 나물과 고추장이 어우러진 건강한 한 끼',
    price: 11000,
    rating: 4.8,
    reviewCount: 72,
    isPopular: true,
    image: '/images/bibimbap.jpg'
  }
]

export function PopularMenu() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            인기 메뉴
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            손님들이 가장 많이 찾는 대표 메뉴들을 소개합니다
          </p>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularMenus.map((menu) => (
            <Card key={menu.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {/* 이미지 영역 */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 flex items-end justify-center p-1">
                    <div className="text-center" style={{ color: '#d4a437' }}>
                      <Heart className="h-3 w-3 sm:h-12 sm:w-12 mx-auto mb-0.5 sm:mb-2" />
                      <p className="text-xs sm:text-sm font-medium hidden sm:block">{menu.name}</p>
                      <p className="text-xs opacity-60 hidden sm:block">사진 준비중</p>
                    </div>
                  </div>
                  
                  {/* 인기 배지 */}
                  {menu.isPopular && (
                    <div className="absolute top-3 left-3 text-white px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#d4a437' }}>
                      인기
                    </div>
                  )}
                </div>

                {/* 메뉴 정보 */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {menu.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {menu.description}
                  </p>
                  
                  {/* 평점과 리뷰 */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {menu.rating}
                      </span>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({menu.reviewCount}개 리뷰)
                    </span>
                  </div>

                  {/* 가격 */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: '#d4a437' }}>
                      {menu.price.toLocaleString()}원
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      주문하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 전체 메뉴 보기 버튼 */}
        <div className="text-center">
          <Link href="/menu">
            <Button size="lg" variant="outline" className="px-8">
              전체 메뉴 보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 