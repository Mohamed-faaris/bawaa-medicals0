import { z } from "zod";

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url("Invalid database URL"),

    // Node environment
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    // API
    API_URL: z.string().url("Invalid API URL").optional(),

    // JWT/Auth
    JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),

    // Server
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default("localhost"),
});

export type Env = z.infer<typeof envSchema>;

let env: Env | null = null;

export function getEnv(): Env {
    if (env) return env;

    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error("❌ Invalid environment variables:");
        console.error(parsed.error.flatten().fieldErrors);
        throw new Error("Invalid environment variables");
    }

    env = parsed.data;
    console.log("Environment variables validated");
    return env;
}

export const config = getEnv();
