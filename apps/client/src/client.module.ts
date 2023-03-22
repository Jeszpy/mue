import { ConsoleLogger, Logger, Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { RegisterTelegramWebHookUseCase } from './use-cases/register-telegram-web-hook.use-case';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { PayloadHandlerUseCase } from './use-cases/payload-handler.use-case';

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
  ],
  controllers: [ClientController],
  providers: [ClientService, RegisterTelegramWebHookUseCase, PayloadHandlerUseCase],
})
export class ClientModule {}
