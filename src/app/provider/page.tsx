import Link from "next/link";
import {
  CirclePlus,
  CircleX,
  Edit3,
  RotateCcw,
  Save,
  Search,
  Stethoscope,
} from "lucide-react";
import { db } from "@/lib/db";
import { LookupCombobox } from "@/components/LookupCombobox";
import { DeleteConfirmButton } from "@/components/DeleteConfirmButton";
import { createProvider, deleteProvider, updateProvider } from "./actions";
import { listColumns, providerFields } from "./fields";

type SearchParams = Promise<{ q?: string; edit?: string; mode?: string }>;

type ProviderRow = {
  id: number;
  provider: string | null;
  registerno: string | null;
  council: string | null;
  cid: string | null;
  prename: string | null;
  name: string | null;
  lname: string | null;
  sex: string | null;
  providertype: string | null;
  startdate: string | null;
  updated_at: string;
  [key: string]: string | number | Date | null;
};

function textValue(value: unknown) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildUrl(query: string, values: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  if (query) search.set("q", query);
  for (const [key, value] of Object.entries(values)) {
    if (value) search.set(key, value);
  }
  const result = search.toString();
  return result ? `/provider?${result}` : "/provider";
}

async function getProviders(query: string) {
  const providersQuery = db<ProviderRow>("provider")
    .select([...listColumns])
    .orderBy("updated_at", "desc")
    .orderBy("id", "desc")
    .limit(50);

  if (query) {
    const like = `%${query}%`;
    providersQuery.where((builder) => {
      builder
        .whereILike("provider", like)
        .orWhereILike("registerno", like)
        .orWhereILike("cid", like)
        .orWhereILike("name", like)
        .orWhereILike("lname", like);
    });
  }

  return providersQuery;
}

async function getSelected(id?: string) {
  const selectedId = Number(id);
  if (!Number.isInteger(selectedId) || selectedId < 1) return null;
  return db<ProviderRow>("provider").where({ id: selectedId }).first();
}

type LookupRow = { code: string; name: string };
type LookupMap = Record<string, LookupRow[]>;

async function getLookups(): Promise<LookupMap> {
  const tables = Array.from(
    new Set(
      providerFields
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
  table: string | undefined,
  code: string | null | undefined,
) {
  if (!table || !code) return "";
  return lookups[table]?.find((row) => row.code === code)?.name ?? "";
}

function providertypeLabel(lookups: LookupMap, code: string | null) {
  if (!code) return "-";
  const codes = code.split(",").map((value) => value.trim()).filter(Boolean);
  if (codes.length === 0) return "-";

  return codes
    .map((value) => {
      const name = lookupName(lookups, "c_providertype", value);
      return name ? `${value} ${name}` : value;
    })
    .join(", ");
}

export default async function ProviderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const [rows, selected, totalResult, lookups] = await Promise.all([
    getProviders(query),
    getSelected(params.edit),
    db("provider").count<{ count: string }[]>("id as count").first(),
    getLookups(),
  ]);
  const modalMode = params.mode === "create" ? "create" : selected ? "edit" : null;
  const isEditing = Boolean(selected);
  const formAction = isEditing ? updateProvider : createProvider;
  const total = Number(totalResult?.count ?? 0);
  const closeHref = buildUrl(query, {});
  const newHref = buildUrl(query, { mode: "create" });

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-[var(--border)] pb-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold tracking-normal text-[var(--text)]">
            <Stethoscope size={20} className="text-[var(--invert)]" />
            <span>ทะเบียนผู้ให้บริการ</span>
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
            <form action="/provider" className="flex w-full gap-2 md:max-w-xl">
              <label className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
                  size={17}
                />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="ค้นหารหัสผู้ให้บริการ, เลขทะเบียน, CID, ชื่อ"
                  className="h-[34px] w-full border border-[var(--border)] bg-[var(--surface-input)] pl-10 pr-3 text-xs outline-none transition placeholder:text-xs focus:border-[var(--invert)]"
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
            <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-3)] text-xs uppercase text-[var(--text-dim)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">รหัสผู้ให้บริการ</th>
                  <th className="px-4 py-3 font-semibold">ชื่อ-นามสกุล</th>
                  <th className="px-4 py-3 font-semibold">สภาวิชาชีพ</th>
                  <th className="px-4 py-3 font-semibold">ประเภท</th>
                  <th className="px-4 py-3 font-semibold">วันที่เริ่ม</th>
                  <th className="px-4 py-3 font-semibold">อัปเดตล่าสุด</th>
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
                    <td className="px-4 py-3 font-mono">{row.provider || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {[
                          lookupName(lookups, "c_prename", row.prename),
                          row.name,
                          row.lname,
                        ]
                          .filter(Boolean)
                          .join(" ") || "-"}
                      </div>
                      <div className="text-xs text-[var(--text-faint)]">
                        {lookupName(lookups, "c_sex", row.sex) || "-"} ·{" "}
                        {row.cid || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {lookupName(lookups, "c_council", row.council) || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {providertypeLabel(lookups, row.providertype)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {row.startdate || "-"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-dim)]">
                      {formatDateTime(row.updated_at)}
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
                        <form action={deleteProvider}>
                          <input type="hidden" name="id" value={row.id} />
                          <DeleteConfirmButton text="ต้องการลบข้อมูลผู้ให้บริการนี้หรือไม่" />
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
              <Stethoscope className="text-[var(--text-faint)]" size={34} />
              <p className="text-sm font-medium">ไม่พบข้อมูลผู้ให้บริการ</p>
              <p className="text-sm text-[var(--text-dim)]">
                ลองค้นหาด้วยคำอื่น หรือเพิ่มข้อมูลผู้ให้บริการใหม่
              </p>
            </div>
          ) : null}
        </section>
      </div>

      {modalMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--invert)]/40 p-4 backdrop-blur-[2px]">
          <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,143,140,0.14)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-soft)] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  {isEditing ? "แก้ไขข้อมูลผู้ให้บริการ" : "เพิ่มข้อมูลผู้ให้บริการ"}
                </p>
              </div>
              <Link
                href={closeHref}
                className="inline-flex h-[34px] w-[34px] items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--invert)] hover:text-[var(--text)]"
                title="ปิด"
              >
                <CircleX size={16} />
              </Link>
            </div>

            <form action={formAction} className="flex min-h-0 flex-1 flex-col">
              {isEditing ? <input type="hidden" name="id" value={selected?.id} /> : null}

              <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="p-5 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {providerFields.map((field) => {
                      const current = textValue(selected?.[field.name]);
                      const inputClass =
                        "h-[34px] w-full border border-[var(--border)] bg-[var(--surface-input)] px-3 text-xs outline-none transition placeholder:text-xs focus:border-[var(--invert)]";

                      return (
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
                              defaultCode={current}
                              className={inputClass}
                            />
                          ) : (
                            <input
                              name={field.name}
                              defaultValue={current}
                              className={inputClass}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 lg:border-l lg:border-t-0">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-faint)]">
                        รายละเอียดระเบียน
                      </p>
                      <dl className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                        <div className="flex justify-between gap-3 border-b border-[var(--border-soft)] pb-2">
                          <dt>ID</dt>
                          <dd className="font-mono">{selected?.id ?? "อัตโนมัติ"}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-b border-[var(--border-soft)] pb-2">
                          <dt>โหมด</dt>
                          <dd>{isEditing ? "แก้ไข" : "เพิ่มใหม่"}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-b border-[var(--border-soft)] pb-2">
                          <dt>รายการ</dt>
                          <dd>{total.toLocaleString()}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="submit"
                        className="inline-flex h-[34px] w-full items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-5 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
                      >
                        <Save size={16} />
                        บันทึก
                      </button>
                      <Link
                        href={closeHref}
                        className="inline-flex h-[34px] w-full items-center justify-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
                      >
                        <RotateCcw size={16} />
                        ยกเลิก
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
