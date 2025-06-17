import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// ============================================================================
// 🎨 커스텀 폰트 설정 (다운로드받은 폰트들)
// ============================================================================

// 메인 본문용 폰트 - Pretendard (깔끔한 읽기용)
const pretendardRegular = localFont({
  src: "../../public/fonts/Pretendard-Regular.otf",
  variable: "--font-pretendard-regular",
  display: "swap",
});

const pretendardBold = localFont({
  src: "../../public/fonts/Pretendard-Bold.otf",
  variable: "--font-pretendard-bold",
  display: "swap",
});

const pretendardSemiBold = localFont({
  src: "../../public/fonts/Pretendard-SemiBold.otf",
  variable: "--font-pretendard-semibold",
  display: "swap",
});

// 제목용 폰트 - 마루 부리 (감성적인 제목용)
const maruBuriRegular = localFont({
  src: "../../public/fonts/MaruBuri-Regular.ttf",
  variable: "--font-maruburi-regular",
  display: "swap",
});

const maruBuriBold = localFont({
  src: "../../public/fonts/MaruBuri-Bold.ttf",
  variable: "--font-maruburi-bold",
  display: "swap",
});

const maruBuriSemiBold = localFont({
  src: "../../public/fonts/MaruBuri-SemiBold.ttf",
  variable: "--font-maruburi-semibold",
  display: "swap",
});

// 강조용 폰트 - 잘난고딕 (임팩트 있는 제목용)
const jalnanGothic = localFont({
  src: "../../public/fonts/JalnanGothicTTF.ttf",
  variable: "--font-jalnan-gothic",
  display: "swap",
});

// 둥근 폰트 - 나눔스퀘어라운드 (귀여운 강조용)
const nanumSquareRound = localFont({
  src: "../../public/fonts/NanumSquareRoundEB.ttf",
  variable: "--font-nanum-square-round",
  display: "swap",
});

// 손글씨체 - 이서윤체 (개성있는 포인트용)
const leeSeoyun = localFont({
  src: "../../public/fonts/LeeSeoyunB.ttf",
  variable: "--font-lee-seoyun",
  display: "swap",
});

// 기업체 - KOTRA Bold (공식적인 제목용)
const kotraBold = localFont({
  src: "../../public/fonts/KOTRA_BOLD.ttf",
  variable: "--font-kotra-bold",
  display: "swap",
});

// 나눔바른고딕 - 깔끔한 본문용
const nanumBarunGothic = localFont({
  src: "../../public/fonts/NanumBarunGothicBold.ttf",
  variable: "--font-nanum-barun-gothic",
  display: "swap",
});

const dancingscriptregular = localFont({
  src: "../../public/fonts/DancingScript-Regular.otf",
  variable: "--font-dancingscript-regular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "맛있는 음식점 - 신선한 재료로 만드는 정성 가득한 한식",
  description: "매일 새벽 직접 선별한 신선한 재료로 만드는 집밥 같은 정성. 온라인 예약, 단골 혜택까지 누리세요.",
  keywords: "한식, 음식점, 예약, 맛집, 김치찌개, 불고기, 된장찌개",
  openGraph: {
    title: "맛있는 음식점",
    description: "신선한 재료로 만드는 정성 가득한 한식",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`
          ${pretendardRegular.variable} 
          ${pretendardBold.variable} 
          ${pretendardSemiBold.variable}
          ${maruBuriRegular.variable} 
          ${maruBuriBold.variable} 
          ${maruBuriSemiBold.variable}
          ${jalnanGothic.variable} 
          ${nanumSquareRound.variable} 
          ${leeSeoyun.variable}
          ${kotraBold.variable}
          ${nanumBarunGothic.variable}
          ${dancingscriptregular.variable}
          antialiased
        `}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
