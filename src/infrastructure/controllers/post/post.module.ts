import { Module } from "@nestjs/common";
import { TokenModule } from "src/infrastructure/services/JwtService/jwt.module";
import { PostUseCaseModule } from "src/useCases/post/post.usecase";
import { PostController } from "./post.controller";

@Module({
  controllers: [PostController],
  imports: [
    PostUseCaseModule.register(),
    TokenModule
  ],
})
export class PostModule { };
