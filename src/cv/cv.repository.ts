import { DataSource, Repository } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';
import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { GetCvFilterDto } from './dto/get-cv-filter.dto';

@Injectable()
export class CvRepository extends Repository<Cv> {
  constructor(private dataSource: DataSource) {
    super(Cv, dataSource.createEntityManager());
  }
  async createCv(createCvDto: CreateCvDto): Promise<Cv> {
    return await this.save(createCvDto);
  }

  async getCvs(filterDto: GetCvFilterDto): Promise<Cv[]> {
    const { search, age } = filterDto;
    const query = this.createQueryBuilder('cv');
    if (search) {
      query.andWhere(
        'cv.name LIKE :search OR cv.firstname LIKE :search OR cv.job LIKE :search',
        { search: `%${search}%` },
      );
    }
    if (age) {
      query.andWhere('cv.age = :age', { age });
    }

    query.leftJoinAndSelect('cv.user', 'user');
    query.leftJoinAndSelect('cv.skills', 'skill');
    const cvs = await query.getMany();
    return cvs;
  }
}
