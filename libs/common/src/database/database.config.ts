import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@app/common/database/models/user.model';

export const models = [UserModel];

@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT'), 10),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      models: models,
      autoLoadModels: true,
      // TODO: use this settings in dev mode only!
      synchronize: true,
      logging: false,
    };
  }
}
