import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { constants } from '../constant/constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HelperService {
    constructor(
        private readonly jwtService : JwtService
    ){}

    async passwordGenerator(password : string): Promise<string>{
        const hash = await bcrypt.hash(password, constants.hashSalt );
        return hash
    }

    async comparePassword(password : string , encrypt : string): Promise<boolean>{
        return await bcrypt.compare(password, encrypt);
    }

    async generateToken(payload){
        return await this.jwtService.signAsync(payload , {
            expiresIn : constants.jwtExpireTime
        })
    }

}