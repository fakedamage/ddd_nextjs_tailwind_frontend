import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: { email: string; password: string; name?: string }): Promise<User> {
    if (!dto.email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (!dto.password || dto.password.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres");
    }

    return await this.userRepository.signUp(dto.email, dto.password, dto.name);
  }
}