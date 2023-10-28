import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quill - Chat with your pdf",
  description: "Upload pdf and start asking questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grainy font-sans antialiased min-h-screen",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
