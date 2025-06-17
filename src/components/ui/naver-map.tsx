'use client'

import { useEffect, useRef, useState } from 'react'

// 네이버 맵 타입 정의
interface NaverMaps {
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (container: HTMLElement, options: NaverMapOptions) => NaverMap;
  Marker: new (options: NaverMarkerOptions) => NaverMarker;
  InfoWindow: new (options: NaverInfoWindowOptions) => NaverInfoWindow;
  Event: {
    addListener: (target: NaverMarker, event: string, handler: () => void) => void;
  };
  MapTypeControlStyle: { BUTTON: number };
  Position: { TOP_RIGHT: number; TOP_LEFT: number };
  ZoomControlStyle: { SMALL: number; LARGE: number };
  Size: new (width: number, height: number) => unknown;
  Point: new (x: number, y: number) => unknown;
}

interface NaverMapOptions {
  center: unknown;
  zoom: number;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: unknown;
  zoomControl?: boolean;
  zoomControlOptions?: unknown;
  scaleControl?: boolean;
  logoControl?: boolean;
  mapDataControl?: boolean;
  minZoom?: number;
  maxZoom?: number;
  draggable?: boolean;
  pinchZoom?: boolean;
  scrollWheel?: boolean;
  keyboardShortcuts?: boolean;
  disableDoubleTapZoom?: boolean;
  disableDoubleClickZoom?: boolean;
  disableTwoFingerTapZoom?: boolean;
}

interface NaverMap {
  destroy?: () => void;
}

interface NaverMarkerOptions {
  position: unknown;
  map: NaverMap;
  title: string;
  icon?: {
    content: string;
    size: unknown;
    anchor: unknown;
  };
}

interface NaverMarker {
  click: string;
}

interface NaverInfoWindowOptions {
  content: string;
}

interface NaverInfoWindow {
  getMap: () => NaverMap | null;
  close: () => void;
  open: (map: NaverMap, marker: NaverMarker) => void;
}

declare global {
  interface Window {
    naver: {
      maps: NaverMaps;
    };
    navermap_authFailure?: () => void;
  }
}

interface NaverMapProps {
  className?: string
  width?: string
  height?: string
}

export function NaverMap({ className = '', width = '100%', height = '100%' }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<NaverMap | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 모바일 디바이스 감지
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'blackberry', 'windows phone']
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      console.log('디바이스 타입:', isMobileDevice ? '모바일' : '데스크탑')
      return isMobileDevice
    }

    checkMobile()
    
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID

    console.log('네이버 지도 API 클라이언트 ID:', clientId ? '설정됨' : '설정되지 않음')

    if (!clientId) {
      const errorMsg = '네이버 지도 API 클라이언트 ID가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
      console.error(errorMsg)
      setError(errorMsg)
      setIsLoading(false)
      return
    }

    // 네이버 API 인증 실패 감지 함수
    window.navermap_authFailure = function () {
      const errorMsg = '네이버 지도 API 인증에 실패했습니다. 클라이언트 ID와 도메인 설정을 확인하세요.'
      console.error(errorMsg)
      setError(errorMsg)
      setIsLoading(false)
    }

    // 네이버 지도 API 스크립트 로드
    const loadNaverMap = () => {
      if (window.naver && window.naver.maps) {
        console.log('네이버 지도 API가 이미 로드됨')
        initializeMap()
        return
      }

      console.log('네이버 지도 API 스크립트 로딩 시작...')
      const script = document.createElement('script')
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
      script.onload = () => {
        console.log('네이버 지도 API 스크립트 로드 완료')
        initializeMap()
      }
      script.onerror = (e) => {
        const errorMsg = `네이버 지도 API 로드 실패. API 키나 도메인 설정을 확인하세요.`
        console.error(errorMsg, e)
        setError(errorMsg)
        setIsLoading(false)
      }
      
      // 중복 로딩 방지
      if (!document.querySelector(`script[src*="maps.js"]`)) {
        document.head.appendChild(script)
      }
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.naver) {
        console.error('지도 컨테이너나 네이버 API가 없음')
        return
      }

      try {
        console.log('네이버 지도 초기화 시작...')
        // 강남역 좌표 (예시)
        const location = new window.naver.maps.LatLng(37.4979, 127.0276)

        const mapOptions = {
          center: location,
          zoom: isMobile ? 16 : 17,
          mapTypeControl: !isMobile,
          mapTypeControlOptions: {
            style: window.naver.maps.MapTypeControlStyle.BUTTON,
            position: window.naver.maps.Position.TOP_RIGHT
          },
          zoomControl: true,
          zoomControlOptions: {
            style: isMobile ? window.naver.maps.ZoomControlStyle.SMALL : window.naver.maps.ZoomControlStyle.LARGE,
            position: window.naver.maps.Position.TOP_LEFT
          },
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          minZoom: 7,
          maxZoom: 21,
          // 모바일 최적화 설정
          draggable: true,
          pinchZoom: true,
          scrollWheel: !isMobile,
          keyboardShortcuts: !isMobile,
          disableDoubleTapZoom: false,
          disableDoubleClickZoom: false,
          disableTwoFingerTapZoom: false
        }

        // 지도 생성
        mapInstance.current = new window.naver.maps.Map(mapRef.current, mapOptions) as NaverMap
        console.log('네이버 지도 생성 완료')
        setIsLoading(false)

        // 마커 생성
        const marker = new window.naver.maps.Marker({
          position: location,
          map: mapInstance.current,
          title: 'BISTRO',
          icon: {
            content: `
              <div style="
                width: 40px;
                height: 40px;
                background: #c89b3c;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                font-weight: bold;
                color: white;
                font-size: 12px;
              ">
                🍽️
              </div>
            `,
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20)
          }
        })

        // 정보창 생성
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="
              padding: 15px;
              min-width: 200px;
              background: #1a1a1a;
              color: white;
              border-radius: 8px;
              border: 2px solid #c89b3c;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            ">
              <h3 style="
                margin: 0 0 8px 0;
                color: #c89b3c;
                font-size: 16px;
                font-weight: bold;
              ">BISTRO</h3>
              <p style="
                margin: 0 0 5px 0;
                font-size: 14px;
                line-height: 1.4;
              ">서울시 강남구 테헤란로 123</p>
              <p style="
                margin: 0 0 5px 0;
                font-size: 13px;
                color: #bbbbbb;
              ">📞 02-1234-5678</p>
              <p style="
                margin: 0;
                font-size: 13px;
                color: #bbbbbb;
              ">🕐 17:00 - 23:00</p>
            </div>
          `
        })

        // 마커 클릭 시 정보창 열기
        window.naver.maps.Event.addListener(marker, 'click', () => {
          if (infoWindow.getMap()) {
            infoWindow.close()
          } else {
            if (mapInstance.current) {
              infoWindow.open(mapInstance.current, marker)
            }
          }
        })

        // 초기에 정보창 표시
        setTimeout(() => {
          if (mapInstance.current) {
            infoWindow.open(mapInstance.current, marker)
          }
        }, 1000)

      } catch (error) {
        const errorMsg = `네이버 지도 초기화 실패: ${error}`
        console.error(errorMsg)
        setError(errorMsg)
        setIsLoading(false)
      }
    }

    loadNaverMap()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy?.()
      }
    }
  }, [isMobile])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ width, height }}
      />
      
      {/* 로딩 또는 오류 오버레이 */}
      {(isLoading || error) && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center rounded-lg">
          <div className="text-center px-4">
            {error ? (
              <>
                <div className="text-red-400 text-2xl mb-3">⚠️</div>
                <p className="text-red-400 text-sm font-medium mb-2">지도 로드 실패</p>
                <p className="text-[#bbbbbb] text-xs leading-relaxed">{error}</p>
                <div className="mt-4 text-xs text-[#888]">
                  <p>• .env.local 파일에 API 키가 설정되었는지 확인</p>
                  <p>• 네이버 클라우드 플랫폼에서 도메인이 등록되었는지 확인</p>
                  <p>• 브라우저 콘솔을 확인하여 상세 오류 메시지 확인</p>
                </div>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c89b3c] mx-auto mb-3"></div>
                <p className="text-[#bbbbbb] text-sm">지도 로딩 중...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 