export type ProviderField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
  /** Master table for dropdown lookups. */
  lookup?: string;
};

export const providerFields: ProviderField[] = [
  { name: "hospcode", label: "รหัสหน่วยบริการ", width: "short" },
  { name: "provider", label: "รหัสผู้ให้บริการ", width: "medium" },
  { name: "registerno", label: "เลขทะเบียนวิชาชีพ", width: "medium" },
  { name: "council", label: "สภาวิชาชีพ", width: "short", lookup: "c_council" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "prename", label: "คำนำหน้า", width: "short", lookup: "c_prename" },
  { name: "name", label: "ชื่อ", width: "medium" },
  { name: "lname", label: "นามสกุล", width: "medium" },
  { name: "sex", label: "เพศ", width: "short", lookup: "c_sex" },
  { name: "birth", label: "วันเกิด", width: "medium" },
  {
    name: "providertype",
    label: "ประเภทผู้ให้บริการ",
    width: "medium",
    lookup: "c_providertype",
  },
  { name: "startdate", label: "วันที่เริ่มงาน", width: "medium" },
  { name: "outdate", label: "วันที่ออก", width: "medium" },
  { name: "movefrom", label: "ย้ายมาจาก", width: "medium" },
  { name: "moveto", label: "ย้ายไป", width: "medium" },
  { name: "d_update", label: "วันที่ปรับปรุง", width: "medium" },
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
