import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signIn.Dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.authRepository.SignUp(signUpDto);
  }
  async signIn(signIn: SignInDto): Promise<{ accessToken: string }> {
    const obj = await this.authRepository.validateUserPassword(signIn);

    if (!obj) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: obj.username, role: obj.role };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
