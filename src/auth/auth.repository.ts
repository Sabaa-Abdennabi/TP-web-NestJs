import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from './auth.entity';
import { SignUpDto } from './dto/signUpDto';
import * as bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { SignInDto } from './dto/signIn.Dto';

@Injectable()
export class AuthRepository extends Repository<Users> {
  async SignUp(signUpDto: SignUpDto) {
    const user = new Users();
    const { username, role, email, password } = signUpDto;
    user.email = email;
    user.password = password;
    user.username = username;
    user.role = role;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

     await this.save(user);
  }
  async validateUserPassword(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto ;
    const user = await this.findOneBy({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
