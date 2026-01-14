import { IUserRepository } from "../domain/IUserRepository";
import { HttpClientServer } from "@/shared/infrastructure/HttpClientServer";
import { createClient } from "@supabase/supabase-js";
import { User } from "../domain/User";

export class SupabaseUserRepository implements IUserRepository {
  private supabaseAuth: ReturnType<typeof createClient>['auth'];
  private httpClient: HttpClientServer;

  constructor() {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    this.supabaseAuth = supabase.auth;
    this.httpClient = new HttpClientServer();
  }

  async signInWithMagicLink(email: string): Promise<void> {
    const { error } = await this.supabaseAuth.signInWithOtp({
      email,
      options: {  
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    
    if (error) throw new Error(`Erro ao enviar magic link: ${error.message}`);
  }

  async signUpWithMagicLink(email: string): Promise<void> {
    const { error } = await this.supabaseAuth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?type=signup`,
      },
    });
    
    if (error) throw new Error(`Erro ao enviar magic link: ${error.message}`);
  }

  async signUp(email: string, password: string, name?: string): Promise<User> {
    const { data, error } = await this.supabaseAuth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        data: { name }
      },
    });
    
    if (error) throw new Error(`Erro no registro: ${error.message}`);
    if (!data.user) throw new Error("Usuário não criado");
    
    try {
      await this.httpClient.insert("users", {
        id: data.user.id,
        email: data.user.email,
        name,
        created_at: new Date().toISOString(),
      });
    } catch (dbError) {
      console.warn("Erro ao salvar usuário no banco:", dbError);
    }
    
    return User.fromRow({
      id: data.user.id,
      email: data.user.email,
      name,
      created_at: new Date().toISOString(),
    });
  }

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabaseAuth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw new Error(`Erro no login: ${error.message}`);
    if (!data.user) throw new Error("Usuário não encontrado");
    
    let userData: any = { id: data.user.id, email: data.user.email };
    
    try {
      const row = await this.httpClient.select("users", { 
        eq: { id: data.user.id },
        single: true 
      });
      if (row) userData = row;
    } catch (error) {
      console.warn("Erro ao buscar dados do usuário:", error);
    }
    
    return User.fromRow(userData);
  }

  async sendMagicLink(email: string): Promise<void> {
    await this.signInWithMagicLink(email);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const row = await this.httpClient.select("users", { 
        eq: { email },
        single: true 
      });
      return row ? User.fromRow(row) : null;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  }
}