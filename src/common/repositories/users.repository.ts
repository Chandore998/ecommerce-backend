import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/common/dto/auth/createUserDto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private userRepository :Repository<Users>
  ){}


  async create(createUserDto:CreateUserDto) {
    const createdUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser) 
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where : { email }})
  }

}
