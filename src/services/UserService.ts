import { z } from "zod";
import { UserRepository } from "../repositories/UserRepository";

interface CreateUpdateUserRequest {
  name: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async delete(userId: string) {
    await this.userRepository.findOrFail(userId)
    return await this.userRepository.delete(userId);
  }

  async show(userId: string) {
    return await this.userRepository.find(userId);
  }

  async index() {
    return await this.userRepository.index();
  }

  async create(args: CreateUpdateUserRequest) {
    const bodySchema = z.object({
      name: z.string(),
      password: z.string(),
    });

    const validationResult = await bodySchema.safeParseAsync(args);

    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message);
    }

    const userData = validationResult.data;

    const user = await this.userRepository.findByName(userData.name);

    if (user) {
      throw new Error("Usuário já existe");
    }

    return await this.userRepository.create(userData);
  }

  async update(userId: string, args: CreateUpdateUserRequest) {
    const bodySchema = z.object({
      name: z.string(),
      password: z.string(),
    });

    const validationResult = await bodySchema.safeParseAsync(args);

    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message);
    }

    const userData = validationResult.data;

    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new Error("Usuário não existe");
    }

    return await this.userRepository.update(userId, userData);
  }
}
