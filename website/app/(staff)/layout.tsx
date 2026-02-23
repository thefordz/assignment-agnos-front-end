import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff | Health Care",
  description: "Realtime monitoring patient information",
};

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
