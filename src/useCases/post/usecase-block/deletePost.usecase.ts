import { HttpException } from "@nestjs/common";
import { PostRepositoryAdapter } from "src/domain/repository/PostRepository.interface";
import { Post } from "@prisma/client";

export class PostDeleteUseCase {
  constructor(
    private readonly PostRepository: PostRepositoryAdapter<Post>,
  ) { }

  public async execute(postId: number, userId: number): Promise<string> {
    const candidate = await this.PostRepository.getPostById(postId);
    if (!candidate || candidate.authorId !== userId) {
      throw new HttpException("This is post not found...", 400);
    };
    await this.PostRepository.deletePost(postId);
    return "Post success delete...";
  }
}
