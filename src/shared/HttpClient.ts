import { supabaseClient } from "./supabaseClient";

export class HttpClient {
  private supabase = supabaseClient;

  async insert(table: string, payload: any) {
    const { data, error } = await this.supabase.from(table).insert(payload);
    if (error) throw error;
    return data;
  }

  async select(table: string, opts?: { eq?: Record<string, any>; single?: boolean }) {
    let q: any = this.supabase.from(table).select("*");
    if (opts?.eq) for (const [k,v] of Object.entries(opts.eq)) q = q.eq(k, v as any);
    if (opts?.single) q = q.maybeSingle();
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  async delete(table: string, eq: Record<string, any>) {
    let q: any = this.supabase.from(table).delete();
    for (const [k,v] of Object.entries(eq)) q = q.eq(k, v as any);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }
}
