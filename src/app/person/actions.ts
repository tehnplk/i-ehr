"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  payloadWithServerTime,
  serializedTableWrite,
} from "@/lib/serializedWrite";
import { personFields } from "./fields";

function cleanValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function personPayload(formData: FormData) {
  return Object.fromEntries(
    personFields.map((field) => [field.name, cleanValue(formData.get(field.name))]),
  );
}

export async function createPerson(formData: FormData) {
  await serializedTableWrite("person", async (trx) => {
    const payload = await payloadWithServerTime(trx, "person", personPayload(formData));
    await trx("person").insert(payload);
  });
  revalidatePath("/person");
  redirect("/person");
}

export async function updatePerson(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("รหัสบุคคลไม่ถูกต้อง");
  }

  await serializedTableWrite("person", async (trx) => {
    const payload = await payloadWithServerTime(trx, "person", personPayload(formData));
    await trx("person").where({ id }).update(payload);
  });
  revalidatePath("/person");
  redirect("/person");
}

export async function deletePerson(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("รหัสบุคคลไม่ถูกต้อง");
  }

  await serializedTableWrite("person", async (trx) => {
    await trx("person").where({ id }).delete();
  });
  revalidatePath("/person");
  redirect("/person");
}
