import Link from "next/link";
import {
  Activity,
  ClipboardList,
  Database,
  HeartPulse,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function todayKeys() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return {
    iso: `${yyyy}-${mm}-${dd}`,
    compact: `${yyyy}${mm}${dd}`,
    label: new Intl.DateTimeFormat("th-TH", {
      dateStyle: "full",
    }).format(now),
  };
}

async function countByDateServ(table: string, iso: string, compact: string) {
  const row = await db(table)
    .whereIn("date_serv", [iso, compact])
    .count<{ count: string }[]>("id as count")
    .first();
  return Number(row?.count ?? 0);
}

async function countByDatetimeAdmit(table: string, iso: string) {
  const row = await db(table)
    .whereRaw("substring(datetime_admit, 1, 10) = ?", [iso])
    .count<{ count: string }[]>("id as count")
    .first();
  return Number(row?.count ?? 0);
}

async function distinctPatientsToday(iso: string, compact: string) {
  const row = await db("service")
    .whereIn("date_serv", [iso, compact])
    .countDistinct<{ count: string }[]>({ count: "pid" })
    .first();
  return Number(row?.count ?? 0);
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const { iso, compact, label } = todayKeys();

  const [
    serviceCount,
    diagOpdCount,
    diagIpdCount,
    drugOpdCount,
    drugIpdCount,
    patientsToday,
    totalPersons,
  ] = await Promise.all([
    safe(() => countByDateServ("service", iso, compact), 0),
    safe(() => countByDateServ("diagnosis_opd", iso, compact), 0),
    safe(() => countByDatetimeAdmit("diagnosis_ipd", iso), 0),
    safe(() => countByDateServ("drug_opd", iso, compact), 0),
    safe(() => countByDatetimeAdmit("drug_ipd", iso), 0),
    safe(() => distinctPatientsToday(iso, compact), 0),
    safe(async () => {
      const r = await db("person").count<{ count: string }[]>("id as count").first();
      return Number(r?.count ?? 0);
    }, 0),
  ]);

  const diagTotal = diagOpdCount + diagIpdCount;
  const drugTotal = drugOpdCount + drugIpdCount;

  const stats = [
    {
      label: "การรับบริการ",
      value: serviceCount,
      hint: "รายการรับบริการวันนี้",
      icon: Activity,
    },
    {
      label: "ผู้ป่วยวันนี้",
      value: patientsToday,
      hint: "จำนวน PID ที่มารับบริการไม่ซ้ำ",
      icon: Users,
    },
    {
      label: "การวินิจฉัย",
      value: diagTotal,
      hint: `OPD ${diagOpdCount.toLocaleString()} / IPD ${diagIpdCount.toLocaleString()}`,
      icon: Stethoscope,
    },
    {
      label: "รายการยา",
      value: drugTotal,
      hint: `OPD ${drugOpdCount.toLocaleString()} / IPD ${drugIpdCount.toLocaleString()}`,
      icon: Pill,
    },
  ];

  const breakdown = [
    { label: "service", count: serviceCount, tone: "บันทึกการรับบริการ" },
    { label: "diagnosis_opd", count: diagOpdCount, tone: "การวินิจฉัย OPD" },
    { label: "diagnosis_ipd", count: diagIpdCount, tone: "การวินิจฉัย IPD" },
    { label: "drug_opd", count: drugOpdCount, tone: "รายการยา OPD" },
    { label: "drug_ipd", count: drugIpdCount, tone: "รายการยา IPD" },
  ];

  return (
    <main className="flex-1 bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-[var(--border)] pb-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold tracking-normal text-[var(--text)]">
            <Database size={20} className="text-[var(--invert)]" />
            <span>ภาพรวมระบบ</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex h-[34px] items-center gap-3 border border-[var(--border)] bg-[var(--surface)] px-3.5">
              <span className="text-xs font-medium text-[var(--text-faint)]">บุคคล</span>
              <span className="text-sm font-semibold tabular-nums text-[var(--text)]">
                {totalPersons.toLocaleString()}
              </span>
            </div>
            <Link
              href="/person"
              className="inline-flex h-[34px] items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-4 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
            >
              <Users size={15} />
              ทะเบียนบุคคล
            </Link>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label: name, value, hint, icon: Icon }) => (
            <article
              key={name}
              className="flex flex-col gap-3 border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-muted)]">
                  {name}
                </span>
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center border border-[var(--border-soft)] bg-[var(--surface-2)] text-[var(--text-muted)]">
                  <Icon size={17} />
                </span>
              </div>
              <div className="text-3xl font-semibold tabular-nums text-[var(--text)]">
                {value.toLocaleString()}
              </div>
              <p className="text-xs text-[var(--text-dim)]">{hint}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="border border-[var(--border)] bg-[var(--surface)]">
            <header className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-3">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-[var(--text-muted)]" />
                <h2 className="text-sm font-semibold text-[var(--text-muted)]">
                  สรุปวันนี้ตามตาราง
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--text-faint)]">{iso}</span>
            </header>
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-3)] text-xs text-[var(--text-dim)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">ตาราง</th>
                  <th className="px-5 py-3 font-semibold">ประเภท</th>
                  <th className="px-5 py-3 text-right font-semibold">รายการวันนี้</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {breakdown.map((row) => (
                  <tr
                    key={row.label}
                    className="bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-[var(--text)]">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-[var(--text-muted)]">{row.tone}</td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums">
                      {row.count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <aside className="flex flex-col gap-3">
            <article className="border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <HeartPulse size={16} />
                <h3 className="text-sm font-semibold">ภาพรวม</h3>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
                  <dt className="text-[var(--text-dim)]">วันที่</dt>
                  <dd className="text-right text-[var(--text)]">{label}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
                  <dt className="text-[var(--text-dim)]">การรับบริการ</dt>
                  <dd className="font-semibold tabular-nums">
                    {serviceCount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
                  <dt className="text-[var(--text-dim)]">ผู้ป่วยวันนี้</dt>
                  <dd className="font-semibold tabular-nums">
                    {patientsToday.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
                  <dt className="text-[var(--text-dim)]">การวินิจฉัย</dt>
                  <dd className="font-semibold tabular-nums">
                    {diagTotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[var(--text-dim)]">รายการยา</dt>
                  <dd className="font-semibold tabular-nums">
                    {drugTotal.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="border border-[var(--border)] bg-[var(--invert)] p-5 text-[var(--invert-fg)]">
              <h3 className="text-sm font-semibold text-[var(--invert-fg)]/80">
                ลิงก์ด่วน
              </h3>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/person"
                  className="inline-flex h-[34px] items-center justify-between border border-white/20 bg-[var(--surface)]/5 px-4 text-sm font-medium hover:bg-[var(--surface)]/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Users size={15} /> ทะเบียนบุคคล
                  </span>
                  <span className="text-xs text-[var(--invert-fg)]/60">/person</span>
                </Link>
                <Link
                  href="/chronic"
                  className="inline-flex h-[34px] items-center justify-between border border-white/20 bg-[var(--surface)]/5 px-4 text-sm font-medium hover:bg-[var(--surface)]/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <HeartPulse size={15} /> ทะเบียนโรคเรื้อรัง
                  </span>
                  <span className="text-xs text-[var(--invert-fg)]/60">/chronic</span>
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
