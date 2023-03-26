import { Module } from '@nestjs/common';
import { ClientController } from './api/client.controller';
import { RegisterTelegramWebHookUseCase } from './use-cases/register-telegram-web-hook.use-case';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { PayloadHandlerUseCase } from './use-cases/payload-handler.use-case';
import { DatabaseModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/client/.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().min(0).max(65536).required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
      }),
    }),
    HttpModule,
    RmqModule.register({ name: 'USERS' }),
    RmqModule.register({ name: 'NOTIFICATIONS' }),
  ],
  controllers: [ClientController],
  providers: [RegisterTelegramWebHookUseCase, PayloadHandlerUseCase],
})
export class ClientModule {}
