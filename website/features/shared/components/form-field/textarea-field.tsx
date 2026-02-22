import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
  required,
  rows = 4,
}: TextareaFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>

          <Textarea
            {...field}
            id={field.name}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className="bg-background"
          />

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
