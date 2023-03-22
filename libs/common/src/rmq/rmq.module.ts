import { Global, Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./libs/common/src/rmq/.env'],
      // validationSchema: Joi.object({
      //   HOST: Joi.string().required(),
      //   PORT: Joi.number().required(),
      //   USERNAME: Joi.string().required(),
      //   PASSWORD: Joi.string().required(),
      //   DATABASE: Joi.string().required(),
      // }),
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://djhyiuhg:1gbKM0em3ebeveuri6Mwq6isJ7RuJico@cow.rmq2.cloudamqp.com/djhyiuhg'],
          queue: 'notifications_queue',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RmqModule {}
