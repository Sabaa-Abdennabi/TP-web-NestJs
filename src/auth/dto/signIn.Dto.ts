import { PickType } from "@nestjs/mapped-types";
import { SignUpDto } from "./signUpDto";


export class 
SignInDto extends PickType(SignUpDto, ['username', 'password']) {}