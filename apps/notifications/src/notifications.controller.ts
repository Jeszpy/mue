import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('command.start')
  async startCommand(@Payload() data: any, @Ctx() context: RmqContext) {
    await fetch('https://2477-46-53-254-124.eu.ngrok.io', { method: 'get' });
    console.log({ data, context });
    const channel = context.getChannelRef();
    const message = context.getMessage();
    console.log(channel, message);
    return channel.ack(message);
  }
}
