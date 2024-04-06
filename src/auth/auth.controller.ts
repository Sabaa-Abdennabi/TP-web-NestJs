import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signIn.Dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { JWTAuthGuard } from 'src/guards/auth.guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
  @Post('/admin')
  @UseGuards(AdminGuard)
  Test() {
    return "Welcome Admin";
  }
  @Post('/authorized')
  @UseGuards(JWTAuthGuard)
  authorized(@GetUser() user) {
    return user;
  }
}
