export type PersonField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
};

export const personFields: PersonField[] = [
  { name: "hospcode", label: "Hospcode", width: "short" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "pid", label: "PID", width: "medium" },
  { name: "hid", label: "HID", width: "medium" },
  { name: "prename", label: "Prename", width: "short" },
  { name: "name", label: "First name", width: "medium" },
  { name: "lname", label: "Last name", width: "medium" },
  { name: "hn", label: "HN", width: "medium" },
  { name: "sex", label: "Sex", width: "short" },
  { name: "birth", label: "Birth date", width: "medium" },
  { name: "mstatus", label: "Marital status", width: "short" },
  { name: "occupation_old", label: "Occupation old", width: "short" },
  { name: "occupation_new", label: "Occupation new", width: "short" },
  { name: "race", label: "Race", width: "short" },
  { name: "nation", label: "Nation", width: "short" },
  { name: "religion", label: "Religion", width: "short" },
  { name: "education", label: "Education", width: "short" },
  { name: "fstatus", label: "F status", width: "short" },
  { name: "father", label: "Father CID", width: "medium" },
  { name: "mother", label: "Mother CID", width: "medium" },
  { name: "couple", label: "Couple CID", width: "medium" },
  { name: "vstatus", label: "V status", width: "short" },
  { name: "movein", label: "Move in", width: "medium" },
  { name: "discharge", label: "Discharge", width: "short" },
  { name: "ddischarge", label: "Discharge date", width: "medium" },
  { name: "abogroup", label: "ABO", width: "short" },
  { name: "rhgroup", label: "RH", width: "short" },
  { name: "labor", label: "Labor", width: "short" },
  { name: "passport", label: "Passport", width: "medium" },
  { name: "typearea", label: "Type area", width: "short" },
  { name: "d_update", label: "D update", width: "medium" },
  { name: "telephone", label: "Telephone", width: "medium" },
  { name: "mobile", label: "Mobile", width: "medium" },
  { name: "created_by", label: "Created by", width: "medium" },
  { name: "updated_by", label: "Updated by", width: "medium" },
];

export const listColumns = [
  "id",
  "cid",
  "pid",
  "hn",
  "name",
  "lname",
  "sex",
  "birth",
  "mobile",
  "updated_at",
] as const;
