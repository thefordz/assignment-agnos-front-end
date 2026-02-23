"use client";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { DialogWrapper } from "../dialog-wrapper";
import { PatientForm } from "@/features/patient/components/patient-form";
import { FilePlus } from "lucide-react";

import { PatientFormValues } from "@/features/patient/lib/validation";

export function MainHeader() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<PatientFormValues>>({});

  function handleDialogOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <>
      <header className="h-16 w-full border-b sticky top-0 z-50 bg-background">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-3">
          <Logo />
          <div>
            <Button onClick={handleDialogOpen} variant={"secondary"}>
              <FilePlus />
              Register Now
            </Button>
          </div>
        </div>
      </header>

      <DialogWrapper
        open={open}
        onOpenChange={handleDialogOpen}
        title="Patient Form"
        description="Please fill in the patient information below."
      >
        <PatientForm
          initialValues={draft}
          onChangeDraft={setDraft}
          onSubmit={() => {
            setOpen(false);
          }}
        />
      </DialogWrapper>
    </>
  );
}
