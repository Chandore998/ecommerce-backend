import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from './common/config/typeorm.postgres.config';
import { typeOrmPostgresConfig } from 'typeorm.postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmPostgresConfig),
    AuthModule,
    UsersModule,
    BrandModule,
    CategoryModule,
    SubCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
