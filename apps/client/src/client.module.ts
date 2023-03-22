import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { RegisterTelegramWebHookUseCase } from './use-cases/register-telegram-web-hook.use-case';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService, RegisterTelegramWebHookUseCase],
})
export class ClientModule {}
