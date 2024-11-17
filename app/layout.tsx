import type { Metadata } from "next";
import StyleProvider from "@/providers/StyleProvider";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Competitive Sudoku - Daily Challenges',
  description: 'Challenge your Sudoku skills with daily puzzles and rankings.',
  openGraph: {
    title: 'Competitive Sudoku',
    description: 'Join daily challenges and track your scores!',
    url: 'https://yourdomain.com',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <StyleProvider>
        {children}
      </StyleProvider>
      </body>
    </html>
  );
}
