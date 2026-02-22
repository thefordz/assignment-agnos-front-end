"use client";

import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";
import { PhoneNumberField } from "./phone-number-field";
import { InputField } from "./input-field";
import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmergencyContactFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  disabled?: boolean;
}

export function EmergencyContactField<T extends FieldValues>({
  control,
  name,
  disabled,
}: EmergencyContactFieldProps<T>) {
  const [open, setOpen] = React.useState(false);

  const values = useWatch({
    control,
    name,
  });
  React.useEffect(() => {
    if (values?.name || values?.relationship || values?.phone) {
      setOpen(true);
    }
  }, [values]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="bg-secondary overflow-hidden rounded-xl"
    >
      <div className="rounded-xl border p-6 ">
        <div className="flex items-center justify-between">
          <CardHeader className="w-full px-0">
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>
              A person we can contact for the patient in case of emergency.
            </CardDescription>
          </CardHeader>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  open && "rotate-180",
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className=" mt-6 grid gap-4 md:grid-cols-2 ">
          <InputField
            control={control}
            name={`${name}.name` as FieldPath<T>}
            label="Name"
            placeholder="Enter contact name"
            disabled={disabled}
          />

          <InputField
            control={control}
            name={`${name}.relationship` as FieldPath<T>}
            label="Relationship"
            placeholder="Enter relationship"
            disabled={disabled}
          />

          <PhoneNumberField
            control={control}
            name={`${name}.phone` as FieldPath<T>}
            label="Emergency Phone"
            placeholder="Enter phone number"
            disabled={disabled}
          />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
