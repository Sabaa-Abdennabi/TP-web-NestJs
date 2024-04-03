import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Skill} from './entities/skill.entity';
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillRepository extends Repository<Skill> {
    
    constructor(private dataSource: DataSource) {
        super(Skill, dataSource.createEntityManager());
      }
    async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
        const skill = new Skill();
        const {designation , cvs}=createSkillDto;
        skill.designation = designation;
        skill.cvs=cvs;
        return await this.save(skill);
    }
 
}
