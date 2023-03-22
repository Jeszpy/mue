import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RegisterTelegramWebHookUseCase implements OnApplicationBootstrap {
  constructor() {}

  private setWebhookUrl = '/setWebhook';
  private getUpdatesEndpoint = '/get-updates';

  // private async registerTelegramWebHook() {
  //   await this.httpService.post(this.setWebhookUrl, {
  //     url: `https://d606-46-53-254-124.eu.ngrok.io${this.getUpdatesEndpoint}`,
  //   });
  // }

  async onApplicationBootstrap() {
    try {
    } catch (e) {
      console.log(`RegisterTelegramWebHookUseCase => onApplicationBootstrap => registerTelegramWebHook => e => ${e}`);
    }
  }
}
