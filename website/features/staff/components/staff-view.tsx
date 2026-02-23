"use state";
import { DataView, LivePatient } from "@/lib/types";
import TwoPanelView from "./panel-view/two-panel-view";
import { DataTableView } from "./data-table-view/data-table";
import { columns } from "./data-table-view/columns";
import { PatientLiveDialog } from "./data-table-view/patient-live-dialog";

interface StaffViewProps {
  view: DataView;
  patients: LivePatient[];
  selectedPatient: LivePatient | null;
  setSelectedPatient: (patient: LivePatient | null) => void;
}

export function StaffView({
  view,
  patients,
  selectedPatient,
  setSelectedPatient,
}: StaffViewProps) {
  return (
    <div>
      {view === "two-panel-view" ? (
        <TwoPanelView patients={patients} />
      ) : (
        <>
          <DataTableView
            columns={columns(setSelectedPatient)}
            data={patients}
          />
          <PatientLiveDialog
            open={!!selectedPatient}
            patient={selectedPatient}
            onOpenChange={(open) => {
              if (!open) setSelectedPatient(null);
            }}
          />
        </>
      )}
    </div>
  );
}
