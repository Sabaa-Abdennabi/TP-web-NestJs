import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillRepository } from './skill.repository';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    private skillrespository: SkillRepository,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return await this.skillrespository.save(createSkillDto);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillrespository.find({
      relations: ['cv'],
    });
  }

  async findById(id: number): Promise<Skill> {
    const found = await this.skillrespository.findOne({ where: { id } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  async removeById(id: number): Promise<Skill> {
    const found = await this.findById(id);
    if (found) {
      this.skillrespository.remove(found);
      return found;
    }
  }
}
