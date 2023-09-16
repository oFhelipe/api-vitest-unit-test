import { Request, Response } from "express";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const userRepository = new PrismaUserRepository();
      const userService = new UserService(userRepository);

      const createdUser = await userService.create(request.body);

      return response.status(201).json({
        result: createdUser,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userRepository = new PrismaUserRepository();
      const userService = new UserService(userRepository);

      const updatedUser = await userService.update(id, request.body);

      return response.status(201).json({
        result: updatedUser,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async index(_: Request, response: Response) {
    const userRepository = new PrismaUserRepository();
    const userService = new UserService(userRepository);
    const users = await userService.index();
    return response.json({
      result: users,
    });
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = new PrismaUserRepository();
      const userService = new UserService(userRepository);

      const user = await userService.show(id);

      return response.json({
        result: user,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = new PrismaUserRepository();
      const userService = new UserService(userRepository);

      await userService.delete(id);

      return response.json({
        result: "Usuário deletado com sucesso",
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
