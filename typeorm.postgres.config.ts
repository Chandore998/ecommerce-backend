import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const typeOrmPostgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: "localhost" , // Use environment variable or fallback to 'localhost'
  port: 5432, // Use environment variable or fallback to 5432
  username: 'postgres', // Use environment variable
  password: 'root', // Use environment variable
  database: "postgres", // Use environment variable
  entities: [ __dirname + '/**/*.entity{.ts,.js}'], // Provide the path to your entity files
  migrations: [ __dirname + '/migrations/*{.ts,.js}'], // Provide the path to your migration files
  synchronize: false, // Set to true for development, but false for production
  logging: true, // Enable logging (optional, for debugging purposes)
};
export const DatabaseSource = new DataSource(typeOrmPostgresConfig);