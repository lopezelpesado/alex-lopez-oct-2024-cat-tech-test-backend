import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommsController } from './comms/comms.controller';

@Module({
  imports: [],
  controllers: [AppController, CommsController],
  providers: [AppService],
})
export class AppModule {}
