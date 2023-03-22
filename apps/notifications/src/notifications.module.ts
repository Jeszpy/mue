import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TelegramAdapter } from './adapters/telegram.adapter';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/notifications/.env'],
      validationSchema: Joi.object({
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
      }),
    }),
    HttpModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, TelegramAdapter],
})
export class NotificationsModule {}
