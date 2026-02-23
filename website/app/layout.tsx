import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { IDSessionProvider } from "@/features/shared/components/providers/id-session-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolageGrotesque.className} antialiased`}>
        <IDSessionProvider>
          <div className="px-3">{children}</div>
        </IDSessionProvider>
      </body>
    </html>
  );
}
