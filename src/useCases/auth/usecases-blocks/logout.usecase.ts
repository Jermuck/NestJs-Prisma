import { Token } from "@prisma/client";
import { TokenRepositoryAdapter } from "src/domain/repository/tokenRepository.interface";

export class LogoutUseCase {
  constructor(
    private readonly TokenRepository: TokenRepositoryAdapter<Token>
  ) { };

  public async execute(userId: number): Promise<string> {
    await this.TokenRepository.removeToken(userId);
    return "Logout success";
  }
}
