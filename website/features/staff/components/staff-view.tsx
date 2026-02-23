"use client";
import { DataView, LivePatient } from "@/lib/types";
import TwoPanelView from "./panel-view/two-panel-view";
import { DataTableView } from "./data-table-view/data-table";
import { columns } from "./data-table-view/columns";
import { PatientLiveDialog } from "./data-table-view/patient-live-dialog";
import React from "react";

interface StaffViewProps {
  view: DataView;
  patients: LivePatient[];
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
}

export function StaffView({
  view,
  patients,
  selectedPatientId,
  setSelectedPatientId,
}: StaffViewProps) {
  const selectedPatient = React.useMemo(
    () => patients.find((p) => p.id === selectedPatientId) ?? null,
    [patients, selectedPatientId],
  );

  const memoColumns = React.useMemo(
    () => columns((patient) => setSelectedPatientId(patient)),
    [setSelectedPatientId],
  );
  return (
    <div>
      {view === "two-panel-view" ? (
        <TwoPanelView patients={patients} />
      ) : (
        <>
          <DataTableView columns={memoColumns} data={patients} />
          <PatientLiveDialog
            open={!!selectedPatientId}
            patient={selectedPatient}
            onOpenChange={(open) => {
              if (!open) setSelectedPatientId(null);
            }}
          />
        </>
      )}
    </div>
  );
}
