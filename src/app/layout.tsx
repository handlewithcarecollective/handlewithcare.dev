import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handle with Care Collective",
  description: "A worker-owned product development cooperative.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
