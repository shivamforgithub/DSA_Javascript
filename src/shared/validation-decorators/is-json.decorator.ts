import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsJSON(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    const defaultValidationOptions: ValidationOptions = {
      always: true,
    };

    registerDecorator({
      name: 'isJSON',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions || defaultValidationOptions,
      validator: {
        validate(value: any) {
          try {
            JSON.parse(JSON.stringify(value));
            return true;
          } catch (error) {
            return false;
          }
        },
        defaultMessage() {
          return `${propertyName} must be a valid JSON`;
        },
      },
    });
  };
}
