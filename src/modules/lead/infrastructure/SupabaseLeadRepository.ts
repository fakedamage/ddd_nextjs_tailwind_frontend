import { Lead } from "../domain/Lead";
import { LeadRepository } from "../domain/LeadRepository";
import { HttpClientServer } from "@/shared/HttpClientServer";

export class SupabaseLeadRepository implements LeadRepository {
  constructor(private client = new HttpClientServer()) {}

  async save(lead: Lead) {
    await this.client.insert("leads", {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      need: lead.need
    });
  }

  async list() {
    const rows = await this.client.select("leads");
    return (rows || []).map((r: any) => Lead.fromRow(r));
  }

  async findByEmail(email: string) {
    const row = await this.client.select("leads", { eq: { email }, single: true });
    return row ? Lead.fromRow(row) : null;
  }

  async deleteById(id: string) {
    await this.client.delete("leads", { id });
  }
}
