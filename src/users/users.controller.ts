import { Controller, Get, Post, Body, Patch, Param, Delete , Req , Res, ValidationPipe} from '@nestjs/common';
import { UsersService } from '../common/services/users/users.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/auth/createUser.dto';
import { Response } from 'express';
import { LoginUserDto } from 'src/common/dto/auth/loginUser.dto';
import { HelperService } from 'src/common/helpers/helper.service';
import { ResponseService } from 'src/common/helpers/response.service';

@ApiTags('auth')
@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly responseService : ResponseService
    ) {}

  @Post("sign_up")
  @ApiBody({ type : CreateUserDto ,required : true })
  @ApiResponse({ status: 201, description: 'Signup user successfully' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiResponse({ status: 500, description: 'Internal Server error' })
  async signup(@Body() createUserDto : CreateUserDto , @Res() res : Response) {
    try{
      return await this.usersService.createUser(createUserDto , res);
    }catch(error){
      return this.responseService.responseIntervalServer(res)
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
      return this.responseService.responseIntervalServer(res);
    }
  }
}
