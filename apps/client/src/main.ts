import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = parseInt(configService.get<string>('PORT'), 10);
  await app.listen(port, () => {
    console.log(`Client app successfully started at ${port} port`);
  });
}
bootstrap();
