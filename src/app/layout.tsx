import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: {
    default: "김미애만신 | 국가무형문화재 서울새남굿 이수자",
    template: "%s | 김미애만신",
  },
  description:
    "국가무형문화재 서울새남굿 이수자 김미애 만신 - 사주팔자, 신점, 궁합 전문 상담. 정확하고 따뜻한 상담으로 삶의 방향을 밝혀드립니다.",
  keywords: [
    "만신", "사주", "사주팔자", "궁합", "신점", "택일", "운세",
    "김미애", "사주상담", "용한점집", "국가무형문화재", "서울새남굿",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "김미애만신",
    title: "김미애만신 | 국가무형문화재 서울새남굿 이수자",
    description: "국가무형문화재 서울새남굿 이수자 - 정확하고 따뜻한 상담으로 삶의 방향을 밝혀드립니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
