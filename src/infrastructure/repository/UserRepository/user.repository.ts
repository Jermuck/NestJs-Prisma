import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepositoryAdapter } from "src/domain/repository/UserRepository.interface";
import { PrismaService } from "src/infrastructure/config/PrismaConfig/prisma.connect";

@Injectable()
export class DatabaseUserRepository implements UserRepositoryAdapter<User>{
  constructor(private readonly prisma: PrismaService) { };

  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (err) {
      return null;
    }
  }

  public async createUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          password
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  };

  public async getUserByUsername(username: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  };

  public async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  }
};
