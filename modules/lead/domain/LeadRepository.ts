import { Lead } from "./Lead";
export interface LeadRepository {
  save(lead: Lead): Promise<void>;
  list(): Promise<Lead[]>;
  findByEmail(email: string): Promise<Lead | null>;
  deleteById(id: string): Promise<void>;
}
