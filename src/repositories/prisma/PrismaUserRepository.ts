import { UserEntity } from "../../entities/UserEntity";
import { prisma } from "../../libs/prisma";
import { UserRepository } from "../UserRepository";

export class PrismaUserRepository implements UserRepository {
  async create(userData: UserEntity): Promise<UserEntity> {
    return await prisma.user.create({
      data: userData,
    });
  }
  async update(userId: string, user: Partial<UserEntity>): Promise<UserEntity> {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  }
  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
  async index(): Promise<UserEntity[]> {
    return await prisma.user.findMany();
  }

  async findOrFail(userId: string): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não existe");
    }

    return user;
  }

  async find(userId: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findByName(name: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    return user;
  }
}
