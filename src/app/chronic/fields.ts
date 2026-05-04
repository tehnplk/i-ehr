export type ChronicField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
  /** Master table for dropdown lookups. */
  lookup?: string;
};

export const chronicFields: ChronicField[] = [
  {
    name: "hospcode",
    label: "รหัสหน่วยบริการ",
    width: "short",
    lookup: "c_hospcode",
  },
  { name: "pid", label: "PID", width: "short" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "date_diag", label: "วันที่วินิจฉัย", width: "medium" },
  {
    name: "chronic",
    label: "รหัสโรคเรื้อรัง",
    width: "medium",
    lookup: "c_chronic",
  },
  {
    name: "hosp_dx",
    label: "หน่วยบริการที่วินิจฉัยครั้งแรก",
    width: "medium",
    lookup: "c_hospcode",
  },
  {
    name: "hosp_rx",
    label: "หน่วยบริการที่รับบริการประจำ",
    width: "medium",
    lookup: "c_hospcode",
  },
  { name: "date_disch", label: "วันที่จำหน่าย", width: "medium" },
  {
    name: "typedisch",
    label: "ประเภทจำหน่าย",
    width: "short",
    lookup: "c_chronic_typedisch",
  },
  { name: "d_update", label: "วันที่ปรับปรุง", width: "medium" },
];

export const listColumns = [
  "id",
  "hospcode",
  "pid",
  "cid",
  "date_diag",
  "chronic",
  "hosp_dx",
  "hosp_rx",
  "date_disch",
  "typedisch",
  "d_update",
] as const;
