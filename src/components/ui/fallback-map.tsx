'use client'

interface FallbackMapProps {
  className?: string
  width?: string
  height?: string
}

export function FallbackMap({ className = '', width = '100%', height = '100%' }: FallbackMapProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* 구글 지도 embed (API 키 불필요) */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3982331812453!2d127.02456831550724!3d37.497911779808166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15ba0746143%3A0x2c06b3e0f2a50bae!2z6rCV64Ko7Jet!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
        title="BISTRO 위치"
      />
      
      {/* 오버레이 정보 */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs rounded-lg p-3 border border-white/10">
        <h3 className="text-white font-semibold text-sm mb-1">🍽️ BISTRO</h3>
        <p className="text-[#bbbbbb] text-xs">서울시 강남구 테헤란로 123</p>
        <p className="text-[#c89b3c] text-xs mt-1">📞 02-1234-5678</p>
      </div>
    </div>
  )
} 