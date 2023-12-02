import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'src/common/config/mongoose.config';
import { UsersService } from 'src/common/services/users/users.service';
import { UsersRepository } from 'src/common/repositories/users.repository';
import { HelperService } from 'src/common/helpers/helper.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/common/helpers/response.service';

@Module({
  imports:[
 // Connection of mongodb database
  MongooseModule.forRootAsync({
    useClass: MongooseConfigService,
  })
  ],
  providers: [ 
    JwtStrategy,
    AuthService,
    ConfigService,
    UsersRepository,
    HelperService,
    JwtService,
    UsersService,
    ResponseService],
})
export class AuthModule {}
