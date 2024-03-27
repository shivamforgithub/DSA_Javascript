import { CustomBadRequestExceptionNew } from '../../exceptions/custom-bad-request-new.exception';
import { FileValidationPipe } from '../file-validation.pipe';

const file = {
  mimetype: 'image/png',
  originalname: 'test.png',
  size: 10000,
};
const options = { optional: true };
describe('FileValidationPipe', () => {
  let pipe: FileValidationPipe;

  beforeEach(() => {
    pipe = new FileValidationPipe();
  });

  describe('transform', () => {
    it('should return the value if it passes validation', () => {
      const result = pipe.transform(file, options as any);
      expect(result).toEqual(file);
    });

    it('should throw error while file is null', () => {
      const invalidFile = null;
      expect(() => pipe.transform(invalidFile, options as any)).toThrowError(
        CustomBadRequestExceptionNew,
      );
    });
  });

  describe('Empty file name', () => {
    it('should throw an error for empty file names', () => {
      const fileValidationPipe = new FileValidationPipe(20000, [
        'image/jpeg',
        'image/png',
      ]);
      const fileWithEmptyName = { ...file, originalname: '' };

      expect(() =>
        fileValidationPipe.transform(fileWithEmptyName, options as any),
      ).toThrow('Empty file name');
    });
  });

  describe('File size within limits', () => {
    it('should allow files within the size limit', () => {
      const fileValidationPipe = new FileValidationPipe(20000);

      expect(fileValidationPipe.transform(file, options as any)).toBe(file);
    });

    it('should throw an error for files exceeding the size limit', () => {
      const fileValidationPipe = new FileValidationPipe(1000);

      expect(() => fileValidationPipe.transform(file, options as any)).toThrow(
        'File size exceeds the maximum limit of 1000 bytes',
      );
    });
  });
});

describe('valid file types', () => {
  it('should allow valid file type', () => {
    const pipe = new FileValidationPipe(20000, ['image/jpeg', 'image/png']);

    expect(pipe.transform(file, options as any)).toBe(file);
  });

  it('should throw an error for invalid file type', () => {
    const pipe = new FileValidationPipe(20000, 'application/pdf');
    expect(() => pipe.transform(file, options as any)).toThrow(
      'Validation failed (expected type is application/pdf)',
    );
  });

  it('should allow valid file types', () => {
    const pipe = new FileValidationPipe(20000, ['image/jpeg', 'image/png']);

    expect(pipe.transform(file, options as any)).toBe(file);
  });

  it('should throw an error for invalid file types', () => {
    const pipe = new FileValidationPipe(20000, [
      'application/pdf',
      'image/jpeg',
    ]);
    expect(() => pipe.transform(file, options as any)).toThrow(
      'Validation failed (expected types are application/pdf, image/jpeg)',
    );
  });
});
