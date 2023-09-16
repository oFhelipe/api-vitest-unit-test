import { UserEntity } from "../../entities/UserEntity";
import { UserRepository } from "../../repositories/UserRepository";
import { v4 as uuid } from "uuid";

export class InMemoryUserRepository implements UserRepository {
  public users: UserEntity[] = [];

  async create(userData: UserEntity): Promise<UserEntity> {
    const user = { id: uuid(), ...userData };
    this.users.push(user);
    return user;
  }

  async update(userId: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    this.users[userIndex] = { ...this.users[userIndex], ...user };

    return this.users[userIndex];
  }

  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  async index(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOrFail(userId: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Usuário não existe");
    }

    return user;
  }

  async find(userId: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  async findByName(name: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.name === name) ?? null;
  }
}
