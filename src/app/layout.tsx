import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
