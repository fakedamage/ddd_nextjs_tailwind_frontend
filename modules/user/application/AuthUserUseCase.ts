import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class AuthUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async signInWithMagicLink(email: string): Promise<void> {
    if (!email) {
      throw new Error("E-mail é obrigatório");
    }

    await this.userRepository.signInWithMagicLink(email);
  }

  async signUpWithMagicLink(email: string): Promise<void> {
    if (!email) {
      throw new Error("E-mail é obrigatório");
    }

    await this.userRepository.signUpWithMagicLink(email);
  }

  async signUp(email: string, password: string, name?: string): Promise<User> {
    if (!email) {
      throw new Error("E-mail é obrigatório");
    }
    if (!password) {
      throw new Error("Senha é obrigatória");
    }

    return await this.userRepository.signUp(email, password, name);
  }

  async signIn(email: string, password: string): Promise<User> {
    if (!email) {
      throw new Error("E-mail é obrigatório");
    }
    if (!password) {
      throw new Error("Senha é obrigatória");
    }

    return await this.userRepository.signIn(email, password);
  }

  async sendMagicLink(email: string): Promise<void> {
    await this.signInWithMagicLink(email);
  }
}