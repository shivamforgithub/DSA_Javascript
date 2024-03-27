import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
  skipMissingProperties: true,
  validationError: {
    target: false,
    value: true,
  },
};
