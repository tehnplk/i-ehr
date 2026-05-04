import Link from "next/link";
import {
  CirclePlus,
  CircleX,
  Edit3,
  HeartPulse,
  RotateCcw,
  Save,
  Search,
} from "lucide-react";
import { db } from "@/lib/db";
import { LookupCombobox } from "@/components/LookupCombobox";
import { DeleteConfirmButton } from "@/components/DeleteConfirmButton";
import { createChronic, deleteChronic, updateChronic } from "./actions";
import { chronicFields, listColumns } from "./fields";

type SearchParams = Promise<{ q?: string; edit?: string; mode?: string }>;

type ChronicRow = {
  id: number;
  hospcode: string | null;
  pid: string | null;
  cid: string | null;
  date_diag: string | null;
  chronic: string | null;
  hosp_dx: string | null;
  hosp_rx: string | null;
  date_disch: string | null;
  typedisch: string | null;
  d_update: string | null;
  patient_name?: string | null;
  [key: string]: string | number | null | undefined;
};

function textValue(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function buildUrl(query: string, values: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  if (query) search.set("q", query);
  for (const [k, v] of Object.entries(values)) if (v) search.set(k, v);
  const r = search.toString();
  return r ? `/chronic?${r}` : "/chronic";
}

function patientLabel(row: ChronicRow) {
  return row.patient_name || row.cid || row.pid || "-";
}

async function getChronicRows(query: string) {
  const q = db("chronic as c")
    .leftJoin("person as p", "c.pid", "p.pid")
    .select<ChronicRow[]>([
      ...listColumns.map((column) => `c.${column}`),
      db.raw("concat_ws(' ', p.name, p.lname) as patient_name"),
    ])
    .orderBy("c.updated_at", "desc")
    .orderBy("c.id", "desc")
    .limit(50);

  if (query) {
    const like = `%${query}%`;
    q.where((b) => {
      b.whereILike("c.pid", like)
        .orWhereILike("c.cid", like)
        .orWhereILike("c.chronic", like)
        .orWhereILike("p.name", like)
        .orWhereILike("p.lname", like);
    });
  }

  return q;
}

async function getSelected(id?: string) {
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1) return null;
  return db<ChronicRow>("chronic").where({ id: n }).first();
}

type LookupRow = { code: string; name: string };
type LookupMap = Record<string, LookupRow[]>;

async function getLookups(): Promise<LookupMap> {
  const tables = Array.from(
    new Set(
      chronicFields
        .map((field) => field.lookup)
        .filter((table): table is string => typeof table === "string"),
    ),
  );
  const entries = await Promise.all(
    tables.map(async (table) => {
      const rows = await db(table)
        .select<LookupRow[]>(["code", "name"])
        .orderBy("code");
      return [table, rows] as const;
    }),
  );
  return Object.fromEntries(entries);
}

function lookupName(
  lookups: LookupMap,
  table: string,
  code: string | null | undefined,
) {
  if (!code) return "";
  return lookups[table]?.find((row) => row.code === code)?.name ?? "";
}

function codeLabel(
  lookups: LookupMap,
  table: string,
  code: string | null | undefined,
) {
  if (!code) return "-";
  const name = lookupName(lookups, table, code);
  return name ? `${code} ${name}` : code;
}

export default async function ChronicPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const [rows, selected, totalRow, lookups] = await Promise.all([
    getChronicRows(query),
    getSelected(params.edit),
    db("chronic").count<{ count: string }[]>("id as count").first(),
    getLookups(),
  ]);
  const modalMode = params.mode === "create" ? "create" : selected ? "edit" : null;
  const isEditing = Boolean(selected);
  const formAction = isEditing ? updateChronic : createChronic;
  const total = Number(totalRow?.count ?? 0);
  const closeHref = buildUrl(query, {});
  const newHref = buildUrl(query, { mode: "create" });
  const inputClass =
    "h-[34px] w-full border border-[var(--border)] bg-[var(--surface-input)] px-3 text-sm outline-none transition placeholder:text-xs focus:border-[var(--invert)]";

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-[var(--border)] pb-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold tracking-normal text-[var(--text)]">
            <HeartPulse size={20} className="text-[var(--invert)]" />
            <span>ทะเบียนผู้ป่วยโรคเรื้อรัง</span>
          </h1>

          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            <div className="flex h-[34px] min-w-22 items-center justify-between gap-3 border border-[var(--border)] bg-[var(--surface)] px-3.5">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-faint)]">
                รายการ
              </span>
              <span className="text-base font-semibold text-[var(--text)]">
                {total.toLocaleString()}
              </span>
            </div>
            <Link
              href={newHref}
              className="inline-flex h-[34px] min-w-24 items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-4 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
            >
              <CirclePlus size={15} />
              เพิ่มใหม่
            </Link>
          </div>
        </header>

        <section className="min-w-0 border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-col gap-3 border-b border-[var(--border-soft)] p-4 md:flex-row md:items-center md:justify-between">
            <form action="/chronic" className="flex w-full gap-2 md:max-w-xl">
              <label className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
                  size={17}
                />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="ค้นหา PID, CID, ชื่อผู้ป่วย หรือรหัสโรค"
                  className="h-[34px] w-full border border-[var(--border)] bg-[var(--surface-input)] pl-10 pr-3 text-sm outline-none transition placeholder:text-xs focus:border-[var(--invert)]"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-[34px] min-w-24 items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-4 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
              >
                <Search size={15} />
                ค้นหา
              </button>
            </form>
            {query ? (
              <Link
                href={closeHref}
                className="inline-flex h-[34px] min-w-22 items-center justify-center gap-2 border border-[var(--border)] px-3.5 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
              >
                <RotateCcw size={16} />
                ล้าง
              </Link>
            ) : null}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-3)] text-xs uppercase text-[var(--text-dim)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">ผู้ป่วย</th>
                  <th className="px-4 py-3 font-semibold">รหัสโรค</th>
                  <th className="px-4 py-3 font-semibold">วันที่วินิจฉัย</th>
                  <th className="px-4 py-3 font-semibold">หน่วยวินิจฉัย</th>
                  <th className="px-4 py-3 font-semibold">หน่วยบริการประจำ</th>
                  <th className="px-4 py-3 font-semibold">จำหน่าย</th>
                  <th className="px-4 py-3 text-right font-semibold">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      selected?.id === row.id
                        ? "bg-[var(--row-active)]"
                        : "bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
                      {row.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{patientLabel(row)}</div>
                      <div className="text-xs text-[var(--text-faint)]">
                        PID {row.pid || "-"} · CID {row.cid || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs">
                        {row.chronic || "-"}
                      </div>
                      <div className="text-xs text-[var(--text-faint)]">
                        {lookupName(lookups, "c_chronic", row.chronic) || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {row.date_diag || "-"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{row.hosp_dx || "-"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.hosp_rx || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs">{row.date_disch || "-"}</div>
                      <div className="text-xs text-[var(--text-faint)]">
                        {codeLabel(lookups, "c_chronic_typedisch", row.typedisch)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={buildUrl(query, { edit: String(row.id) })}
                          className="inline-flex h-[34px] w-[34px] items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--invert)]"
                          title="แก้ไข"
                        >
                          <Edit3 size={15} />
                        </Link>
                        <form action={deleteChronic}>
                          <input type="hidden" name="id" value={row.id} />
                          <DeleteConfirmButton text="ต้องการลบทะเบียนผู้ป่วยโรคเรื้อรังนี้หรือไม่" />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rows.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center gap-3 border-t border-[var(--border-subtle)] px-4 text-center">
              <HeartPulse className="text-[var(--text-faint)]" size={34} />
              <p className="text-sm font-medium">ไม่พบข้อมูลผู้ป่วยโรคเรื้อรัง</p>
              <p className="text-sm text-[var(--text-dim)]">
                ลองค้นหาด้วยคำอื่น หรือเพิ่มทะเบียนผู้ป่วยโรคเรื้อรังใหม่
              </p>
            </div>
          ) : null}
        </section>
      </div>

      {modalMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--invert)]/40 p-4 backdrop-blur-[2px]">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,143,140,0.14)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-soft)] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  {isEditing
                    ? "แก้ไขข้อมูลผู้ป่วยโรคเรื้อรัง"
                    : "เพิ่มข้อมูลผู้ป่วยโรคเรื้อรัง"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text)]">
                  {isEditing ? selected?.chronic || "โรคเรื้อรัง" : "ข้อมูลผู้ป่วยใหม่"}
                </h2>
              </div>
              <Link
                href={closeHref}
                className="inline-flex h-[34px] w-[34px] items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--invert)] hover:text-[var(--text)]"
                title="ปิด"
              >
                <CircleX size={16} />
              </Link>
            </div>

            <form action={formAction} className="p-5 sm:p-6">
              {isEditing ? (
                <input type="hidden" name="id" value={selected?.id} />
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {chronicFields.map((field) => (
                  <label
                    key={field.name}
                    className={
                      field.width === "long"
                        ? "sm:col-span-2 xl:col-span-3"
                        : field.width === "medium"
                          ? "sm:col-span-1"
                          : ""
                    }
                  >
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-dim)]">
                      {field.label}
                    </span>
                    {field.lookup ? (
                      <LookupCombobox
                        name={field.name}
                        options={lookups[field.lookup] ?? []}
                        defaultCode={textValue(selected?.[field.name])}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        name={field.name}
                        defaultValue={textValue(selected?.[field.name])}
                        className={inputClass}
                      />
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Link
                  href={closeHref}
                  className="inline-flex h-[34px] items-center justify-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                >
                  <RotateCcw size={16} />
                  ยกเลิก
                </Link>
                <button
                  type="submit"
                  className="inline-flex h-[34px] items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-5 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
                >
                  <Save size={16} />
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
