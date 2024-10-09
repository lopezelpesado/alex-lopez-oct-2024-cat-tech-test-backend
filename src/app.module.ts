import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommsController } from './comms/comms.controller';
import { CommsService } from './comms/comms.service';

@Module({
  imports: [],
  controllers: [AppController, CommsController],
  providers: [AppService, CommsService],
})
export class AppModule {}
