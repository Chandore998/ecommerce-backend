import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/common/repositories/users.repository';
import { CreateUserDto } from 'src/common/dto/auth/createUser.dto';
import { HelperService } from 'src/common/helpers/helper.service';
import { Response } from 'express';
import { LoginUserDto } from 'src/common/dto/auth/loginUser.dto';
import { ResponseService } from 'src/common/helpers/response.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
    private readonly helperService : HelperService,
    private readonly responseService : ResponseService
  ){}

  async createUser( createUserDto: CreateUserDto , res : Response) {
    const userRecord = await this.usersRepository.findOneByEmail(createUserDto.email)
    if(userRecord){
      return this.responseService.responseBadRequestWithOutData(res,"Email already exists")
    }
    const password = createUserDto && createUserDto?.password
    const encryptPassword = await this.helperService.passwordGenerator(password)
    createUserDto.password = encryptPassword
    const userDetail =  await this.usersRepository.createUser(createUserDto);
    if(userDetail){
      const accessToken =  await this.helperService.generateToken({ id : userDetail.id , role : 1 })
      delete userDetail.password
      const responseData = {
        ...userDetail , accessToken
      }
      this.responseService.responseOk(res ,responseData,"User created successfully" )
      return;
    }
    this.responseService.responseBadRequestWithOutData(res ,"Something went wrong" )
    return;
  }


  async getloginUser( loginUserDto: LoginUserDto , res : Response) {
    const userRecord = await this.usersRepository.findOneByEmail(loginUserDto.email)
    if(!userRecord){
      this.responseService.responseBadRequestWithOutData(res, "Email is Invalid")
      return;
    }

    const password = loginUserDto && loginUserDto?.password
    const isPassword = await this.helperService.comparePassword(password, userRecord.password)
    if(isPassword) {
      const accessToken = await this.helperService.generateToken({
        id : userRecord.id
      })
      delete userRecord.password
      this.responseService.responseOk(res,{
        ...userRecord , accessToken
      }, "Login user successfully")
      return 
    }
    this.responseService.responseBadRequestWithOutData(res, "Password is Invalid")
    return;
  }

  async findAllUser() {
    return this.usersRepository.findAll();
  }

  async findUser(id:string){
    return this.usersRepository.findOneById(id)
  }

}
