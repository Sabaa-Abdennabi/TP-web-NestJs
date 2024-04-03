import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto):Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }

  @Get()
  async findAll():Promise<Cv[]> {
    return await this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<Cv>{
    return await this.cvService.findById(+id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) : Promise<Cv>{
    return await this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) :Promise<Cv>{
    return await this.cvService.remove(+id);
  }
}
