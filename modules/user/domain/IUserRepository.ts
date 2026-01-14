import { User } from "./User";

export interface IUserRepository {
  signInWithMagicLink(email: string): Promise<void>;
  signUpWithMagicLink(email: string): Promise<void>;
  signUp(email: string, password: string, name?: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
}