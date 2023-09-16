import { UserEntity } from "../entities/UserEntity";

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(userId: string, user: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(userId: string): Promise<void>;
  abstract index(): Promise<UserEntity[]>;
  abstract find(userId: string): Promise<UserEntity | null>;
  abstract findOrFail(userId: string): Promise<UserEntity>;
  abstract findByName(name: string): Promise<UserEntity | null>;
}
