import { IUserRepository } from "./IUserRepository";
import { User } from "./User";

export class UserRepository implements IUserRepository {
  async signInWithMagicLink(email: string): Promise<void> {
    // Implementação de login com magic link
    throw new Error("Method not implemented.");
  }

  async signUpWithMagicLink(email: string): Promise<void> {
    // Implementação de cadastro com magic link
    throw new Error("Method not implemented.");
  }

  async signUp(email: string, password: string, name?: string): Promise<User> {
    // Implementação de registro tradicional
    throw new Error("Method not implemented.");
  }

  async signIn(email: string, password: string): Promise<User> {
    // Implementação de login tradicional
    throw new Error("Method not implemented.");
  }
}