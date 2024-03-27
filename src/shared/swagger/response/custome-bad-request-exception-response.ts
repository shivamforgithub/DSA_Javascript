import { ApiProperty } from '@nestjs/swagger';

export class CustomBadRequestExceptionResponse {
  @ApiProperty({ example: 'ERR_INVALID' })
  code: string;

  @ApiProperty({
    example: 'variable must be a string',
  })
  message: string;

  @ApiProperty({ example: 'Exception related data' })
  data: string;
}
