import { Module } from "@nestjs/common";
import { TokenService } from "./jwt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers:[TokenService],
  imports:[JwtModule.register({})],
  exports:[TokenService]
})
export class TokenModule{};
