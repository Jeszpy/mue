import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TelegramAdapter {
  private logger: Logger;
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    this.logger = new Logger(TelegramAdapter.name);
  }

  private telegramBotToken = this.configService.get('TELEGRAM_BOT_TOKEN');
  private baseUrl = `https://api.telegram.org/bot${this.telegramBotToken}`;

  // reply_markup

  async sendMessage(chatId: number, text: string) {
    try {
      const url = `${this.baseUrl}/sendMessage`;
      const result = await firstValueFrom(
        await this.httpService.post(url, {
          chat_id: chatId,
          text,
        }),
      );
      await this.sendFile(chatId, {});
      return result.data.ok;
    } catch (e) {
      this.logger.error(`${this.sendMessage.name} => ${e}`);
    }
  }

  async sendFile(chatId: number, document: any) {
    try {
      const url = `${this.baseUrl}/sendDocument`;
      const result = await firstValueFrom(
        await this.httpService.post(
          url,
          {
            chat_id: chatId,
            //TODO: change filepath to PC / DB / S3 Bucket
            // document: fs.readFileSync('FILE_PATH').toString('base64'),
            document: fs.readFileSync(path.join(__dirname, '1.png')).toString('base64'),
          },
          {},
        ),
      );
      return result.data.ok;
    } catch (e) {
      this.logger.error(`${this.sendFile.name} => ${e}`);
    }
  }
}
