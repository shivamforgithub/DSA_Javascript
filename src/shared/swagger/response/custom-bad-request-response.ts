import { ApiProperty } from '@nestjs/swagger';

export class CustomBadRequestResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: ['variable must be a string'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
