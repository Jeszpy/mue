import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from '../dto/message.dto';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MessageHandlerUseCase {
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly notificationsClient: ClientProxy) {}

  async execute(message: MessageDto) {
    switch (message.message.text) {
      case '/start':
        console.log('its start');
        const a = await lastValueFrom(this.notificationsClient.emit('start-command', { telegramId: message.message.from.id }));
        console.log(a);
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
