export interface UserI {
  id: number;
  username: string;
  password: string;
  iat?: number;
  exp?: number;
}
