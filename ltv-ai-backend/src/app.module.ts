import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalizationController } from './personalization/personalization.controller';
import { PersonalizationService } from './personalization/personalization.service';


@Module({
  imports: [],
  controllers: [PersonalizationController],
  providers: [PersonalizationService],
})
export class AppModule {}
