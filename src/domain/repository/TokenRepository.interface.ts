export abstract class TokenRepositoryAdapter<T>{
  abstract saveToken(userId: number, refreshToken: string): Promise<void>;
  abstract updateToken(userId: number, refreshToken: string): Promise<void>;
  abstract removeToken(userId: number): Promise<void>;
  abstract getTokenByUserId(userId: number): Promise<T>;
};
