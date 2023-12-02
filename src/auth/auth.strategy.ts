import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/common/services/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"auth"){
    constructor(
        private configService: ConfigService,
        private usersService : UsersService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_TOKEN'),
        }
        )
    }

    async validate(payload: any) {

        if(payload){
             const user = await this.usersService.findUser(payload.id)
             if(user){
                delete user.password
                return { ...payload , ...user}
             }
             throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); 
        }
      }
}