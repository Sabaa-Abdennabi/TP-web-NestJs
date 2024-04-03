import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { Cv } from './entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvRepository)
    private cvrespository: CvRepository,
  ) {}

  async create(createCvDto: CreateCvDto): Promise<Cv> {
    return await this.cvrespository.createCv(createCvDto);
  }

  async findAll(): Promise<Cv[]> {
    return await this.cvrespository.find();
  }

  async findById(id: number): Promise<Cv> {
    const found = await this.cvrespository.findOne({ where: { id } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Cv with id ${id} not found`);
  }

  async remove(id: number): Promise<Cv> {
    const found = await this.findById(id);
    if (found) {
      this.cvrespository.remove(found);
      return found;
    }
  }
}
