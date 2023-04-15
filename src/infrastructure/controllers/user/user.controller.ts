import { Body, Controller, HttpCode, Inject, Get, UseGuards } from "@nestjs/common";
import { JwtAccessGuard } from "src/infrastructure/common/guards/JwtAccessGuard/jwt-access.guard";
import { GetUserByIdUseCase } from "src/useCases/user/usecase-blocks/user.getById";
import { UserUseCase } from "src/useCases/user/user.usecase";
import { AuthDtoUser } from "../auth/dto/user.dto";

@Controller("/api/user")
export class UserController {
  constructor(
    @Inject(UserUseCase.GET_USER_BY_ID) private readonly getById: GetUserByIdUseCase
  ) { };

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  public async getUserById(@Body() dto: AuthDtoUser) {
    const user = await this.getById.execute(dto._id);
    return user;
  }
}
