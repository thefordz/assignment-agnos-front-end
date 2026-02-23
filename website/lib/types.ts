import { PatientFormValues } from "@/features/patient/lib/validation";

export type DataView = "data-table-view" | "two-panel-view";

export type PatientStatus = "active" | "submitted" | "inactive";

export interface LivePatient {
  id: string;
  name: string;
  status: PatientStatus;

  createdAt: number;
  lastActivityAt?: number;
  submittedAt?: number;
  lastUpdated: number;

  editingField?: string;

  values: PatientFormValues;
}
