import { DynamicModule, Module } from "@nestjs/common";
import { DatabasePostsRepository } from "src/infrastructure/repository/PostRepository/posts.repository";
import { RepositoryModule } from "src/infrastructure/repository/repository.module";
import { PostChangeUseCase } from "./usecase-block/changePost.usecase";
import { PostCreateUseCase } from "./usecase-block/createPost.usecase";
import { PostDeleteUseCase } from "./usecase-block/deletePost.usecase";
import { getAllPosts } from "./usecase-block/getAllPosts.usecase";

@Module({
  imports: [RepositoryModule]
})
export class PostUseCaseModule {
  static POST_CREATE = "PostCreate";
  static POST_DELETE = "PostDelete";
  static POST_CHANGE = "PostChange";
  static POST_GET_ALL = "PostGetAll";

  static register(): DynamicModule {
    return {
      module: PostUseCaseModule,
      providers: [
        {
          inject: [DatabasePostsRepository],
          provide: this.POST_CREATE,
          useFactory: (repo: DatabasePostsRepository) => new PostCreateUseCase(repo)
        },
        {
          inject: [DatabasePostsRepository],
          provide: this.POST_DELETE,
          useFactory: (repo: DatabasePostsRepository) => new PostDeleteUseCase(repo)
        },
        {
          inject: [DatabasePostsRepository],
          provide: this.POST_CHANGE,
          useFactory: (repo: DatabasePostsRepository) => new PostChangeUseCase(repo)
        },
        {
          inject: [DatabasePostsRepository],
          provide: this.POST_GET_ALL,
          useFactory: (repo: DatabasePostsRepository) => new getAllPosts(repo)
        }
      ],
      exports: [
        this.POST_DELETE,
        this.POST_CHANGE,
        this.POST_CREATE,
        this.POST_GET_ALL
      ]
    }
  }
}
