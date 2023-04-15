import { HttpException } from "@nestjs/common";
import { Token, User } from "@prisma/client";
import { JwtAdapter } from "src/domain/adapters/JwtAdapter/jwt.adapter";
import { JwtConfig } from "src/domain/config/JwtConfig";
import { TokenRepositoryAdapter } from "src/domain/repository/tokenRepository.interface";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";

export class RefreshUseCase {
  constructor(
    private readonly jwt: JwtAdapter,
    private readonly TokenRepository: TokenRepositoryAdapter<Token>,
    private readonly UserRepository: UserRepositoryAdapter<User>
  ) { };
  public async execute(userId: number): Promise<[string, string]> {
    const user = await this.UserRepository.getUserById(userId);
    if (!user) {
      throw new HttpException("This is user not founded...", 400);
    };
    const [ac, rf] = this.jwt.generateToken({ ...user });
    await this.TokenRepository.updateToken(user.id, rf);
    const cookie = `Refresh=${rf}; HttpOnly; Path=/; Max-Age=${JwtConfig.refreshToken.expIn} SameSite=None`;
    return [ac, cookie];
  };
};
