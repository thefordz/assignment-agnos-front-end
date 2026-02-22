import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/features/shared/components/header/main-header";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Care",
  description: "Realtime patient form connect with staff monitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.className} antialiased`}>
        <MainHeader />
        <div className="p-3">{children}</div>
      </body>
    </html>
  );
}
