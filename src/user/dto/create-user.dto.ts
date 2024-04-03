import { Cv } from "src/cv/entities/cv.entity";

export class CreateUserDto {
  
  username: string;
  email: string;
  password: string;
  cvs: Cv[];
}
