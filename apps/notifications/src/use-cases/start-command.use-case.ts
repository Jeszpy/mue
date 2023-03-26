import { UserModel } from '@app/common';
import { TelegramAdapter } from '../adapters/telegram.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StartCommandUseCase {
  constructor(private readonly telegramAdapter: TelegramAdapter) {}
  async execute(user: UserModel) {
    // TODO: fix this text for prod. mode
    const text = `Hello, ${user.firstName}. Текст приветсвия... очень-очень много полезного текста с описанием возможностей бота`;
    return this.telegramAdapter.sendMessage(user.telegramId, text);
  }
}
