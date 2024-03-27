// app.module.ts or any other module
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule], // Import SharedModule
  // Other module configurations...
})
export class AppModule {}
