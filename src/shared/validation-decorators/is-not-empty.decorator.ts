import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    const defaultValidationOptions: ValidationOptions = {
      always: true,
    };

    registerDecorator({
      name: 'isNotEmpty',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions || defaultValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            validationOptions &&
            validationOptions.each &&
            value instanceof Array
          ) {
            return value.every((arrayItem: string) => {
              return (
                typeof arrayItem === 'string' && arrayItem.trim().length > 0
              );
            });
          }

          return typeof value === 'string' && value.trim().length > 0;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          let defaultMessage = `${propertyName} must not be empty`;

          if (validationOptions && validationOptions.each) {
            defaultMessage = `each value in ${propertyName} must not be empty`;
          }

          return defaultMessage;
        },
      },
    });
  };
}
