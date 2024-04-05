import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const { username, email, password, cvs } = createUserDto;
    user.username = username;
    user.email = email;
    user.password = password;
    user.cvs = cvs;
    await user.save();
    return user;
  }
}
