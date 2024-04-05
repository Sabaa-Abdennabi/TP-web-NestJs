import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './DTO/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './DTO/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupcred: SignUpDto): Promise<void> {
    return this.userRepository.signUp(signupcred);
  }

  async signIn(auth: AuthDto): Promise<{ accessToken: string }> {
    const result = await this.userRepository.validateUserPassword(auth);
    if (!result) {
      throw new ConflictException('Invalid credentials');
    }
    const payload = { result };
    //console.log(payload);
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
  
}
