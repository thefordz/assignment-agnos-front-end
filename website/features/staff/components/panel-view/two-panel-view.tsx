"use client";

import { useState } from "react";
import { PatientListPanel } from "./patient-list-panel";
import { PatientLivePanel } from "./patient-live-panel";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientListSheet } from "./patient-list-sheet";
import { LivePatient } from "@/lib/types";

interface TwoPanelViewProps {
  patients: LivePatient[];
}

export default function TwoPanelView({ patients }: TwoPanelViewProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    patients[0]?.id ?? null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const selected = patients.find((p) => p.id === selectedPatientId) ?? null;

  function handleSelectPatient(id: string) {
    setSelectedPatientId(id);
    setSheetOpen(false);
  }

  function handleOpenPatientList() {
    setSheetOpen((prev) => !prev);
  }

  return (
    <>
      <div className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="text-xl font-semibold  flex justify-between items-center bg-background py-3 sticky top-16 z-50">
          <span>Panel View</span>
          <div className="md:hidden">
            <Button variant={"outline"} onClick={handleOpenPatientList}>
              <Users />
              Patient List
            </Button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-12 gap-4 h-[calc(100vh-64px-64px-28px-24px-24px-24px)]">
          <div className="rounded-xl border bg-background overflow-hidden md:col-span-4 overflow-y-auto  no-scrollbar ">
            <PatientListPanel
              patients={patients}
              selectedId={selectedPatientId}
              onSelectAction={setSelectedPatientId}
            />
          </div>

          <div className="md:col-span-8 h-full overflow-hidden">
            <PatientLivePanel patient={selected} />
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden ">
          <PatientLivePanel patient={selected} />
        </div>
      </div>

      {/* Mobile Patient List */}
      {sheetOpen && (
        <PatientListSheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <PatientListPanel
            patients={patients}
            selectedId={selectedPatientId}
            onSelectAction={handleSelectPatient}
          />
        </PatientListSheet>
      )}
    </>
  );
}
