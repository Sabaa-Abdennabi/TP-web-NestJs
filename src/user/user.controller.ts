import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private  userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) :Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('')
  async findAll():Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id' ) id: string):Promise<User> {
    return await this.userService.findById(+id);
  }

 

  @Delete('/:id')
  async remove(@Param('id') id: string):Promise<User> {
    return await this.userService.remove(+id);
  }
}
