import { Inject, Injectable } from '@nestjs/common';
import { PayloadDto } from '../dto/payloadDto';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

@Injectable()
export class PayloadHandlerUseCase {
  constructor(
    @Inject('USERS_SERVICE') private usersService: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE') private notificationsService: ClientProxy,
  ) {}

  async execute(payload: PayloadDto) {
    const data = { requestId: randomUUID(), payload };
    switch (payload.message.text) {
      case '/start':
        await this.usersService.emit('command.start', data);
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
