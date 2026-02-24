"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { patientFormSchema, PatientFormValues } from "../lib/validation";
import { Button } from "@/components/ui/button";
import { InputField } from "@/features/shared/components/form-field/input-field";
import { DatePickerField } from "@/features/shared/components/form-field/date-picker-field";
import { ChoiceField } from "@/features/shared/components/form-field/choice-field";
import { PhoneNumberField } from "@/features/shared/components/form-field/phone-number-field";
import { TextareaField } from "@/features/shared/components/form-field/textarea-field";
import { ComboBoxField } from "@/features/shared/components/form-field/combo-box-field";
import { nationalityOptions } from "@/lib/countries-data";
import { religionOptions } from "@/lib/religion-data";
import { EmergencyContactField } from "@/features/shared/components/form-field/emergency-contact-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { useIDSession } from "@/features/shared/components/providers/id-session-provider";
import { useDebounce } from "use-debounce";

interface PatientFormProps {
  initialValues?: Partial<PatientFormValues>;
  readOnly?: boolean;
  className?: string;
  scroll?: boolean;
  onChangeDraft?: (values: Partial<PatientFormValues>) => void;
  onSubmit?: () => void;
}

export function PatientForm({
  initialValues,
  readOnly = false,
  className = "no-scrollbar  max-h-[50vh] overflow-y-auto overscroll-contain ",
  onChangeDraft,
  onSubmit,
}: PatientFormProps) {
  const { id } = useIDSession();

  const defaultValues = {
    firstName: initialValues?.firstName ?? "",
    middleName: initialValues?.middleName ?? "",
    lastName: initialValues?.lastName ?? "",
    dateOfBirth: initialValues?.dateOfBirth ?? undefined,
    gender: initialValues?.gender ?? undefined,
    phoneNumber: initialValues?.phoneNumber ?? "",
    email: initialValues?.email ?? "",
    address: initialValues?.address ?? "",
    preferredLanguage: initialValues?.preferredLanguage ?? "EN",
    nationality: initialValues?.nationality ?? "",
    emergencyContact: initialValues?.emergencyContact ?? {
      name: initialValues?.emergencyContact?.name ?? "",
      relationship: initialValues?.emergencyContact?.relationship ?? "",
      phone: initialValues?.emergencyContact?.phone ?? "",
    },
    religion: initialValues?.religion ?? "PREFER_NOT_TO_SAY",
  };

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedValues = useWatch({
    control: form.control,
  });
  const [debouncedValues] = useDebounce(watchedValues, 250);

  useEffect(() => {
    if (!readOnly) return;
    if (!initialValues) return;

    form.reset(defaultValues);
  }, [initialValues, form, readOnly]);

  //update status when open & close
  useEffect(() => {
    if (readOnly) return;
    if (!debouncedValues) return;

    const socket = getSocket();

    socket.emit("patient:open", {
      id,
      name: "New Patient",
      status: "active",
      createdAt: Date.now(),
      lastUpdated: Date.now(),
    });
  }, [id, readOnly]);

  //update values and save data as draft
  useEffect(() => {
    if (readOnly) return;

    onChangeDraft?.(debouncedValues);
    const socket = getSocket();

    socket.emit("patient:update", {
      id,
      status: "active",
      values: debouncedValues,
      lastUpdated: Date.now(),
    });
  }, [id, readOnly, debouncedValues]);

  function handleClose() {
    const socket = getSocket();

    socket.emit("patient:close", {
      id,
      status: "inactive",
      lastActivityAt: Date.now(),
    });
  }

  async function handleSubmit() {
    const socket = getSocket();

    socket.emit("patient:submit", {
      id,
      status: "submitted",
    });
    onSubmit?.();
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <form id="patient-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className={cn("px-4 space-y-6 -mx-4 h-full", className)}>
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the patient.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                control={form.control}
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
                required
                disabled={readOnly}
              />
              <InputField
                control={form.control}
                name="middleName"
                label="Middle name"
                placeholder="Enter your middle name"
                disabled={readOnly}
              />
              <InputField
                control={form.control}
                name="lastName"
                label="Last name"
                placeholder="Enter your last name"
                required
                disabled={readOnly}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ChoiceField
                control={form.control}
                name="gender"
                label="Gender"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
                disabled={readOnly}
              />
              <DatePickerField
                control={form.control}
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="Select date of birth"
                required
                disabled={readOnly}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ComboBoxField
                control={form.control}
                name="nationality"
                label="Nationality"
                options={nationalityOptions}
                placeholder="Select your nationality"
                noOption="Not found nationality"
                disabled={readOnly}
              />
              <ComboBoxField
                control={form.control}
                name="religion"
                label="Religion"
                disabled={readOnly}
                options={religionOptions}
                placeholder="Select your religion"
                noOption="Not found nationality"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Patient&apos;s contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <PhoneNumberField
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                required
                disabled={readOnly}
              />

              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={readOnly}
              />
            </div>
            <TextareaField
              control={form.control}
              name="address"
              rows={4}
              label="Address"
              placeholder="Enter your address"
              required
              disabled={readOnly}
            />
            <ChoiceField
              control={form.control}
              name="preferredLanguage"
              label="preferredLanguage"
              disabled={readOnly}
              options={[
                { value: "EN", label: "English" },
                { value: "TH", label: "Thai" },
              ]}
            />
          </CardContent>
        </Card>

        <EmergencyContactField
          control={form.control}
          name="emergencyContact"
          disabled={readOnly}
        />
      </div>
      {readOnly ? null : (
        <DialogFooter className="pt-6">
          <div className="w-full flex justify-between">
            <DialogClose asChild onClick={handleClose}>
              <Button variant={"ghost"}>Close</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </DialogFooter>
      )}
    </form>
  );
}
