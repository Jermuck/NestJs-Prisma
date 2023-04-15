import { PostRepositoryAdapter } from "src/domain/repository/PostRepository.interface";
import { Post } from "@prisma/client";
import { PrismaService } from "src/infrastructure/config/PrismaConfig/prisma.connect";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabasePostsRepository implements PostRepositoryAdapter<Post>{
  constructor(
    private readonly prisma: PrismaService,
  ) { };

  public async createPost(text: string, authorId: number): Promise<Post> {
    try {
      const post = await this.prisma.post.create({
        data: {
          authorId: authorId,
          text,
        }
      });
      return post;
    } catch (err) {
      return null;
    }
  };

  public async removePost(postId: number, text: string): Promise<Post> {
    const post = await this.prisma.post.update({
      where: {
        id: postId
      },
      data: {
        text
      }
    });
    return post;
  };

  public async deletePost(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id: postId
      }
    });
  };

  public async getPostById(postId: number): Promise<Post> {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: postId
        }
      });
      return post;
    } catch (err) {
      return null;
    };
  }

  public async getAllPostById(userId: number): Promise<Post[]> {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: userId
        }
      });
      return posts;
    } catch (err) {
      return null;
    }
  }
}
