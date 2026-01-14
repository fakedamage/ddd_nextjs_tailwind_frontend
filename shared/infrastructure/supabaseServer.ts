import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server only

if (!URL || !SERVICE_KEY) throw new Error("Missing SUPABASE env vars for server");

export const supabaseServer = createClient(URL, SERVICE_KEY);
