import { validationExceptionFormatter } from '../validation-exception-formatter.util';
import {
  mockValidationException,
  mockFormattedError,
  mockValidationExceptionWithChildren,
  mockFormattedErrorWithChildren,
} from './test-data/validation-exception-formatter.util.testdata';

describe('validationExceptionFormatter', () => {
  it('Should return formatted error', () => {
    expect(validationExceptionFormatter(mockValidationException)).toEqual(
      mockFormattedError,
    );
  });

  it('Should return formatted error when validation error have children properties', () => {
    expect(
      validationExceptionFormatter(mockValidationExceptionWithChildren),
    ).toEqual(mockFormattedErrorWithChildren);
  });
});
