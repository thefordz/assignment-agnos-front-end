import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxContent,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

interface ComboBoxOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface ComboBoxFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options: ComboBoxOption[];
  description?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  noOption?: string;
}

export function ComboBoxField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select option",
  options,
  description,
  disabled,
  required,
  noOption = "Not found",
}: ComboBoxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected =
          options.find((option) => option.value === field.value) ?? null;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {label} {required && <span className="text-red-500">*</span>}
            </FieldLabel>
            <Combobox
              disabled={disabled}
              items={options}
              itemToStringLabel={(option: ComboBoxOption) => option.label}
              itemToStringValue={(option: ComboBoxOption) => option.value}
              value={selected}
              onValueChange={(option) => field.onChange(option?.value)}
            >
              <ComboboxInput
                placeholder={placeholder}
                disabled={disabled}
                className="bg-background"
              />
              <ComboboxContent>
                <ComboboxEmpty>{noOption}</ComboboxEmpty>
                <ComboboxList>
                  {(option: ComboBoxOption) => (
                    <ComboboxItem key={option.value} value={option}>
                      <Item size="sm" className="p-0">
                        <ItemContent>
                          <ItemTitle className="whitespace-nowrap">
                            {option.label}
                          </ItemTitle>
                          <ItemDescription>{option.subtitle}</ItemDescription>
                        </ItemContent>
                      </Item>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {description && <FieldDescription>{description}</FieldDescription>}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
