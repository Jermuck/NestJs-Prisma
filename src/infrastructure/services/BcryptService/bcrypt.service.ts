import { Injectable } from "@nestjs/common";
import { BcryptAdapter } from "src/domain/adapters/BcryptAdapter/bcrypt.adapter";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptService implements BcryptAdapter{
  private readonly salt:number = 3;

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  };

  public async verify(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  };
};
