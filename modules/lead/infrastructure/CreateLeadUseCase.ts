import { Lead } from "../domain/Lead";
import { LeadRepository } from "../domain/LeadRepository";

export class CreateLeadUseCase {
  constructor(private repo: LeadRepository) {}

  async execute(dto: { name: string; email: string; phone?: string; need: any }) {
    const exists = await this.repo.findByEmail(dto.email);
    if (exists) throw new Error("Lead already exists");
    const lead = Lead.create({ name: dto.name, email: dto.email, phone: dto.phone, need: dto.need });
    await this.repo.save(lead);
    return lead;
  }
}
