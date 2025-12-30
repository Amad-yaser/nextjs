import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo, Amiri, Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { LanguageProvider } from "@/hooks/useLanguage";

// خطوط عربية أنيقة
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

// خطوط إنجليزية أنيقة
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "CIAR - تجارب رقمية ملهمة",
  description: "خلق تجارب رقمية جميلة ووظيفية وسهلة الاستخدام. تطوير الويب، تصميم واجهة المستخدم، وتطبيقات الجوال.",
  keywords: ["CIAR", "تطوير الويب", "تصميم واجهة المستخدم", "تطبيقات الجوال", "معرض أعمال", "وكالة رقمية"],
  authors: [{ name: "CIAR" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "CIAR - تجارب رقمية ملهمة",
    description: "خلق تجارب رقمية جميلة ووظيفية وسهلة الاستخدام",
    url: "https://ciar.com",
    siteName: "CIAR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIAR - تجارب رقمية ملهمة",
    description: "خلق تجارب رقمية جميلة ووظيفية وسهولة الاستخدام",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${amiri.variable} ${tajawal.variable} ${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-arabic`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
          <SonnerToaster position="top-left" dir="rtl" />
        </LanguageProvider>
      </body>
    </html>
  );
}
