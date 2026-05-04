import {
  ClipboardList,
  HeartPulse,
  Stethoscope,
  Syringe,
  UserRound,
} from "lucide-react";

export const navigationItems = [
  {
    href: "/person",
    label: "ทะเบียนบุคคล",
    shortLabel: "บุคคล",
    icon: UserRound,
  },
  {
    href: "/visit",
    label: "ทะเบียนการรับบริการ",
    shortLabel: "รับบริการ",
    icon: ClipboardList,
  },
  {
    href: "/chronic",
    label: "ทะเบียนผู้ป่วยโรคเรื้อรัง",
    shortLabel: "โรคเรื้อรัง",
    icon: HeartPulse,
  },
  {
    href: "/epi",
    label: "ทะเบียน EPI",
    shortLabel: "EPI",
    icon: Syringe,
  },
  {
    href: "/provider",
    label: "ทะเบียนผู้ให้บริการ",
    shortLabel: "ผู้ให้บริการ",
    icon: Stethoscope,
  },
];
