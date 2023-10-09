import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/common/repositories/users.repository';
import { CreateUserDto } from 'src/common/dto/auth/createUserDto';
import { HelperService } from 'src/common/helpers/helper.service';
import { Response } from 'express';
import { LoginUserDto } from 'src/common/dto/auth/loginUserDto';
import { ResponseService } from 'src/common/helpers/response.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository : UsersRepository,
    private readonly helperService : HelperService,
    private readonly responseService : ResponseService
  ){}

  async createUser( createUserDto: CreateUserDto , res : Response) {
    const userRecord = await this.usersRepository.findOneByEmail(createUserDto.email)
    if(!userRecord){
      return
    }
    const password = createUserDto && createUserDto?.password
    const encryptPassword = await this.helperService.passwordGenerator(password)
    createUserDto.password = encryptPassword
    const userDetail =  await this.usersRepository.create(createUserDto);
    if(userDetail){
      const accessToken =  await this.helperService.generateToken({ id : userDetail.id })
      delete userDetail.password
      const responseData = {
        ...userDetail , accessToken
      }
      res.status(200).send({ responseData });
      return;
    }
    res.status(400).send({message : "Something went wrong"})
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

  findOne(id:string) {
    return  "tjos";
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
