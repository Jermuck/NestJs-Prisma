import { Post } from "@prisma/client";
import { PostRepositoryAdapter } from "src/domain/repository/PostRepository.interface";
import { PostDto } from "src/infrastructure/controllers/post/dto/post.dto";

export class PostCreateUseCase {
  constructor(
    private readonly PostRepository: PostRepositoryAdapter<Post>
  ) { };

  public async execute(dto: PostDto): Promise<Post> {
    const post = await this.PostRepository.createPost(dto.text, dto._id);
    return post;
  };
}
