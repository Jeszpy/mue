import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://djhyiuhg:1gbKM0em3ebeveuri6Mwq6isJ7RuJico@cow.rmq2.cloudamqp.com/djhyiuhg'],
      queue: 'users_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
      // prefetchCount: 1,
    },
  });
  await app.listen();
}
bootstrap();
