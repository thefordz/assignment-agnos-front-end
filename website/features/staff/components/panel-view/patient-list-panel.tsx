"use client";

import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils";
import { PatientStatusBadge } from "../patient-status-badge";
import { LivePatient } from "@/lib/types";

type Props = {
  patients: LivePatient[];
  selectedId: string | null;
  onSelectAction: (id: string) => void;
};

export function PatientListPanel({
  patients,
  selectedId,
  onSelectAction: onSelect,
}: Props) {
  return (
    <div className="h-full">
      <div className="px-3 pb-3 pt-2">
        <div className="text-sm font-medium">Patients</div>
        <div className="text-xs text-muted-foreground">
          Live monitoring overview
        </div>
      </div>

      <div className="space-y-2 px-2 pb-2">
        {patients.map((p) => {
          const active = p.id === selectedId;
          const hasName = p.values?.firstName || p.values?.lastName;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition",
                "hover:bg-muted/40",
                active && "border-primary bg-muted/40 ring-1 ring-primary/20",
              )}
            >
              <div className="flex sm:flex-col items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {hasName ? (
                      <span>
                        {p.values?.firstName} {p.values?.lastName}
                      </span>
                    ) : (
                      <span>{p.name}</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {p.id}
                  </div>
                </div>

                <PatientStatusBadge status={p.status} />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Last: {formatTimeAgo(p.lastUpdated)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
