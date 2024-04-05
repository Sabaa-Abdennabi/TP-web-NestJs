import { IsNotEmpty } from 'class-validator';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateCvDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  cin: number;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  path: string;

  skills: Skill[];
  user: User;
}
