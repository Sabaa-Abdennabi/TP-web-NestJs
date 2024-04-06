import { IsString, MinLength, IsEmail,MaxLength, Matches, IsIn } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  @IsString()
  @IsIn(['candidat', 'recruteur'], { message: 'role must be "candidat" or "recruteur"' })
  role: string;
}
