import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(ClientModule);

  // await app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqps://djhyiuhg:1gbKM0em3ebeveuri6Mwq6isJ7RuJico@cow.rmq2.cloudamqp.com/djhyiuhg'],
  //     queue: 'notifications_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(ClientModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqps://djhyiuhg:1gbKM0em3ebeveuri6Mwq6isJ7RuJico@cow.rmq2.cloudamqp.com/djhyiuhg'],
  //     queue: 'notifications_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('PORT'), 10);

  // await app.startAllMicroservices();
  await app.listen(port, () => {
    logger.log('', `Client app successfully started at ${port} port`);
  });
}

bootstrap();
