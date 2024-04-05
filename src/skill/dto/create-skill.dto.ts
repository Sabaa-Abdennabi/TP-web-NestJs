import { Cv } from 'src/cv/entities/cv.entity';

export class CreateSkillDto {
  name: string;
  designation: string;
  cvs: Cv[];
}
