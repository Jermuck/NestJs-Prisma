export abstract class PostRepositoryAdapter<T>{
  abstract createPost(text: string, authorId: number): Promise<T>;
  abstract deletePost(postId: number): Promise<void>;
  abstract removePost(postId: number, text: string): Promise<T>;
  abstract getPostById(postId: number): Promise<T>;
  abstract getAllPostById(userId: number): Promise<T[]>;
};
