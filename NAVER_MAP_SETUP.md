# 네이버 지도 API 설정 가이드

이 문서는 레스토랑 웹사이트의 Contact 페이지에서 네이버 지도를 표시하기 위한 설정 방법을 안내합니다.

## 1. 네이버 클라우드 플랫폼 계정 생성

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 접속
2. 회원가입 및 로그인
3. 신용카드 등록 (무료 크레딧 제공)

## 2. Maps API 서비스 신청

1. **콘솔** → **Services** → **AI·Application Service** → **Maps** 선택
2. **이용 신청하기** 클릭
3. 약관 동의 후 신청 완료

## 3. 애플리케이션 등록

1. **AI·Application Service** → **Maps** → **Application** 메뉴
2. **+ Application 등록** 클릭
3. 애플리케이션 정보 입력:
   - **Application 이름**: `restaurant-website`
   - **Service 선택**: `Maps` 체크
   - **환경 등록**:
     - **Web Dynamic Map**: 체크
     - **Bundle ID**: 비워둠
     - **Package Name**: 비워둠
     - **Web Service URL**: 
       - 개발: `http://localhost:3000`
       - 운영: `https://your-domain.com`

## 4. 클라이언트 ID 발급

1. 등록된 애플리케이션에서 **인증 정보** 확인
2. **Client ID** 복사

## 5. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
# 네이버 지도 API 설정
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_actual_client_id_here
```

> ⚠️ **중요**: `your_actual_client_id_here`를 실제 발급받은 클라이언트 ID로 교체하세요.

## 6. 테스트

1. 개발 서버 재시작:
   ```bash
   npm run dev
   ```

2. `http://localhost:3000/contact` 페이지 접속

3. 네이버 지도가 정상적으로 표시되는지 확인

## 7. 지도 좌표 수정

실제 레스토랑 위치로 좌표를 변경하려면 `src/components/ui/naver-map.tsx` 파일에서 수정:

```typescript
// 현재 좌표 (강남역 예시)
const location = new window.naver.maps.LatLng(37.4979, 127.0276)

// 실제 레스토랑 좌표로 변경
const location = new window.naver.maps.LatLng(실제위도, 실제경도)
```

### 좌표 찾는 방법
1. [네이버 지도](https://map.naver.com/) 접속
2. 레스토랑 주소 검색
3. 해당 위치 우클릭 → **여기가 어디죠?** 클릭
4. 표시되는 좌표 복사

## 8. 마커 및 정보창 커스터마이징

`src/components/ui/naver-map.tsx`에서 다음 요소들을 수정할 수 있습니다:

- **마커 아이콘**: 🍽️ 이모지를 다른 아이콘으로 변경
- **정보창 내용**: 레스토랑 정보 업데이트
- **지도 스타일**: 색상, 컨트롤 위치 등

## 9. 문제 해결

### API 키 오류
- 콘솔에 "네이버 지도 API 클라이언트 ID가 설정되지 않았습니다." 메시지가 나타나면 환경 변수를 확인하세요.

### 지도 로딩 실패
- 브라우저 개발자 도구 → 네트워크 탭에서 API 요청 상태 확인
- Web Service URL이 올바르게 등록되었는지 확인

### 403 Forbidden 오류
- 네이버 클라우드 플랫폼에서 Web Service URL이 현재 도메인과 일치하는지 확인

## 10. 비용 안내

- **무료 크레딧**: 신규 가입 시 3개월간 10만원 크레딧 제공
- **Maps API 요금**: 월 100,000건까지 무료, 이후 건당 0.5원
- 일반적인 레스토랑 웹사이트는 무료 한도 내에서 충분히 사용 가능

---

설정 완료 후 Contact 페이지에서 인터랙티브한 네이버 지도를 사용할 수 있습니다! 🗺️ 