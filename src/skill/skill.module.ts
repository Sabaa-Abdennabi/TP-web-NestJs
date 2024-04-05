import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillRepository } from './skill.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SkillRepository])],
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
})
export class SkillModule {}
