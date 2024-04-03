import { DataSource, Repository } from 'typeorm';
import { Cv } from "src/cv/entities/cv.entity";
import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';

@Injectable()
export class CvRepository extends Repository<Cv> {
  constructor(private dataSource: DataSource) {
    super(Cv, dataSource.createEntityManager());
  }
  async createCv(createCvDto: CreateCvDto): Promise<Cv> {
    const cv = new Cv();
    const { name, firstname, age, cin, job, path, skils, user } = createCvDto;
    cv.name = name;
    cv.firstname = firstname;
    cv.age = age;
    cv.cin = cin;
    cv.job = job;
    cv.path = path;
    cv.skills = skils;
    cv.user = user;
    return await this.save(cv);
  }
}
