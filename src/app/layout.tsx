import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const typewriter = localFont({
  src: [
    {
      path: "./fonts/GT-Alpina-Typewriter/GT-Alpina-Typewriter-Thin.woff2",
    },
  ],
  variable: "--font-typewriter",
});

const fthabit = localFont({
  src: [
    {
      path: "./fonts/FTHabit/FTHabit-Regular.woff2",
    },
    {
      path: "./fonts/FTHabit/FTHabit-RegularItalic.woff2",
      style: "italic",
    },
    {
      path: "./fonts/FTHabit/FTHabit-Medium.woff2",
      weight: "700",
    },
    {
      path: "./fonts/FTHabit/FTHabit-MediumItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-fthabit",
});

export const metadata: Metadata = {
  title: "Handle with Care Collective",
  description: "A worker-owned product development cooperative.",
  // alternates: {
  //   types: {
  //     "application/atom+xml": [
  //       {
  //         url: "https://handlewithcare.dev/blog/recent.atom",
  //         title: "Handle with Care Collective Blog",
  //       },
  //     ],
  //   },
  // },
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://handlewithcare.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${typewriter.variable} ${fthabit.variable} h-full`}
    >
      <body
        suppressHydrationWarning
        className={`font-body text-brown bg-canvas h-full antialiased`}
      >
        {children}
        <Script src="/tracking.js"></Script>
      </body>
    </html>
  );
}
