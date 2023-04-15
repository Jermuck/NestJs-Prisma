import { Module } from "@nestjs/common";
import { TokenModule } from "src/infrastructure/services/JwtService/jwt.module";
import { UserUseCase } from "src/useCases/user/user.usecase";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  imports: [UserUseCase.register(), TokenModule]
})
export class UserModule { }
