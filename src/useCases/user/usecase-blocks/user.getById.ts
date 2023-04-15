import { HttpException } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";

export class GetUserByIdUseCase {
  constructor(
    private readonly UserRepo: UserRepositoryAdapter<User>
  ) { };

  public async execute(id: number): Promise<User> {
    const user = await this.UserRepo.getUserById(id);
    if (!user) {
      throw new HttpException("This is user not founded...", 400);
    };
    return user;
  };
};
