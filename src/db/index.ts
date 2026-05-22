import {neonConfig} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

export const db = drizzle(process.env.DATABASE_URL!, {schema});
