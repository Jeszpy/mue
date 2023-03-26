import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { UserModel } from '@app/common';
import { StartCommandUseCase } from './use-cases/start-command.use-case';

@Controller()
export class NotificationsController {
  constructor(private readonly startCommandUseCase: StartCommandUseCase) {}

  @MessagePattern('command.start')
  async startCommand(@Payload() user: UserModel, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    await this.startCommandUseCase.execute(user);
    channel.ack(message);
    return;
  }
}
