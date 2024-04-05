import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
  Req,
  Version,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { sign } from 'jsonwebtoken';
import { version } from 'typescript';
import { UserIdExistsGuard } from './user-id-exists.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(UserIdExistsGuard)
@Controller({
  path: 'cv',
  version: '2',
})
export class CvControllerV2 {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }

  @Get('token')
  async gettoken(): Promise<any> {
    const payload = {
      userId: '10',
    };
    const secret = 'secretKey';
    const token = sign(payload, secret);
    return token;
  }

  @Get('')
  async findAll(
    @Req() req: Request,
    @Query(ValidationPipe) filter: GetCvFilterDto,
  ): Promise<Cv[]> {
    return await this.cvService.findAll(filter);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.findById(+id);
  }
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    return await this.cvService.update(+id, updateCvDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.remove(+id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file,
  ) {
    return file;
  }
}
