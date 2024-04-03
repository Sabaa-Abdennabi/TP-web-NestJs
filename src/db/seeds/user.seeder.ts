import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cv } from '../../cv/entities/cv.entity';
import * as faker from 'faker';
import { Skill } from '../../skill/entities/skill.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {

    const userRepository = dataSource.getRepository(User);
    const cvsRepository = dataSource.getRepository(Cv);
    const skillRepository = dataSource.getRepository(Skill);

    const userFactory = factoryManager.get(User);
    const cvsFactory = factoryManager.get(Cv);
    const skillFactory = factoryManager.get(Skill);

    const users = await userFactory.saveMany(10);

    const cvs = await Promise.all(
      Array(17)
        .fill('')
        .map(async () => {
          const made = await cvsFactory.make({
            user: faker.random.arrayElement(users),
          });
          return made;
        }),
    );
    
    await cvsRepository.save(cvs);

    const skills = await Promise.all(
      Array(17)
        .fill('')
        .map(async () => {
          const made = await skillFactory.make({
            cvs: faker.random.arrayElements(cvs),
          });
          return made;
        }),
    );
    await skillRepository.save(skills);
  }
}