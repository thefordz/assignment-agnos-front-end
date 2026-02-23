"use client";
import { StaffHeader } from "@/features/staff/components/staff-header";
import { StaffView } from "@/features/staff/components/staff-view";
import { mockPatients } from "@/lib/dummy-data";
import { LivePatient } from "@/lib/types";
import { useState } from "react";

export default function StaffPage() {
  const [view, setView] = useState<"data-table-view" | "two-panel-view">(
    "two-panel-view",
  );
  const [patients] = useState<LivePatient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<LivePatient | null>(
    null,
  );

  return (
    <div>
      <StaffHeader view={view} setView={setView} />
      <StaffView
        view={view}
        patients={patients}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
    </div>
  );
}
