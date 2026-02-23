import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataView } from "@/lib/types";
import { LayoutPanelLeft, Table } from "lucide-react";

interface StaffHeaderProps {
  view: DataView;
  setView: (value: DataView) => void;
}

export function StaffHeader({ view, setView }: StaffHeaderProps) {
  return (
    <div className="min-h-16 w-full border-b  bg-background flex items-center py-2">
      <div className="h-full w-full max-w-7xl mx-auto flex md:items-center items-start justify-between px-3  flex-col md:flex-row gap-2">
        <div>Live Patient Monitoring</div>
        <Tabs
          defaultValue="two-panel-view"
          value={view}
          onValueChange={(value) => setView(value as DataView)}
          className="w-full md:w-fit"
        >
          <TabsList className=" w-full">
            <TabsTrigger value="two-panel-view">
              <LayoutPanelLeft />
              Panel View
            </TabsTrigger>
            <TabsTrigger value="data-table-view">
              <Table />
              Table View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
