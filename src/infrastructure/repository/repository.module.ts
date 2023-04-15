import { Module } from "@nestjs/common";
import { PrismaModule } from "../config/PrismaConfig/prisma.module";
import { DatabasePostsRepository } from "./PostRepository/posts.repository";
import { DatabaseTokenRepository } from "./TokenRepository/token.repository";
import { DatabaseUserRepository } from "./UserRepository/user.repository";

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseUserRepository,
    DatabaseTokenRepository,
    DatabasePostsRepository
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseTokenRepository,
    DatabasePostsRepository
  ]
})
export class RepositoryModule { };
