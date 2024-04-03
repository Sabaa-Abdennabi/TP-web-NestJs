import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';


export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();

  return user;
});
