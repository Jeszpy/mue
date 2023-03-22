import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RegisterTelegramWebHookUseCase implements OnApplicationBootstrap {
  private logger: Logger;
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.logger = new Logger(RegisterTelegramWebHookUseCase.name);
  }

  private telegramBotToken = this.configService.get('TELEGRAM_BOT_TOKEN');

  private baseUrl = `https://api.telegram.org/bot${this.telegramBotToken}`;
  private setWebhookUrl = `${this.baseUrl}/setWebhook`;

  //TODO: use Ngrok in dev mode only!
  private getUpdatesEndpoint = 'https://39a2-46-53-254-124.eu.ngrok.io/get-updates';

  private async registerTelegramWebHook() {
    return firstValueFrom(
      this.httpService.post(this.setWebhookUrl, {
        url: this.getUpdatesEndpoint,
      }),
    );
  }

  async onApplicationBootstrap() {
    try {
      this.logger.log('Start registering webhook for telegram');
      await this.registerTelegramWebHook();
      this.logger.log('Telegram webhook registration was successful');
    } catch (e) {
      this.logger.error(e);
      throw new Error(e);
    }
  }
}
