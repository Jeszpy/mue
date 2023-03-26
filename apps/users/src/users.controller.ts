import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@app/common';

@Controller()
export class UsersController {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @Inject('NOTIFICATIONS_SERVICE') private notificationsService: ClientProxy,
  ) {}

  @MessagePattern('command.start')
  async createOrUpdate(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    const telegramId = data.payload.message.from.id;
    const userFromDb = await this.userModel.findOne({ where: { telegramId } });
    userFromDb.firstName = data.payload.message.from.first_name;
    userFromDb.lastName = data.payload.message.from.last_name ?? null;
    userFromDb.username = data.payload.message.from.username ?? null;
    await userFromDb.save();
    if (userFromDb) {
      this.notificationsService.emit('command.start', userFromDb);
      return channel.ack(message);
    }
    const newUser = new this.userModel();
    newUser.telegramId = data.payload.message.from.id;
    newUser.firstName = data.payload.message.from.first_name;
    newUser.lastName = data.payload.message.from.last_name ?? null;
    newUser.username = data.payload.message.from.username ?? null;

    const user = await newUser.save();
    this.notificationsService.emit('command.start', user);

    channel.ack(message);

    return true;
  }
}
