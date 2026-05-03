import knex, { type Knex } from "knex";

declare global {
  var ehrKnex: Knex | undefined;
}

const connection = process.env.DATABASE_URL;

if (!connection) {
  throw new Error("DATABASE_URL is required");
}

export const db =
  globalThis.ehrKnex ??
  knex({
    client: "pg",
    connection,
    pool: { min: 0, max: 10 },
    searchPath: ["public"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.ehrKnex = db;
}
