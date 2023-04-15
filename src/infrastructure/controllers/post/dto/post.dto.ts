import { Length } from "class-validator";

export class PostDto {
  _id: number;

  @Length(5, 11, { message: "Uncorrect length" })
  text: string;
}
