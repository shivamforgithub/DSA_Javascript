import { customHttpExceptionFormatter } from '../custom-http-exception-formatter.util';
import {
  mockHttpException,
  mockFormattedError,
} from './test-data/custom-http-exception-formatter.util.testdata';

describe('customHttpExceptionFormatter', () => {
  it('Should return formatted error', () => {
    expect(customHttpExceptionFormatter(mockHttpException)).toEqual(
      mockFormattedError,
    );
  });
});
