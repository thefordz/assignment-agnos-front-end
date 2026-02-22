import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface ChoiceOption {
  value: string;
  label: string;
}

interface ChoiceFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: ChoiceOption[];
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export function ChoiceField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  options,
  required,
}: ChoiceFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
            className="grid grid-cols-3 gap-2"
          >
            {options.map((option) => (
              <label
                key={option.value}
                className="border-input h-9 has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center justify-center gap-3 rounded-md border px-2 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 bg-background"
              >
                <RadioGroupItem
                  value={option.value}
                  className="sr-only after:absolute after:inset-0"
                  aria-label={`size-radio-${option.value}`}
                  disabled={disabled}
                />
                <p className="text-foreground text-sm leading-none font-medium ">
                  {option.label}
                </p>
              </label>
            ))}
          </RadioGroup>

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
