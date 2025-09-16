"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { useToggle } from "@/hooks/useToggle";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, setIsOpen } = useToggle();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } font-sans text-white grid ${
          isOpen
            ? "grid-cols-[254px_1fr]"
            : "grid-cols-[80px_1fr] max-sm:grid-cols-[56px_1fr]"
        }  h-screen bg-[var(--background)]`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col">
          <Topbar />
          {children}
        </div>
      </body>
    </html>
  );
}
