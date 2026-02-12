import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "@bawaa/config";
import * as schema from "./schema";

export * from "./schema";

export const db = drizzle(config.DATABASE_URL, { schema });
