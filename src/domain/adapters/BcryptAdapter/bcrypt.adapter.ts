export interface BcryptAdapter{
  hash(password:string): Promise<string>;
  verify(password:string, hashPassword:string): Promise<boolean>;
}
