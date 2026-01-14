export type LeadNeed = "INSTITUTIONAL_FILMS" | "CORPORATE_EVENTS" | "CONTENT_FILMS";

export class Lead {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string | null,
    public readonly need: LeadNeed,
    public readonly createdAt: string
  ) {}

  static create(data: { name: string; email: string; phone?: string | null; need: LeadNeed }) {
    if (!data.email.includes("@")) throw new Error("Invalid email");
    if (!data.name) throw new Error("Invalid name");
    return new Lead(crypto.randomUUID(), data.name, data.email, data.phone ?? null, data.need, new Date().toISOString());
  }

  static fromRow(r: any) {
    return new Lead(r.id, r.name, r.email, r.phone ?? null, r.need, r.created_at);
  }
}
