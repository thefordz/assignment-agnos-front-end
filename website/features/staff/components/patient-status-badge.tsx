"use client";

import { Badge } from "@/components/ui/badge";
import { PatientStatus } from "@/lib/types";

export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  if (status === "active")
    return (
      <Badge className="bg-green-100 text-green-700 border border-green-200">
        ● Actively filling
      </Badge>
    );

  if (status === "submitted")
    return (
      <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
        ✓ Submitted
      </Badge>
    );

  return (
    <Badge className="bg-gray-100 text-gray-600 border border-gray-200">
      ○ Inactive
    </Badge>
  );
}
