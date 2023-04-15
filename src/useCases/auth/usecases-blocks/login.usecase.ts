import { HttpException } from "@nestjs/common";
import { Token, User } from "@prisma/client";
import { BcryptAdapter } from "src/domain/adapters/BcryptAdapter/bcrypt.adapter";
import { JwtAdapter } from "src/domain/adapters/JwtAdapter/jwt.adapter";
import { JwtConfig } from "src/domain/config/JwtConfig";
import { TokenRepositoryAdapter } from "src/domain/repository/tokenRepository.interface";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";
import { AuthDtoUser } from "src/infrastructure/controllers/auth/dto/user.dto";

export class LoginUseCase {
  constructor(
    private readonly jwt: JwtAdapter,
    private readonly bcrypt: BcryptAdapter,
    private readonly UserRepository: UserRepositoryAdapter<User>,
    private readonly TokenRepository: TokenRepositoryAdapter<Token>
  ) { };

  public async execute(user: AuthDtoUser): Promise<[string, string]> {
    const validate = await this.UserRepository.getUserByUsername(user.username);
    if (!validate) {
      throw new HttpException("This is user not login...", 400);
    };
    const candidatePassword = await this.bcrypt.verify(user.password, validate.password);
    if (!candidatePassword) {
      throw new HttpException("Not verify password", 400);
    };
    const token = await this.TokenRepository.getTokenByUserId(validate.id);
    const [ac, rf] = this.jwt.generateToken({ ...validate });
    if (token) {
      await this.TokenRepository.updateToken(validate.id, rf);
    } else {
      await this.TokenRepository.saveToken(validate.id, rf);
    };
    const cookie = `Refresh=${rf}; HttpOnly; Path=/; Max-Age=${JwtConfig.refreshToken.expIn} SameSite=Strict`;
    return [ac, cookie];
  };
}
