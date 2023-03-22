import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../dto/payloadDto';

@Injectable()
export class PayloadHandlerUseCase {
  constructor() {}

  async execute(payload: PayloadDto) {
    switch (payload.message.text) {
      case '/start':
        console.log('its start');
        break;
      case '/help':
        console.log('its help');
        break;
      default:
        console.log('hz che eto');
        break;
    }
  }
}
