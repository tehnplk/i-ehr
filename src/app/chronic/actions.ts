"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  payloadWithServerTime,
  serializedTableWrite,
} from "@/lib/serializedWrite";
import { chronicFields } from "./fields";

function cleanValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function chronicPayload(formData: FormData) {
  return Object.fromEntries(
    chronicFields.map((field) => [field.name, cleanValue(formData.get(field.name))]),
  );
}

function validId(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("รหัสทะเบียนผู้ป่วยโรคเรื้อรังไม่ถูกต้อง");
  }
  return id;
}

export async function createChronic(formData: FormData) {
  await serializedTableWrite("chronic", async (trx) => {
    const payload = await payloadWithServerTime(
      trx,
      "chronic",
      chronicPayload(formData),
    );
    await trx("chronic").insert(payload);
  });
  revalidatePath("/chronic");
  redirect("/chronic");
}

export async function updateChronic(formData: FormData) {
  const id = validId(formData);
  await serializedTableWrite("chronic", async (trx) => {
    const payload = await payloadWithServerTime(
      trx,
      "chronic",
      chronicPayload(formData),
    );
    await trx("chronic").where({ id }).update(payload);
  });
  revalidatePath("/chronic");
  redirect("/chronic");
}

export async function deleteChronic(formData: FormData) {
  const id = validId(formData);
  await serializedTableWrite("chronic", async (trx) => {
    await trx("chronic").where({ id }).delete();
  });
  revalidatePath("/chronic");
  redirect("/chronic");
}
