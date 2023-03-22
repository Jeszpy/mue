import { Body, Controller, Get, Post } from '@nestjs/common';
import { PayloadHandlerUseCase } from '../use-cases/payload-handler.use-case';
import { PayloadDto } from '../dto/payloadDto';

@Controller()
export class ClientController {
  constructor(private readonly payloadHandler: PayloadHandlerUseCase) {}

  @Get()
  asd() {
    console.log('poluchil');
  }

  @Post('get-updates')
  getUpdates(@Body() payload: PayloadDto) {
    return this.payloadHandler.execute(payload);
  }
}
