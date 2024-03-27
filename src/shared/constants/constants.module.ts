import { Module } from '@nestjs/common';
import * as constants from 'constants';

@Module({
  providers: [
    {
      provide: 'CONSTANTS',
      useValue: constants,
    },
  ],
  exports: ['CONSTANTS'],
})
export class ConstantsModule {}