"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
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
  await db("person").insert(personPayload(formData));
  revalidatePath("/person");
  redirect("/person");
}

export async function updatePerson(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid person id");
  }

  await db("person").where({ id }).update(personPayload(formData));
  revalidatePath("/person");
  redirect("/person");
}

export async function deletePerson(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid person id");
  }

  await db("person").where({ id }).delete();
  revalidatePath("/person");
  redirect("/person");
}
