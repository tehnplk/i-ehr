import type { Knex } from "knex";
import { db } from "./db";

type WritePayload = Record<string, string | null>;

function bangkokTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}${values.month}${values.day}${values.hour}${values.minute}${values.second}`;
}

function addSecond(timestamp: string) {
  const year = Number(timestamp.slice(0, 4));
  const month = Number(timestamp.slice(4, 6));
  const day = Number(timestamp.slice(6, 8));
  const hour = Number(timestamp.slice(8, 10));
  const minute = Number(timestamp.slice(10, 12));
  const second = Number(timestamp.slice(12, 14));
  const next = new Date(Date.UTC(year, month - 1, day, hour, minute, second + 1));

  return [
    next.getUTCFullYear(),
    String(next.getUTCMonth() + 1).padStart(2, "0"),
    String(next.getUTCDate()).padStart(2, "0"),
    String(next.getUTCHours()).padStart(2, "0"),
    String(next.getUTCMinutes()).padStart(2, "0"),
    String(next.getUTCSeconds()).padStart(2, "0"),
  ].join("");
}

async function nextDUpdate(trx: Knex.Transaction, tableName: string) {
  const row = await trx(tableName)
    .whereNotNull("d_update")
    .max<{ value: string | null }>({ value: "d_update" })
    .first();

  const current = bangkokTimestamp();
  const latest = row?.value;

  if (!latest || latest.length !== 14 || latest < current) {
    return current;
  }

  return addSecond(latest);
}

export async function payloadWithServerTime(
  trx: Knex.Transaction,
  tableName: string,
  payload: WritePayload,
) {
  if (!Object.prototype.hasOwnProperty.call(payload, "d_update")) {
    return payload;
  }

  return {
    ...payload,
    d_update: await nextDUpdate(trx, tableName),
  };
}

export async function serializedTableWrite<T>(
  tableName: string,
  write: (trx: Knex.Transaction) => Promise<T>,
) {
  return db.transaction(async (trx) => {
    await trx.raw("select pg_advisory_xact_lock(hashtext(?))", [
      `ehr:${tableName}:write`,
    ]);
    return write(trx);
  });
}
