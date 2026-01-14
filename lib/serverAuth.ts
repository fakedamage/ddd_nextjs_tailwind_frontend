import { supabaseServer } from "@/shared/infrastructure/supabaseServer";

/** valida Bearer token no server e retorna user ou lança erro */
export async function ensureValidTokenOrThrow(token?: string | null) {
  if (!token) throw new Error("No token");
  const t = token.replace(/^Bearer\s+/i, "");
  const { data, error } = await supabaseServer.auth.getUser(t);
  if (error || !data.user) throw new Error("Invalid token");
  return data.user;
}
