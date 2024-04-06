import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signIn.Dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    jwtService: any;
    constructor(
        @InjectRepository(AuthRepository)

        private  authRepository: AuthRepository,
    ){}
    async signUp(signUpDto: SignUpDto): Promise<void> {
        return this.authRepository.SignUp(signUpDto);
      }
      async signIn(signIn: SignInDto): Promise<{ accessToken: string }> {
        const username = await this.authRepository.validateUserPassword(signIn);
    
        if (!username) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
    
        return { accessToken };
      }
}
