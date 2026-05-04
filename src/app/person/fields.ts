export type PersonField = {
  name: string;
  label: string;
  width?: "short" | "medium" | "long";
  /** Master table to fetch options from. Format: c_<table>. Picked via <select>. */
  lookup?: string;
};

export const personFields: PersonField[] = [
  { name: "hospcode", label: "รหัสหน่วยบริการ", width: "short" },
  { name: "cid", label: "CID", width: "medium" },
  { name: "pid", label: "PID", width: "medium" },
  { name: "hid", label: "HID", width: "medium" },
  { name: "prename", label: "คำนำหน้า", width: "short", lookup: "c_prename" },
  { name: "name", label: "ชื่อ", width: "medium" },
  { name: "lname", label: "นามสกุล", width: "medium" },
  { name: "hn", label: "HN", width: "medium" },
  { name: "sex", label: "เพศ", width: "short", lookup: "c_sex" },
  { name: "birth", label: "วันเกิด", width: "medium" },
  { name: "mstatus", label: "สถานภาพสมรส", width: "short", lookup: "c_mstatus" },
  { name: "occupation_old", label: "อาชีพเดิม", width: "short", lookup: "c_occupation" },
  { name: "occupation_new", label: "อาชีพปัจจุบัน", width: "short", lookup: "c_occupation" },
  { name: "race", label: "เชื้อชาติ", width: "short", lookup: "c_race" },
  { name: "nation", label: "สัญชาติ", width: "short", lookup: "c_nation" },
  { name: "religion", label: "ศาสนา", width: "short", lookup: "c_religion" },
  { name: "education", label: "การศึกษา", width: "short", lookup: "c_education" },
  { name: "fstatus", label: "สถานะครอบครัว", width: "short", lookup: "c_fstatus" },
  { name: "father", label: "CID บิดา", width: "medium" },
  { name: "mother", label: "CID มารดา", width: "medium" },
  { name: "couple", label: "CID คู่สมรส", width: "medium" },
  { name: "vstatus", label: "สถานะในชุมชน", width: "short", lookup: "c_vstatus" },
  { name: "movein", label: "วันที่ย้ายเข้า", width: "medium" },
  { name: "discharge", label: "สถานะจำหน่าย", width: "short", lookup: "c_discharge" },
  { name: "ddischarge", label: "วันที่จำหน่าย", width: "medium" },
  { name: "abogroup", label: "ABO", width: "short", lookup: "c_abogroup" },
  { name: "rhgroup", label: "RH", width: "short", lookup: "c_rhgroup" },
  { name: "labor", label: "สถานะแรงงาน", width: "short", lookup: "c_labor" },
  { name: "passport", label: "หนังสือเดินทาง", width: "medium" },
  { name: "typearea", label: "ประเภทพื้นที่", width: "short", lookup: "c_typearea" },
  { name: "d_update", label: "วันที่ปรับปรุง", width: "medium" },
  { name: "telephone", label: "โทรศัพท์", width: "medium" },
  { name: "mobile", label: "มือถือ", width: "medium" },
  { name: "created_by", label: "สร้างโดย", width: "medium" },
  { name: "updated_by", label: "แก้ไขโดย", width: "medium" },
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
