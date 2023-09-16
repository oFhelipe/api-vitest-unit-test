import { it, describe, expect } from "vitest";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
import { UserService } from "../../services/UserService";
import { v4 as uuid } from 'uuid'

describe("User - index", () => {
  it("should be able to create a new user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new UserService(inMemoryUserRepository);

    await userService.create({
      name: "nome",
      password: "1234",
    })

    expect(inMemoryUserRepository.users.length).toBe(1);
    expect(inMemoryUserRepository.users[0]).toEqual(
      expect.objectContaining({
        name: "nome",
        password: "1234",
      })
    );
  });

  it("should be able to list all users", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new UserService(inMemoryUserRepository);

    const previouslyCreatedUsers = [
      {
        id: uuid(),
        name: 'nome1',
        password: '1234'
      },
      {
        id: uuid(),
        name: 'nome2',
        password: '1234'
      }
    ]

    inMemoryUserRepository.users = previouslyCreatedUsers

    const users = userService.index()
    expect(inMemoryUserRepository.users.length).toEqual((await users).length);
    expect(inMemoryUserRepository.users).toEqual(
      expect.arrayContaining(previouslyCreatedUsers)
    );
  });
  
  it('should be able to list a specific user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const userService = new UserService(inMemoryUserRepository)

    const previouslyCreatedUsers = [
      {
        id: uuid(),
        name: 'nome1',
        password: '1234'
      },
      {
        id: uuid(),
        name: 'nome2',
        password: '1234'
      }
    ]

    inMemoryUserRepository.users = previouslyCreatedUsers

    const expectedUser = previouslyCreatedUsers[0]

    const user = await userService.show(expectedUser.id)

    expect(user).toEqual(expectedUser)
  })
});
