"use client";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { DialogWrapper } from "../dialog-wrapper";
import { PatientForm } from "@/features/patient/components/patient-form";
import { FilePlus } from "lucide-react";

import { PatientFormValues } from "@/features/patient/lib/validation";
import Link from "next/link";
import { useIDSession } from "../providers/id-session-provider";
import { getSocket } from "@/lib/socket";

export function MainHeader() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<PatientFormValues>>({});

  const [isSubmitted, setIsSubmiited] = useState(false);

  const { id } = useIDSession();

  function handleDialogChange(next: boolean) {
    if (!next) {
      if (!isSubmitted) {
        const socket = getSocket();
        socket.emit("patient:close", {
          id,
          status: "inactive",
          lastActivityAt: Date.now(),
        });
      }
    }

    setOpen(next);
  }

  return (
    <>
      <header className="h-16 w-full border-b sticky top-0 z-50 bg-background">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-3">
          <Logo />
          <div className="flex items-center gap-3">
            <Button onClick={() => setOpen(true)} variant={"secondary"}>
              <FilePlus />
              Register Now
            </Button>
            <Button asChild variant={"outline"}>
              <Link href={"/staff"}>Staff Monitor</Link>
            </Button>
          </div>
        </div>
      </header>

      <DialogWrapper
        open={open}
        onOpenChange={handleDialogChange}
        title="Patient Form"
        description="Please fill in the patient information below."
      >
        <PatientForm
          initialValues={draft}
          onChangeDraft={setDraft}
          readOnly={isSubmitted}
          onSubmit={() => {
            setIsSubmiited(true);
            setOpen(false);
          }}
        />
      </DialogWrapper>
    </>
  );
}
