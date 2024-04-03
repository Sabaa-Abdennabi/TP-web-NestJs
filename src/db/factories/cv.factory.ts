import { Cv } from '../../cv/entities/cv.entity';
import { setSeederFactory } from 'typeorm-extension';
import { name, datatype, system } from 'faker';

export default setSeederFactory(Cv, (faker) => {
  const cv = new Cv();
  cv.age = datatype.number();
  cv.firstname = name.firstName();
  cv.name = name.lastName();
  cv.cin = datatype.number();
  cv.job = name.jobTitle();
  cv.path = system.filePath();

  return cv;
});
