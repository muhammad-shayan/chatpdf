import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import "simplebar-react/dist/simplebar.min.css";

import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "grainy font-sans antialiased min-h-screen",
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
