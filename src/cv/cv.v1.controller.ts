import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';

@Controller({
  path:'cv',
  version:'1',
})
export class CvControllerV1 {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto):Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }

  @Get('')
  async findAll(@Query(ValidationPipe)filter : GetCvFilterDto):Promise<Cv[]> {
    return await this.cvService.findAll(filter);
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
