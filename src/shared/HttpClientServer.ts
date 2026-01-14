import { supabaseServer } from "./supabaseServer";

/**
 * HttpClientServer: wrapper para operações server (service_role ou server-auth)
 * Use este cliente dentro de repositórios server-side (Next API route / route handlers)
 */
export class HttpClientServer {
  private supabase = supabaseServer;

  // generic insert (server)
  async insert(table: string, payload: any) {
    const { data, error } = await this.supabase.from(table).insert(payload);
    if (error) throw error;
    return data;
  }

  // generic select
  async select(table: string, opts?: { eq?: Record<string, any>; single?: boolean }) {
    let q: any = this.supabase.from(table).select("*");
    if (opts?.eq) for (const [k,v] of Object.entries(opts.eq)) q = q.eq(k, v as any);
    if (opts?.single) q = q.maybeSingle();
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  // delete
  async delete(table: string, eq: Record<string, any>) {
    let q: any = this.supabase.from(table).delete();
    for (const [k,v] of Object.entries(eq)) q = q.eq(k, v as any);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  // auth helpers (server)
  async adminListUsers() {
    // admin methods may be under auth.admin depending on SDK; check versão
    // @ts-ignore
    const res = await (this.supabase.auth as any).admin.listUsers();
    if (res.error) throw res.error;
    return res.data;
  }

  async adminDeleteUser(userId: string) {
    // @ts-ignore
    const res = await (this.supabase.auth as any).admin.deleteUser(userId);
    if (res.error) throw res.error;
    return res.data;
  }
}
