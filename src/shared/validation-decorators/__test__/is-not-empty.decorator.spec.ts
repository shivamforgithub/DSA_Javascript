import { Validator, ValidationError } from 'class-validator';

import {
  mockTestDto,
  mockTestDtoWithInvalidFirstName,
  mockValidationErrorForString,
  mockTestDtoWithInvalidCourses,
  mockValidationErrorForStringArray,
} from './test-data/is-not-empty.decorator.testdata';

describe('IsNotEmpty', () => {
  const validator = new Validator();

  it('Should validate DTO successfully', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(
      mockTestDto,
    );

    expect(validatorErrors.length).toEqual(0);
  });

  it('Should fail DTO validation if the string is empty', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(
      mockTestDtoWithInvalidFirstName,
    );

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual(
      mockValidationErrorForString,
    );
  });

  it('Should fail DTO validation if string array has empty strings', async () => {
    const validatorErrors: ValidationError[] = await validator.validate(
      mockTestDtoWithInvalidCourses,
    );

    expect(validatorErrors.length).toEqual(1);
    expect(validatorErrors[0].constraints).toEqual(
      mockValidationErrorForStringArray,
    );
  });
});
