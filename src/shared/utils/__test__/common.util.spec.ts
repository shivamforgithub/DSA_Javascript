import { getDateInYYYYMMDDFormat } from '../common.util';
import {
  mockDate1,
  mockFormattedDate1,
  mockFormattedDate2,
  mockDate2,
} from './test-data/common.util.testdata';

describe('Common utility functions', () => {
  describe('getDateInYYYYMMDDFormat', () => {
    it('Should return date in YYYYMMDD format', () => {
      expect(getDateInYYYYMMDDFormat(mockDate1)).toEqual(mockFormattedDate1);

      expect(getDateInYYYYMMDDFormat(mockDate2)).toEqual(mockFormattedDate2);
    });
  });
});
