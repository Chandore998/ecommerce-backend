import { Module } from '@nestjs/common';
import { UsersService } from '../common/services/users/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UsersRepository } from 'src/common/repositories/users.repository';
import { HelperService } from 'src/common/helpers/helper.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResponseService } from 'src/common/helpers/response.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository,HelperService,ResponseService],
})
export class UsersModule {}
