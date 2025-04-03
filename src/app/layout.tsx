

// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto, Open_Sans, Lato } from "next/font/google";
import "./globals.css";

// Initialize fonts
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-opensans',
  display: 'swap',
});

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-lato',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${lato.variable}`}>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}