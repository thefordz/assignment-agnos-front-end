"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatTimeAgo } from "@/lib/utils";
import { PatientStatusBadge } from "../patient-status-badge";
import { LivePatient } from "@/lib/types";
import { ArrowUpDown } from "lucide-react";

export const columns = (
  onOpen: (patient: LivePatient) => void,
): ColumnDef<LivePatient>[] => [
  {
    id: "action",
    header: "Live View",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button
          size="sm"
          variant="outline"
          className="text-xs hover:bg-muted"
          onClick={() => onOpen(row.original)}
        >
          View Live
        </Button>
      );
    },
  },

  {
    accessorKey: "name",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{patient.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <PatientStatusBadge status={status} />;
    },
  },

  {
    accessorKey: "lastUpdated",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Activity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {formatTimeAgo(row.original.lastUpdated)}
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {formatTimeAgo(row.original.createdAt)}
      </div>
    ),
  },
];
