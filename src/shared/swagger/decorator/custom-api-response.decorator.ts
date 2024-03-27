import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function CustomApiResponse(options: {
  status?: number;
  type: any;
  description?: string;
}) {
  return applyDecorators(
    ApiExtraModels(options.type),
    ApiResponse({
      status: options.status || 200,
      schema: {
        allOf: [
          {
            properties: {
              code: {
                type: 'string',
                example: 'SUCCESS',
              },
              message: {
                type: 'string',
                example: 'Success',
              },
              data: {
                $ref: getSchemaPath(options.type),
              },
            },
          },
        ],
      },
      description: options.description,
    }),
  );
}
