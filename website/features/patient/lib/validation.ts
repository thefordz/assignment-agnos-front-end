import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const genderEnum = ["MALE", "FEMALE", "OTHER"] as const;
export const religionEnum = [
  "BUDDHISM",
  "ISLAM",
  "CHRISTIANITY",
  "HINDUISM",
  "SIKHISM",
  "OTHER",
  "PREFER_NOT_TO_SAY",
] as const;

export const patientFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.date({ error: "Date of Birth is required" }),
  gender: z.enum(genderEnum, { error: "Gender is required" }),
  phoneNumber: z
    .string({ error: " Phone number is required" })
    .min(1, "Phone number is required")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid phone number",
    }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  nationality: z.string().length(2, "Invalid country code"),
  emergencyContact: z
    .object({
      name: z.string().optional(),
      relationship: z.string().optional(),
      phone: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const hasAnyValue = data.name || data.relationship || data.phone;

      if (!hasAnyValue) return;
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "Contact name is required",
        });
      }

      if (!data.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Phone number is required",
        });
      } else if (!isValidPhoneNumber(data.phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Invalid phone number",
        });
      }
    })
    .optional(),
  religion: z.enum(religionEnum).optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
