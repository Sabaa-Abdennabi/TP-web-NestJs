import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { Cv } from './entities/cv.entity';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvRepository)
    private cvrespository: CvRepository,
    private eventEmitter: EventEmitter2,
    private userService : UserService,
  ) {}

  async create(createCvDto: CreateCvDto): Promise<Cv> {
    const createdCV = await this.cvrespository.createCv(createCvDto);
   
   
    console.log({createdCV})
    const eventData = {
      cv: createdCV, 
      name: createCvDto.name,
      actionBy: createdCV.user,
      date: new Date(),
      userid: await this.userService.findById(+createdCV.user),
    };
    console.log(eventData)
    const X= this.eventEmitter.emit('cv.added', eventData); 
    console.log(X);
    return createdCV;
  }
  

  async findAll(filter: GetCvFilterDto): Promise<Cv[]> {
    return await this.cvrespository.getCvs(filter);
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
      const eventData = {
        cv: found, 
        name: found.name,
        actionBy: found.user,
        date: new Date(),
        userid: found.user,
      };
      this.eventEmitter.emit('cv.deleted', eventData);
      this.cvrespository.remove(found);
      return found;
    }
    else {
      throw new NotFoundException;
    }
  }
  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    
    const cv = await this.findById(id);
    if (cv){
    Object.assign(cv, updateCvDto);
    const eventData = {
      cv: cv, 
      name: cv.name,
      actionBy: cv.user,
      date: new Date(),
      userid: cv.user,
    };
    console.log(this.eventEmitter.emit('cv.updated', eventData));
    console.log("emitted")
    return this.cvrespository.save(cv);
  }
  else { throw new NotFoundException; }

  }
}
