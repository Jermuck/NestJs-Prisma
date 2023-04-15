import { Injectable } from "@nestjs/common";
import { Token } from "@prisma/client";
import { TokenRepositoryAdapter } from "src/domain/repository/tokenRepository.interface";
import { PrismaService } from "src/infrastructure/config/PrismaConfig/prisma.connect";

@Injectable()
export class DatabaseTokenRepository implements TokenRepositoryAdapter<Token> {
  constructor(private readonly prisma: PrismaService) { };

  public async saveToken(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.token.create({
      data: {
        userId: userId,
        token: refreshToken
      }
    });
  };

  public async updateToken(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.token.update({
      where: {
        userId: userId
      },
      data: {
        token: refreshToken
      }
    });
  };

  public async removeToken(userId: number): Promise<void> {
    await this.prisma.token.delete({
      where: {
        userId: userId
      }
    });
  };

  public async getTokenByUserId(userId: number): Promise<Token> {
    try {
      const token = await this.prisma.token.findUnique({
        where: {
          userId: userId
        }
      });
      return token;
    } catch (err) {
      return null;
    }
  }
};
