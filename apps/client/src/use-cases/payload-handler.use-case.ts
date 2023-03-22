import { Inject, Injectable } from '@nestjs/common';
import { PayloadDto } from '../dto/payloadDto';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PayloadHandlerUseCase {
  constructor(@Inject('NOTIFICATIONS_SERVICE') private client: ClientProxy) {}

  async execute(payload: PayloadDto) {
    const requestId = randomUUID();
    switch (payload.message.text) {
      case '/start':
        await this.client.emit('command.start', { requestId, payload });
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
