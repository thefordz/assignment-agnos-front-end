import type { Metadata } from "next";
import { MainHeader } from "@/features/shared/components/header/main-header";

export const metadata: Metadata = {
  title: "Patient | Health Care",
  description: "Realtime patient form connect with staff monitor",
};

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      <div className="px-3">{children}</div>
    </div>
  );
}
