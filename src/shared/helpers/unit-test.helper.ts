import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CustomHttpExceptionFilter } from '../filters/custom-http-exception.filter';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';

export const mockApp = (moduleFixture): INestApplication => {
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new CustomHttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  return app;
};
