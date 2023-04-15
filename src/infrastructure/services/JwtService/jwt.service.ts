import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAdapter } from "src/domain/adapters/JwtAdapter/jwt.adapter";
import { UserI } from "src/domain/model/user.interface";
import { JwtConfig } from "src/domain/config/JwtConfig";

@Injectable()
export class TokenService implements JwtAdapter {
  constructor(private readonly jwt: JwtService) { };

  public generateToken(payload: UserI): [string, string] {
    const rf = this.jwt.sign(payload, {
      secret: JwtConfig.refreshToken.secret,
      expiresIn: JwtConfig.refreshToken.expIn
    });

    const ac = this.jwt.sign(payload, {
      secret: JwtConfig.accessToken.secret,
      expiresIn: JwtConfig.accessToken.expIn
    });

    return [ac, rf]
  };

  public verifyToken(token: string, type: "accessToken" | "refreshToken"): UserI {
    try {
      const user = this.jwt.verify(token, {
        secret: JwtConfig[type].secret
      });
      return user;
    } catch (err) {
      return null;
    }
  }
};
