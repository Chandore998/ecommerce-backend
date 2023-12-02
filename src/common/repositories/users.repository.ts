import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/common/dto/auth/createUser.dto';

@Injectable()
export class UsersRepository  extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async createUser(createUserDto:CreateUserDto) {
    const createdUser = this.create(createUserDto);
    return await this.save(createdUser) 
  }

  async findAll() {
    return await this.find();
  }

  async findOneByEmail(email: string) {
    return await this.findOne({ where : { email }})
  }

  async findOneById(id: string) {
    return await this.findOne({ where : { id }})
  }

}
