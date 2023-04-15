import { Body, Controller, Post, Res, UseGuards, Get, HttpCode, UsePipes, Inject } from "@nestjs/common";
import { AuthDtoUser } from "./dto/user.dto";
import { Response } from "express";
import { JwtRefreshGuard } from "src/infrastructure/common/guards/JwtRefreshGuard/jwt-refresh.guard";
import { JwtAccessGuard } from "src/infrastructure/common/guards/JwtAccessGuard/jwt-access.guard";
import { ValidatePipe } from "src/infrastructure/common/pipes/validate.pipes";
import { AuthUseCases } from "src/useCases/auth/auth.usecase";
import { RegisterUseCases } from "src/useCases/auth/usecases-blocks/register.usecase";
import { LoginUseCase } from "src/useCases/auth/usecases-blocks/login.usecase";
import { RefreshUseCase } from "src/useCases/auth/usecases-blocks/refresh.usecase";
import { LogoutUseCase } from "src/useCases/auth/usecases-blocks/logout.usecase";

@Controller("/api")
export class AuthController {
  constructor(
    @Inject(AuthUseCases.REGISTER_USECASE_PROXY)
    private readonly register: RegisterUseCases,
    @Inject(AuthUseCases.LOGIN_USECASE_PROXY)
    private readonly login: LoginUseCase,
    @Inject(AuthUseCases.REFRESH_USECASE_PROXY)
    private readonly refresh: RefreshUseCase,
    @Inject(AuthUseCases.LOGOUT_USECASE_PROXY)
    private readonly logout: LogoutUseCase
  ) { };

  @UsePipes(ValidatePipe)
  @HttpCode(200)
  @Post("/register")
  public async Auth(@Body() dto: AuthDtoUser, @Res({ passthrough: true }) res: Response) {
    const [ac, rf] = await this.register.execute(dto);
    res.setHeader("Set-cookie", rf);
    return { access: ac, username: dto.username };
  };

  @UsePipes(ValidatePipe)
  @HttpCode(200)
  @Post("/login")
  public async Login(@Body() dto: AuthDtoUser, @Res({ passthrough: true }) res: Response) {
    const [ac, rf] = await this.login.execute(dto);
    res.setHeader("Set-cookie", rf);
    return ac;
  };

  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  @Post("/logout")
  public async Logout(@Body() dto: AuthDtoUser, @Res({ passthrough: true }) res: Response) {
    const msg = await this.logout.execute(dto._id);
    res.clearCookie("Refresh");
    return msg;
  };

  @UseGuards(JwtRefreshGuard)
  @Get("/refresh")
  public async Refresh(@Body() dto: AuthDtoUser, @Res({ passthrough: true }) res: Response) {
    const [ac, rf] = await this.refresh.execute(dto._id);
    res.setHeader("Set-cookie", rf);
    return ac;
  };
};
