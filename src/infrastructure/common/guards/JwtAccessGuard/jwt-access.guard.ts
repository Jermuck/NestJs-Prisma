import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { TokenService } from "src/infrastructure/services/JwtService/jwt.service";

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwt: TokenService
  ) { };
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const access = req.headers.authorization.split(" ")[1];
      const { Refresh } = req.cookies;
      if (!access && !Refresh) {
        throw new UnauthorizedException();
      }
      const acCandidate = this.jwt.verifyToken(access, "accessToken");
      const rfCandidate = this.jwt.verifyToken(Refresh, "refreshToken");
      if (acCandidate.id !== rfCandidate.id || acCandidate.iat !== rfCandidate.iat) {
        throw new UnauthorizedException();
      }
      req.body = {
        ...req.body,
        _id: acCandidate.id
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
