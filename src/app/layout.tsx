import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/index.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Feynman Safaris | Adventure. Connect. Entertain.",
    template: "%s | Feynman Safaris"
  },
  description: "Experience the African wilderness through the lens of curiosity and discovery. Premium safaris inspired by the spirit of Richard Feynman.",
  keywords: ["safari", "Africa", "wildlife", "Maasai Mara", "Amboseli", "Serengeti", "luxury travel", "adventure", "conservation"],
  authors: [{ name: "Feynman Safaris" }],
  creator: "Feynman Safaris",
  publisher: "Feynman Safaris",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://feynmansafaris.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Feynman Safaris | Adventure. Connect. Entertain.",
    description: "Experience the African wilderness through the lens of curiosity and discovery. Premium safaris inspired by the spirit of Richard Feynman.",
    url: "https://feynmansafaris.com",
    siteName: "Feynman Safaris",
    images: [
      {
        url: "/assets/hero-safari.jpg",
        width: 1200,
        height: 630,
        alt: "Feynman Safaris - African Wildlife Adventure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feynman Safaris | Adventure. Connect. Entertain.",
    description: "Experience the African wilderness through the lens of curiosity and discovery. Premium safaris inspired by the spirit of Richard Feynman.",
    images: ["/assets/hero-safari.jpg"],
    creator: "@feynmansafaris",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    bing: "your-bing-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/image.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/assets/image.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Feynman Safaris",
              "url": "https://feynmansafaris.com",
              "logo": "https://feynmansafaris.com/assets/image.png",
              "description": "Premium safari experiences in Africa inspired by scientific curiosity and discovery.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Kenya"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-752-032-884",
                "contactType": "customer service",
                "email": "info@feynmansafaris.com"
              },
              "sameAs": [
                "https://www.instagram.com/feynmansafaris",
                "https://www.facebook.com/feynmansafaris",
                "https://www.youtube.com/feynmansafaris"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Safari Tours",
                "description": "Luxury wildlife safaris, private expeditions, and conservation-focused adventures"
              }
            })
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-body`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
