import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.configService.get<string>('HOST'),
      port: parseInt(this.configService.get<string>('PORT'), 10),
      username: this.configService.get<string>('USERNAME'),
      password: this.configService.get<string>('PASSWORD'),
      database: this.configService.get<string>('DATABASE'),
      models: [],
      autoLoadModels: true,
      // TODO: use synchronize in dev mode only!
      synchronize: true,
    };
  }
}
