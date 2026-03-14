import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Slim | Full-Stack Developer | Quebec City",
  description:
    "CS student at Université Laval building full-stack applications with React, Next.js, TypeScript, and Three.js. Creator of Makteb, a learning platform for North Africa. Open to internships.",
  openGraph: {
    title: "Mohamed Slim | Full-Stack Developer",
    description:
      "CS student at Université Laval building full-stack applications with React, TypeScript, and Three.js. Creator of Makteb.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
