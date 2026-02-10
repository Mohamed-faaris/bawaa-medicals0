import type { Config } from "drizzle-kit";
import { config } from "@bawaa/config";

export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: config.DATABASE_URL,
    },
} satisfies Config;
