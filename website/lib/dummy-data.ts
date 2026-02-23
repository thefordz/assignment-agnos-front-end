import { PatientFormValues } from "@/features/patient/lib/validation";
import { LivePatient } from "./types";

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
export const initialValues2: PatientFormValues = {
  firstName: "SecondName",
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
  emergencyContact: {},
};

export const initialValues3: PatientFormValues = {
  firstName: "ThirdName",
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

export const mockPatients: LivePatient[] = [
  {
    id: "1",
    name: "FirstName",
    status: "active",

    createdAt: Date.now() - 1000 * 60 * 5,
    lastActivityAt: Date.now() - 1000 * 10,
    lastUpdated: Date.now() - 1000 * 10,

    editingField: "email",

    values: initialValues,
  },
  {
    id: "2",
    name: "SecondName",
    status: "submitted",

    createdAt: Date.now() - 1000 * 60 * 30,
    submittedAt: Date.now() - 1000 * 60 * 5,
    lastUpdated: Date.now() - 1000 * 60 * 5,

    values: initialValues2,
  },
  {
    id: "3",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "4",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "5",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "6",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "7",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "8",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "9",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "10",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "11",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "12",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "13",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "14",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "15",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
  {
    id: "16",
    name: "ThirdName",
    status: "inactive",

    createdAt: Date.now() - 1000 * 60 * 60,
    lastActivityAt: Date.now() - 1000 * 60 * 20,
    lastUpdated: Date.now() - 1000 * 60 * 20,

    values: initialValues3,
  },
];
