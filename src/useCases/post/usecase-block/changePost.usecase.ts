import { HttpException } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PostRepositoryAdapter } from "src/domain/repository/PostRepository.interface";

export class PostChangeUseCase {
  constructor(
    private readonly PostRepository: PostRepositoryAdapter<Post>
  ) { };

  public async execute(postId: number, text: string): Promise<Post> {
    const post = await this.PostRepository.getPostById(postId);
    if (!post) {
      throw new HttpException("This is post not founded....", 400);
    };
    const updatePost = await this.PostRepository.removePost(post.id, text);
    return updatePost;
  }
}
