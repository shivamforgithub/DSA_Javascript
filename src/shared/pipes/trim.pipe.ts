import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { CustomBadRequestExceptionNew } from '../exceptions/custom-bad-request-new.exception';
import { getLogNameSpace } from '../helpers/common.helper';

@Injectable()
export class TrimPipe implements PipeTransform {
  private readonly logNameSpace = getLogNameSpace(TrimPipe);

  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.trim(values[key]);
      } else {
        if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }

    throw new CustomBadRequestExceptionNew(
      this.logNameSpace,
      'Validation failed',
    );
  }
}
