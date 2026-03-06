"use client";
import { Button } from "@/components/ui/button";
import { useIDSession } from "@/features/shared/components/providers/id-session-provider";
import { StaffHeader } from "@/features/staff/components/staff-header";
import { StaffView } from "@/features/staff/components/staff-view";
import { connectSocket } from "@/lib/socket";
import { LivePatient } from "@/lib/types";
import {
  PatientCloseFormPayload,
  PatientOpenFormPayload,
  PatientSubmitFormPayload,
  PatientUpdateFormPayload,
} from "@/types/socket";
import { Plug } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function StaffPage() {
  const { id } = useIDSession();
  const [isConnected, setIsConnected] = useState(false);
  const [patients, setPatients] = useState<LivePatient[]>([]);

  const [view, setView] = useState<"data-table-view" | "two-panel-view">(
    "two-panel-view",
  );
  console.log(patients);

  const [selectedPatientId, setSelectedPatientId] = React.useState<
    string | null
  >(null);

  function handleConnect() {
    const socket = connectSocket();

    socket.emit("join-role", {
      role: "staff",
      id,
    });
    setIsConnected(true);
  }

  function handleCreated(data: PatientOpenFormPayload) {
    setPatients((prev) => {
      const exists = prev.some((p) => p.id === data.id);

      const first = data.values?.firstName ?? "";
      const last = data.values?.lastName ?? "";

      if (exists) {
        return prev.map((p) =>
          p.id === data.id
            ? {
                ...p,
                status: "active",
                name: `${first} ${last}`.trim() || "Unnamed Patient",
                lastUpdated: Date.now(),
                lastActivityAt: Date.now(),
              }
            : p,
        );
      }

      return [
        ...prev,
        {
          ...data,
          status: "active",
        },
      ];
    });
  }
  function handleClosed(data: PatientCloseFormPayload) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === data.id
          ? {
              ...p,
              status: data.status || "inactive",
              lastActivityAt: data.lastActivityAt,
            }
          : p,
      ),
    );
  }

  function handleUpdated(data: PatientUpdateFormPayload) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === data.id
          ? {
              ...p,
              lastUpdated: data.lastUpdated,
              name: `${data.values.firstName} ${data.values.lastName}`,
              values: {
                ...p.values,
                ...data.values,
              },
            }
          : p,
      ),
    );
  }
  function handleSubmitted(data: PatientSubmitFormPayload) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === data.id
          ? {
              ...p,
              status: data.status || "submitted",
              submittedAt: data.submittedAt,
            }
          : p,
      ),
    );
  }

  useEffect(() => {
    if (!isConnected) return;

    const socket = connectSocket();
    socket.on("patient:created", handleCreated);
    socket.on("patient:closed", handleClosed);
    socket.on("patient:updated", handleUpdated);
    socket.on("patient:submitted", handleSubmitted);

    return () => {
      socket.off("patient:created");
      socket.off("patient:closed");
      socket.off("patient:updated");
      socket.off("patient:submitted");
    };
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Button onClick={handleConnect}>
          <Plug />
          Connect to staff monitor
        </Button>
      </div>
    );
  }

  function handleDelete(id: string) {
    setPatients(patients.filter((p) => p.id !== id));
  }

  return (
    <div>
      <StaffHeader view={view} setView={setView} />
      <StaffView
        view={view}
        patients={patients}
        selectedPatientId={selectedPatientId}
        setSelectedPatientId={setSelectedPatientId}
        onDeletePatient={handleDelete}
      />
    </div>
  );
}
