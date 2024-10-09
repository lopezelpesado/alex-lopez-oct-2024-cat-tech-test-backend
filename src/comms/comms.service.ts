import { Injectable } from '@nestjs/common';

@Injectable()
export class CommsService {
  getComms(): string {
    return 'Comms!';
  }
}
