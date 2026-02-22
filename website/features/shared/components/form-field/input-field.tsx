import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type,
  disabled,
  required,
}: InputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={type}
            className="bg-background"
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
