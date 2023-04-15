import { UserI } from "../../model/user.interface";

type TypeJwt = "accessToken" | "refreshToken";

export interface JwtAdapter{
  generateToken(user:UserI):[string, string];
  verifyToken(token:string, type:TypeJwt):UserI;
};
