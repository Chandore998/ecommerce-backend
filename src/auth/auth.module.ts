import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'src/common/config/mongoose.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from 'src/common/config/typeorm.postgres.config';

@Module({
  imports:[
 // Connection of mongodb database
  MongooseModule.forRootAsync({
    useClass: MongooseConfigService,
  }),
  // Connection of postgres database
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: (configService: ConfigService) => typeOrmConfigFactory(configService),
    inject: [ConfigService],
  }),
  ],
  providers: [JwtStrategy,AuthService,ConfigService],
})
export class AuthModule {}
