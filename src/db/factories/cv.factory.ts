import { Cv } from '../../cv/entities/cv.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export default setSeederFactory(Cv, (f) => {
  const cv = new Cv();
  const datatype = faker.number.int;
  const name = faker.person;
  const system = faker.system;

  cv.age = datatype({ max: 120 });
  cv.firstname = name.firstName();
  cv.name = name.lastName();
  cv.cin = datatype({ max: 200000000 });
  cv.job = name.jobTitle();
  cv.path = system.filePath();

  return cv;
});
