import { PatientFormValues } from "@/features/patient/lib/validation";
import { PatientStatus } from "@/lib/types";

export type Role = "patient" | "staff";

export interface ServerToClientEvents {
  text: () => void;
  "patient:created": (data: PatientOpenFormPayload) => void;
  "patient:closed": (data: PatientCloseFormPayload) => void;
  "patient:updated": (data: PatientUpdateFormPayload) => void;
  "patient:submitted": (data: PatientSubmitFormPayload) => void;
}

export interface ClientToServerEvents {
  "join-role": (data: JoinRolePlayload) => void;
  "patient:open": (data: PatientOpenFormPayload) => void;
  "patient:close": (data: PatientCloseFormPayload) => void;
  "patient:update": (data: PatientUpdateFormPayload) => void;
  "patient:submit": (data: PatientSubmitFormPayload) => void;
}
export interface JoinRolePlayload {
  role: Role;
  id: string;
}

export interface PatientOpenFormPayload {
  id: string;
  name: string;
  status: PatientStatus;

  createdAt: number;
  lastUpdated: number;

  values?: PatientFormValues;
}

export interface PatientCloseFormPayload {
  id: string;
  lastActivityAt: number;
  status: PatientStatus;
}

export interface PatientUpdateFormPayload {
  id: string;
  status: PatientStatus;
  values: Partial<PatientFormValues>;
  lastUpdated: number;
}

export interface PatientSubmitFormPayload {
  id: string;
  status: PatientStatus;
  submittedAt?: number;
}
