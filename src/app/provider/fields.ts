export type ProviderField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
  /** Master table for dropdown lookups. */
  lookup?: string;
};

export const providerFields: ProviderField[] = [
  { name: "hospcode", label: "Hospcode", width: "short" },
  { name: "provider", label: "Provider No.", width: "medium" },
  { name: "registerno", label: "Register No.", width: "medium" },
  { name: "council", label: "Council", width: "short", lookup: "c_council" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "prename", label: "Prename", width: "short", lookup: "c_prename" },
  { name: "name", label: "First name", width: "medium" },
  { name: "lname", label: "Last name", width: "medium" },
  { name: "sex", label: "Sex", width: "short", lookup: "c_sex" },
  { name: "birth", label: "Birth date", width: "medium" },
  {
    name: "providertype",
    label: "Provider type",
    width: "medium",
    lookup: "c_providertype",
  },
  { name: "startdate", label: "Start date", width: "medium" },
  { name: "outdate", label: "Out date", width: "medium" },
  { name: "movefrom", label: "Move from", width: "medium" },
  { name: "moveto", label: "Move to", width: "medium" },
  { name: "d_update", label: "D update", width: "medium" },
];

export const listColumns = [
  "id",
  "provider",
  "cid",
  "prename",
  "name",
  "lname",
  "sex",
  "council",
  "providertype",
  "startdate",
  "updated_at",
] as const;
