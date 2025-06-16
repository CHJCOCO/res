# 데이터베이스 설정 가이드

이 프로젝트는 Firebase와 Supabase 간 쉬운 전환이 가능한 추상화 계층을 제공합니다.

## 🚀 빠른 시작 (Firebase 사용)

### 1. Firebase 프로젝트 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication 활성화 (이메일/패스워드 인증 설정)
3. Firestore Database 생성 (테스트 모드로 시작)
4. 프로젝트 설정에서 웹 앱 추가 후 설정 정보 복사

### 2. 환경 변수 설정

`env.example` 파일을 `.env.local`로 복사하고 Firebase 설정을 입력:

```bash
cp env.example .env.local
```

`.env.local` 파일에서 Firebase 설정값들을 실제 값으로 교체:

```env
NEXT_PUBLIC_DATABASE_PROVIDER=firebase

NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore 보안 규칙 설정

Firebase Console에서 Firestore Database > 규칙에 다음 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 레스토랑 데이터 (모든 사용자 읽기 가능, 인증된 사용자만 쓰기)
    match /restaurants/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 메뉴 아이템 (모든 사용자 읽기 가능, 인증된 사용자만 쓰기)
    match /menu_items/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 예약 (인증된 사용자만 접근)
    match /reservations/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📖 사용 방법

### 기본 데이터베이스 작업

```typescript
import { db } from '@/lib/database'

// 레스토랑 생성
const restaurant = await db.restaurants.create({
  name: "맛있는 레스토랑",
  description: "최고의 한식 레스토랑",
  cuisine_type: "Korean",
  price_range: "$$",
  address: "서울시 강남구",
  phone: "02-1234-5678",
  email: "info@restaurant.com",
  hours: "9:00 AM - 10:00 PM"
})

// 레스토랑 목록 조회
const { data: restaurants } = await db.restaurants.getAll()

// 메뉴 생성
const menuItem = await db.menuItems.create({
  restaurant_id: "restaurant_id",
  name: "김치찌개",
  description: "매콤한 김치찌개",
  price: 8000,
  category: "메인",
  is_available: true
})
```

### React 훅 사용

```typescript
'use client'
import { useRestaurants, useAuth } from '@/hooks/useDatabase'

export default function RestaurantPage() {
  const { restaurants, loading, error, createRestaurant } = useRestaurants()
  const { user, signIn, signOut } = useAuth()

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error}</div>

  return (
    <div>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🔄 Supabase로 마이그레이션

나중에 Supabase로 전환하려면:

### 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com/)에서 새 프로젝트 생성
2. SQL Editor에서 테이블 생성:

```sql
-- 레스토랑 테이블
CREATE TABLE restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cuisine_type TEXT NOT NULL,
  price_range TEXT NOT NULL,
  rating DECIMAL(2,1),
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  hours TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 메뉴 아이템 테이블
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 예약 테이블
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  party_size INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. 환경 변수 변경

`.env.local`에서 데이터베이스 provider만 변경:

```env
NEXT_PUBLIC_DATABASE_PROVIDER=supabase
```

### 3. 데이터 마이그레이션

Firebase에서 Supabase로 데이터를 마이그레이션하는 스크립트가 필요한 경우 별도로 제공할 수 있습니다.

## 🛠️ 추상화 계층 구조

```
src/lib/
├── database-types.ts      # 공통 타입 정의
├── firebase.ts           # Firebase 설정
├── firebase-client.ts    # Firebase 구현체
├── supabase.ts          # Supabase 설정
├── supabase-client.ts   # Supabase 구현체
└── database.ts          # 통합 데이터베이스 인터페이스

src/hooks/
└── useDatabase.ts       # React 훅들
```

## 🔧 환경 변수 목록

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `NEXT_PUBLIC_DATABASE_PROVIDER` | 사용할 데이터베이스 (`firebase` 또는 `supabase`) | ✅ |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase 설정 (Firebase 사용 시) | ✅ (Firebase 사용 시) |
| `NEXT_PUBLIC_SUPABASE_*` | Supabase 설정 (Supabase 사용 시) | ✅ (Supabase 사용 시) |

## 🚨 주의사항

1. **보안**: 프로덕션 환경에서는 적절한 보안 규칙을 설정하세요
2. **데이터 형식**: Firebase와 Supabase 간 날짜/시간 형식 차이에 주의하세요
3. **쿼리 최적화**: 대량 데이터 처리시 페이지네이션을 구현하세요
4. **에러 처리**: 네트워크 오류 등에 대한 적절한 에러 처리를 구현하세요

## 💡 팁

- MVP 단계에서는 Firebase를 추천 (빠른 설정, 실시간 기능)
- 확장성이 중요한 경우 Supabase를 고려 (PostgreSQL 기반, RLS)
- 환경 변수만 변경하면 쉽게 전환 가능! 