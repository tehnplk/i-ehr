import Link from "next/link";
import {
  CirclePlus,
  CircleX,
  Database,
  Edit3,
  RotateCcw,
  Save,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import { db } from "@/lib/db";
import { createPerson, deletePerson, updatePerson } from "./actions";
import { listColumns, personFields } from "./fields";

type SearchParams = Promise<{
  q?: string;
  edit?: string;
  mode?: string;
}>;

type PersonRow = {
  id: number;
  cid: string | null;
  pid: string | null;
  hn: string | null;
  name: string | null;
  lname: string | null;
  sex: string | null;
  birth: string | null;
  mobile: string | null;
  updated_at: string;
  [key: string]: string | number | Date | null;
};

function textValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function formatDateTime(value: string | Date | null | undefined) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildPersonUrl(query: string, values: Record<string, string | undefined>) {
  const search = new URLSearchParams();

  if (query) {
    search.set("q", query);
  }

  for (const [key, value] of Object.entries(values)) {
    if (value) {
      search.set(key, value);
    }
  }

  const result = search.toString();
  return result ? `/person?${result}` : "/person";
}

async function getPeople(query: string) {
  const peopleQuery = db<PersonRow>("person")
    .select([...listColumns])
    .orderBy("updated_at", "desc")
    .orderBy("id", "desc")
    .limit(50);

  if (query) {
    const like = `%${query}%`;
    peopleQuery.where((builder) => {
      builder
        .whereILike("cid", like)
        .orWhereILike("pid", like)
        .orWhereILike("hn", like)
        .orWhereILike("name", like)
        .orWhereILike("lname", like)
        .orWhereILike("mobile", like);
    });
  }

  return peopleQuery;
}

async function getSelectedPerson(id?: string) {
  const selectedId = Number(id);

  if (!Number.isInteger(selectedId) || selectedId < 1) {
    return null;
  }

  return db<PersonRow>("person").where({ id: selectedId }).first();
}

export default async function PersonPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const [people, selectedPerson, totalResult] = await Promise.all([
    getPeople(query),
    getSelectedPerson(params.edit),
    db("person").count<{ count: string }[]>("id as count").first(),
  ]);
  const modalMode = params.mode === "create" ? "create" : selectedPerson ? "edit" : null;
  const isEditing = Boolean(selectedPerson);
  const formAction = isEditing ? updatePerson : createPerson;
  const total = Number(totalResult?.count ?? 0);
  const closeHref = buildPersonUrl(query, {});
  const newHref = buildPersonUrl(query, { mode: "create" });

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-[var(--border)] pb-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-dim)] hover:text-[var(--text)]"
            >
              <Database size={16} />
              EHR
            </Link>
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-[var(--text)]">
                Person
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-[var(--text-dim)]">
                Manage person records in the ehr database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            <div className="flex h-10 min-w-22 items-center justify-between gap-3 border border-[var(--border)] bg-[var(--surface)] px-3.5">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Rows
              </span>
              <span className="text-base font-semibold text-[var(--text)]">
                {total.toLocaleString()}
              </span>
            </div>
            <Link
              href={newHref}
              className="inline-flex h-10 min-w-24 items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-4 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
            >
              <CirclePlus size={15} />
              New
            </Link>
          </div>
        </header>

        <section className="min-w-0 border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-col gap-3 border-b border-[var(--border-soft)] p-4 md:flex-row md:items-center md:justify-between">
            <form action="/person" className="flex w-full gap-2 md:max-w-xl">
              <label className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
                  size={17}
                />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search CID, PID, HN, name, mobile"
                  className="h-10 w-full border border-[var(--border)] bg-[var(--surface-input)] pl-10 pr-3 text-sm outline-none transition focus:border-[var(--invert)]"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-10 min-w-24 items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-4 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
              >
                <Search size={15} />
                Search
              </button>
            </form>
            {query ? (
              <Link
                href={closeHref}
                className="inline-flex h-10 min-w-22 items-center justify-center gap-2 border border-[var(--border)] px-3.5 text-sm font-medium text-[var(--text-muted)] hover:bg-[#f2f4f0]"
              >
                <RotateCcw size={16} />
                Clear
              </Link>
            ) : null}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-3)] text-xs uppercase text-[var(--text-dim)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">CID</th>
                  <th className="px-4 py-3 font-semibold">PID</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">HN</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {people.map((person) => (
                  <tr
                    key={person.id}
                    className={
                      selectedPerson?.id === person.id
                        ? "bg-[var(--row-active)]"
                        : "bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
                      {person.id}
                    </td>
                    <td className="px-4 py-3">{person.cid || "-"}</td>
                    <td className="px-4 py-3">{person.pid || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {[person.name, person.lname].filter(Boolean).join(" ") || "-"}
                      </div>
                      <div className="text-xs text-[var(--text-faint)]">
                        {person.sex || "-"} · {person.birth || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3">{person.hn || "-"}</td>
                    <td className="px-4 py-3">{person.mobile || "-"}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-dim)]">
                      {formatDateTime(person.updated_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={buildPersonUrl(query, { edit: String(person.id) })}
                          className="inline-flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--invert)]"
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </Link>
                        <form action={deletePerson}>
                          <input type="hidden" name="id" value={person.id} />
                          <button
                            type="submit"
                            className="inline-flex h-9 w-9 items-center justify-center border border-[#ead8d5] text-[#9a3f35] hover:bg-[#fff5f3]"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {people.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center gap-3 border-t border-[var(--border-subtle)] px-4 text-center">
              <UserRound className="text-[#9aa395]" size={34} />
              <p className="text-sm font-medium">No records found</p>
              <p className="text-sm text-[var(--text-dim)]">Try another search or add a new person.</p>
            </div>
          ) : null}
        </section>
      </div>

      {modalMode ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--invert)]/40 p-4 backdrop-blur-[2px]">
          <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[#d8ddd5] bg-[var(--surface)] shadow-[0_24px_80px_rgba(32,34,31,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-soft)] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  {isEditing ? "Update person" : "Create person"}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[var(--text)]">
                  {isEditing
                    ? `${selectedPerson?.name || "Person"} ${selectedPerson?.lname || ""}`.trim()
                    : "New person record"}
                </h2>
              </div>
              <Link
                href={closeHref}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[#5e665c] hover:border-[var(--invert)] hover:text-[var(--text)]"
                title="Close"
              >
                <CircleX size={16} />
              </Link>
            </div>

            <form action={formAction} className="flex min-h-0 flex-1 flex-col">
              {isEditing ? (
                <input type="hidden" name="id" value={selectedPerson?.id} />
              ) : null}

              <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="p-5 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {personFields.map((field) => (
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
                        <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-[#6d756a]">
                          {field.label}
                        </span>
                        <input
                          name={field.name}
                          defaultValue={textValue(selectedPerson?.[field.name])}
                          className="h-11 w-full border border-[var(--border)] bg-[var(--surface-input)] px-3 text-sm outline-none transition focus:border-[var(--invert)]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 lg:border-l lg:border-t-0">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-faint)]">
                        Record details
                      </p>
                      <dl className="mt-3 space-y-2 text-sm text-[#4f574d]">
                        <div className="flex justify-between gap-3 border-b border-[#e1e6de] pb-2">
                          <dt>ID</dt>
                          <dd className="font-mono">{selectedPerson?.id ?? "Auto"}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-b border-[#e1e6de] pb-2">
                          <dt>Mode</dt>
                          <dd>{isEditing ? "Update" : "Create"}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-b border-[#e1e6de] pb-2">
                          <dt>Rows</dt>
                          <dd>{total.toLocaleString()}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 border border-[var(--invert)] bg-[var(--invert)] px-5 text-sm font-medium text-[var(--invert-fg)] hover:bg-[var(--invert-hover)]"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <Link
                        href={closeHref}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 border border-[#d6dbd3] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--text-muted)] hover:bg-[#f1f4ef]"
                      >
                        <RotateCcw size={16} />
                        Cancel
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
