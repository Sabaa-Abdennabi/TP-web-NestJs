import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return await this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll() : Promise<Skill[]> {
    return await this.skillService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Skill> {
    return await this.skillService.findById(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<Skill>{
    return await this.skillService.removeById(+id);
  }
}
