import { ApiProperty } from '@nestjs/swagger';

export class CustomFailureResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;
}
