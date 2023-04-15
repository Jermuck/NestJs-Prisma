import { HttpException, } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PostRepositoryAdapter } from "src/domain/repository/PostRepository.interface";

export class getAllPosts {
  constructor(
    private readonly PostsRepostiory: PostRepositoryAdapter<Post>
  ) { };

  public async execute(userId: number): Promise<Post[]> {
    const posts = await this.PostsRepostiory.getAllPostById(userId);
    if (posts.length === 0) {
      throw new HttpException("This is user have 0 posts", 400);
    };
    return posts;
  }
}
