import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { validatorOptions } from '../options/validator.options';
import { Logger } from '../logger/logger.service';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logNamespace = `pipe.${ValidationPipe.name.toLowerCase()}`;

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, validatorOptions);

    if (errors.length > 0) {
      Logger.warn(
        `${this.logNamespace}.transform.warned`,
        `Validation failed for ${metatype.name
        }: validation errors - ${JSON.stringify(errors)}`,
      );

      throw new ValidationException(errors);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
