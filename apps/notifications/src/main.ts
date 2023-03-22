import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://djhyiuhg:1gbKM0em3ebeveuri6Mwq6isJ7RuJico@cow.rmq2.cloudamqp.com/djhyiuhg'],
      queue: 'notifications_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
