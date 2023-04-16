export abstract class UserRepositoryAdapter<T> {
  abstract createUser(username: string, password: string): Promise<T>;
  abstract getUserByUsername(username: string): Promise<T>;
  abstract getUserById(userId: number): Promise<T>;
  abstract getAllUsers(): Promise<T[]>;
}
