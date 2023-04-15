import { HttpException } from "@nestjs/common";
import { Token, User } from "@prisma/client";
import { BcryptAdapter } from "src/domain/adapters/BcryptAdapter/bcrypt.adapter";
import { JwtAdapter } from "src/domain/adapters/JwtAdapter/jwt.adapter";
import { JwtConfig } from "src/domain/config/JwtConfig";
import { TokenRepositoryAdapter } from "src/domain/repository/tokenRepository.interface";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";
import { AuthDtoUser } from "src/infrastructure/controllers/auth/dto/user.dto";

export class RegisterUseCases {
  constructor(
    private readonly jwt: JwtAdapter,
    private readonly bcrypt: BcryptAdapter,
    private readonly UserRepository: UserRepositoryAdapter<User>,
    private readonly TokenRepository: TokenRepositoryAdapter<Token>
  ) { };

  public async execute(user: AuthDtoUser): Promise<[string, string]> {
    const candidate = await this.UserRepository.getUserByUsername(user.username);
    if (candidate) {
      throw new HttpException("This user is login already...", 400);
    };
    const hashPassword = await this.bcrypt.hash(user.password);
    const newUser = await this.UserRepository.createUser(user.username, hashPassword);
    const [ac, rf] = this.jwt.generateToken({ ...newUser });
    await this.TokenRepository.saveToken(newUser.id, rf);
    const cookie = `Refresh=${rf}; HttpOnly; Path=/; Max-Age=${JwtConfig.refreshToken.expIn} SameSite=Strict`;
    return [ac, cookie];
  }
};

