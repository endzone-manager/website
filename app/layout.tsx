import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PostHogProvider, PostHogPageView } from "@/components/PostHogProvider";
import { Suspense } from "react";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Redzone Boss - The Gridiron Strategy Simulator",
  description: "Redzone Boss is a deep-dive American Football management simulation built for the modern strategist. Join the Front Office and experience real-time play calling and franchise management",
  verification: {
    google: "5uw1hL7d3BfsjE7ev_iSDfVbv9k9ZxHiB8NZynsWY14",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>
              <PostHogPageView />
            </Suspense>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
