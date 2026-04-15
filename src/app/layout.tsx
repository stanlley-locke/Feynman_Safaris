import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/index.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Feynman Safaris | Adventure. Connect. Entertain.",
  description: "Experience the African wilderness through the lens of curiosity and discovery. Premium safaris inspired by the spirit of Richard Feynman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-body`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
