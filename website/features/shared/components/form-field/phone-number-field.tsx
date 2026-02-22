import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CountryCode, E164Number } from "libphonenumber-js/core";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

interface PhoneNumberFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  defaultCountry?: CountryCode;
}

const PhoneShadcnInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props, ref) => {
  return <Input ref={ref} {...props} className="bg-background" />;
});
PhoneShadcnInput.displayName = "PhoneShadcnInput";

export function PhoneNumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Enter phone number",
  description,
  disabled,
  required,
  defaultCountry = "TH",
}: PhoneNumberFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>

          <PhoneInput
            placeholder={placeholder}
            disabled={disabled}
            defaultCountry={defaultCountry}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            international
            className=" pl-2"
            inputComponent={PhoneShadcnInput}
          />

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
