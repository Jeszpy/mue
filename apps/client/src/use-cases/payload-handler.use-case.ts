import { Inject, Injectable } from '@nestjs/common';
import { PayloadDto } from '../dto/payloadDto';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpConnectionManager, AmqpConnectionManagerClass } from 'amqp-connection-manager';
import { randomUUID } from 'crypto';

@Injectable()
export class PayloadHandlerUseCase {
  constructor(@Inject('NOTIFICATIONS_SERVICE') private client: ClientProxy) {}

  async execute(payload: PayloadDto) {
    const requestId = randomUUID();
    switch (payload.message.text) {
      case '/start':
        return this.client.send('command.start', { requestId, payload });
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
