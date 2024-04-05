import { Repository, EntityRepository, DataSource } from 'typeorm';
import { AuthDto } from './DTO/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserAuth } from './user.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './DTO/signup.dto';

@Injectable()
export class UserRepository extends Repository<UserAuth> {
  constructor(private dataSource: DataSource) {
    super(UserAuth, dataSource.createEntityManager());
  }

  async signUp(signupCredentialsDto: SignUpDto): Promise<void> {
    const { username, password,email,role } = signupCredentialsDto;

    const user = new UserAuth();
    user.username = username;
    user.email=email;
    user.role=role;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthDto):Promise<string> {
    const { username, password } = authCredentialsDto;
    //console.log(username,password);
    const user = await this.findOne({ where: { username } });
    if (user && (await user.validatePassword(password))) {
      //console.log(user.username)
      return user.username;
    } else {
      return null;
    }
  }
  async getRole(username: string): Promise<string> {
    const user = await this.findOne({ where : {username} });

    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }

    return user.role;
  }
  
  
}
