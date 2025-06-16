import { Hero } from '@/components/sections/hero'
import { ContentGrid } from '@/components/sections/content-grid'
import { SignatureMenu } from '@/components/sections/signature-menu'

export default function Home() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <Hero />

      {/* 콘텐츠 그리드 섹션 */}
      <ContentGrid />

      {/* 시그니처 메뉴 소개 섹션 */}
      <SignatureMenu />
    </div>
  )
}
