import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { TokenService } from "src/infrastructure/services/JwtService/jwt.service";

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly jwt: TokenService) { };

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const { Refresh } = req.cookies;
    if (!Refresh) {
      throw new UnauthorizedException();
    };
    const validate = this.jwt.verifyToken(Refresh, "refreshToken");
    if (!validate) {
      throw new UnauthorizedException();
    };
    req.body = {
      ...req.body,
      _id: validate.id
    };
    return true;
  }
}
