import { Body, Controller, Get, Injectable, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './DTO/auth.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './DTO/signup.dto';
import { AdminGuard } from './GUARD/admin.guard';
import { GetUser } from './get-ver.decrator';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) signupDto : SignUpDto):Promise<void>{
    return this.authService.signUp(signupDto);    
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authDto : AuthDto):Promise<{ accessToken: string }>{
        return this.authService.signIn(authDto);    
    }
    @Post('/admin')
    @UseGuards(AdminGuard)
    admin(@Body(ValidationPipe) authDto : AuthDto):Promise<{ accessToken: string }>{
        return this.authService.signIn(authDto);    
    }
    @Get('')
    get(@GetUser() user){
        console.log(user);}

}
