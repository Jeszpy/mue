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

  async sendMessage(chatId: number, text: string) {
    try {
      const url = `${this.baseUrl}/sendMessage`;
      const result = await firstValueFrom(
        await this.httpService.post(url, {
          chat_id: chatId,
          text,
          reply_markup: {
            keyboard: [
              [
                {
                  text: 'Оплатить',
                  // callback_data: JSON.stringify({
                  //   command: '/help',
                  //   answer: 'no',
                  // }),
                },
              ],
              ['Получить список оплат'],
              [
                {
                  text: 'Помощь',
                  callback_data: JSON.stringify({
                    command: '/help',
                    // answer: 'no',
                  }),
                },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
            force_reply: true,
          },
        }),
      );
      return result.data.ok;
    } catch (e) {
      this.logger.error(`${this.sendMessage.name} => ${e}`);
      return false;
    }
  }

  async sendFile(chatId: number, document: any) {
    try {
      const url = `${this.baseUrl}/sendDocument`;
      const filePath = path.resolve(__dirname, '1.png');
      const file = fs.createReadStream(filePath);
      file.on('data', (chunk) => {
        console.log(chunk);
      });
      const result = await firstValueFrom(
        this.httpService.post(
          url,
          {
            chat_id: chatId,
            //TODO: change filepath to PC / DB / S3 Bucket
            // document: fs.readFileSync('FILE_PATH').toString('base64'),
            // document: fs.readFileSync(filePath).toString('base64'),
            // fileName: 'any.jpg',
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
