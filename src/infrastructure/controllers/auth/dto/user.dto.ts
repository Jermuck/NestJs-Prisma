import { IsNotEmpty, Length } from "class-validator";

export class AuthDtoUser {
  @IsNotEmpty({ message: "This is field must be not empty" })
  @Length(5, 12, { message: "Uncorrect length" })
  public username: string;

  @Length(5, 12, { message: "Uncorrect length" })
  public password: string;

  public _id: number;
}
