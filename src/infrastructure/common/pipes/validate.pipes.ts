import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidatePipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const body = plainToClass(metadata.metatype, value);
    const errors = await validate(body);
    if (errors.length !== 0) {
      const err = errors.map(el => {
        return `${el.property} - ${Object.values(el.constraints)}`
      });
      throw new HttpException(err, 400);
    };
    return value;
  };
};
