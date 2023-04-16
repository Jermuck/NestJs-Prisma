import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAccessGuard } from "src/infrastructure/common/guards/JwtAccessGuard/jwt-access.guard";
import { ValidatePipe } from "src/infrastructure/common/pipes/validate.pipes";
import { PostUseCaseModule } from "src/useCases/post/post.usecase";
import { PostChangeUseCase } from "src/useCases/post/usecase-block/changePost.usecase";
import { PostCreateUseCase } from "src/useCases/post/usecase-block/createPost.usecase";
import { PostDeleteUseCase } from "src/useCases/post/usecase-block/deletePost.usecase";
import { getAllPosts } from "src/useCases/post/usecase-block/getAllPosts.usecase";
import { PostDto } from "./dto/post.dto";

@Controller("/api/posts")
export class PostController {
  constructor(
    @Inject(PostUseCaseModule.POST_CREATE)
    private readonly create: PostCreateUseCase,
    @Inject(PostUseCaseModule.POST_CHANGE)
    private readonly removePost: PostChangeUseCase,
    @Inject(PostUseCaseModule.POST_DELETE)
    private readonly deletePost: PostDeleteUseCase,
    @Inject(PostUseCaseModule.POST_GET_ALL)
    private readonly getAllPosts: getAllPosts,
  ) { };

  @UsePipes(ValidatePipe)
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  @Post("/create")
  public async Create(@Body() dto: PostDto) {
    const post = await this.create.execute(dto);
    return post;
  };

  @UseGuards(JwtAccessGuard)
  @Delete("/delete/:id")
  public async Delete(@Param("id") id: number, @Body() dto: PostDto) {
    const message = await this.deletePost.execute(Number(id), dto._id);
    return message;
  };

  @UsePipes(ValidatePipe)
  @UseGuards(JwtAccessGuard)
  @Put("/change/:id")
  public async Change(@Param("id") id: number, @Body() dto: PostDto) {
    const post = await this.removePost.execute(Number(id), dto.text);
    return post;
  };

  @UseGuards(JwtAccessGuard)
  @Get("/all")
  public async GetAll(@Body() dto: PostDto) {
    const posts = await this.getAllPosts.execute(dto._id);
    return posts;
  }
}
