# Instagram API 설정 가이드

SNS 리뷰 페이지에서 Instagram 게시물을 불러오기 위한 설정 방법입니다.

## 1. Instagram Basic Display API 설정

### 1.1 Facebook 개발자 계정 생성
1. [Facebook for Developers](https://developers.facebook.com/)에 접속
2. Facebook 계정으로 로그인
3. 개발자 계정 생성

### 1.2 앱 생성
1. "내 앱" → "앱 만들기"
2. "소비자" 유형 선택
3. 앱 이름 입력 (예: "Bistro SNS Review")
4. 앱 연락처 이메일 입력

### 1.3 Instagram Basic Display 제품 추가
1. 앱 대시보드에서 "제품 추가"
2. "Instagram Basic Display" 선택
3. "설정" 클릭

### 1.4 Instagram 앱 설정
1. "Instagram 앱 만들기" 클릭
2. 표시 이름 입력 (예: "Bistro SNS Review")
3. 저장

## 2. Access Token 생성

### 2.1 Instagram 테스터 사용자 추가
1. Instagram Basic Display → 기본 표시 → 역할
2. "Instagram 테스터 추가" 클릭
3. 레스토랑 Instagram 계정 사용자명 입력
4. 해당 Instagram 계정에서 테스터 초대 승인

### 2.2 Authorization URL 생성
```
https://api.instagram.com/oauth/authorize
  ?client_id={app-id}
  &redirect_uri={redirect-uri}
  &scope=user_profile,user_media
  &response_type=code
```

### 2.3 단기 토큰 생성
Authorization Code를 받은 후:
```bash
curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id={app-id} \
  -F client_secret={app-secret} \
  -F grant_type=authorization_code \
  -F redirect_uri={redirect-uri} \
  -F code={code}
```

### 2.4 장기 토큰으로 교환
```bash
curl -i -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={app-secret}
  &access_token={short-lived-access-token}"
```

## 3. 환경 변수 설정

`.env.local` 파일 생성 후 다음 추가:
```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
NEXT_PUBLIC_INSTAGRAM_USERNAME=your_instagram_username
```

## 4. 토큰 갱신

장기 토큰은 60일 후 만료되므로 주기적으로 갱신해야 합니다:

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={long-lived-access-token}"
```

## 5. API 사용 예시

설정이 완료되면 다음 엔드포인트로 게시물을 가져올 수 있습니다:

```
GET /api/instagram-feed
```

응답 예시:
```json
{
  "data": [
    {
      "id": "17841405309211844",
      "media_url": "https://scontent.cdninstagram.com/...",
      "media_type": "IMAGE",
      "caption": "맛있는 스테이크 #bistro #steak",
      "permalink": "https://www.instagram.com/p/...",
      "timestamp": "2024-01-15T10:30:00+0000"
    }
  ]
}
```

## 6. 주의사항

- Instagram Basic Display API는 개인 계정의 미디어만 가져올 수 있습니다
- 비즈니스 계정의 경우 Instagram Graph API를 사용해야 합니다
- 토큰 만료에 대비한 에러 처리가 필요합니다
- API 호출 제한(200 requests/hour)을 고려해야 합니다

## 7. 추가 설정 (선택사항)

### 7.1 이미지 캐싱
Instagram 이미지 로딩 속도 개선을 위해 Next.js Image 컴포넌트 설정:

`next.config.ts`:
```typescript
const nextConfig = {
  images: {
    domains: ['scontent.cdninstagram.com', 'instagram.com'],
  },
};
```

### 7.2 에러 모니터링
프로덕션 환경에서는 API 실패를 모니터링하는 것을 권장합니다.

## 문제 해결

### 토큰 관련 오류
- 토큰이 만료된 경우: 토큰 갱신 필요
- 권한 부족: 스코프 확인 필요

### API 호출 제한
- 시간당 200회 제한
- 캐싱 전략 구현 권장

### 이미지 로딩 실패
- CORS 이슈: Next.js 이미지 도메인 설정 확인
- URL 만료: Instagram 미디어 URL은 일정 시간 후 만료됨 