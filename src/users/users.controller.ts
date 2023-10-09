import { Controller, Get, Post, Body, Patch, Param, Delete , Req , Res} from '@nestjs/common';
import { UsersService } from '../common/services/users/users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/auth/createUserDto';
import { Response } from 'express';
import { LoginUserDto } from 'src/common/dto/auth/loginUserDto';

@ApiTags('auth')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("sign_up")
  @ApiBody({ type : CreateUserDto ,required : true })
  @ApiResponse({ status: 201, description: 'Signup user successfully' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiResponse({ status: 500, description: 'Internal Server error' })
  async signup(@Body() createUserDto : CreateUserDto , @Res() res : Response) {
    try{
      return this.usersService.createUser(createUserDto , res);
    }catch(error){
      res.send(500).send({ message : "Internal Server error"})
      return;
    }
  }

  @Post("log_in")
  @ApiBody({ type : LoginUserDto ,required : true })
  @ApiResponse({ status: 200, description: 'Login user successfully' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiResponse({ status: 500, description: 'Internal Server error' })
  async login(@Body() loginUserDto :LoginUserDto , @Res() res : Response) {
    try{
      return this.usersService.getloginUser(loginUserDto , res);
    }catch(error){
      res.send(500).send({ message : "Internal Server error"})
      return;
    }
  }
}
