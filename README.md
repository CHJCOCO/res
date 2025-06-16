# 🍽️ 맛있는 음식점 - 음식점 웹사이트

> 신선한 재료로 만드는 정성 가득한 한식을 제공하는 음식점 웹사이트

## ✨ 주요 기능

### 🎯 핵심 서비스
- **온라인 예약 시스템** - 24시간 언제든지 예약 가능
- **디지털 메뉴판** - 사진과 함께 보는 메뉴, 실시간 가격 업데이트
- **리뷰 & 후기 시스템** - 고객 후기 관리 및 쿠폰 연동
- **단골 혜택 시스템** - 쿠폰 발급 및 단골 고객 관리
- **실시간 매장 상태** - 혼잡도 안내 및 대기 시간 표시

### 📱 사용자 경험
- **모바일 최적화** - 반응형 디자인으로 모든 기기에서 완벽 지원
- **PWA 지원** - 앱처럼 빠른 로딩과 홈화면 추가 가능
- **직관적인 UI/UX** - 쉽고 빠른 예약 및 주문 프로세스

### 🛠️ 관리자 기능
- **예약 관리** - 실시간 예약 현황 확인 및 관리
- **메뉴 관리** - 쉬운 메뉴 추가/수정/삭제
- **고객 관리** - 단골 고객 목록 및 쿠폰 내역
- **통계 대시보드** - 매출, 방문자, 리뷰 통계

## 🚀 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성과 개발 효율성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React** - 아름다운 아이콘 라이브러리

### Backend & Database
- **Supabase** - PostgreSQL 기반 실시간 데이터베이스
- **Next.js API Routes** - 서버리스 API 엔드포인트

### 배포 & 도구
- **Vercel** - 자동 배포 및 호스팅
- **GitHub** - 소스 코드 관리
- **ESLint** - 코드 품질 관리

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd restaurant-website
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Restaurant Configuration
NEXT_PUBLIC_RESTAURANT_NAME="맛있는 음식점"
NEXT_PUBLIC_RESTAURANT_PHONE="02-1234-5678"
NEXT_PUBLIC_RESTAURANT_ADDRESS="서울시 강남구 테헤란로 123"
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어서 확인하세요.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── menu/              # 메뉴 페이지
│   ├── reservation/       # 예약 페이지
│   └── ...
├── components/            # 재사용 가능한 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── sections/         # 페이지 섹션 컴포넌트
│   └── ui/              # 기본 UI 컴포넌트
├── lib/                  # 유틸리티 및 설정
│   ├── supabase.ts      # Supabase 클라이언트
│   └── utils.ts         # 유틸리티 함수
└── types/               # TypeScript 타입 정의
    └── index.ts
```

## 🎨 페이지 구성

1. **🏠 홈페이지** - 매장 소개, 인기 메뉴, 실시간 상태
2. **📋 메뉴** - 카테고리별 메뉴, 가격, 평점 정보
3. **📅 예약** - 온라인 예약 폼, 실시간 예약 현황
4. **💬 후기** - 고객 리뷰, 평점, 후기 작성
5. **🎁 쿠폰** - 단골 혜택, 이벤트 쿠폰
6. **📍 오시는 길** - 지도, 교통 정보, 주차 안내
7. **👤 소개** - 사장님 이야기, 매장 철학
8. **🛠️ 관리자** - 예약/메뉴/고객 관리 (사장님 전용)

## 🚀 배포

### Vercel을 사용한 배포

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료!

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
```typescript
// src/components/ui/new-component.tsx
export function NewComponent() {
  return (
    <div className="p-4">
      {/* 컴포넌트 내용 */}
    </div>
  )
}
```

### API 라우트 추가
```typescript
// src/app/api/new-route/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📞 문의

- **이메일**: info@restaurant.com
- **전화**: 02-1234-5678
- **주소**: 서울시 강남구 테헤란로 123

---

⭐ 이 프로젝트가 도움이 되었다면 별표를 눌러주세요!
