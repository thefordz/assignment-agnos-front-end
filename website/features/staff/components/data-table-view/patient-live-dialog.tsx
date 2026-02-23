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
      <PatientForm key={patient.id} initialValues={patient.values} readOnly />
    </DialogWrapper>

    // <Dialog open={open} onOpenChange={onOpenChange}>
    //   <DialogContent className="max-w-3xl w-full">
    //     <DialogHeader>
    //       <DialogTitle>
    //         Live Patient — {patient.values.firstName} {patient.values.lastName}
    //       </DialogTitle>
    //     </DialogHeader>
    //
    //     <PatientForm key={patient.id} initialValues={patient.values} readOnly />
    //   </DialogContent>
    // </Dialog>
  );
}
