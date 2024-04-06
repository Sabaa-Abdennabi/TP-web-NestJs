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
import { AuthMiddleware } from './middlewear/auth.middleware';
import { sign } from 'jsonwebtoken';
import { version } from 'typescript';
import { UserIdExistsGuard } from './user-id-exists.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/multer.config';
import { FileUploadService } from 'src/common/file-upload.service';
import { Express } from 'express';
import { JWTAuthGuard } from 'src/guards/auth.guard';
import { GetUser } from 'src/auth/decorator';

@Controller({
  path: 'cv',
  version: '2',
})
export class CvControllerV2 {
  constructor(
    private readonly cvService: CvService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  async create(@Body() createCvDto: CreateCvDto): Promise<Cv> {
    return await this.cvService.create(createCvDto);
  }

  // @Get('token')
  // async gettoken(): Promise<any> {
  //   const payload = {
  //     userId: '10',
  //   };
  //   const secret = 'secretKey';
  //   const token = sign(payload, secret);
  //   return token;
  // }

  @Get('')
  @UseGuards(JWTAuthGuard)
  async findAll(
    @GetUser() user,
    @Req() req: Request,
    @Query(ValidationPipe) filter: GetCvFilterDto,
  ): Promise<Cv[]> {
    if (user.role === 'admin') return await this.cvService.findAll(filter);
    filter.search = user.username;
    return await this.cvService.findAll(filter);
  }

  @Get('/:id')
  @UseGuards(JWTAuthGuard)
  async findOne(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.findById(+id);
  }
  @Patch('/:id')
  @UseGuards(JWTAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    return await this.cvService.update(+id, updateCvDto);
  }

  @Delete('/:id')
  @UseGuards(JWTAuthGuard)
  async remove(@Param('id') id: string): Promise<Cv> {
    return await this.cvService.remove(+id);
  }
  @Post('upload')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadFile(file);
    //return file;
  }
}
