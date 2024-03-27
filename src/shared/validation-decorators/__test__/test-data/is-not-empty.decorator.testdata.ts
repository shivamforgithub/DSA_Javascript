import { IsNotEmpty } from '../../is-not-empty.decorator';

class StudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty({ each: true })
  enrolledCourses: string[];

  constructor(firstName: string, enrolledCourses: string[]) {
    this.firstName = firstName;
    this.enrolledCourses = enrolledCourses;
  }
}

export const mockTestDto = new StudentDto('John', ['MA-101', 'CS-201']);
export const mockTestDtoWithInvalidFirstName = new StudentDto('', [
  'MA-101',
  'CS-201',
]);

export const mockTestDtoWithInvalidCourses = new StudentDto('John', [
  '',
  'CS-201',
]);

export const mockValidationErrorForString = {
  isNotEmpty: 'firstName must not be empty',
};

export const mockValidationErrorForStringArray = {
  isNotEmpty: 'each value in enrolledCourses must not be empty',
};
