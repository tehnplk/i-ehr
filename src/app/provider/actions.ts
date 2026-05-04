"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  payloadWithServerTime,
  serializedTableWrite,
} from "@/lib/serializedWrite";
import { providerFields } from "./fields";

function cleanValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function providerPayload(formData: FormData) {
  return Object.fromEntries(
    providerFields.map((f) => [f.name, cleanValue(formData.get(f.name))]),
  );
}

export async function createProvider(formData: FormData) {
  await serializedTableWrite("provider", async (trx) => {
    const payload = await payloadWithServerTime(
      trx,
      "provider",
      providerPayload(formData),
    );
    await trx("provider").insert(payload);
  });
  revalidatePath("/provider");
  redirect("/provider");
}

export async function updateProvider(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) throw new Error("รหัสผู้ให้บริการไม่ถูกต้อง");
  await serializedTableWrite("provider", async (trx) => {
    const payload = await payloadWithServerTime(
      trx,
      "provider",
      providerPayload(formData),
    );
    await trx("provider").where({ id }).update(payload);
  });
  revalidatePath("/provider");
  redirect("/provider");
}

export async function deleteProvider(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) throw new Error("รหัสผู้ให้บริการไม่ถูกต้อง");
  await serializedTableWrite("provider", async (trx) => {
    await trx("provider").where({ id }).delete();
  });
  revalidatePath("/provider");
  redirect("/provider");
}
