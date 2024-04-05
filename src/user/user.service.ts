import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userrespository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userrespository.createUser(createUserDto);
  }
  async findAll(): Promise<User[]> {
    return await this.userrespository.find({
      relations: {
        cvs: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    const found = await this.userrespository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found;
  }

  async remove(id: number): Promise<User> {
    const found = this.findById(id);
    if (found) {
      this.userrespository.delete(id);
      return found;
    }
  }
}
