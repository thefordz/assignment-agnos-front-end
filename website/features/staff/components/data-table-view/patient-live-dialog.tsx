"use client";

import { PatientForm } from "@/features/patient/components/patient-form";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { LivePatient } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: LivePatient | null;
}

export function PatientLiveDialog({ open, onOpenChange, patient }: Props) {
  if (!patient) return null;

  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Patient Form"
      description="Please fill in the patient information below."
    >
      <PatientForm initialValues={patient.values} readOnly />
    </DialogWrapper>
  );
}
