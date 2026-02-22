import { PatientFormValues } from "@/features/patient/lib/validation";

export const initialValues: PatientFormValues = {
  firstName: "FirstName",
  middleName: "",
  lastName: "LastName",
  dateOfBirth: new Date(),
  phoneNumber: "+66123456789",
  gender: "MALE",
  email: "main@gmail.com",
  address: "Test",
  preferredLanguage: "TH",
  nationality: "TH",
  religion: "PREFER_NOT_TO_SAY",
  emergencyContact: {
    name: "Name",
    relationship: "Wife",
    phone: "+66123456789",
  },
};
