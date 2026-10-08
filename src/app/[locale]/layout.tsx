import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri, Cormorant_Garamond, Outfit } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LayoutWrapper from "@/components/ui/LayoutWrapper";
import { Locale } from "@/dictionaries";
import Script from 'next/script';
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["600", "700"],
  variable: "--font-noto-bengali",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-bengali",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'bn' 
    ? 'শখের বাক্স - প্রিমিয়াম কাস্টম চুড়ি ও এক্সক্লুসিভ থ্রি পিস' 
    : 'Shokher Baxho - Premium Custom Bangles & Three Piece Suits';
    
  const description = locale === 'bn'
    ? 'বাংলাদেশের সবচেয়ে প্রিমিয়াম রেশমি সুতা ও কুন্দনের কাস্টমাইজড চুড়ি এবং এক্সক্লুসিভ থ্রি পিসের কালেকশন। আজই অর্ডার করুন শখের বাক্স থেকে।'
    : 'Bangladesh\'s most premium collection of customized silk thread kundan bangles and exclusive Three Piece suits. Order today from Shokher Baxho.';

  return {
    title: {
      default: title,
      template: `%s | ${locale === 'bn' ? 'শখের বাক্স' : 'Shokher Baxho'}`
    },
    description,
    keywords: ['Bangles', 'Churi', 'Three Piece', 'Kundan Jewelry', 'Custom Bangles', 'Bridal Jewelry Bangladesh', 'শখের বাক্স', 'চুড়ি', 'থ্রি পিস'],
    authors: [{ name: 'Shokher Baxho' }],
    creator: 'Shokher Baxho',
    openGraph: {
      type: 'website',
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      url: 'https://shokherbaxho.com',
      title,
      description,
      siteName: 'Shokher Baxho',
      images: [{ url: '/images/hero_bangles.jpg', width: 1200, height: 630, alt: 'Shokher Baxho Collection' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero_bangles.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shokher Baxho',
    url: 'https://shokherbaxho.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://shokherbaxho.com/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html 
      lang={locale} 
      className={`${notoSerifBengali.variable} ${hindSiliguri.variable} ${cormorantGaramond.variable} ${outfit.variable}`}
    >
      <body>
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LayoutWrapper 
          navbar={<Navbar locale={locale} />}
          footer={<Footer locale={locale} />}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
