import { User } from "@prisma/client";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";

export class GetAllUsersUseCase {
  constructor(private readonly userRepo: UserRepositoryAdapter<User>) { };

  public async execute(): Promise<User[]> {
    const users = await this.userRepo.getAllUsers();
    return users;
  };
};

