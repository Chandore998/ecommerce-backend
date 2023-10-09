import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions,DataSource } from 'typeorm';


export const getDatabaseDataSourceOptions = (configService: ConfigService): DataSourceOptions => {
    const port = configService.get<number>('POSTGRES_PORT');
    const host = configService.get<string>('POSTGRES_HOST_NAME');
    const username = configService.get<string>('POSTGRES_USER_NAME');
    const database = configService.get<string>('POSTGRES_DATABASE');
    const password = configService.get<string>('POSTGRES_PASSWORD');
    return {
      type: 'postgres',
      port,
      host,
      username,
      database,
      password,
    };
  };


  export const typeOrmConfigFactory = (configService: ConfigService): DataSourceOptions => {
    return {
      ...getDatabaseDataSourceOptions(configService),
      synchronize: false,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/src/migrations/*.{ts,js}'],
    };
  };

  export const DatabaseSource = new DataSource({
    ...getDatabaseDataSourceOptions(new ConfigService()), // Create a new ConfigService instance
  });