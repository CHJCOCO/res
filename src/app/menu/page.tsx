import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Clock, Users } from 'lucide-react'

const menuCategories = [
  {
    name: '찌개류',
    items: [
      {
        id: 1,
        name: '김치찌개',
        description: '3년 숙성 김치로 끓인 진짜 김치찌개',
        price: 9000,
        rating: 4.9,
        cookTime: '15분',
        isPopular: true,
        isSpicy: true
      },
      {
        id: 2,
        name: '된장찌개',
        description: '집에서 직접 담근 된장으로 만든 구수한 맛',
        price: 8000,
        rating: 4.7,
        cookTime: '12분',
        isPopular: false,
        isSpicy: false
      },
      {
        id: 3,
        name: '부대찌개',
        description: '각종 햄과 소세지가 들어간 얼큰한 부대찌개',
        price: 12000,
        rating: 4.6,
        cookTime: '18분',
        isPopular: false,
        isSpicy: true
      }
    ]
  },
  {
    name: '고기류',
    items: [
      {
        id: 4,
        name: '불고기',
        description: '한우 불고기, 달콤한 양념이 일품',
        price: 18000,
        rating: 4.8,
        cookTime: '20분',
        isPopular: true,
        isSpicy: false
      },
      {
        id: 5,
        name: '제육볶음',
        description: '매콤달콤한 제육볶음과 상추쌈',
        price: 15000,
        rating: 4.5,
        cookTime: '15분',
        isPopular: false,
        isSpicy: true
      }
    ]
  },
  {
    name: '밥류',
    items: [
      {
        id: 6,
        name: '비빔밥',
        description: '8가지 나물과 고추장이 어우러진 건강한 한 끼',
        price: 11000,
        rating: 4.8,
        cookTime: '10분',
        isPopular: true,
        isSpicy: false
      },
      {
        id: 7,
        name: '김치볶음밥',
        description: '신김치로 볶은 고소한 볶음밥',
        price: 9000,
        rating: 4.4,
        cookTime: '12분',
        isPopular: false,
        isSpicy: true
      }
    ]
  }
]

export default function MenuPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">메뉴</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            신선한 재료로 정성껏 만든 우리의 자랑스러운 메뉴들을 소개합니다
          </p>
        </div>

        {/* 메뉴 카테고리 */}
        {menuCategories.map((category) => (
          <div key={category.name} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-orange-200">
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    {/* 이미지 영역 */}
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                        <div className="text-orange-600 text-center">
                          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Users className="h-8 w-8" />
                          </div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs opacity-80">사진 준비중</p>
                        </div>
                      </div>

                      {/* 배지들 */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.isPopular && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            인기
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            🌶️ 매운맛
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 메뉴 정보 */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <span className="text-2xl font-bold text-orange-600">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* 평점과 조리시간 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{item.cookTime}</span>
                        </div>
                      </div>

                      {/* 주문 버튼 */}
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        주문하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* 하단 CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-12 mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            마음에 드는 메뉴를 찾으셨나요?
          </h3>
          <p className="text-gray-600 mb-6">
            지금 바로 예약하고 맛있는 식사를 즐겨보세요
          </p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            예약하러 가기
          </Button>
        </div>
      </div>
    </div>
  )
} 