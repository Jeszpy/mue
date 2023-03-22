import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { TelegramAdapter } from './adapters/telegram.adapter';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService, private readonly tg: TelegramAdapter) {}

  @MessagePattern('command.start')
  async startCommand(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    console.log(data.payload.message.from.id, data.payload.message.text);
    await this.tg.sendMessage(data.payload.message.from.id, data.payload.message.text);
    channel.ack(message);
    return;
  }
}
