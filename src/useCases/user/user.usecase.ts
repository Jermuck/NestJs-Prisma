import { DynamicModule, Module } from "@nestjs/common";
import { RepositoryModule } from "src/infrastructure/repository/repository.module";
import { DatabaseUserRepository } from "src/infrastructure/repository/UserRepository/user.repository";
import { GetAllUsersUseCase } from "./usecase-blocks/user.getAll";
import { GetUserByIdUseCase } from "./usecase-blocks/user.getById";

@Module({
  imports: [RepositoryModule]
})
export class UserUseCase {
  static GET_USER_BY_ID = "GET_USER_BY_ID";
  static GET_ALL_USERS = "GET_ALL_USERS";

  static register(): DynamicModule {
    return {
      module: UserUseCase,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: this.GET_USER_BY_ID,
          useFactory: (userRepo: DatabaseUserRepository) => new GetUserByIdUseCase(userRepo)
        },
        {
          inject: [DatabaseUserRepository],
          provide: this.GET_ALL_USERS,
          useFactory: (userRepo: DatabaseUserRepository) => new GetAllUsersUseCase(userRepo)
        }
      ],
      exports: [
        this.GET_USER_BY_ID,
        this.GET_ALL_USERS
      ]
    };
  };
}
