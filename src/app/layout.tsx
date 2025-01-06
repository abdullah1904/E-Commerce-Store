import type { Metadata } from "next";
import "./globals.css";
import { Inter} from "next/font/google"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "E-Commerce Store for Online Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`bg-background min-h-screen font-sans antialiased`, inter.variable)}
      >
        {children}
      </body>
    </html>
  );
}
