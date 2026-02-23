import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface PatientSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function PatientListSheet({
  open,
  onOpenChange,
  children,
}: PatientSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[80vw] sm:w-105 p-0">
        <SheetHeader className=" border-b h-16 bg-red-400 sr-only">
          <SheetTitle>Patients List</SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
        </SheetHeader>

        <div className="p-2 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
