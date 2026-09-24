import { envSchema } from "@/lib/validation";

// Parse environment variables with Zod
export const env = envSchema.parse(process.env);