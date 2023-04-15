import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseTokenRepository } from "src/infrastructure/repository/TokenRepository/token.repository";
import { DatabaseUserRepository } from "src/infrastructure/repository/UserRepository/user.repository";
import { BcryptService } from "src/infrastructure/services/BcryptService/bcrypt.service";
import { TokenService } from "src/infrastructure/services/JwtService/jwt.service";
import { RegisterUseCases } from "./usecases-blocks/register.usecase";
import { LoginUseCase } from "./usecases-blocks/login.usecase";
import { LogoutUseCase } from "./usecases-blocks/logout.usecase";
import { TokenModule } from "src/infrastructure/services/JwtService/jwt.module";
import { BcryptModule } from "src/infrastructure/services/BcryptService/bcrypt.module";
import { RepositoryModule } from "src/infrastructure/repository/repository.module";
import { RefreshUseCase } from "./usecases-blocks/refresh.usecase";

@Module({
  imports: [TokenModule, BcryptModule, RepositoryModule]
})
export class AuthUseCases {
  static REGISTER_USECASE_PROXY = "RegisterUseCaseProxy";
  static LOGIN_USECASE_PROXY = "LoginUseCaseProxy";
  static REFRESH_USECASE_PROXY = "RefreshUseCaseProxy";
  static LOGOUT_USECASE_PROXY = "LogoutUseCaseProxy";

  static register(): DynamicModule {
    return {
      module: AuthUseCases,
      providers: [
        {
          provide: this.REGISTER_USECASE_PROXY,
          inject: [TokenService, BcryptService, DatabaseUserRepository, DatabaseTokenRepository],
          useFactory: (
            jwt: TokenService,
            bcrypt: BcryptService,
            userRepo: DatabaseUserRepository,
            tokenRepo: DatabaseTokenRepository
          ) => new RegisterUseCases(jwt, bcrypt, userRepo, tokenRepo)
        },
        {
          provide: this.LOGIN_USECASE_PROXY,
          inject: [TokenService, BcryptService, DatabaseUserRepository, DatabaseTokenRepository],
          useFactory: (
            jwt: TokenService,
            bcrypt: BcryptService,
            userRepo: DatabaseUserRepository,
            tokenRepo: DatabaseTokenRepository
          ) => new LoginUseCase(jwt, bcrypt, userRepo, tokenRepo)
        },
        {
          provide: this.REFRESH_USECASE_PROXY,
          inject: [TokenService, DatabaseTokenRepository, DatabaseUserRepository],
          useFactory: (
            jwt: TokenService,
            tokenRepo: DatabaseTokenRepository,
            userRepo: DatabaseUserRepository
          ) => new RefreshUseCase(jwt, tokenRepo, userRepo)
        },
        {
          provide: this.LOGOUT_USECASE_PROXY,
          inject: [DatabaseTokenRepository],
          useFactory: (
            tokenRepo: DatabaseTokenRepository
          ) => new LogoutUseCase(tokenRepo),
        }
      ],
      exports: [
        AuthUseCases.LOGIN_USECASE_PROXY,
        AuthUseCases.REGISTER_USECASE_PROXY,
        AuthUseCases.LOGOUT_USECASE_PROXY,
        AuthUseCases.REFRESH_USECASE_PROXY
      ]
    }
  }
}
