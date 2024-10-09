import { Controller, Get } from '@nestjs/common';
import { CommsService } from './comms.service';

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get()
  getHello(): string {
    return this.commsService.getComms();
  }
}
