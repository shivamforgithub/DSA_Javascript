// shared.module.ts
import { Module } from '@nestjs/common';
import { ConstantsModule } from './constants/constants.module';

@Module({
  imports: [ConstantsModule], // Import the ConstantsModule
  exports: [ConstantsModule], // Export the ConstantsModule to make it available for other modules
})
export class SharedModule {}
