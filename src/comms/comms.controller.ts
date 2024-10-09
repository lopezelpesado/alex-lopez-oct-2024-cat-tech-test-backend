import { Controller, Get } from '@nestjs/common';

@Controller('comms')
export class CommsController {
  @Get()
  getHello(): string {
    return 'Comms!';
  }
}
