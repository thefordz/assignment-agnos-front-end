"use client";

import { useForm } from "react-hook-form";
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

interface PatientFormProps {
  initialValues?: PatientFormValues;
  readOnly?: boolean;
  onSubmit?: () => void;
}

export function PatientForm({
  initialValues,
  readOnly = false,
  onSubmit,
}: PatientFormProps) {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
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
        name: "",
        relationship: "",
        phone: "",
      },
      religion: initialValues?.religion ?? "PREFER_NOT_TO_SAY",
    },
    mode: "onChange",
  });

  async function handleSubmit(values: PatientFormValues) {
    console.log(JSON.stringify(values, null, 2));
    onSubmit?.();
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <form id="patient-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-6">
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
      <DialogFooter className="pt-6">
        <div className="w-full flex justify-between">
          <DialogClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Form"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
