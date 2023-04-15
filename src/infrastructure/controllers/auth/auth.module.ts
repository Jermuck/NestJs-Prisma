import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { TokenModule } from "src/infrastructure/services/JwtService/jwt.module";
import { AuthUseCases } from "src/useCases/auth/auth.usecase";

@Module({
  controllers: [AuthController],
  imports: [
    TokenModule,
    AuthUseCases.register()
  ]
})
export class AuthModule { };
