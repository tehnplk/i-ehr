export type PersonField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
  /** Master table to fetch options from. Format: c_<table>. Picked via <select>. */
  lookup?: string;
};

export const personFields: PersonField[] = [
  { name: "hospcode", label: "Hospcode", width: "short" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "pid", label: "PID", width: "medium" },
  { name: "hid", label: "HID", width: "medium" },
  { name: "prename", label: "Prename", width: "short", lookup: "c_prename" },
  { name: "name", label: "First name", width: "medium" },
  { name: "lname", label: "Last name", width: "medium" },
  { name: "hn", label: "HN", width: "medium" },
  { name: "sex", label: "Sex", width: "short", lookup: "c_sex" },
  { name: "birth", label: "Birth date", width: "medium" },
  { name: "mstatus", label: "Marital status", width: "short", lookup: "c_mstatus" },
  { name: "occupation_old", label: "Occupation old", width: "short", lookup: "c_occupation" },
  { name: "occupation_new", label: "Occupation new", width: "short", lookup: "c_occupation" },
  { name: "race", label: "Race", width: "short", lookup: "c_race" },
  { name: "nation", label: "Nation", width: "short", lookup: "c_nation" },
  { name: "religion", label: "Religion", width: "short", lookup: "c_religion" },
  { name: "education", label: "Education", width: "short", lookup: "c_education" },
  { name: "fstatus", label: "F status", width: "short", lookup: "c_fstatus" },
  { name: "father", label: "Father CID", width: "medium" },
  { name: "mother", label: "Mother CID", width: "medium" },
  { name: "couple", label: "Couple CID", width: "medium" },
  { name: "vstatus", label: "V status", width: "short", lookup: "c_vstatus" },
  { name: "movein", label: "Move in", width: "medium" },
  { name: "discharge", label: "Discharge", width: "short", lookup: "c_discharge" },
  { name: "ddischarge", label: "Discharge date", width: "medium" },
  { name: "abogroup", label: "ABO", width: "short", lookup: "c_abogroup" },
  { name: "rhgroup", label: "RH", width: "short", lookup: "c_rhgroup" },
  { name: "labor", label: "Labor", width: "short", lookup: "c_labor" },
  { name: "passport", label: "Passport", width: "medium" },
  { name: "typearea", label: "Type area", width: "short", lookup: "c_typearea" },
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
  "prename",
  "name",
  "lname",
  "sex",
  "birth",
  "mobile",
  "updated_at",
] as const;
