import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "sweetalert2/dist/sweetalert2.min.css";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopToolbar } from "@/components/TopToolbar";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-geist-sans",
  subsets: ["latin", "thai"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i-EHR",
  description: "พื้นที่ทำงานเวชระเบียนอิเล็กทรอนิกส์",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t?t==='dark':m;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-full overflow-hidden bg-[var(--bg)] text-[var(--text)]">
        <div className="flex h-screen min-h-0">
          <Sidebar />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <TopToolbar />
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
