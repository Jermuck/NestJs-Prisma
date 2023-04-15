import { DynamicModule, Module } from "@nestjs/common";
import { RepositoryModule } from "src/infrastructure/repository/repository.module";
import { DatabaseUserRepository } from "src/infrastructure/repository/UserRepository/user.repository";
import { GetUserByIdUseCase } from "./usecase-blocks/user.getById";

@Module({
  imports: [RepositoryModule]
})
export class UserUseCase {
  static GET_USER_BY_ID = "GET_USER_BY_ID";

  static register(): DynamicModule {
    return {
      module: UserUseCase,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: this.GET_USER_BY_ID,
          useFactory: (userRepo: DatabaseUserRepository) => new GetUserByIdUseCase(userRepo)
        }
      ],
      exports: [
        this.GET_USER_BY_ID
      ]
    };
  };
}
