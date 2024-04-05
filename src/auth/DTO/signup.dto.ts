import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string ;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message : 'weak password'}) 
    password : string ;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsString()
    role: string;
    
}