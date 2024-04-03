import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';


export class CreateCvDto {
  id: number;

  name: string;
  firstname: string;
  age: number;
  cin: number;
  job: string;
  path: string;
  skils: Skill[];
  user: User;
}
