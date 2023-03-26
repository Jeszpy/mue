import { Body, Controller, Post } from '@nestjs/common';
import { PayloadHandlerUseCase } from '../use-cases/payload-handler.use-case';
import { PayloadDto } from '../dto/payloadDto';

@Controller()
export class ClientController {
  constructor(private readonly payloadHandler: PayloadHandlerUseCase) {}

  @Post('get-updates')
  async getUpdates(@Body() payload: PayloadDto) {
    console.log('client controller');
    return this.payloadHandler.execute(payload);
  }
}
