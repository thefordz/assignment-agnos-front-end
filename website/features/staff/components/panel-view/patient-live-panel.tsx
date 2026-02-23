"use client";

import { formatTimeAgo } from "@/lib/utils";
import { PatientForm } from "@/features/patient/components/patient-form";
import { PatientStatusBadge } from "../patient-status-badge";
import { LivePatient } from "@/lib/types";

interface PatientLivePanelProps {
  patient: LivePatient | null;
}

export function PatientLivePanel({ patient }: PatientLivePanelProps) {
  const hasName = patient?.values?.firstName || patient?.values?.lastName;

  if (!patient) {
    return (
      <div className="h-full rounded-xl border bg-muted/20 p-6 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium">Select a patient</div>
          <div className="text-xs text-muted-foreground">
            Choose a patient from the list to view live form data.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl border bg-background  overflow-y-auto no-scrollbar ">
      <div className="border-b p-4 flex items-start justify-between gap-4 sticky top-0 bg-background z-10">
        <div className="min-w-0">
          <div className="font-semibold truncate">
            {hasName ? (
              <span>
                {patient.values?.firstName} {patient.values?.lastName}
              </span>
            ) : (
              <span>{patient.name}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            ID: {patient.id} • Last update: {formatTimeAgo(patient.lastUpdated)}
          </div>
        </div>

        <PatientStatusBadge status={patient.status} />
      </div>

      <div className="p-4  w-full h-full  ">
        <PatientForm
          initialValues={patient.values}
          readOnly
          className="w-full pb-0 md:pb-4 mx-0  px-0 "
        />
      </div>
    </div>
  );
}
